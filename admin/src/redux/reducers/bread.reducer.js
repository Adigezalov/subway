import types from '../types/bread.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	breads: [],
	bread: null,
}

export const breadReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ALL:
			return {...state, breads: action.payload}
		case types.FETCH_BY_ID:
			return {...state, bread: action.payload}
		case types.CREATE:
			return {...state, breads: state.breads.concat([action.payload])}
		case types.EDIT:
			const index = state.breads.findIndex(item => item._id === action.payload._id)
			state.breads.splice(index, 1, action.payload)
			return {...state, breads: state.breads.slice(), bread: null}
		case types.DELETE:
			return {...state, breads: state.breads.filter(item => item._id !== action.payload)}
		case types.CLEAN:
			return {...state, bread: null}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
