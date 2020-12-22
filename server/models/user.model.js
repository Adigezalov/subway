const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	legalEntity: {type: String, required: true},
	itn: {type: String, required: true, unique: true},
	psrn: {type: String, required: true},
	address: {type: String, required: true},
	admin: {type: Boolean, default: false},
	restaurateur: {type: Boolean, default: false},
})

module.exports = mongoose.model('users', userSchema)
