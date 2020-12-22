const Model = require('../models/unit.model')
const helpers = require('../helpers')
const errorText = require('../errorText')
const fs = require('fs')
const defaultImage = require('../defailtImage')

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
			description: req.body.description,
			isSixInch: req.body.isSixInch,
			isFootLong: req.body.isFootLong,
			isWrap: req.body.isWrap,
			isSalad: req.body.isSalad,
		})

		if (req.files.imageSixInch) {
			item.imageSixInch = req.files.imageSixInch[0].path
		}
		if (req.files.imageFootLong) {
			item.imageFootLong = req.files.imageFootLong[0].path
		}
		if (req.files.imageWrap) {
			item.imageWrap = req.files.imageWrap[0].path
		}
		if (req.files.imageSalad) {
			item.imageSalad = req.files.imageSalad[0].path
		}

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
			const updatable = await Model.findById(req.params.id)
			const updated = {...req.body}

			if (req.files.imageSixInch) {
				if (updatable.imageSixInch && updatable.imageSixInch !== defaultImage.SIX_INCH) {
					fs.unlinkSync(`./${updatable.imageSixInch}`)
				}
				updated.imageSixInch = req.files.imageSixInch
			} else {
				if (updatable.imageSixInch && !req.body.imageSixInch) {
					fs.unlinkSync(`./${updatable.imageSixInch}`)
					updated.imageSixInch = defaultImage.SIX_INCH
				}
			}

			if (req.files.imageFootLong) {
				if (updatable.imageFootLong && updatable.imageFootLong !== defaultImage.FOOT_LONG) {
					fs.unlinkSync(`./${updatable.imageFootLong}`)
				}
				updated.imageFootLong = req.files.imageFootLong
			} else {
				if (updatable.imageFootLong && !req.body.imageFootLong) {
					fs.unlinkSync(`./${updatable.imageFootLong}`)
					updated.imageFootLong = defaultImage.FOOT_LONG
				}
			}

			if (req.files.imageWrap) {
				if (updatable.imageWrap && updatable.imageWrap !== defaultImage.WRAP) {
					fs.unlinkSync(`./${updatable.imageWrap}`)
				}
				updated.imageWrap = req.files.imageWrap
			} else {
				if (updatable.imageWrap && !req.body.imageWrap) {
					fs.unlinkSync(`./${updatable.imageWrap}`)
					updated.imageWrap = defaultImage.WRAP
				}
			}

			if (req.files.imageSalad) {
				if (updatable.imageSalad && updatable.imageSalad !== defaultImage.SALAD) {
					fs.unlinkSync(`./${updatable.imageSalad}`)
				}
				updated.imageSalad = req.files.imageSalad
			} else {
				if (updatable.imageSalad && !req.body.imageSalad) {
					fs.unlinkSync(`./${updatable.imageSalad}`)
					updated.imageSalad = defaultImage.SALAD
				}
			}

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
			const deletedItem = await Model.findById(req.params.id)

			if (deletedItem.imageSixInch && deletedItem.imageSixInch !== defaultImage.SIX_INCH) {
				fs.unlinkSync(`./${deletedItem.imageSixInch}`)
			}

			if (deletedItem.imageFootLong && deletedItem.imageFootLong !== defaultImage.FOOT_LONG) {
				fs.unlinkSync(`./${deletedItem.imageFootLong}`)
			}

			if (deletedItem.imageWrap && deletedItem.imageWrap !== defaultImage.WRAP) {
				fs.unlinkSync(`./${deletedItem.imageWrap}`)
			}

			if (deletedItem.imageSalad && deletedItem.imageSalad !== defaultImage.SALAD) {
				fs.unlinkSync(`./${deletedItem.imageSalad}`)
			}

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
