const mongoose = require('mongoose')
const defaultImage = require('../defailtImage')

const Schema = mongoose.Schema

const sauceSchema = new Schema({
	name: {type: String, required: true},
	alias: {type: String, required: true, unique: true},
	position: {type: Number, required: true, unique: true},
	isSweet: {type: Boolean, default: false},
	image: {type: String, default: defaultImage.SAUCE},
})

module.exports = mongoose.model('sauces', sauceSchema)
