import React, {useEffect, useState} from 'react'
import {Switch, Router, useHistory, Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import device from 'current-device'
import moment from 'moment'
import colors from './config/colors'
import {setRestaurantAction, fetchRestaurantsAction, fetchRestaurantAction} from './redux/actions/restaurant.actions'
import HeaderComponent from './components/Header.component'
import MenuPage from './pages/menu/Menu.page'
import PromotionsPage from './pages/Promotions.page'
import RestaurantsPage from './pages/Restaurants.page'
import CartPage from './pages/Cart.page'
import ContactsPage from './pages/Contacts.page'
import FooterComponent from './components/Footer.component'
import ModalComponent from './components/Modal.component'
import OfertaPage from './pages/Oferta.page'
import PolicePage from './pages/Police.page'
import {fetchMenuAction} from './redux/actions/menu.actions'
import ErrorComponent from './components/Error.component'
import SuccessComponent from './components/Success.component'

const NOT_MOBILE = 'Уважаемые гости, наш сайт работает только в браузерах мобильных устройств'
const WINDOW_HEIGHT = window.innerHeight

const styles = {
	app: {
		position: 'relative',
		minWidth: 320,
		maxWidth: 400,
		backgroundColor: colors.COLOR_SUBWAY_WHITE,
		margin: '0 auto',
	},
	restaurant: {
		borderBottom: '1px solid',
		borderColor: colors.COLOR_SUBWAY_GREEN,
		borderRadius: 5,
		padding: '10px 10px',
		marginBottom: 20,
		cursor: 'pointer',
	},
	restaurantTitle: {
		fontFamily: 'FootLong',
		color: colors.COLOR_SUBWAY_DARK_GREEN,
		marginBottom: 5,
		fontSize: 18,
	},
	restaurantAddress: {
		fontFamily: 'SixInch',
		fontSize: 14,
		color: colors.COLOR_INACTIVE,
	},
	schedule: {
		fontSize: 12,
		marginTop: 7,
		color: colors.COLOR_INACTIVE,
	},
}

function App() {
	const dispatch = useDispatch()
	const history = useHistory()
	const headerHeight = useSelector(state => state.app.headerHeight)
	const footerHeight = useSelector(state => state.app.footerHeight)
	const restaurants = useSelector(state => state.restaurant.restaurants)
	const restaurant = useSelector(state => state.restaurant.restaurant)
	const [isDevice, setIsDevice] = useState('')
	const [dayAlias, setDayAlias] = useState('')

	useEffect(() => {
		setIsDevice(device.type)
		setDayAlias(moment().format('dddd').toLowerCase())
		let localRestaurantId = JSON.parse(localStorage.getItem('restaurant'))
		if (localRestaurantId) {
			dispatch(fetchRestaurantAction({id: localRestaurantId}))
		} else {
			dispatch(fetchRestaurantsAction())
		}
	}, [])

	useEffect(() => {
		!restaurant && !localStorage.getItem('restaurant') && dispatch(fetchRestaurantsAction())
		restaurant && dispatch(fetchMenuAction({id: restaurant._id}))
	}, [restaurant])

	const selectRestaurant = restaurant => {
		dispatch(setRestaurantAction({restaurant}))
		dispatch(fetchMenuAction({id: restaurant._id}))
	}

	return (
		<>
			{isDevice === 'mobile' ? (
				<div style={{...styles.app, paddingTop: headerHeight}}>
					<HeaderComponent />
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							minHeight: WINDOW_HEIGHT - headerHeight - footerHeight,
						}}
					>
						<Router history={history}>
							<Switch>
								<Route exact path='/' component={MenuPage} />
								<Route exact path='/promotion' component={PromotionsPage} />
								<Route exact path='/restaurants' component={RestaurantsPage} />
								<Route exact path='/cart' component={CartPage} />
								<Route exact path='/contacts' component={ContactsPage} />
								<Route exact path='/oferta' component={OfertaPage} />
								<Route exact path='/policy' component={PolicePage} />
							</Switch>
						</Router>
					</div>
					<FooterComponent />
					{!restaurant && !localStorage.getItem('restaurant') ? (
						<ModalComponent title={'Выберите ресторан'}>
							{restaurants.map((restaurant, i) => {
								let day = restaurant.schedule.filter(day => day.alias === dayAlias)

								return (
									<div
										key={i}
										style={styles.restaurant}
										onClick={() => {
											selectRestaurant(restaurant)
										}}
									>
										<p style={styles.restaurantTitle}>{restaurant.name}</p>
										<p style={styles.restaurantAddress}>{restaurant.address}</p>
										<p style={styles.schedule}>
											Режим работы: с {day[0].from} до {day[0].to}
										</p>
									</div>
								)
							})}
						</ModalComponent>
					) : null}
				</div>
			) : (
				<div style={styles.app}>{NOT_MOBILE}</div>
			)}
			<ErrorComponent />
			<SuccessComponent />
		</>
	)
}

export default App
