import {combineReducers} from 'redux'
import {appReducer} from './app.reducer'
import {assemblyDiagramReducer} from './assemblyDiagram.reducer'
import {menuItemReducer} from './menuItem.reducer'
import {breadReducer} from './bread.reducer'
import {vegetableReducer} from './vegetable.reducer'
import {extraReducer} from './extra.reducer'
import {sauceReducer} from './sauce.reducer'
import {spiceReducer} from './spice.reducer'
import {productReducer} from './product.reducer'
import {unitReducer} from './unit.reducer'
import {userReducer} from './user.reducer'
import {paymentOptionReducer} from './patmenOption.reducer'
import {promotionReducer} from './promotion.reducer'
import {restaurantReducer} from './restaurant.reducer'

export const rootReducer = combineReducers({
	app: appReducer,
	assemblyDiagram: assemblyDiagramReducer,
	menuItem: menuItemReducer,
	bread: breadReducer,
	vegetable: vegetableReducer,
	extra: extraReducer,
	sauce: sauceReducer,
	spice: spiceReducer,
	product: productReducer,
	unit: unitReducer,
	user: userReducer,
	paymentOption: paymentOptionReducer,
	promotion: promotionReducer,
	restaurant: restaurantReducer,
})
