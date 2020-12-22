import axios from 'axios'
import {showErrorAction} from './app.actions'
import types from '../types/address.types'
import {API_URL} from '../../config/config'

export function fetchAddressesAction({address}) {
	return async (dispatch, getStat) => {
		try {
			const response = await axios({
				method: 'POST',
				url: `${API_URL}/api/address`,
				headers: {
					Authorization: getStat().app.token,
				},
				data: {address: address},
			})
			if (response.error) {
				dispatch(showErrorAction(response.error))
			} else {
				dispatch({
					type: types.FETCH_ALL,
					payload: response.data.suggestions,
				})
			}
		} catch (e) {
			dispatch(showErrorAction(e.response.data.error ? e.response.data.error : e.response.data))
		}
	}
}

export function cleanAddressesAction() {
	return {
		type: types.CLEAN,
	}
}
