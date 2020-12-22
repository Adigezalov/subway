import types from '../types/assemblyDiagram.types'
import {LOGOUT} from '../types/authorization.types'

const initialState = {
	assemblyDiagrams: [],
	assemblyDiagram: null,
}

export const assemblyDiagramReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_ALL:
			return {...state, assemblyDiagrams: action.payload}
		case types.FETCH_BY_ID:
			return {...state, assemblyDiagram: action.payload}
		case types.CREATE:
			return {...state, assemblyDiagrams: state.assemblyDiagrams.concat([action.payload])}
		case types.EDIT:
			const index = state.assemblyDiagrams.findIndex(item => item._id === action.payload._id)
			state.assemblyDiagrams.splice(index, 1, action.payload)
			return {...state, assemblyDiagrams: state.assemblyDiagrams.slice(), assemblyDiagram: null}
		case types.DELETE:
			return {...state, assemblyDiagrams: state.assemblyDiagrams.filter(item => item._id !== action.payload)}
		case types.CLEAN:
			return {...state, assemblyDiagram: null}
		case LOGOUT:
			return initialState
		default:
			return state
	}
}
