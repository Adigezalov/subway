const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paymentOptionSchema = new Schema({
	name: {type: String, required: true},
	alias: {type: String, required: true, unique: true},
	position: {type: Number, required: true, unique: true},
})

module.exports = mongoose.model('paymentOptions', paymentOptionSchema)
