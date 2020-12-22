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
import EditRestaurantPage from './pages/EditRestaurant.page'
import MenuPage from './pages/menu/Menu.page'
import {Success} from './components/Success'

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
					<PrivateRoute exact path={'/restaurant-edit/:id'} page={<EditRestaurantPage />} />
					<PrivateRoute exact path={'/menu/:id'} page={<MenuPage />} />
				</Switch>
			</Router>
			<Error />
			<Success />
			<Preloader />
		</>
	)
}

export default App
