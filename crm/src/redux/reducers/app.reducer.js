import {HIDE_ERROR, HIDE_LOADER, SHOW_SUCCESS, HIDE_SUCCESS, SET_TOKEN, SHOW_ERROR, SHOW_LOADER, CREATE_ERROR} from '../types/app.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	token: null,
	loading: false,
	tabRoute: null,
	error: null,
	success: false,
}

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_LOADER:
			return {...state, loading: true}
		case HIDE_LOADER:
			return {...state, loading: false}
		case SHOW_ERROR:
			return {...state, error: action.payload}
		case HIDE_ERROR:
			return {...state, error: null}
		case SET_TOKEN:
			return {...state, token: action.payload}
		case SHOW_SUCCESS:
			return {...state, success: true}
		case HIDE_SUCCESS:
			return {...state, success: false}

		case LOGOUT:
			return initialState
		default:
			return state
	}
}
