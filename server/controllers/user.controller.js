const Model = require('../models/user.model')
const helpers = require('../helpers')
const errorText = require('../errorText')
const bcrypt = require('bcryptjs')

module.exports.getAll = async function (req, res, next) {
	try {
		const items = await Model.find()
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

module.exports.create = async function (req, res) {
	if (req.user.admin) {
		if (
			!req.body.email ||
			!req.body.password ||
			!req.body.legalEntity ||
			!req.body.itn ||
			!req.body.psrn ||
			!req.body.address
		) {
			helpers.clientErrorHandler(res, 400, errorText.ERROR_3)
		}

		const findUserEmail = await Model.findOne({email: req.body.email})
		const findUserInt = await Model.findOne({int: req.body.itn})
		const findUserPsrn = await Model.findOne({int: req.body.psrn})

		if (findUserEmail || findUserInt || findUserPsrn) {
			helpers.clientErrorHandler(res, 400, errorText.ERROR_1)
		}

		const salt = bcrypt.genSaltSync(10)
		const password = req.body.password
		const user = new Model({
			email: req.body.email,
			password: bcrypt.hashSync(password, salt),
			admin: req.body.admin,
			restaurateur: req.body.restaurateur,
			legalEntity: req.body.legalEntity,
			itn: req.body.itn,
			psrn: req.body.psrn,
			address: req.body.address,
		})

		try {
			await user.save()
			res.status(201).json(user)
		} catch (error) {
			helpers.errorHandler(res, error)
		}
	} else {
		helpers.clientErrorHandler(res, 400, errorText.ERROR_2)
	}
}

module.exports.update = async function (req, res) {
	if (req.user.admin) {
		if (
			!req.body.email ||
			!req.body.password ||
			!req.body.legalEntity ||
			!req.body.itn ||
			!req.body.psrn ||
			!req.body.address
		) {
			helpers.clientErrorHandler(res, 400, errorText.ERROR_3)
		}

		const findUserEmail = await Model.findOne({email: req.body.email})
		const findUserInt = await Model.findOne({int: req.body.itn})
		const findUserPsrn = await Model.findOne({int: req.body.psrn})

		if (findUserEmail || findUserInt || findUserPsrn) {
			helpers.clientErrorHandler(res, 400, errorText.ERROR_1)
		}

		if (req.body.password && !req.body.oldPassword) {
			helpers.clientErrorHandler(res, 400, errorText.ERROR_9)
		}

		if (!req.body.password && req.body.oldPassword) {
			helpers.clientErrorHandler(res, 400, errorText.ERROR_10)
		}

		if (!req.body.password && !req.body.oldPassword) {
			try {
				const findUser = await Model.findOne({_id: req.params.id})

				const updated = {...req.body, email: findUser.email, password: findUser.password}

				const item = await Model.findOneAndUpdate({_id: req.params.id}, {$set: updated}, {new: true})
				res.status(201).json(item)
			} catch (error) {
				helpers.errorHandler(res, error)
			}
		}

		if (req.body.password && req.body.oldPassword) {
			try {
				const findUser = await Model.findOne({_id: req.params.id})

				if (findUser) {
					const passwordResult = bcrypt.compareSync(req.body.oldPassword, findUser.password)

					if (passwordResult) {
						const salt = bcrypt.genSaltSync(10)
						const updated = {
							...req.body,
							email: findUser.email,
							password: bcrypt.hashSync(req.body.password, salt),
						}

						const item = await Model.findOneAndUpdate({_id: req.params.id}, {$set: updated}, {new: true})
						res.status(201).json(item)
					} else {
						helpers.clientErrorHandler(res, 400, errorText.ERROR_11)
					}
				} else {
					helpers.clientErrorHandler(res, 400, errorText.ERROR_6)
				}
			} catch (error) {
				helpers.errorHandler(res, error)
			}
		}
	} else {
		helpers.clientErrorHandler(res, 400, errorText.ERROR_2)
	}
}
