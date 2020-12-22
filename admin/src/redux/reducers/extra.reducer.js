import types from '../types/extra.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	extras: [],
	extra: null,
}

export const extraReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ALL:
			return {...state, extras: action.payload}
		case types.FETCH_BY_ID:
			return {...state, extra: action.payload}
		case types.CREATE:
			return {...state, extras: state.extras.concat([action.payload])}
		case types.EDIT:
			const index = state.extras.findIndex(item => item._id === action.payload._id)
			state.extras.splice(index, 1, action.payload)
			return {...state, extras: state.extras.slice(), extra: null}
		case types.DELETE:
			return {...state, extras: state.extras.filter(item => item._id !== action.payload)}
		case types.CLEAN:
			return {...state, extra: null}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
