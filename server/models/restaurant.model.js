const mongoose = require('mongoose')

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
	name: {type: String, required: true},
	number: {type: Number, required: true, unique: true},
	address: {type: String, required: true},
	latitude: {type: Number, default: 0},
	longitude: {type: Number, default: 0},
	phone: {type: String, required: true},
	telegramGroupId: {type: String, default: null},
	delivery: {type: Boolean, default: false},
	pickup: {type: Boolean, default: false},
	amountForFreeDelivery: {type: Number, default: 0},
	distanceForFreeDelivery: {type: Number, default: 0},
	timeForStopDelivery: {type: String, default: 0},
	active: {type: Boolean, default: false},
	paid: {type: Boolean, default: true},
	schedule: [
		{
			name: {type: String},
			alias: {type: String},
			from: {type: String},
			to: {type: String},
			isWorkingDay: {type: Boolean},
		},
	],
	payment: [
		{
			ref: 'paymentOptions',
			type: Schema.Types.ObjectId,
		},
	],
	user: {
		ref: 'users',
		type: Schema.Types.ObjectId,
	},
})

module.exports = mongoose.model('restaurants', restaurantSchema)
