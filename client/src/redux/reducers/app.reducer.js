import types from '../types/app.types'

const initialState = {
	token: null,
	loading: false,
	tabRoute: null,
	error: null,
	success: null,
	url: null,
	headerHeight: 0,
	footerHeight: 0,
	order: false,
}

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SHOW_LOADER:
			return {...state, loading: true}
		case types.HIDE_LOADER:
			return {...state, loading: false}
		case types.SHOW_ERROR:
			return {...state, error: action.payload}
		case types.HIDE_ERROR:
			return {...state, error: null}
		case types.SHOW_SUCCESS:
			return {...state, success: action.payload}
		case types.HIDE_SUCCESS:
			return {...state, success: null}
		case types.SET_URL:
			return {...state, url: action.payload}
		case types.SET_HEADER_HEIGHT:
			return {...state, headerHeight: action.payload}
		case types.SET_FOOTER_HEIGHT:
			return {...state, footerHeight: action.payload}
		case types.ORDER:
			return {...state, order: action.payload}
		default:
			return state
	}
}
