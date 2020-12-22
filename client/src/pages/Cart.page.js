import React, {useEffect, useState} from 'react'
import ContainerComponent from '../components/Container.component'
import colors from '../config/colors'
import {setUrlAction, setVisibleOrderAction} from '../redux/actions/app.actions'
import {useDispatch, useSelector} from 'react-redux'
import BasketCardComponent from '../components/BasketCard.component'
import {removeProductFromBasketAction} from '../redux/actions/basket.actions'
import {useToasts} from 'react-toast-notifications'
import ModalComponent from '../components/Modal.component'
import {cleanOrderAction, sendOrderAction} from '../redux/actions/order.actions'
import OrderComponent from '../components/Order.component'
import {formatBasket} from '../helpers/formatBasket'

const styles = {
	title: {
		marginTop: 15,
		marginBottom: 5,
		fontFamily: 'FootLong',
		fontSize: 18,
		color: colors.COLOR_SUBWAY_YELLOW,
	},
	menuItemTitle: {
		fontSize: 12,
		color: colors.COLOR_INACTIVE,
		marginBottom: 7,
		marginTop: 15,
	},
	emptyCart: {
		marginTop: 30,
		color: colors.COLOR_INACTIVE,
		textAlign: 'center',
		fontSize: 16,
	},
	buttonAddToCard: {
		position: 'fixed',
		left: 15,
		right: 15,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		border: '1px solid',
		padding: '10px 5px',
		backgroundColor: colors.COLOR_SUBWAY_DARK_GREEN,
		borderRadius: 5,
	},
	buttonAddToCardText: {
		color: colors.COLOR_SUBWAY_WHITE,
	},
}

const CartPage = () => {
	const dispatch = useDispatch()
	const {addToast} = useToasts()
	const basket = useSelector(state => state.basket.basket)
	const price = useSelector(state => state.basket.price)
	const restaurant = useSelector(state => state.restaurant.restaurant)
	const menu = useSelector(state => state.menu.menu)
	const order = useSelector(state => state.order)
	const footerHeight = useSelector(state => state.app.footerHeight)
	const visibleOrder = useSelector(state => state.app.order)
	const [activeVegetables, setActiveVegetables] = useState(0)

	useEffect(() => {
		dispatch(setUrlAction(window.location.pathname))
		let qty = 0
		menu &&
			menu.vegetables &&
			menu.vegetables.map(vegetable => {
				vegetable.active && ++qty
			})
		setActiveVegetables(qty)
	}, [])

	const removeProductFromBasket = (menuItemIndex, productIndex) => {
		dispatch(removeProductFromBasketAction(menuItemIndex, productIndex))
	}

	const openOrder = () => {
		if (basket && basket.length) {
			dispatch(setVisibleOrderAction(true))
		} else {
			addToast('Мы не можем принять у Вас пустой заказ', {
				appearance: 'error',
				autoDismiss: true,
			})
		}
	}

	const cleanOrder = () => {
		dispatch(cleanOrderAction())
		dispatch(setVisibleOrderAction(false))
	}

	const sendOrder = () => {
		const products = formatBasket(basket, activeVegetables)
		dispatch(sendOrderAction({basket: products, order, price, restaurant: restaurant._id}))
	}

	return (
		<div style={{paddingBottom: footerHeight * 2}}>
			<ContainerComponent>
				<p style={styles.title}>Ваш заказ:</p>
				{basket && !basket.length ? <p style={styles.emptyCart}>Ваша корзина пустая</p> : null}
				{basket &&
					basket
						.sort((a, b) => (a.position > b.position ? 1 : -1))
						.map((menuItem, i) => {
							return (
								<div key={i} style={{marginTop: 10}}>
									<p style={styles.menuItemTitle}>{menuItem.name}:</p>
									{menuItem.values.map((value, j) => {
										return (
											<BasketCardComponent
												key={j}
												product={value}
												removeProductFromBasket={() => removeProductFromBasket(i, j)}
											/>
										)
									})}
								</div>
							)
						})}
				<div style={{...styles.buttonAddToCard, bottom: footerHeight + 10}} onClick={openOrder}>
					<p style={styles.buttonAddToCardText}>Оформить заказ</p>
				</div>
			</ContainerComponent>
			{visibleOrder ? (
				<ModalComponent title={'Оформление заказа'} close={() => cleanOrder()}>
					<OrderComponent restaurant={restaurant} order={order} sendOrder={sendOrder} />
				</ModalComponent>
			) : null}
		</div>
	)
}

export default CartPage
