const Customer = require('../models/customer.model')
const Order = require('../models/order.model')

class botController {
	async findCustomer(telegramId) {
		try {
			const customer = await Customer.findOne({telegramId})
			return {customer: !!customer}
		} catch (e) {
			console.log({e})
		}
	}

	async setContact(telegramId, contact) {
		try {
			const {phone_number, first_name, last_name, user_id} = contact

			const customer = await Customer.findOne({phone: phone_number})

			if (!customer) {
				await Customer.create({
					phone: phone_number,
					telegramId: user_id,
					lastName: last_name,
					firstName: first_name,
				})
			} else {
				await Customer.findOneAndUpdate(
					{phone: phone_number},
					{$set: {telegramId: user_id, lastName: last_name, firstName: first_name}}
				)
			}

			return {customer: true}
		} catch (e) {
			console.log({e})
		}
	}

	async accept(orderId) {
		try {
			const order = await Order.findOneAndUpdate({_id: orderId}, {$set: {status: 'accepted'}}, {new: true})
			const customer = await Customer.findOne({_id: order.customer})

			return {order, customer}
		} catch (e) {
			console.log({e})
		}
	}

	async completed(orderId) {
		try {
			const order = await Order.findOneAndUpdate({_id: orderId}, {$set: {status: 'completed'}}, {new: true})
			const customer = await Customer.findOne({_id: order.customer})

			return {order, customer}
		} catch (e) {
			console.log({e})
		}
	}

	async issued(orderId) {
		try {
			const order = await Order.findOneAndUpdate({_id: orderId}, {$set: {status: 'issued'}}, {new: true})
			const customer = await Customer.findOne({_id: order.customer})

			return {order, customer}
		} catch (e) {
			console.log({e})
		}
	}
}

module.exports = new botController()
