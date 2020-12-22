import types from '../types/menu.types'

const initialState = {
	menu: null,
}

export const menuReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_MENU:
			return {...state, menu: action.payload}
		case types.CLEAN_MENU:
			return initialState
		default:
			return state
	}
}
