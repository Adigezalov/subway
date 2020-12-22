import axios from 'axios'
import {hideLoaderAction, setTokenAction, showErrorAction, showLoaderAction} from './app.actions'
import {LOGOUT} from '../types/authorization.types'
import {API_URL} from '../../config/config'

export function logInAction({email, password}) {
	return async dispatch => {
		try {
			dispatch(showLoaderAction())
			const response = await axios({
				method: 'POST',
				url: `${API_URL}/api/authorization/login`,
				data: {email, password},
			})
			if (response.error) {
				dispatch(showErrorAction(response.error))
			} else {
				localStorage.setItem('token', response.data.token)
				dispatch(setTokenAction(response.data.token))
			}
			dispatch(hideLoaderAction())
		} catch (e) {
			dispatch(showErrorAction(e.response.data.error))
			dispatch(hideLoaderAction())
		}
	}
}

export function logOutAction() {
	localStorage.clear()
	return {
		type: LOGOUT,
	}
}
