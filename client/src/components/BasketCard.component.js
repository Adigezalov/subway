import React, {useEffect, useState} from 'react'
import colors from '../config/colors'
import diagrams from '../config/diagrams'
import PlusIconComponent from './Plus.icon.component'
import {useSelector} from 'react-redux'

const styles = {
	card: {
		position: 'relative',
		border: '1px solid',
		borderColor: colors.COLOR_INACTIVE,
		padding: '10px 5px 5px',
		borderRadius: 5,
		marginBottom: 5,
	},
	title: {
		fontSize: 12,
		fontFamily: 'FootLong',
		textTransform: 'uppercase',
		color: colors.COLOR_SUBWAY_DARK_GREEN,
		marginBottom: 5,
	},
	description: {
		color: colors.COLOR_INACTIVE,
		fontSize: 10,
	},
	remove: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		right: 0,
		padding: 7,
		borderRadius: '100%',
		transform: 'rotate(45deg)',
	},
}

const BasketCardComponent = ({product, removeProductFromBasket}) => {
	const diagram = product.product.assemblyDiagram.alias
	const menuVegetables = useSelector(state => state.menu.menu.vegetables)
	const [activeVegetables, setActiveVegetables] = useState(0)

	useEffect(() => {
		let qty = 0
		menuVegetables.map(vegetable => {
			vegetable.active && ++qty
		})
		setActiveVegetables(qty)
	}, [])

	let name = product.product.unit ? `${product.product.unit.name}` : `${product.product.product.name}`
	product.modifiers.length &&
		product.modifiers.map((modifier, i) => {
			name = name + ` ${modifier.name}`
		})
	const bread = product.bread && `Хлеб: ${product.bread.name}`
	const cheese = `С сыром: ${product.cheese ? 'Да' : 'Нет'}`
	const cut = `Пополам: ${product.cut ? 'Да' : 'Нет'}`
	const warmUp = `Подогреть: ${product.warmUp ? 'Да' : 'Нет'}`
	const quantity = `Количество ${product.quantity} шт.`
	let extras = `Дополнительно: `
	if (product.extras.length === 0) {
		extras = extras + `Без допов`
	} else {
		product.extras.map((extra, i) => {
			extras = extras + `${i > 0 ? ',' : ''} ${extra.name}`
		})
	}
	let sauces = `Соусы: `
	if (!product.extras.length) {
		sauces = sauces + `Без соусов`
	} else {
		product.sauces.map((sauce, i) => {
			sauces = sauces + `${i > 0 ? ',' : ''} ${sauce.name}`
		})
	}
	let spices = `Специи: `
	if (!product.spices.length) {
		spices = spices + `Без специй`
	} else {
		product.spices.map((spice, i) => {
			spices = spices + `${i > 0 ? ',' : ''} ${spice.name}`
		})
	}
	let vegetables = 'Овощи: '
	if (product.vegetables.length === 0) {
		vegetables = vegetables + `Без овощей`
	}
	if (product.vegetables.length === activeVegetables) {
		vegetables = vegetables + `Все овощи`
	}
	if (product.vegetables.length > 0 && product.vegetables.length < activeVegetables) {
		product.vegetables.map((vegetable, i) => {
			vegetables = vegetables + `${i > 0 ? ',' : ''} ${vegetable.name}`
		})
	}

	return (
		<div style={styles.card}>
			<p style={styles.title}>{name}</p>
			{diagram === diagrams.PIECE_PRODUCT ||
			diagram === diagrams.PIECE_PRODUCT_AND_ONE_SWEET_SAUCE ||
			diagram === diagrams.PIECE_PRODUCT_AND_ONE_SAUCE ? (
				<p style={styles.description}>{quantity}</p>
			) : null}
			{diagram === diagrams.SANDWICH_SIX_INCH ||
			diagram === diagrams.SANDWICH_FOOT_LONG ||
			diagram === diagrams.BREAKFAST ? (
				<p style={styles.description}>{bread}</p>
			) : null}
			{diagram === diagrams.SANDWICH_SIX_INCH ||
			diagram === diagrams.SANDWICH_FOOT_LONG ||
			diagram === diagrams.WRAP ||
			diagram === diagrams.SALAD ? (
				<p style={styles.description}>{cheese}</p>
			) : null}
			{diagram === diagrams.SANDWICH_FOOT_LONG ? <p style={styles.description}>{cut}</p> : null}
			{diagram === diagrams.SANDWICH_SIX_INCH ||
			diagram === diagrams.SANDWICH_FOOT_LONG ||
			diagram === diagrams.WRAP ||
			diagram === diagrams.BREAKFAST ? (
				<p style={styles.description}>{warmUp}</p>
			) : null}
			{diagram === diagrams.SANDWICH_SIX_INCH ||
			diagram === diagrams.SANDWICH_FOOT_LONG ||
			diagram === diagrams.WRAP ||
			diagram === diagrams.SALAD ? (
				<p style={styles.description}>{vegetables}</p>
			) : null}
			{diagram === diagrams.SANDWICH_SIX_INCH ||
			diagram === diagrams.SANDWICH_FOOT_LONG ||
			diagram === diagrams.WRAP ||
			diagram === diagrams.SALAD ? (
				<p style={styles.description}>{extras}</p>
			) : null}
			{diagram === diagrams.SANDWICH_SIX_INCH ||
			diagram === diagrams.SANDWICH_FOOT_LONG ||
			diagram === diagrams.WRAP ||
			diagram === diagrams.SALAD ||
			diagram === diagrams.BREAKFAST ||
			diagram === diagrams.PIECE_PRODUCT_AND_ONE_SWEET_SAUCE ||
			diagram === diagrams.PIECE_PRODUCT_AND_ONE_SAUCE ? (
				<p style={styles.description}>{sauces}</p>
			) : null}
			{diagram === diagrams.SANDWICH_SIX_INCH ||
			diagram === diagrams.SANDWICH_FOOT_LONG ||
			diagram === diagrams.WRAP ||
			diagram === diagrams.SALAD ||
			diagram === diagrams.BREAKFAST ? (
				<p style={styles.description}>{spices}</p>
			) : null}
			<div style={styles.remove} onClick={removeProductFromBasket}>
				<PlusIconComponent color={colors.COLOR_SUBWAY_DARK_GREEN} />
			</div>
		</div>
	)
}

export default BasketCardComponent
