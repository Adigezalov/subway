import types from '../types/menu.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	menu: {},
}

export const menuReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_MENU:
			return {...state, menu: action.payload}
		case types.CREATE:
			return {...state, menu: action.payload}
		case types.EDIT:
			return {...state, menu: action.payload}
		case types.CLEAN:
			return {...state, menu: null}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
