import types from '../types/basket.types'

const initialState = {
	basket: [],
	price: 0,
}

export const basketReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_PRODUCT_TO_BASKET:
			let menuItemIndex = state.basket.findIndex(item => item.alias === action.payload.product.menuItem.alias)
			if (menuItemIndex === -1) {
				state.basket.push({
					...action.payload.product.menuItem,
					values: [action.payload],
				})
			} else {
				state.basket[menuItemIndex].values.push(action.payload)
			}
			return {
				...state,
				basket: state.basket.slice(),
				price: state.price + action.payload.price * action.payload.quantity,
			}
		case types.REMOVE_PRODUCT_FROM_BASKET:
			let price = state.basket[action.payload.menuItemIndex].values[action.payload.productIndex].price
			let quantity = state.basket[action.payload.menuItemIndex].values[action.payload.productIndex].quantity
			if (state.basket[action.payload.menuItemIndex].values.length > 1) {
				state.basket[action.payload.menuItemIndex].values.splice(action.payload.productIndex, 1)
			} else {
				state.basket.splice(action.payload.menuItemIndex, 1)
			}
			return {...state, basket: state.basket.slice(), price: state.price - price * quantity}
		case types.CLEAN_BASKET:
			state.basket = []
			return {...state, basket: state.basket.slice(), price: 0}
		default:
			return state
	}
}
