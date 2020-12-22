import types from '../types/product.types'

const initialState = {
	cheese: false,
	warmUp: true,
	cut: false,
	product: null,
	price: 0,
	bread: null,
	extras: [],
	sauces: [],
	spices: [],
	vegetables: [],
	quantity: 1,
	modifiers: [],
}

export const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_PRODUCT:
			return {...state, product: action.payload, price: action.payload.price}
		case types.SET_BREAD:
			return {...state, bread: action.payload}
		case types.SET_VEGETABLE:
			let vegetableIndex = state.vegetables.findIndex(item => item._id === action.payload._id)
			if (vegetableIndex === -1) {
				return {...state, vegetables: state.vegetables.concat([action.payload])}
			} else {
				state.vegetables.splice(vegetableIndex, 1)
				return {...state, vegetables: state.vegetables.slice()}
			}
		case types.SET_ALL_VEGETABLE:
			return {...state, vegetables: action.payload}
		case types.SET_SAUCE:
			let sauceIndex = state.sauces.findIndex(item => item._id === action.payload.sauce._id)
			if (sauceIndex === -1) {
				if (state.sauces.length < action.payload.maxQty) {
					return {...state, sauces: state.sauces.concat([action.payload.sauce])}
				} else {
					return {...state, sauces: state.sauces}
				}
			} else {
				state.sauces.splice(sauceIndex, 1)
				return {...state, sauces: state.sauces.slice()}
			}
		case types.SET_ALL_SAUCE:
			return {...state, sauces: []}
		case types.SET_SPICE:
			let spiceIndex = state.spices.findIndex(item => item._id === action.payload._id)
			if (spiceIndex === -1) {
				return {...state, spices: state.spices.concat([action.payload])}
			} else {
				state.spices.splice(spiceIndex, 1)
				return {...state, spices: state.spices.slice()}
			}
		case types.SET_ALL_SPICE:
			return {...state, spices: []}
		case types.SET_EXTRA:
			let extraIndex = state.extras.findIndex(item => item._id === action.payload._id)
			if (extraIndex === -1) {
				return {
					...state,
					extras: state.extras.concat([action.payload]),
					price: state.price + action.payload.price,
				}
			} else {
				state.extras.splice(extraIndex, 1)
				return {...state, extras: state.extras.slice(), price: state.price - action.payload.price}
			}
		case types.SET_CHEESE:
			return {...state, cheese: !state.cheese}
		case types.SET_WARM_UP:
			return {...state, warmUp: !state.warmUp}
		case types.SET_CUT:
			return {...state, cut: !state.cut}
		case types.SET_MODIFIER:
			let modifierIndex = state.modifiers.findIndex(item => item.modifierGroup === action.payload.modifierGroup)
			if (modifierIndex === -1) {
				return {
					...state,
					modifiers: state.modifiers.concat([action.payload]),
					price: state.price + action.payload.price,
				}
			} else {
				state.modifiers.splice(modifierIndex, 1, action.payload)
				return {...state, modifiers: state.modifiers.slice(), price: state.price - action.payload.price}
			}
		case types.SET_UP_QUANTITY:
			return {...state, quantity: ++state.quantity}
		case types.SET_DOWN_QUANTITY:
			return {...state, quantity: state.quantity > 1 ? --state.quantity : state.quantity}
		case types.CLEAN_PRODUCT:
			return initialState
		default:
			return state
	}
}
