import axios from 'axios'
import {API_URL} from '../../config/config'
import types from '../types/menuItem.types'
import {createSuccess, hideLoaderAction, showErrorAction, showLoaderAction} from './app.actions'

export function fetchMenuItemsAction() {
	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'GET',
				url: `${API_URL}/api/menu-item`,
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

export function fetchMenuItemAction({id}) {
	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'GET',
				url: `${API_URL}/api/menu-item/${id}`,
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

export function createMenuItemAction({editItem}) {
	let data = new FormData()
	data.append('name', editItem.name)
	!editItem._id && data.append('alias', editItem.alias)

	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())

			const response = await axios({
				method: editItem._id ? 'PATCH' : 'POST',
				url: editItem._id ? `${API_URL}/api/menu-item/${editItem._id}` : `${API_URL}/api/menu-item`,
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
					type: editItem._id ? types.EDIT : types.CREATE,
					payload: response.data,
				})
				dispatch(createSuccess())
			}

			dispatch(hideLoaderAction())
		} catch (e) {
			dispatch(showErrorAction(e.response.data.error ? e.response.data.error : e.response.data))
			dispatch(hideLoaderAction())
		}
	}
}

export function deleteMenuItemAction({id}) {
	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'DELETE',
				url: `${API_URL}/api/menu-item/${id}`,
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

export function cleanMenuItemAction() {
	return {
		type: types.CLEAN,
	}
}
