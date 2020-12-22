import types from '../types/address.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	addresses: [],
	address: null,
}

export const addressReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ALL:
			return {...state, addresses: action.payload}
		case types.FETCH_ONCE:
			return {...state, address: action.payload}
		case types.CLEAN:
			return {...state, address: null, addresses: []}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
