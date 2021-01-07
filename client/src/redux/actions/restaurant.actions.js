import axios from 'axios'
import types from '../types/restaurant.types'
import config from '../../config/config'
import {hideLoaderAction, showErrorAction, showLoaderAction} from './app.actions'
import {cleanMenuAction} from './menu.actions'
import {cleanBasketAction} from './basket.actions'

export function fetchRestaurantsAction() {
	return async dispatch => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'GET',
				url: `${config.API_URL}/api/restaurant/client`,
			})
			if (response.error) {
				dispatch(showErrorAction(response.error))
			} else {
				dispatch({
					type: types.FETCH_RESTAURANTS,
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
	return async dispatch => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'GET',
				url: `${config.API_URL}/api/restaurant/client/${id}`,
			})
			if (response.error) {
				dispatch(showErrorAction(response.error))
				dispatch(setRestaurantAction({restaurant: null}))
				dispatch(cleanRestaurantAction())
				dispatch(cleanMenuAction())
				dispatch(cleanBasketAction())
			} else {
				dispatch({
					type: types.FETCH_RESTAURANT,
					payload: response.data,
				})
			}
			dispatch(hideLoaderAction())
		} catch (e) {
			dispatch(setRestaurantAction({restaurant: null}))
			dispatch(cleanMenuAction())
			dispatch(cleanBasketAction())
			dispatch(showErrorAction(e.response.data.error ? e.response.data.error : e.response.data))
			dispatch(hideLoaderAction())
		}
	}
}

export function setRestaurantAction({restaurant}) {
	if (restaurant) {
		localStorage.setItem('restaurant', JSON.stringify(restaurant._id))
	} else {
		localStorage.removeItem('restaurant')
	}

	return {
		type: types.FETCH_RESTAURANT,
		payload: restaurant,
	}
}

export function cleanRestaurantAction() {
	return {
		type: types.CLEAN_RESTAURANT,
	}
}
