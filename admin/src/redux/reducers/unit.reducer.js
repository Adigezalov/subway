import types from '../types/unit.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	units: [],
	unit: null,
}

export const unitReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ALL:
			return {...state, units: action.payload}
		case types.FETCH_BY_ID:
			return {...state, unit: action.payload}
		case types.CREATE:
			return {...state, units: state.units.concat([action.payload])}
		case types.EDIT:
			const index = state.units.findIndex(item => item._id === action.payload._id)
			state.units.splice(index, 1, action.payload)
			return {...state, units: state.units.slice(), unit: null}
		case types.DELETE:
			return {...state, units: state.units.filter(item => item._id !== action.payload)}
		case types.CLEAN:
			return {...state, unit: null}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
