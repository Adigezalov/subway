import types from '../types/vegetable.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	vegetables: [],
	vegetable: null,
}

export const vegetableReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ALL:
			return {...state, vegetables: action.payload}
		case types.FETCH_BY_ID:
			return {...state, vegetable: action.payload}
		case types.CREATE:
			return {...state, vegetables: state.vegetables.concat([action.payload])}
		case types.EDIT:
			const index = state.vegetables.findIndex(item => item._id === action.payload._id)
			state.vegetables.splice(index, 1, action.payload)
			return {...state, vegetables: state.vegetables.slice(), vegetable: null}
		case types.DELETE:
			return {...state, vegetables: state.vegetables.filter(item => item._id !== action.payload)}
		case types.CLEAN:
			return {...state, vegetable: null}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
