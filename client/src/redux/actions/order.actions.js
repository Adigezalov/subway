import types from '../types/order.types'
import {
	hideLoaderAction,
	setVisibleOrderAction,
	showErrorAction,
	showLoaderAction,
	showSuccessAction,
} from './app.actions'
import axios from 'axios'
import config from '../../config/config'
import colors from '../../config/colors'
import {cleanBasketAction} from './basket.actions'

export function sendOrderAction(order) {
	let data = new FormData()
	data.append('order', JSON.stringify(order))

	return async dispatch => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'POST',
				url: `${config.API_URL}/api/order`,
				data: data,
				headers: {
					ContentType: 'multipart/form-data',
				},
			})
			if (response.error) {
				dispatch(showErrorAction(response.error))
			} else {
				dispatch(cleanOrderAction())
				dispatch(cleanBasketAction())
				dispatch(setVisibleOrderAction(false))
				let text = ''
				if (response.data.service) {
					text = `Ваш заказ №${response.data.orderNumberTime} на сумму ${response.data.price}руб. будет доставлен по адресу ${response.data.address} в течение 35 минут.`
					text = (
						<a href='https://t.me/subway_club_bot' style={{color: colors.COLOR_INACTIVE}}>
							Ваш заказ №{response.data.orderNumberTime} на сумму {response.data.price}руб. будет
							доставлен по адресу {response.data.address} в течение 40 минут. Для отслеживания готовности
							Вашего заказа нажмите на уведомление и подключитесь к нашему Telegram-боту.
						</a>
					)
				} else {
					text = (
						<a href='https://t.me/subway_club_bot' style={{color: colors.COLOR_INACTIVE}}>
							Ваш заказ №{response.data.orderNumberTime} на сумму {response.data.price}руб. будет готов к{' '}
							{response.data.time}. Для отслеживания готовности Вашего заказа нажмите на уведомление и
							подключитесь к нашему Telegram-боту.
						</a>
					)
				}
				dispatch(showSuccessAction(text))
			}
			dispatch(hideLoaderAction())
		} catch (e) {
			dispatch(showErrorAction(e.response.data.error ? e.response.data.error : e.response.data))
			dispatch(hideLoaderAction())
		}
	}
}

export function setServiceAction(service) {
	return {
		type: types.SET_SERVICE,
		payload: service,
	}
}

export function setPaymentAction(payment) {
	return {
		type: types.SET_PAYMENT,
		payload: payment,
	}
}

export function setNameAction(name) {
	return {
		type: types.SET_NAME,
		payload: name,
	}
}

export function setPhoneAction(phone) {
	return {
		type: types.SET_PHONE,
		payload: phone,
	}
}

export function setAddressAction(address) {
	return {
		type: types.SET_ADDRESS,
		payload: address,
	}
}

export function setCommentAction(comment) {
	return {
		type: types.SET_COMMENT,
		payload: comment,
	}
}

export function setIsPromotionAction(isPromotion) {
	return {
		type: types.SET_IS_PROMOTION,
		payload: isPromotion,
	}
}

export function cleanOrderAction() {
	return {
		type: types.CLEAN_ORDER,
	}
}

export function cleanOrderErrorAction() {
	return {
		type: types.CLEAN_ORDER_ERROR,
	}
}
