const cancel = ctx => {
	ctx.reply(
		`Извините, мы не сможем оповещать Вас о состоянии заказаов.\nДля повторной идентификации нажмите /start`,
		{
			reply_markup: {
				remove_keyboard: true,
			},
		}
	)
}

module.exports = {
	cancel,
}
