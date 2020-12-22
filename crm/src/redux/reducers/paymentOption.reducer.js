import types from '../types/paymentOption.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	paymentOptions: [],
	paymentOption: null,
}

export const paymentOptionReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ALL:
			return {...state, paymentOptions: action.payload}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
