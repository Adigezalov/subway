import types from '../types/basket.types'

export function addProductToBasketAction(product) {
	return {
		type: types.ADD_PRODUCT_TO_BASKET,
		payload: product,
	}
}

export function removeProductFromBasketAction(menuItemIndex, productIndex) {
	return {
		type: types.REMOVE_PRODUCT_FROM_BASKET,
		payload: {menuItemIndex, productIndex},
	}
}

export function cleanBasketAction() {
	return {
		type: types.CLEAN_BASKET,
	}
}
