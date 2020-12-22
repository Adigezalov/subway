const mongoose = require('mongoose')
const defaultImage = require('../defailtImage')

const Schema = mongoose.Schema

const productSchema = new Schema({
	name: {type: String, required: true},
	alias: {type: String, required: true, unique: true},
	position: {type: Number, required: true, unique: true},
	image: {type: String, default: defaultImage.PRODUCT},
	menuItem: {
		ref: 'menuItems',
		type: Schema.Types.ObjectId,
	},
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

module.exports = mongoose.model('products', productSchema)
