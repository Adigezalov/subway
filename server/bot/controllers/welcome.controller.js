const {Markup} = require('telegraf')
const {findCustomer} = require('../../controllers/bot.controller')

const welcome = ctx => {
	findCustomer(ctx.update.callback_query ? ctx.update.callback_query.from.id : ctx.update.message.from.id).then(
		response => {
			const {customer} = response
			if (customer) {
				ctx.reply('Добро пожаловать в Subway!\nТеперь вы будете получать оповещения о состоянии вашего заказа.')
			} else {
				ctx.reply(
					'Добро пожаловать в Subway!\nУкажите, пожалуйста, Ваш номер телефона, чтобы мы могли идентифицировать Вас.',
					Markup.keyboard([[Markup.button.contactRequest('📞 Отправить номер телефона')], ['❌ Отмена']])
						.resize()
						.oneTime()
				)
			}
		}
	)
}

module.exports = {
	welcome,
}
