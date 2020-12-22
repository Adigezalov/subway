import {
	HIDE_ERROR,
	HIDE_LOADER,
	SET_TOKEN,
	SHOW_ERROR,
	SHOW_LOADER,
	CREATE_SUCCESS,
	CREATE_ERROR,
} from '../types/app.types'

export function showLoaderAction() {
	return {
		type: SHOW_LOADER,
	}
}

export function hideLoaderAction() {
	return {
		type: HIDE_LOADER,
	}
}

export function showErrorAction(error) {
	return {
		type: SHOW_ERROR,
		payload: error,
	}
}

export function hideErrorAction() {
	return {
		type: HIDE_ERROR,
	}
}

export function setTokenAction(token) {
	return {
		type: SET_TOKEN,
		payload: token,
	}
}

export function createSuccess() {
	return {type: CREATE_SUCCESS}
}

export function createReset() {
	return {type: CREATE_ERROR}
}
