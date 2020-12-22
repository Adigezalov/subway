import types from '../types/restaurant.types'

const initialState = {
	restaurants: [],
	restaurant: null,
}

export const restaurantReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_RESTAURANTS:
			return {...state, restaurants: action.payload}
		case types.FETCH_RESTAURANT:
			return {...state, restaurant: action.payload}
		case types.CLEAN_RESTAURANT:
			return {...state, restaurant: null}
		default:
			return state
	}
}
