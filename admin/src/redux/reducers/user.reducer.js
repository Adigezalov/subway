import types from '../types/user.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	users: [],
	user: null,
}

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ALL:
			return {...state, users: action.payload}
		case types.FETCH_BY_ID:
			return {...state, user: action.payload}
		case types.CREATE:
			return {...state, users: state.users.concat([action.payload])}
		case types.EDIT:
			const index = state.users.findIndex(item => item._id === action.payload._id)
			state.users.splice(index, 1, action.payload)
			return {...state, users: state.users.slice(), user: null}
		case types.DELETE:
			return {...state, users: state.users.filter(item => item._id !== action.payload)}
		case types.CLEAN:
			return {...state, user: null}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
