const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const keys = require('../config')
const errorText = require('../errorText')
const helpers = require('../helpers')

// module.exports.register = async function (req, res) {
// 	if (req.user.admin) {
// 		if (!req.body.email || !req.body.password) {
// 			helpers.clientErrorHandler(res, 400, errorText.ERROR_3)
// 		}
//
// 		const findUser = await User.findOne({email: req.body.email})
//
// 		if (findUser) {
// 			helpers.clientErrorHandler(res, 400, errorText.ERROR_1)
// 		}
//
// 		const salt = bcrypt.genSaltSync(10)
// 		const password = req.body.password
// 		const user = new User({
// 			email: req.body.email,
// 			password: bcrypt.hashSync(password, salt),
// 			username: req.body.username,
// 			admin: req.body.admin,
// 		})
//
// 		try {
// 			await user.save()
// 			res.status(201).json(user)
// 		} catch (error) {
// 			helpers.errorHandler(res, error)
// 		}
// 	} else {
// 		helpers.clientErrorHandler(res, 400, errorText.ERROR_2)
// 	}
// }

module.exports.login = async function (req, res) {
	if (!req.body.email || !req.body.password) {
		helpers.clientErrorHandler(res, 400, errorText.ERROR_3)
	}

	const findUser = await User.findOne({
		email: req.body.email,
	})

	if (findUser) {
		if (findUser.admin) {
			const passwordResult = bcrypt.compareSync(req.body.password, findUser.password)

			if (passwordResult) {
				const token = jwt.sign(
					{
						userId: findUser._id,
						email: findUser.email,
						admin: findUser.admin,
						restaurateur: findUser.restaurateur,
					},
					keys.JWT_SECRET_KEY
					// {expiresIn: 7200}
				)

				res.status(200).json({
					token: `Bearer ${token}`,
				})
			} else {
				helpers.clientErrorHandler(res, 400, errorText.ERROR_4)
			}
		} else {
			helpers.clientErrorHandler(res, 400, errorText.ERROR_2)
		}
	} else {
		helpers.clientErrorHandler(res, 400, errorText.ERROR_4)
	}
}

module.exports.signin = async function (req, res) {
	if (!req.body.email || !req.body.password) {
		helpers.clientErrorHandler(res, 400, errorText.ERROR_3)
	}

	const findUser = await User.findOne({
		email: req.body.email,
	})

	if (findUser) {
		const passwordResult = bcrypt.compareSync(req.body.password, findUser.password)

		if (passwordResult) {
			const token = jwt.sign(
				{
					userId: findUser._id,
					email: findUser.email,
					admin: findUser.admin,
				},
				keys.JWT_SECRET_KEY
				// {expiresIn: 7200}
			)

			res.status(200).json({
				token: `Bearer ${token}`,
			})
		} else {
			helpers.clientErrorHandler(res, 400, errorText.ERROR_4)
		}
	} else {
		helpers.clientErrorHandler(res, 400, errorText.ERROR_4)
	}
}
