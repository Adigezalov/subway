const mongoose = require('mongoose')
const defaultImage = require('../defailtImage')

const Schema = mongoose.Schema

const promotionSchema = new Schema({
	name: {type: String, required: true},
	alias: {type: String, required: true, unique: true},
	position: {type: Number, required: true, unique: true},
	image: {type: String, default: defaultImage.PROMOTION},
	modifiers: [
		{
			name: {type: String},
			values: [
				{
					name: {type: String},
				},
			],
		},
	],
})

module.exports = mongoose.model('promotions', promotionSchema)
