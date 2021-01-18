const Telegraf = require('telegraf')
const Restaurant = require('../models/restaurant.model')
const helpers = require('../helpers')
const moment = require('moment')
const keys = require('../config')

module.exports.order = async (req, res) => {
	const order = JSON.parse(req.body.order)
	const dayAlias = moment().format('dddd').toLowerCase()

	if (!order.basket.length) {
		helpers.clientErrorHandler(res, 400, 'Мы не можем принять у Вас пустой заказ')
	}

	const bot = new Telegraf(keys.TELEGRAM_BOT_TOKEN, {
		// telegram: {
		//   agent: new HttpsProxyAgent(
		//     `http://${keys.PROXY_USER}:${keys.PROXY_PASSWORD}@${keys.PROXY_URL}:${keys.PROXY_PORT}`
		//   ),
		// },
	})

	let noError = true

	try {
		const restaurant = await Restaurant.findById(order.restaurant)

		const day = restaurant.schedule.filter(day => day.alias === dayAlias)
		const open = +`${day[0].from.split(':')[0]}.${day[0].from.split(':')[1]}`
		const close = +`${day[0].to.split(':')[0]}.${day[0].to.split(':')[1]}`
		const timeForStopDelivery = +`${restaurant.timeForStopDelivery.split(':')[0]}.${
			restaurant.timeForStopDelivery.split(':')[1]
		}`
		const now = +`${moment().format('HH.mm')}`

		if (now < open || now >= close || !day[0].isWorkingDay) {
			noError = false
			helpers.clientErrorHandler(res, 400, `Ресторан закрыт.`)
		}
		if (order.order.service) {
			if (now >= timeForStopDelivery) {
				noError = false
				helpers.clientErrorHandler(res, 400, `Доставка не принимается.`)
			}
			if (order.price < restaurant.amountForFreeDelivery) {
				noError = false
				helpers.clientErrorHandler(res, 400, `Доставка от ${restaurant.amountForFreeDelivery} рублей`)
			}
			if (!order.order.name || !order.order.phone || !order.order.payment || !order.order.address) {
				noError = false
				helpers.clientErrorHandler(
					res,
					400,
					'Поля имя, телефон, оплата и адрес доставки должны быть заполнены.'
				)
			}
		}
		if (!order.order.service) {
			if (!order.order.name || !order.order.phone) {
				noError = false
				helpers.clientErrorHandler(res, 400, 'Поля имя и телефон, должны быть заполнены.')
			}
		}
		if (order.order.phone.replace(/[^\d]/g, '').length < 11) {
			noError = false
			helpers.clientErrorHandler(res, 400, 'Введите корректный номер телефона.')
		}

		if (noError) {
			const orderNumberTime = `${new Date().getHours()}${new Date().getMinutes()}-${new Date().getMilliseconds()}`
			const orderNumber = order.order.service
				? `*Заказ-доставка №${orderNumberTime}*\n`
				: `*Заказ-навынос №${orderNumberTime}*\n`
			const client = `*Имя:* ${order.order.name}\n`
			const phone = `*Телефон:* ${order.order.phone}\n\n`
			const address = `🏡 *Адрес:* ${order.order.address}\n\n`
			const payment = `💳 *Оплата:* ${order.order.payment && order.order.payment.name}\n\n`
			const comment = `💬 *Комментарий:* ${order.order.comment}\n\n`
			const price = `💲 *Сумма заказа:* ${order.price} руб.`

			let orderToTelegram = ''
			orderToTelegram += orderNumber
			orderToTelegram += client
			orderToTelegram += phone
			orderToTelegram += order.basket
			if (order.order.comment) {
				orderToTelegram += comment
			}
			if (order.order.service) {
				orderToTelegram += address
				orderToTelegram += payment
			}
			orderToTelegram += price

			let sendOrder = await bot.telegram.sendMessage(`-${restaurant.telegramGroupId}`, orderToTelegram, {
				parse_mode: 'Markdown',
				// reply_markup: {
				// 	inline_keyboard: [
				// 		[
				// 			{
				// 				text: 'Принял',
				// 				callback_data: '1',
				// 			},
				// 		],
				// 	],
				// },
			})

			if (!!sendOrder.message_id) {
				res.status(200).json({
					orderNumberTime,
					price: order.price,
					service: order.order.service,
					address: order.order.address,
					time: moment().add(10, 'minutes').format('HH:mm'),
				})
			} else {
				helpers.clientErrorHandler(res, 400, 'Что-то пошло не так!')
			}
		}
	} catch (error) {
		console.log({error})
		helpers.errorHandler(res, error)
	}
}
