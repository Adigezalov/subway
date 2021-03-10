const {Markup} = require('telegraf')
const moment = require('moment')
const {completed} = require('../../controllers/bot.controller')

const completeController = (ctx, orderId, orderText) => {
	completed(orderId).then(async response => {
		ctx.answerCbQuery()
		const {order, customer} = response
		const TEXT = `${orderText}\n*Готов:* ${moment(order.updatedAt).format('HH:mm:ss')}`
		if (order.id) {
			if (customer.telegramId) {
				await ctx.telegram.sendMessage(customer.telegramId, `Заказ ${order.orderNumber} готов к выдаче.`)
			}
			ctx.editMessageText(TEXT, {
				parse_mode: 'Markdown',
				...Markup.inlineKeyboard([[Markup.button.callback(`Выдан`, `issued_${JSON.stringify({o: orderId})}`)]]),
			})
		}
	})
}

module.exports = {
	completeController,
}
