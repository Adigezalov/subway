import axios from 'axios'
import {API_URL} from '../../config/config'
import types from '../types/user.types'
import {createSuccess, hideLoaderAction, showErrorAction, showLoaderAction} from './app.actions'

export function fetchUsersAction() {
	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'GET',
				url: `${API_URL}/api/user`,
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

export function fetchUserAction({id}) {
	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'GET',
				url: `${API_URL}/api/user/${id}`,
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

export function createUserAction({editItem}) {
	let data = new FormData()
	data.append('password', editItem.password)
	data.append('admin', editItem.admin)
	data.append('restaurateur', editItem.restaurateur)
	data.append('legalEntity', editItem.legalEntity)
	data.append('itn', editItem.itn)
	data.append('psrn', editItem.psrn)
	data.append('address', editItem.address)
	!editItem._id && data.append('email', editItem.email)
	editItem._id && data.append('oldPassword', editItem.oldPassword)

	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())

			const response = await axios({
				method: editItem._id ? 'PATCH' : 'POST',
				url: editItem._id ? `${API_URL}/api/user/${editItem._id}` : `${API_URL}/api/user`,
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

export function cleanUserAction() {
	return {
		type: types.CLEAN,
	}
}
