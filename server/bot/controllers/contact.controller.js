const {Markup} = require('telegraf')
const {setContact} = require('../../controllers/bot.controller')

const contact = ctx => {
	setContact(
		ctx.update.callback_query ? ctx.update.callback_query.from.id : ctx.update.message.from.id,
		ctx.update.message.contact
	).then(response => {
		const {customer} = response
		if (customer) {
			ctx.reply(
				`Добро пожаловать в Subway!\nУказывайте свой номер телефона при оформлении заказа и мы будем информировать Вас о ходе его выполнения.`,
				{
					reply_markup: {
						remove_keyboard: true,
					},
				}
			)
		} else {
			ctx.reply(`Какая-то проблема. Попробуйте, пожалуйста, еще раз.`)
		}
	})
}

module.exports = {
	contact,
}
