const mongoose = require('mongoose')
const defaultImage = require('../defailtImage')

const Schema = mongoose.Schema

const breadSchema = new Schema({
	name: {type: String, required: true},
	alias: {type: String, required: true, unique: true},
	position: {type: Number, required: true, unique: true},
	image: {type: String, default: defaultImage.BREAD},
})

module.exports = mongoose.model('breads', breadSchema)
