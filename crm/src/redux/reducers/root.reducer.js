import {combineReducers} from 'redux'
import {appReducer} from './app.reducer'
import {paymentOptionReducer} from './paymentOption.reducer'
import {restaurantReducer} from './restaurant.reducer'
import {addressReducer} from './address.reducer'
import {dataForMenuReducer} from './dataForMenu.reducer'
import {menuReducer} from './menu.reducer'

export const rootReducer = combineReducers({
	app: appReducer,
	paymentOption: paymentOptionReducer,
	restaurant: restaurantReducer,
	address: addressReducer,
	dataForMenu: dataForMenuReducer,
	menu: menuReducer,
})
