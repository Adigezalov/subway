import types from '../types/spice.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	spices: [],
	spice: null,
}

export const spiceReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ALL:
			return {...state, spices: action.payload}
		case types.FETCH_BY_ID:
			return {...state, spice: action.payload}
		case types.CREATE:
			return {...state, spices: state.spices.concat([action.payload])}
		case types.EDIT:
			const index = state.spices.findIndex(item => item._id === action.payload._id)
			state.spices.splice(index, 1, action.payload)
			return {...state, spices: state.spices.slice(), spice: null}
		case types.DELETE:
			return {...state, spices: state.spices.filter(item => item._id !== action.payload)}
		case types.CLEAN:
			return {...state, spice: null}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
