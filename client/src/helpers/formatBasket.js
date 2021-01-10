import diagrams from '../config/diagrams'

function orderCard(product, activeVegetables) {
	const diagram = product.product.assemblyDiagram.alias
	let productToTelegram = ''
	let name = product.product.unit
		? `✔️ *${product.product.unit.name.toUpperCase()}`
		: product.product.product
		? `✔️ *${product.product.product.name.toUpperCase()}`
		: `✔️ *${product.product.promotion.name.toUpperCase()}`
	if (!!product.modifiers.length) {
		product.modifiers.map((modifier, i) => {
			name = name + ` ${modifier.name.toUpperCase()}`
		})
		name = name + '*\n'
	} else {
		name = name + '*\n'
	}

	const bread = product.bread && `*Хлеб:* ${product.bread.name}\n`
	const cheese = `*С сыром:* ${product.cheese ? 'Да' : 'Нет'}\n`
	const cut = `*Пополам:* ${product.cut ? 'Да' : 'Нет'}\n`
	const warmUp = `*Подогреть:* ${product.warmUp ? 'Да' : 'Нет'}\n`
	const quantity = `*Количество:* ${product.quantity} шт.\n`
	let extras = `*Дополнительно:* `
	if (product.extras.length === 0) {
		extras = extras + `Без допов\n`
	} else {
		product.extras.map((extra, i) => {
			extras = extras + `${i > 0 ? ',' : ''} ${extra.name}`
		})
		extras = `${extras}\n`
	}
	let sauces = `*Соусы:* `
	if (!product.sauces.length) {
		sauces = sauces + `Без соусов\n`
	} else {
		product.sauces.map((sauce, i) => {
			sauces = sauces + `${i > 0 ? ',' : ''} ${sauce.name}`
		})
		sauces = `${sauces}\n`
	}
	let spices = `*Специи:* `
	if (!product.spices.length) {
		spices = spices + `Без специй\n`
	} else {
		product.spices.map((spice, i) => {
			spices = spices + `${i > 0 ? ',' : ''} ${spice.name}`
		})
		spices = `${spices}\n`
	}
	let vegetables = '*Овощи:* '
	if (product.vegetables.length === 0) {
		vegetables = vegetables + `Без овощей\n`
	}
	if (product.vegetables.length === activeVegetables) {
		vegetables = vegetables + `Все овощи\n`
	}
	if (product.vegetables.length > 0 && product.vegetables.length < activeVegetables) {
		product.vegetables.map((vegetable, i) => {
			vegetables = vegetables + `${i > 0 ? ',' : ''} ${vegetable.name}`
		})
		vegetables = `${vegetables}\n`
	}

	productToTelegram += name
	if (
		diagram === diagrams.PIECE_PRODUCT ||
		diagram === diagrams.PIECE_PRODUCT_AND_ONE_SWEET_SAUCE ||
		diagram === diagrams.PIECE_PRODUCT_AND_ONE_SAUCE
	) {
		productToTelegram += quantity
	}
	if (
		diagram === diagrams.SANDWICH_SIX_INCH ||
		diagram === diagrams.SANDWICH_FOOT_LONG ||
		diagram === diagrams.BREAKFAST
	) {
		productToTelegram += bread
	}
	if (
		diagram === diagrams.SANDWICH_SIX_INCH ||
		diagram === diagrams.SANDWICH_FOOT_LONG ||
		diagram === diagrams.WRAP ||
		diagram === diagrams.SALAD
	) {
		productToTelegram += cheese
	}
	if (diagram === diagrams.SANDWICH_FOOT_LONG) {
		productToTelegram += cut
	}
	if (
		diagram === diagrams.SANDWICH_SIX_INCH ||
		diagram === diagrams.SANDWICH_FOOT_LONG ||
		diagram === diagrams.WRAP ||
		diagram === diagrams.BREAKFAST
	) {
		productToTelegram += warmUp
	}
	if (
		diagram === diagrams.SANDWICH_SIX_INCH ||
		diagram === diagrams.SANDWICH_FOOT_LONG ||
		diagram === diagrams.WRAP ||
		diagram === diagrams.SALAD
	) {
		productToTelegram += extras
	}
	if (
		diagram === diagrams.SANDWICH_SIX_INCH ||
		diagram === diagrams.SANDWICH_FOOT_LONG ||
		diagram === diagrams.WRAP ||
		diagram === diagrams.SALAD
	) {
		productToTelegram += vegetables
	}
	if (
		diagram === diagrams.SANDWICH_SIX_INCH ||
		diagram === diagrams.SANDWICH_FOOT_LONG ||
		diagram === diagrams.WRAP ||
		diagram === diagrams.SALAD ||
		diagram === diagrams.BREAKFAST ||
		diagram === diagrams.PIECE_PRODUCT_AND_ONE_SWEET_SAUCE ||
		diagram === diagrams.PIECE_PRODUCT_AND_ONE_SAUCE
	) {
		productToTelegram += sauces
	}
	if (
		diagram === diagrams.SANDWICH_SIX_INCH ||
		diagram === diagrams.SANDWICH_FOOT_LONG ||
		diagram === diagrams.WRAP ||
		diagram === diagrams.SALAD ||
		diagram === diagrams.BREAKFAST
	) {
		productToTelegram += spices
	}

	return productToTelegram
}

export function formatBasket(basket, activeVegetables) {
	let orderToSent = ''

	basket
		.sort((a, b) => (a.position > b.position ? 1 : -1))
		.map(menuItem => {
			orderToSent += `➖*${menuItem.name.toUpperCase()}*➖\n\n`
			menuItem.values.map(value => {
				orderToSent += `${orderCard(value, activeVegetables)}\n`
			})
		})

	return orderToSent
}
