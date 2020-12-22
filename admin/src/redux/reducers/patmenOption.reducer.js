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
		case types.FETCH_BY_ID:
			return {...state, paymentOption: action.payload}
		case types.CREATE:
			return {...state, paymentOptions: state.paymentOptions.concat([action.payload])}
		case types.EDIT:
			const index = state.paymentOptions.findIndex(item => item._id === action.payload._id)
			state.paymentOptions.splice(index, 1, action.payload)
			return {...state, paymentOptions: state.paymentOptions.slice(), paymentOption: null}
		case types.DELETE:
			return {...state, paymentOptions: state.paymentOptions.filter(item => item._id !== action.payload)}
		case types.CLEAN:
			return {...state, paymentOption: null}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
