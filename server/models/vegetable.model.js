const mongoose = require('mongoose')
const defaultImage = require('../defailtImage')

const Schema = mongoose.Schema

const vegetableSchema = new Schema({
	name: {type: String, required: true},
	alias: {type: String, required: true, unique: true},
	position: {type: Number, required: true, unique: true},
	image: {type: String, default: defaultImage.VEGETABLE},
})

module.exports = mongoose.model('vegetables', vegetableSchema)
