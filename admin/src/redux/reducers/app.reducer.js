import {
	HIDE_ERROR,
	HIDE_LOADER,
	SET_TOKEN,
	SHOW_ERROR,
	SHOW_LOADER,
	CREATE_SUCCESS,
	CREATE_ERROR,
} from '../types/app.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	token: null,
	loading: false,
	tabRoute: null,
	error: null,
	create: false,
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
		case CREATE_SUCCESS:
			return {...state, create: true}
		case CREATE_ERROR:
			return {...state, create: false}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
