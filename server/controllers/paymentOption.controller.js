const Model = require('../models/paymentOption.model')
const helpers = require('../helpers')
const errorText = require('../errorText')

module.exports.getAll = async function (req, res, next) {
	try {
		const items = await Model.find().sort({position: 1})
		res.status(200).json(items)
	} catch (error) {
		helpers.errorHandler(res, error)
	}
}

module.exports.getById = async function (req, res, next) {
	try {
		const item = await Model.findById(req.params.id)

		if (item) {
			res.status(200).json(item)
		} else {
			helpers.clientErrorHandler(res, 400, errorText.ERROR_6)
		}
	} catch (error) {
		helpers.errorHandler(res, error)
	}
}

module.exports.create = async function (req, res, next) {
	if (req.user.admin) {
		if (!req.body.name) {
			helpers.clientErrorHandler(res, 400, errorText.ERROR_3)
		}

		const item = new Model({
			name: req.body.name,
			alias: req.body.alias,
		})

		try {
			const findItem = await Model.findOne({alias: req.body.alias})

			if (findItem) {
				helpers.clientErrorHandler(res, 400, errorText.ERROR_5)
			}

			const itemWithMaxPosition = await Model.find().sort({position: -1}).limit(1)

			if (!itemWithMaxPosition[0]) {
				item.position = 0
			} else {
				item.position = itemWithMaxPosition[0].position + 1
			}

			await item.save()
			res.status(201).json(item)
		} catch (error) {
			helpers.errorHandler(res, error)
		}
	} else {
		helpers.clientErrorHandler(res, 400, errorText.ERROR_2)
	}
}

module.exports.update = async function (req, res, next) {
	if (req.user.admin) {
		if (!req.body.name) {
			helpers.clientErrorHandler(res, 400, errorText.ERROR_3)
		}

		try {
			const updated = {...req.body}

			const item = await Model.findOneAndUpdate({_id: req.params.id}, {$set: updated}, {new: true})
			res.status(200).json(item)
		} catch (error) {
			helpers.errorHandler(res, error)
		}
	} else {
		helpers.clientErrorHandler(res, 400, errorText.ERROR_2)
	}
}

module.exports.delete = async function (req, res, next) {
	if (req.user.admin) {
		try {
			const item = await Model.deleteOne({_id: req.params.id})

			if (!!item.deletedCount) {
				res.status(200).json(req.params.id)
			} else {
				helpers.clientErrorHandler(res, 400, errorText.ERROR_7)
			}
		} catch (error) {
			helpers.errorHandler(res, error)
		}
	} else {
		helpers.clientErrorHandler(res, 400, errorText.ERROR_2)
	}
}
