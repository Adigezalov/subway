import axios from 'axios'
import {API_URL} from '../../config/config'
import types from '../types/restaurant.types'
import {hideLoaderAction, showErrorAction, showLoaderAction} from './app.actions'

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

export function paidRestaurantAction({paid, id}) {
	return async (dispatch, getStat) => {
		try {
			const response = await axios({
				method: 'POST',
				url: `${API_URL}/api/restaurant/paid/${id}`,
				headers: {
					Authorization: getStat().app.token,
				},
				data: {paid: paid},
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
