const {Markup} = require('telegraf')
const moment = require('moment')
const {accept} = require('../../controllers/bot.controller')

const acceptController = (ctx, orderId, orderText) => {
	accept(orderId).then(async response => {
		ctx.answerCbQuery()
		const {order, customer} = response
		const TEXT = `${orderText}\n*Принят:* ${moment(order.updatedAt).format('HH:mm:ss')}`
		if (order.id) {
			if (customer.telegramId) {
				await ctx.telegram.sendMessage(customer.telegramId, `Заказ ${order.orderNumber} принят.`)
			}
			ctx.editMessageText(TEXT, {
				parse_mode: 'Markdown',
				...Markup.inlineKeyboard([
					[Markup.button.callback(`Готов`, `complete_${JSON.stringify({o: orderId})}`)],
				]),
			})
		}
	})
}

module.exports = {
	acceptController,
}
