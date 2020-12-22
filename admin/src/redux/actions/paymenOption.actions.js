import axios from 'axios'
import {API_URL} from '../../config/config'
import types from '../types/paymentOption.types'
import {createSuccess, hideLoaderAction, showErrorAction, showLoaderAction} from './app.actions'

export function fetchPaymentOptionsAction() {
	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'GET',
				url: `${API_URL}/api/payment-option`,
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

export function fetchPaymentOptionAction({id}) {
	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'GET',
				url: `${API_URL}/api/payment-option/${id}`,
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

export function createPaymentOptionAction({editItem}) {
	let data = new FormData()
	data.append('name', editItem.name)
	!editItem._id && data.append('alias', editItem.alias)

	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())

			const response = await axios({
				method: editItem._id ? 'PATCH' : 'POST',
				url: editItem._id ? `${API_URL}/api/payment-option/${editItem._id}` : `${API_URL}/api/payment-option`,
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

export function deletePaymentOptionAction({id}) {
	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'DELETE',
				url: `${API_URL}/api/payment-option/${id}`,
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

export function cleanPaymentOptionAction() {
	return {
		type: types.CLEAN,
	}
}
