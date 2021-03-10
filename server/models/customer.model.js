const mongoose = require('mongoose')

const Schema = mongoose.Schema

const customerSchema = new Schema({
	telegramId: {type: String, required: false},
	phone: {type: String, required: true},
	name: {type: String},
	lastName: {type: String},
	firstName: {type: String},
	username: {type: String},
})

module.exports = mongoose.model('customers', customerSchema)
