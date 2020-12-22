import types from '../types/product.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	products: [],
	product: null,
}

export const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ALL:
			return {...state, products: action.payload}
		case types.FETCH_BY_ID:
			return {...state, product: action.payload}
		case types.CREATE:
			return {...state, products: state.products.concat([action.payload])}
		case types.EDIT:
			const index = state.products.findIndex(item => item._id === action.payload._id)
			state.products.splice(index, 1, action.payload)
			return {...state, products: state.products.slice(), product: null}
		case types.DELETE:
			return {...state, products: state.products.filter(item => item._id !== action.payload)}
		case types.CLEAN:
			return {...state, product: null}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
