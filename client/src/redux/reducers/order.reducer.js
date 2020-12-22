import types from '../types/order.types'

const initialState = {
	service: false,
	name: null,
	comment: null,
	payment: null,
	phone: null,
	address: null,
	userTime: null,
}

export const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_SERVICE:
			return {...state, service: action.payload, address: null, payment: null}
		case types.SET_PAYMENT:
			return {...state, payment: action.payload}
		case types.SET_NAME:
			return {...state, name: action.payload}
		case types.SET_COMMENT:
			return {...state, comment: action.payload}
		case types.SET_PHONE:
			return {...state, phone: action.payload}
		case types.SET_ADDRESS:
			return {...state, address: action.payload}
		case types.SET_USER_TIME:
			return {...state, userTime: action.payload}
		case types.CLEAN_ORDER:
			return initialState
		default:
			return state
	}
}
