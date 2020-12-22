const Model = require('../models/restaurant.model')
const helpers = require('../helpers')
const errorText = require('../errorText')
const fs = require('fs')

module.exports.getAllForClient = async function (req, res, next) {
	try {
		const items = await Model.find({active: true, paid: true})
			.populate('user', '-password -restaurateur -admin -email -_id -__v')
			.populate('payment', '-_id -position')
		res.status(200).json(items)
	} catch (error) {
		helpers.errorHandler(res, error)
	}
}

module.exports.getAllForClientById = async function (req, res, next) {
	try {
		const item = await Model.findById(req.params.id)
			.populate('user', '-password -restaurateur -admin -email -__v -_id')
			.populate('payment', '-_id -position')
		if (item.active && item.paid) {
			res.status(200).json(item)
		} else {
			helpers.clientErrorHandler(res, 400, errorText.ERROR_2)
		}
	} catch (error) {
		helpers.errorHandler(res, error)
	}
}

module.exports.getAll = async function (req, res, next) {
	if (req.user.admin || req.user.restaurateur) {
		try {
			const items = await Model.find({user: req.user._id}).sort({position: 1})
			res.status(200).json(items)
		} catch (error) {
			helpers.errorHandler(res, error)
		}
	} else {
		helpers.clientErrorHandler(res, 400, errorText.ERROR_2)
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
	if (req.user.admin || req.user.restaurateur) {
		if (!req.body.name || !req.body.number || !req.body.address || !req.body.phone || !req.body.payment.length) {
			helpers.clientErrorHandler(res, 400, errorText.ERROR_3)
		}

		const item = new Model({
			name: req.body.name,
			number: req.body.number,
			address: req.body.address,
			latitude: req.body.latitude,
			longitude: req.body.longitude,
			phone: req.body.phone,
			delivery: req.body.delivery,
			pickup: req.body.pickup,
			amountForFreeDelivery: req.body.amountForFreeDelivery,
			distanceForFreeDelivery: req.body.distanceForFreeDelivery,
			timeForStopDelivery: req.body.timeForStopDelivery,
			schedule: JSON.parse(req.body.schedule),
			payment: JSON.parse(req.body.payment),
			user: req.user._id,
		})

		if (req.file) {
			item.image = req.file.path
		}

		try {
			const findItem = await Model.findOne({number: req.body.number})

			if (findItem) {
				helpers.clientErrorHandler(res, 400, errorText.ERROR_5)
			} else {
				await item.save()
				res.status(201).json(item)
			}
		} catch (error) {
			helpers.errorHandler(res, error)
		}
	} else {
		helpers.clientErrorHandler(res, 400, errorText.ERROR_2)
	}
}

module.exports.update = async function (req, res, next) {
	if (req.user.admin || req.user.restaurateur) {
		if (!req.body.name || !req.body.address || !req.body.phone || !req.body.payment.length) {
			helpers.clientErrorHandler(res, 400, errorText.ERROR_3)
		}

		try {
			const updatable = await Model.findOne({_id: req.params.id})

			if (`${updatable.user}` === `${req.user._id}`) {
				const updated = {
					...req.body,
					number: updatable.number,
					paid: updatable.paid,
					schedule: JSON.parse(req.body.schedule),
					payment: JSON.parse(req.body.payment),
				}

				const item = await Model.findOneAndUpdate({_id: req.params.id}, {$set: updated}, {new: true})
				res.status(200).json(item)
			} else {
				helpers.clientErrorHandler(res, 400, errorText.ERROR_2)
			}
		} catch (error) {
			helpers.errorHandler(res, error)
		}
	} else {
		helpers.clientErrorHandler(res, 400, errorText.ERROR_2)
	}
}

module.exports.activate = async function (req, res, next) {
	console.log()
	if (req.user.admin || req.user.restaurateur) {
		try {
			const updatable = await Model.findOne({_id: req.params.id})

			if (`${updatable.user}` === `${req.user._id}`) {
				const updated = {
					active: req.body.active,
					number: updatable.number,
					paid: updatable.paid,
				}

				const item = await Model.findOneAndUpdate({_id: req.params.id}, {$set: updated}, {new: true})
				res.status(200).json(item)
			} else {
				helpers.clientErrorHandler(res, 400, errorText.ERROR_2)
			}
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
