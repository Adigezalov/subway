import types from '../types/dataForMenu.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	menuItems: [],
	assemblyDiagrams: [],
	breads: [],
	extras: [],
	vegetables: [],
	sauces: [],
	spices: [],
	units: [],
	products: [],
}

export const dataForMenuReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_MENU_ITEMS:
			return {...state, menuItems: action.payload}
		case types.FETCH_ASSEMBLY_DIAGRAMS:
			return {...state, assemblyDiagrams: action.payload}
		case types.FETCH_BREADS:
			return {...state, breads: action.payload}
		case types.FETCH_EXTRAS:
			return {...state, extras: action.payload}
		case types.FETCH_VEGETABLES:
			return {...state, vegetables: action.payload}
		case types.FETCH_SAUCES:
			return {...state, sauces: action.payload}
		case types.FETCH_SPICES:
			return {...state, spices: action.payload}
		case types.FETCH_UNITS:
			return {...state, units: action.payload}
		case types.FETCH_PRODUCTS:
			return {...state, products: action.payload}
		case types.CLEAN:
			return initialState
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
