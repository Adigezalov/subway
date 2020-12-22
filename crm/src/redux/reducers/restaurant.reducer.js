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
		case types.CREATE:
			return {...state, restaurants: state.restaurants.concat([action.payload])}
		case types.EDIT:
			const indexEdit = state.restaurants.findIndex(item => item._id === action.payload._id)
			state.restaurants.splice(indexEdit, 1, action.payload)
			return {...state, restaurants: state.restaurants.slice(), restaurant: null}
		case types.ACTIVATE:
			const indexActive = state.restaurants.findIndex(item => item._id === action.payload._id)
			state.restaurants.splice(indexActive, 1, action.payload)
			return {...state, restaurants: state.restaurants.slice()}
		case types.DELETE:
			return {...state, restaurants: state.restaurants.filter(item => item._id !== action.payload)}
		case types.CLEAN:
			return {...state, restaurant: null}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
