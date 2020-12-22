import {combineReducers} from 'redux'
import {appReducer} from './app.reducer'
import {restaurantReducer} from './restaurant.reducer'
import {menuReducer} from './menu.reducer'
import {productReducer} from './product.reducer'
import {basketReducer} from './basket.reducer'
import {orderReducer} from './order.reducer'

export const rootReducer = combineReducers({
	app: appReducer,
	restaurant: restaurantReducer,
	menu: menuReducer,
	product: productReducer,
	basket: basketReducer,
	order: orderReducer,
})
