import React, {useEffect, useState} from 'react'

import colors from '../config/colors'
import {setUrlAction} from '../redux/actions/app.actions'
import {useDispatch, useSelector} from 'react-redux'
import {fetchRestaurantAction, fetchRestaurantsAction} from '../redux/actions/restaurant.actions'
import moment from 'moment'
import {API_URL} from '../config/config'
import {YMaps, Map, Placemark, GeolocationControl, ZoomControl} from 'react-yandex-maps'
import ModalComponent from '../components/Modal.component'
import ContainerComponent from '../components/Container.component'
import PlusIconComponent from '../components/Plus.icon.component'

export const styles = {
	map: {
		flex: '1 0 auto',
	},
	close: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'fixed',
		top: 55,
		right: 7,
		padding: 7,
		borderRadius: '100%',
		transform: 'rotate(45deg)',
	},
	contactTitle: {
		marginTop: 15,
		marginBottom: 5,
		fontFamily: 'FootLong',
		fontSize: 18,
		color: colors.COLOR_SUBWAY_YELLOW,
	},
	contactContent: {
		fontSize: 14,
		color: colors.COLOR_SUBWAY_GREEN,
	},
	contacts: {
		paddingTop: 50,
	},
	scheduleDay: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 5,
	},
	scheduleTitle: {
		fontSize: 14,
		minWidth: 100,
	},
	scheduleTime: {
		fontSize: 14,
		marginLeft: 10,
	},
	buttonSelect: {
		position: 'fixed',
		bottom: 60,
		left: 15,
		right: 15,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		border: '1px solid',
		padding: '10px 5px',
		backgroundColor: colors.COLOR_SUBWAY_DARK_GREEN,
		borderRadius: 5,
	},
	buttonSelectText: {
		color: colors.COLOR_SUBWAY_WHITE,
	},
	modalClose: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'fixed',
		top: 55,
		right: 7,
		padding: 7,
		borderRadius: '100%',
		transform: 'rotate(45deg)',
	},
}

const RestaurantsPage = () => {
	const dispatch = useDispatch()
	const restaurant = useSelector(state => state.restaurant.restaurant)
	const restaurants = useSelector(state => state.restaurant.restaurants)
	const [userCoordinates, setUserCoordinates] = useState([])
	const [selectedRestaurant, setSelectedRestaurant] = useState(null)
	const [mapHeight, setMapHeight] = useState(0)
	const mapRef = React.createRef()

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				setUserCoordinates([position.coords.latitude, position.coords.longitude])
			})
		} else {
			console.log('Geolocation API не поддерживается в вашем браузере')
		}
		setMapHeight(mapRef.current && mapRef.current.clientHeight)
	})

	useEffect(() => {
		dispatch(setUrlAction(window.location.pathname))
	}, [])

	useEffect(() => {
		!restaurants.length && dispatch(fetchRestaurantsAction())
	}, [restaurants])

	const renderSchedule = () => {
		let schedule = (restaurant && restaurant.schedule) || []
		return schedule.map((day, i) => {
			return (
				<div
					key={i}
					style={Object.assign({}, styles.scheduleDay, {
						color:
							day.alias === moment().format('dddd').toLowerCase()
								? colors.COLOR_SUBWAY_ORANGE
								: colors.COLOR_SUBWAY_GREEN,
						fontFamily: day.alias === moment().format('dddd').toLowerCase() ? 'FootLong' : 'SixInch',
					})}
				>
					<p style={styles.scheduleTitle}>{day.name}:</p>
					<p style={styles.scheduleTime}>{day.isWorkingDay ? `с ${day.from} до ${day.to}` : 'выходной'}</p>
				</div>
			)
		})
	}

	return (
		<>
			<div style={styles.map} ref={mapRef}>
				<YMaps>
					<Map
						style={{
							width: '100%',
							height: mapHeight,
						}}
						defaultState={{
							center: (userCoordinates.length && userCoordinates) || [
								restaurant && restaurant.latitude,
								restaurant && restaurant.longitude,
							],
							zoom: 10,
							controls: [],
						}}
					>
						<GeolocationControl options={{float: 'left'}} />
						<ZoomControl options={{float: 'right'}} />
						{userCoordinates.length ? (
							<Placemark
								geometry={userCoordinates}
								options={{
									iconLayout: 'default#image',
									iconImageHref: `${process.env.PUBLIC_URL}/userLocation.png`,
									iconImageSize: [31, 31],
								}}
							/>
						) : null}
						{restaurants &&
							restaurants.map((_item, _i) => (
								<Placemark
									onClick={() => {
										setSelectedRestaurant(_item)
									}}
									key={_i}
									geometry={[_item && _item.latitude, _item && _item.longitude]}
									options={{
										iconLayout: 'default#image',
										iconImageHref: `${process.env.PUBLIC_URL}/subwayS.png`,
										iconImageSize: [24, 31],
									}}
								/>
							))}
					</Map>
				</YMaps>
			</div>
			{selectedRestaurant ? (
				<ModalComponent title={`Subway ${restaurant.name}`} close={() => setSelectedRestaurant(null)}>
					<ContainerComponent>
						<p style={styles.contactTitle}>Адрес:</p>
						<p style={styles.contactContent}>{restaurant && restaurant.address}</p>
						<p style={styles.contactTitle}>Телефон:</p>
						<a style={styles.contactContent} href={`tel:${restaurant && restaurant.phone}`}>
							{restaurant && restaurant.phone}
						</a>
						<p style={styles.contactTitle}>Режим работы:</p>
						{renderSchedule()}
						<div
							style={styles.buttonSelect}
							onClick={() => {
								dispatch(fetchRestaurantAction({id: restaurant._id}))
								setSelectedRestaurant(null)
							}}
						>
							<p style={styles.buttonSelectText}>Выбрать</p>
						</div>
					</ContainerComponent>
				</ModalComponent>
			) : null}
		</>
	)
}

export default RestaurantsPage
