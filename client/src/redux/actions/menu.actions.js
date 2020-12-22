import types from '../types/menu.types'
import config from '../../config/config'
import {hideLoaderAction, showErrorAction, showLoaderAction} from './app.actions'
import axios from 'axios'

export function fetchMenuAction({id}) {
	return async dispatch => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'GET',
				url: `${config.API_URL}/api/menu/client/${id}`,
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

export function cleanMenuAction() {
	return {type: types.CLEAN_MENU}
}
