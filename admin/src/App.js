import React, {useEffect} from 'react'
import {Switch, Router, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setTokenAction} from './redux/actions/app.actions'
import {Error} from './components/Error'
import {Preloader} from './components/Preloader'
import {PublicRoute} from './components/PublicRoute'
import {PrivateRoute} from './components/PrivateRoute'
import LoginPage from './pages/Login.page'
import DashboardPage from './pages/Dashboard.page'
import AssemblyDiagramsPage from './pages/AssemblyDiagrams.page'
import BreadsPage from './pages/Breads.page'
import ExtrasPage from './pages/Extras.page'
import MenuItemsPage from './pages/MenuItems.page'
import ProductsPage from './pages/Products.page'
import PromotionsPage from './pages/Promotions.page'
import RestaurantsPage from './pages/Restaurants.page'
import SaucesPage from './pages/Sauces.page'
import SpicesPage from './pages/Spices.page'
import UnitsPage from './pages/Units.page'
import UsersPage from './pages/Users.page'
import VegetablesPage from './pages/Vegetables.page'
import EditAssemblyDiagramPage from './pages/EditAssemblyDiagram.page'
import EditMenuItemPage from './pages/EditMenuItem.page'
import EditBreadPage from './pages/EditBread.page'
import EditVegetablePage from './pages/EditVegetable.page'
import EditExtraPage from './pages/EditExtra.page'
import EditSaucePage from './pages/EditSauce.page'
import EditSpicePage from './pages/EditSpice.page'
import EditProductPage from './pages/EditProduct.page'
import EditUnitPage from './pages/EditUnit.page'
import EditUserPage from './pages/EditUser.page'
import EditPromotionPage from './pages/EditPromotion.page'
import PaymentOptionsPage from './pages/PaymentOption.page'
import EditPaymentOptionPage from './pages/EditPaymentOption.page'

function App() {
	const history = useHistory()
	const dispatch = useDispatch()

	useEffect(() => {
		let token = localStorage.getItem('token')
		dispatch(setTokenAction(token))
	}, [])

	return (
		<>
			<Router history={history}>
				<Switch>
					<PublicRoute exact path={'/login'} page={<LoginPage />} />
					<PrivateRoute exact path={'/'} page={<DashboardPage />} />
					<PrivateRoute exact path={'/assembly-diagrams'} page={<AssemblyDiagramsPage />} />
					<PrivateRoute exact path={'/breads'} page={<BreadsPage />} />
					<PrivateRoute exact path={'/extras'} page={<ExtrasPage />} />
					<PrivateRoute exact path={'/menu-items'} page={<MenuItemsPage />} />
					<PrivateRoute exact path={'/products'} page={<ProductsPage />} />
					<PrivateRoute exact path={'/promotions'} page={<PromotionsPage />} />
					<PrivateRoute exact path={'/restaurants'} page={<RestaurantsPage />} />
					<PrivateRoute exact path={'/sauces'} page={<SaucesPage />} />
					<PrivateRoute exact path={'/spices'} page={<SpicesPage />} />
					<PrivateRoute exact path={'/units'} page={<UnitsPage />} />
					<PrivateRoute exact path={'/users'} page={<UsersPage />} />
					<PrivateRoute exact path={'/vegetables'} page={<VegetablesPage />} />
					<PrivateRoute exact path={'/payment-options'} page={<PaymentOptionsPage />} />
					<PrivateRoute exact path={'/assembly-diagram-edit/:id'} page={<EditAssemblyDiagramPage />} />
					<PrivateRoute exact path={'/menu-item-edit/:id'} page={<EditMenuItemPage />} />
					<PrivateRoute exact path={'/bread-edit/:id'} page={<EditBreadPage />} />
					<PrivateRoute exact path={'/vegetable-edit/:id'} page={<EditVegetablePage />} />
					<PrivateRoute exact path={'/extra-edit/:id'} page={<EditExtraPage />} />
					<PrivateRoute exact path={'/sauce-edit/:id'} page={<EditSaucePage />} />
					<PrivateRoute exact path={'/spice-edit/:id'} page={<EditSpicePage />} />
					<PrivateRoute exact path={'/product-edit/:id'} page={<EditProductPage />} />
					<PrivateRoute exact path={'/unit-edit/:id'} page={<EditUnitPage />} />
					<PrivateRoute exact path={'/user-edit/:id'} page={<EditUserPage />} />
					<PrivateRoute exact path={'/promotion-edit/:id'} page={<EditPromotionPage />} />
					<PrivateRoute exact path={'/payment-option-edit/:id'} page={<EditPaymentOptionPage />} />
				</Switch>
			</Router>
			<Error />
			<Preloader />
		</>
	)
}

export default App
