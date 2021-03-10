import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setUrlAction} from '../redux/actions/app.actions'
import {YMaps, Map, Placemark} from 'react-yandex-maps'
import colors from '../config/colors'
import ContainerComponent from '../components/Container.component'
import {Link} from 'react-router-dom'
import moment from 'moment'

const WINDOW_HEIGHT = window.innerHeight

const styles = {
	contacts: {
		marginBottom: 10,
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
	oferta: {
		fontSize: 12,
		color: colors.COLOR_INACTIVE,
		marginTop: 10,
	},
	map: {
		flexGrow: 1,
	},
}

const ContactsPage = () => {
	const dispatch = useDispatch()
	const headerHeight = useSelector(state => state.app.headerHeight)
	const footerHeight = useSelector(state => state.app.footerHeight)
	const restaurant = useSelector(state => state.restaurant.restaurant)
	const [mapHeight, setMapHeight] = useState(0)
	const contactsRef = useRef(0)

	useEffect(() => {
		dispatch(setUrlAction(window.location.pathname))
	}, [])

	useEffect(() => {
		setMapHeight(WINDOW_HEIGHT - headerHeight - footerHeight - contactsRef.current.clientHeight)
	}, [contactsRef])

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
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
			}}
		>
			<div style={styles.contacts} ref={contactsRef}>
				<ContainerComponent>
					<p style={styles.contactTitle}>Адрес:</p>
					<p style={styles.contactContent}>{restaurant && restaurant.address}</p>
					<p style={styles.contactTitle}>Телефон:</p>
					<a style={styles.contactContent} href={`tel:${restaurant && restaurant.phone}`}>
						{restaurant && restaurant.phone}
					</a>
					<p style={styles.contactTitle}>Режим работы:</p>
					{renderSchedule()}
					<Link to='/oferta'>
						<p style={styles.oferta}>Договор оферты</p>
					</Link>
					<Link to='/policy'>
						<p style={styles.oferta}>Соглашение на обработку персональных данных</p>
					</Link>
					<a href='https://t.me/subway_club_bot'>
						<p style={styles.oferta}>Telegram-бот для уведомлений</p>
					</a>
				</ContainerComponent>
			</div>
			<div style={{...styles.map, maxHeight: mapHeight}}>
				<YMaps>
					<Map
						style={{
							width: '100%',
							height: mapHeight,
						}}
						state={{
							center: [restaurant && restaurant.latitude, restaurant && restaurant.longitude],
							zoom: 16,
						}}
					>
						<Placemark geometry={[restaurant && restaurant.latitude, restaurant && restaurant.longitude]} />
					</Map>
				</YMaps>
			</div>
		</div>
	)
}

export default ContactsPage
