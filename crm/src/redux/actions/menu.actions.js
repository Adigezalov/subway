import {hideLoaderAction, showErrorAction, showLoaderAction, showSuccessAction} from './app.actions'
import axios from 'axios'
import {API_URL} from '../../config/config'
import types from '../types/menu.types'

export function fetchMenuAction({restaurant}) {
	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())

			const response = await axios({
				method: 'GET',
				url: `${API_URL}/api/menu/${restaurant}`,
				headers: {
					ContentType: 'multipart/form-data',
					Authorization: getStat().app.token,
				},
			})

			if (response.error) {
				dispatch(showErrorAction(response.error))
			} else {
				dispatch({
					type: types.FETCH_MENU,
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

export function createMenuAction({menu, restaurant, menuId}) {
	return async (dispatch, getStat) => {
		let data = new FormData()
		!menuId && data.append('restaurant', restaurant)
		data.append('menu', JSON.stringify(menu))

		try {
			dispatch(showLoaderAction())

			const response = await axios({
				method: menuId ? 'PATCH' : 'POST',
				url: menuId ? `${API_URL}/api/menu/${menuId}` : `${API_URL}/api/menu`,
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
					type: menuId ? types.EDIT : types.CREATE,
					payload: response.data,
				})
				dispatch(showSuccessAction())
			}

			dispatch(hideLoaderAction())
		} catch (e) {
			console.log({e})
			dispatch(showErrorAction(e.response.data.error ? e.response.data.error : e.response.data))
			dispatch(hideLoaderAction())
		}
	}
}

export function cleanMenuAction() {
	return {
		type: types.CLEAN,
	}
}
