import types from '../types/product.types'

export function setProductAction(product) {
	return {
		type: types.SET_PRODUCT,
		payload: product,
	}
}

export function setBreadAction(bread) {
	return {
		type: types.SET_BREAD,
		payload: bread,
	}
}

export function setVegetableAction(vegetable) {
	return {
		type: types.SET_VEGETABLE,
		payload: vegetable,
	}
}

export function setSauceAction(sauce, maxQty) {
	return {
		type: types.SET_SAUCE,
		payload: {sauce, maxQty},
	}
}

export function setAllSauceAction() {
	return {
		type: types.SET_ALL_SAUCE,
	}
}

export function setSpiceAction(spice) {
	return {
		type: types.SET_SPICE,
		payload: spice,
	}
}

export function setAllSpiceAction() {
	return {
		type: types.SET_ALL_SPICE,
	}
}

export function setAllVegetableAction(vegetables) {
	return {
		type: types.SET_ALL_VEGETABLE,
		payload: vegetables,
	}
}

export function setExtraAction(extra) {
	return {
		type: types.SET_EXTRA,
		payload: extra,
	}
}

export function setCheeseAction() {
	return {
		type: types.SET_CHEESE,
	}
}

export function setWarmUpAction() {
	return {
		type: types.SET_WARM_UP,
	}
}

export function setCutAction() {
	return {
		type: types.SET_CUT,
	}
}

export function setModifierAction(modifier) {
	return {
		type: types.SET_MODIFIER,
		payload: modifier,
	}
}

export function setUpQuantityAction() {
	return {
		type: types.SET_UP_QUANTITY,
	}
}

export function setDownQuantityAction() {
	return {
		type: types.SET_DOWN_QUANTITY,
	}
}

export function cleanProductAction() {
	return {
		type: types.CLEAN_PRODUCT,
	}
}
