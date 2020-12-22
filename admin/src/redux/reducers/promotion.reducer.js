import types from '../types/promotion.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	promotions: [],
	promotion: null,
}

export const promotionReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ALL:
			return {...state, promotions: action.payload}
		case types.FETCH_BY_ID:
			return {...state, promotion: action.payload}
		case types.CREATE:
			return {...state, promotions: state.promotions.concat([action.payload])}
		case types.EDIT:
			const index = state.promotions.findIndex(item => item._id === action.payload._id)
			state.promotions.splice(index, 1, action.payload)
			return {...state, promotions: state.promotions.slice(), promotion: null}
		case types.DELETE:
			return {...state, promotions: state.promotions.filter(item => item._id !== action.payload)}
		case types.CLEAN:
			return {...state, promotion: null}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
