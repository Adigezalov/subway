import axios from 'axios'
import {hideLoaderAction, showErrorAction, showLoaderAction, showSuccessAction} from './app.actions'
import types from '../types/restaurant.types'
import {API_URL} from '../../config/config'

export function fetchRestaurantsAction() {
	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'GET',
				url: `${API_URL}/api/restaurant`,
				headers: {
					Authorization: getStat().app.token,
				},
			})
			if (response.error) {
				dispatch(showErrorAction(response.error))
			} else {
				dispatch({
					type: types.FETCH_ALL,
					payload: response.data,
				})
			}
			dispatch(hideLoaderAction())
		} catch (e) {
			dispatch(showErrorAction(e.response.data.error ? e.response.data.error : e.response.data))
			dispatch(hideLoaderAction())
		}
	}
}

export function fetchRestaurantAction({id}) {
	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'GET',
				url: `${API_URL}/api/restaurant/${id}`,
				headers: {
					Authorization: getStat().app.token,
				},
			})
			if (response.error) {
				dispatch(showErrorAction(response.error))
			} else {
				dispatch({
					type: types.FETCH_BY_ID,
					payload: response.data,
				})
			}
			dispatch(hideLoaderAction())
		} catch (e) {
			dispatch(showErrorAction(e.response.data.error ? e.response.data.error : e.response.data))
			dispatch(hideLoaderAction())
		}
	}
}

export function createRestaurantAction({editRestaurant}) {
	return async (dispatch, getStat) => {
		let data = new FormData()
		data.append('name', editRestaurant.name)
		data.append('phone', editRestaurant.phone)
		data.append('address', editRestaurant.address)
		data.append('latitude', editRestaurant.latitude)
		data.append('longitude', editRestaurant.longitude)
		data.append('delivery', editRestaurant.delivery)
		data.append('pickup', editRestaurant.pickup)
		data.append('amountForFreeDelivery', editRestaurant.amountForFreeDelivery)
		data.append('distanceForFreeDelivery', editRestaurant.distanceForFreeDelivery)
		data.append('timeForStopDelivery', editRestaurant.timeForStopDelivery)
		data.append('schedule', JSON.stringify(editRestaurant.schedule))
		data.append('payment', JSON.stringify(editRestaurant.payment))
		!editRestaurant._id && data.append('number', editRestaurant.number)

		try {
			dispatch(showLoaderAction())

			const response = await axios({
				method: editRestaurant._id ? 'PATCH' : 'POST',
				url: editRestaurant._id ? `${API_URL}/api/restaurant/${editRestaurant._id}` : `${API_URL}/api/restaurant`,
				data: data,
				headers: {
					ContentType: 'multipart/form-data',
					Authorization: getStat().app.token,
				},
			})

			if (response.error) {
				dispatch(showErrorAction(response.error))
			} else {
				dispatch({
					type: editRestaurant._id ? types.EDIT : types.CREATE,
					payload: response.data,
				})
				dispatch(showSuccessAction())
			}

			dispatch(hideLoaderAction())
		} catch (e) {
			dispatch(showErrorAction(e.response.data.error ? e.response.data.error : e.response.data))
			dispatch(hideLoaderAction())
		}
	}
}

export function activateRestaurantAction({active, id}) {
	return async (dispatch, getStat) => {
		try {
			const response = await axios({
				method: 'POST',
				url: `${API_URL}/api/restaurant/activate/${id}`,
				headers: {
					Authorization: getStat().app.token,
				},
				data: {active: active},
			})
			if (response.error) {
				dispatch(showErrorAction(response.error))
			} else {
				dispatch({
					type: types.ACTIVATE,
					payload: response.data,
				})
			}
		} catch (e) {
			dispatch(showErrorAction(e.response.data.error ? e.response.data.error : e.response.data))
		}
	}
}

export function deleteRestaurantAction({id}) {
	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'DELETE',
				url: `${API_URL}/api/restaurant/${id}`,
				headers: {
					Authorization: getStat().app.token,
				},
			})
			if (response.error) {
				dispatch(showErrorAction(response.error))
			} else {
				dispatch({
					type: types.DELETE,
					payload: response.data,
				})
			}
			dispatch(hideLoaderAction())
		} catch (e) {
			dispatch(showErrorAction(e.response.data.error ? e.response.data.error : e.response.data))
			dispatch(hideLoaderAction())
		}
	}
}

export function cleanRestaurantAction() {
	return {
		type: types.CLEAN,
	}
}
