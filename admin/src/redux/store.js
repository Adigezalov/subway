import {compose, createStore, applyMiddleware} from 'redux'
import {rootReducer} from './reducers/root.reducer'
import thunk from 'redux-thunk'

const middleware = compose(applyMiddleware(thunk))

export const store = createStore(rootReducer, middleware)
