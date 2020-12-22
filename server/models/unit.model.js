const mongoose = require('mongoose')
const defaultImage = require('../defailtImage')

const Schema = mongoose.Schema

const unitSchema = new Schema({
	name: {type: String, required: true},
	alias: {type: String, required: true, unique: true},
	position: {type: Number, required: true, unique: true},
	description: {type: String},
	imageSixInch: {type: String, default: defaultImage.SIX_INCH},
	imageFootLong: {type: String, default: defaultImage.FOOT_LONG},
	imageWrap: {type: String, default: defaultImage.WRAP},
	imageSalad: {type: String, default: defaultImage.SALAD},
	isSixInch: {type: Boolean, default: true},
	isFootLong: {type: Boolean, default: true},
	isWrap: {type: Boolean, default: true},
	isSalad: {type: Boolean, default: true},
})

module.exports = mongoose.model('units', unitSchema)
