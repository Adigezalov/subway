const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
	orderNumber: {type: String, required: false},
	customer: {
		ref: 'customers',
		type: Schema.Types.ObjectId,
	},
	status: {
		type: String,
		enum : ['new','accepted', 'completed', 'issued'],
		default: 'new'
	},
	paid: {type: Boolean, defaultValue: false},
	order: {type: String},
},
	{timestamps: true}
	)

module.exports = mongoose.model('orders', orderSchema)
