import axios from 'axios'
import {API_URL} from '../../config/config'
import types from '../types/unit.types'
import {createSuccess, hideLoaderAction, showErrorAction, showLoaderAction} from './app.actions'

export function fetchUnitsAction() {
	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'GET',
				url: `${API_URL}/api/unit`,
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

export function fetchUnitAction({id}) {
	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'GET',
				url: `${API_URL}/api/unit/${id}`,
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

export function createUnitAction({editItem}) {
	let data = new FormData()
	data.append('name', editItem.name)
	data.append('description', editItem.description)
	data.append('imageSixInch', editItem.imageSixInch)
	data.append('imageFootLong', editItem.imageFootLong)
	data.append('imageWrap', editItem.imageWrap)
	data.append('imageSalad', editItem.imageSalad)
	data.append('isSixInch', editItem.isSixInch)
	data.append('isFootLong', editItem.isFootLong)
	data.append('isWrap', editItem.isWrap)
	data.append('isSalad', editItem.isSalad)
	!editItem._id && data.append('alias', editItem.alias)

	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())

			const response = await axios({
				method: editItem._id ? 'PATCH' : 'POST',
				url: editItem._id ? `${API_URL}/api/unit/${editItem._id}` : `${API_URL}/api/unit`,
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

export function deleteUnitAction({id}) {
	return async (dispatch, getStat) => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'DELETE',
				url: `${API_URL}/api/unit/${id}`,
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

export function cleanUnitAction() {
	return {
		type: types.CLEAN,
	}
}
