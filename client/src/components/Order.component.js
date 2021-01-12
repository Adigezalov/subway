import React, {useEffect} from 'react'
import colors from '../config/colors'
import SandwichIconComponent from './Sandwich.icon.component'
import {timeToTimestamp} from '../helpers/timeToTimestamp'
import DeliveryIconComponent from './Delivery.icon.component'
import ContainerComponent from './Container.component'
import {
	setAddressAction,
	setCommentAction,
	setNameAction,
	setPaymentAction,
	setPhoneAction,
	setServiceAction,
} from '../redux/actions/order.actions'
import {useDispatch} from 'react-redux'
import InputMask from 'react-input-mask'
import {Link} from 'react-router-dom'

const styles = {
	orderService: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		marginBottom: 10,
	},
	serviceItem: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		border: '1px solid',
		borderColor: colors.COLOR_SUBWAY_LIGHT_GREEN,
		borderRadius: 10,
		paddingBottom: 10,
	},
	serviceItemTitle: {
		marginTop: 5,
		textTransform: 'uppercase',
		fontFamily: 'FootLong',
		color: colors.COLOR_SUBWAY_GREEN,
	},
	deliveryHint: {
		fontSize: 10,
		color: colors.COLOR_SUBWAY_DARK_GREEN,
		marginBottom: 5,
	},
	sectionSelectorItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '10px 0',
		marginRight: 15,
	},
	sectionSelectorIcon: {
		width: 17,
		height: 17,
		borderRadius: '100%',
		border: '1px solid',
		borderColor: colors.COLOR_INACTIVE,
		marginRight: 10,
	},
	deliveryPayTitle: {
		fontSize: 14,
	},
	deliveryPaySelector: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		width: '100%',
	},
	orderInput: {
		width: '100%',
		fontFamily: 'SixInch',
		color: colors.COLOR_SUBWAY_DARK_GREEN,
		fontSize: 16,
		marginBottom: 5,
		padding: '10px 15px',
		borderRadius: 5,
		outline: 'none',
		border: '1px solid',
		borderColor: colors.COLOR_SUBWAY_GREEN,
		resize: 'none',
	},
	checkOferta: {
		fontSize: 10,
		color: colors.COLOR_INACTIVE,
		marginBottom: 10,
	},
	checkOfertaLink: {
		color: colors.COLOR_SUBWAY_LIGHT_GREEN,
	},
	buttonSendOrder: {
		position: 'fixed',
		bottom: 10,
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
	buttonSendOrderText: {
		color: colors.COLOR_SUBWAY_WHITE,
	},
}

const OrderComponent = ({restaurant, order, sendOrder}) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setServiceAction(!restaurant.pickup))
	}, [])

	const setService = service => {
		dispatch(setServiceAction(service))
	}

	const setPayment = payment => {
		dispatch(setPaymentAction(payment))
	}

	const setName = name => {
		dispatch(setNameAction(name))
	}

	const setPhone = phone => {
		dispatch(setPhoneAction(phone))
	}

	const setAddress = address => {
		dispatch(setAddressAction(address))
	}

	const setComment = comment => {
		dispatch(setCommentAction(comment))
	}

	const renderPayment = () => {
		let payments = restaurant.payment || []
		return payments.map((payment, i) => {
			return (
				<div
					key={i}
					style={styles.sectionSelectorItem}
					onClick={() => setPayment({alias: payment.alias, name: payment.name})}
				>
					<div
						style={Object.assign({}, styles.sectionSelectorIcon, {
							backgroundColor:
								order && order.payment && order.payment.alias === payment.alias
									? colors.COLOR_SUBWAY_YELLOW
									: 'transparent',
						})}
					/>
					<p style={styles.deliveryPayTitle}>{payment.name}</p>
				</div>
			)
		})
	}

	return (
		<div style={{paddingBottom: 50}}>
			<div style={styles.orderService}>
				{restaurant && restaurant.pickup ? (
					<div
						style={Object.assign({}, styles.serviceItem, {
							width:
								restaurant.pickup &&
								restaurant.delivery &&
								timeToTimestamp(restaurant.timeForStopDelivery) &&
								!order.isPromotion
									? '45%'
									: '90%',
							backgroundColor: order && !order.service ? colors.COLOR_SUBWAY_LIGHT_GREEN : 'transparent',
						})}
						onClick={() => setService(false)}
					>
						<SandwichIconComponent
							color={
								order && !order.service ? colors.COLOR_SUBWAY_WHITE : colors.COLOR_SUBWAY_LIGHT_GREEN
							}
						/>
						<p
							style={Object.assign({}, styles.serviceItemTitle, {
								color: order && !order.service ? colors.COLOR_SUBWAY_WHITE : colors.COLOR_SUBWAY_GREEN,
							})}
						>
							Навынос
						</p>
					</div>
				) : null}
				{restaurant &&
				restaurant.delivery &&
				timeToTimestamp(restaurant.timeForStopDelivery) &&
				!order.isPromotion ? (
					<div
						style={Object.assign({}, styles.serviceItem, {
							width:
								restaurant.pickup &&
								restaurant.delivery &&
								timeToTimestamp(restaurant.timeForStopDelivery) &&
								!order.isPromotion
									? '45%'
									: '90%',
							backgroundColor: order && order.service ? colors.COLOR_SUBWAY_LIGHT_GREEN : 'transparent',
						})}
						onClick={() => setService(true)}
					>
						<DeliveryIconComponent
							color={order && order.service ? colors.COLOR_SUBWAY_WHITE : colors.COLOR_SUBWAY_LIGHT_GREEN}
						/>
						<p
							style={Object.assign({}, styles.serviceItemTitle, {
								color: order && order.service ? colors.COLOR_SUBWAY_WHITE : colors.COLOR_SUBWAY_GREEN,
							})}
						>
							Доставка
						</p>
					</div>
				) : null}
			</div>
			<ContainerComponent>
				{order.service ? (
					<>
						<p style={styles.deliveryHint}>
							Данный ресторан осуществляет бесплатную доставку в радиусе{' '}
							{restaurant.distanceForFreeDelivery} метров от ресторана при заказе на сумму от{' '}
							{restaurant.amountForFreeDelivery} рублей.
						</p>
						<p style={styles.deliveryHint}>
							Условия доставки на отдаленные адреса с Вами согласует оператор.
						</p>
						<p style={{color: colors.COLOR_SUBWAY_YELLOW, fontSize: 14, marginTop: 10}}>
							Выберите способ оплаты
						</p>
						<div style={styles.deliveryPaySelector}>{renderPayment()}</div>
					</>
				) : null}
				{restaurant &&
				restaurant.delivery &&
				timeToTimestamp(restaurant.timeForStopDelivery) &&
				order.isPromotion ? (
					<p style={{fontSize: 14, color: colors.COLOR_SUBWAY_DARK_GREEN, marginBottom: 5}}>
						Доставка невозможна. Пожалуйста, убедитесь, что в Вашем заказе нет товаров из следующих
						разделов: Акции, Разливные напитки, Горячие напитки.
					</p>
				) : null}
				<p style={{color: colors.COLOR_SUBWAY_YELLOW, fontSize: 14, marginTop: 5, marginBottom: 10}}>
					Заполните свои данные
				</p>
				<input
					style={styles.orderInput}
					type='text'
					placeholder='Как вас зовут?'
					onChange={event => setName(event.target.value)}
				/>
				<InputMask
					mask='+7 (999) 999 99 99'
					type='tel'
					style={styles.orderInput}
					placeholder='Ваш номер телефона'
					onChange={event => setPhone(event.target.value)}
				/>
				{order.service ? (
					<textarea
						style={styles.orderInput}
						placeholder='Адрес доставки'
						rows='3'
						onChange={event => setAddress(event.target.value)}
					/>
				) : null}
				<textarea
					style={styles.orderInput}
					placeholder='Комментарий к заказу'
					rows='3'
					onChange={event => setComment(event.target.value)}
				/>
				<p style={styles.checkOferta}>
					Нажимая кнопку "Отправить" вы подтверждаете, что ознакомились с{' '}
					<Link to='/oferta'>
						<span style={styles.checkOfertaLink}>Договором оферты</span>
					</Link>{' '}
					и согласы с{' '}
					<Link to='/policy'>
						<span style={styles.checkOfertaLink}>Политикой обработки персональных данных</span>
					</Link>{' '}
				</p>
			</ContainerComponent>
			<div style={styles.buttonSendOrder} onClick={sendOrder}>
				<p style={styles.buttonSendOrderText}>Отправить</p>
			</div>
		</div>
	)
}

export default OrderComponent
