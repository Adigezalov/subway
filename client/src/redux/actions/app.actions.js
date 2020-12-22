import types from '../types/app.types'

export function showLoaderAction() {
	return {
		type: types.SHOW_LOADER,
	}
}

export function hideLoaderAction() {
	return {
		type: types.HIDE_LOADER,
	}
}

export function showErrorAction(error) {
	return {
		type: types.SHOW_ERROR,
		payload: error,
	}
}

export function hideErrorAction() {
	return {
		type: types.HIDE_ERROR,
	}
}

export function showSuccessAction(success) {
	return {
		type: types.SHOW_SUCCESS,
		payload: success,
	}
}

export function hideSuccessAction() {
	return {
		type: types.HIDE_SUCCESS,
	}
}

export function setUrlAction(url) {
	return {
		type: types.SET_URL,
		payload: url,
	}
}

export function setHeaderHeightAction(height) {
	return {
		type: types.SET_HEADER_HEIGHT,
		payload: height,
	}
}

export function setFooterHeightAction(height) {
	return {
		type: types.SET_FOOTER_HEIGHT,
		payload: height,
	}
}

export function setVisibleOrderAction(visible) {
	return {
		type: types.ORDER,
		payload: visible,
	}
}
