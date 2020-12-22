import types from '../types/sauce.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	sauces: [],
	sauce: null,
}

export const sauceReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ALL:
			return {...state, sauces: action.payload}
		case types.FETCH_BY_ID:
			return {...state, sauce: action.payload}
		case types.CREATE:
			return {...state, sauces: state.sauces.concat([action.payload])}
		case types.EDIT:
			const index = state.sauces.findIndex(item => item._id === action.payload._id)
			state.sauces.splice(index, 1, action.payload)
			return {...state, sauces: state.sauces.slice(), sauce: null}
		case types.DELETE:
			return {...state, sauces: state.sauces.filter(item => item._id !== action.payload)}
		case types.CLEAN:
			return {...state, sauce: null}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
