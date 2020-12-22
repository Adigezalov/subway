const Model = require('../models/menu.model')
const helpers = require('../helpers')
const errorText = require('../errorText')
const fs = require('fs')

module.exports.getByRestaurantForClient = async function (req, res, next) {
	try {
		const item = await Model.findOne({restaurant: req.params.id})
			.populate('breads.bread', '-alias -position -__v -_id')
			.populate('extras.extra', '-alias -position -__v -_id')
			.populate('wraps.assemblyDiagram', '-name -position -__v -_id')
			.populate('menuItems.menuItem', '-position -__v -_id')
			.populate('menuItems.items.product', '-alias -position -__v -_id -menuItem')
			.populate('menuItems.items.assemblyDiagram', '-name -position -__v -_id')
			.populate('sauces.sauce', '-alias -position -__v -_id')
			.populate('spices.spice', '-alias -position -__v -_id')
			.populate('vegetables.vegetable', '-alias -position -__v -_id')
			.populate(
				'footLongs.unit',
				'-alias -imageSalad -imageSixInch -imageWrap -isFootLong -isSalad -isSixInch -isWrap -position -__v -_id'
			)
			.populate('footLongs.assemblyDiagram', '-name -position -__v -_id')
			.populate(
				'salads.unit',
				'-alias -imageFootLong -imageSixInch -imageWrap -isFootLong -isSalad -isSixInch -isWrap -position -__v -_id'
			)
			.populate('salads.assemblyDiagram', '-name -position -__v -_id')
			.populate(
				'sixInches.unit',
				'-alias -imageFootLong -imageSalad -imageWrap -isFootLong -isSalad -isSixInch -isWrap -position -__v -_id'
			)
			.populate('sixInches.assemblyDiagram', '-name -position -__v -_id')
			.populate(
				'wraps.unit',
				'-alias -imageFootLong -imageSalad -imageSixInch -isFootLong -isSalad -isSixInch -isWrap -position -__v' +
					' -_id'
			)
			.select('-user -__v -_id')

		if (item) {
			res.status(200).json(item)
		} else {
			helpers.clientErrorHandler(res, 400, errorText.ERROR_12)
		}
	} catch (error) {
		helpers.errorHandler(res, error)
	}
}

module.exports.getByRestaurant = async function (req, res, next) {
	if (req.user.admin || req.user.restaurateur) {
		try {
			const item = await Model.findOne({restaurant: req.params.id})

			if (item) {
				res.status(200).json(item)
			} else {
				helpers.clientErrorHandler(res, 400, errorText.ERROR_12)
			}
		} catch (error) {
			helpers.errorHandler(res, error)
		}
	} else {
		helpers.clientErrorHandler(res, 400, errorText.ERROR_2)
	}
}

module.exports.create = async function (req, res, next) {
	if (req.user.admin || req.user.restaurateur) {
		const item = new Model({
			...JSON.parse(req.body.menu),
			user: req.user._id,
			restaurant: req.body.restaurant,
		})

		try {
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
	if (req.user.admin || req.user.restaurateur) {
		try {
			const updatable = await Model.findById(req.params.id)

			if (`${updatable.user}` === `${req.user._id}`) {
				const updated = {...JSON.parse(req.body.menu), user: updatable.user, restaurant: updatable.restaurant}

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
