const mongoose = require('mongoose')
const defaultImage = require('../defailtImage')

const Schema = mongoose.Schema

const extraSchema = new Schema({
	name: {type: String, required: true},
	alias: {type: String, required: true, unique: true},
	weight: {type: String},
	position: {type: Number, required: true, unique: true},
	image: {type: String, default: defaultImage.EXTRA},
})

module.exports = mongoose.model('extras', extraSchema)
