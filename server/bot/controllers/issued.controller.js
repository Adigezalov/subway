const moment = require('moment')
const {issued} = require('../../controllers/bot.controller')

const issuedController = (ctx, orderId, orderText) => {
	issued(orderId).then(async response => {
		ctx.answerCbQuery()
		const {order, customer} = response
		const TEXT = `${orderText}\n*Выдан:* ${moment(order.updatedAt).format('HH:mm:ss')}`
		if (order.id) {
			if (customer.telegramId) {
				await ctx.telegram.sendMessage(
					customer.telegramId,
					`Заказ ${order.orderNumber} выдан.\nПриятного аппетита!`
				)
			}
			ctx.editMessageText(TEXT, {
				parse_mode: 'Markdown',
			})
		}
	})
}

module.exports = {
	issuedController,
}
