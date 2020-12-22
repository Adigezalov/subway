import types from '../types/menuItem.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	menuItems: [],
	menuItem: null,
}

export const menuItemReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ALL:
			return {...state, menuItems: action.payload}
		case types.FETCH_BY_ID:
			return {...state, menuItem: action.payload}
		case types.CREATE:
			return {...state, menuItems: state.menuItems.concat([action.payload])}
		case types.EDIT:
			const index = state.menuItems.findIndex(item => item._id === action.payload._id)
			state.menuItems.splice(index, 1, action.payload)
			return {...state, menuItems: state.menuItems.slice(), menuItem: null}
		case types.DELETE:
			return {...state, menuItems: state.menuItems.filter(item => item._id !== action.payload)}
		case types.CLEAN:
			return {...state, menuItem: null}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
