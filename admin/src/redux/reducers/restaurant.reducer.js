import types from '../types/restaurant.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	restaurants: [],
	restaurant: null,
}

export const restaurantReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ALL:
			return {...state, restaurants: action.payload}
		case types.FETCH_BY_ID:
			return {...state, restaurant: action.payload}
		case types.EDIT:
			const index = state.restaurants.findIndex(item => item._id === action.payload._id)
			state.restaurants.splice(index, 1, action.payload)
			return {...state, restaurants: state.restaurants.slice(), restaurant: null}
		case types.ACTIVATE:
			const indexActive = state.restaurants.findIndex(item => item._id === action.payload._id)
			state.restaurants.splice(indexActive, 1, action.payload)
			return {...state, restaurants: state.restaurants.slice()}
		case types.PAID:
			const indexPaid = state.restaurants.findIndex(item => item._id === action.payload._id)
			state.restaurants.splice(indexPaid, 1, action.payload)
			return {...state, restaurants: state.restaurants.slice()}
		case types.CLEAN:
			return {...state, restaurant: null}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
