const {Telegraf} = require('telegraf')
const {TELEGRAM_BOT_TOKEN} = require('../config')
const {welcome} = require('./controllers/welcome.controller')
const {cancel} = require('./controllers/cancel.controller')
const {contact} = require('./controllers/contact.controller')
const {acceptController} = require('./controllers/accept.controller')
const {completeController} = require('./controllers/complete.controller')
const {issuedController} = require('./controllers/issued.controller')

const bot = new Telegraf(TELEGRAM_BOT_TOKEN)

bot.start((ctx, next) => {
	welcome(ctx)
})

bot.hears('❌ Отмена', ctx => {
	cancel(ctx)
})

bot.on('contact', async ctx => {
	contact(ctx)
})

bot.action(/^[accept]+(_[{\[]{1}([,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]]{1})?$/, ctx => {
	const {o} = JSON.parse(ctx.match[1].split('_')[1])
	acceptController(ctx, o, ctx.update.callback_query.message.text)
})

bot.action(/^[complete]+(_[{\[]{1}([,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]]{1})?$/, ctx => {
	const {o} = JSON.parse(ctx.match[1].split('_')[1])
	completeController(ctx, o, ctx.update.callback_query.message.text)
})

bot.action(/^[issued]+(_[{\[]{1}([,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]]{1})?$/, ctx => {
	const {o} = JSON.parse(ctx.match[1].split('_')[1])
	issuedController(ctx, o, ctx.update.callback_query.message.text)
})

module.exports = bot
