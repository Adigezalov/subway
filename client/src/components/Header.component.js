import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import colors from '../config/colors'
import ContainerComponent from './Container.component'
import {setRestaurantAction} from '../redux/actions/restaurant.actions'
import {setHeaderHeightAction} from '../redux/actions/app.actions'
import {cleanMenuAction} from '../redux/actions/menu.actions'
import {cleanBasketAction} from '../redux/actions/basket.actions'
import LoadingBar from 'react-top-loading-bar'

const styles = {
	header: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 100,
		padding: '20px 0',
		backgroundColor: colors.COLOR_SUBWAY_WHITE,
	},

	headerContent: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	headerLogo: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		maxWidth: 120,
	},

	headerSelector: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
	},

	headerLogoImage: {
		width: '100%',
	},

	headerSelectorTitle: {
		fontSize: 10,
		textTransform: 'uppercase',
		color: colors.COLOR_SUBWAY_GREEN,
	},

	headerSelectorContent: {
		fontFamily: 'FootLong',
		fontSize: 12,
		textTransform: 'uppercase',
		color: colors.COLOR_SUBWAY_GREEN,
	},
}

const HeaderComponent = () => {
	const dispatch = useDispatch()
	const restaurant = useSelector(state => state.restaurant.restaurant)
	const loading = useSelector(state => state.app.loading)
	const headerHeightRef = useRef()
	const loadingRef = useRef(null)

	useEffect(() => {
		headerHeightRef.current && dispatch(setHeaderHeightAction(headerHeightRef.current.clientHeight))
	}, [headerHeightRef])

	useEffect(() => {
		loading && loadingRef.current.continuousStart()
	}, [loading])

	const resetRestaurant = () => {
		dispatch(setRestaurantAction({restaurant: null}))
		dispatch(cleanMenuAction())
		dispatch(cleanBasketAction())
	}

	return (
		<div style={styles.header} ref={headerHeightRef}>
			{loading ? <LoadingBar color={colors.COLOR_SUBWAY_ORANGE} ref={loadingRef} shadow={true} /> : null}
			<ContainerComponent>
				<div style={styles.headerContent}>
					<div style={styles.headerLogo}>
						<img style={styles.headerLogoImage} src={process.env.PUBLIC_URL + '/subway.png'} alt='subway' />
					</div>
					<div
						style={styles.headerSelector}
						onClick={() => {
							resetRestaurant()
						}}
					>
						<p style={styles.headerSelectorTitle}>ресторан</p>
						<p style={styles.headerSelectorContent}>{restaurant ? restaurant.name : 'Загрузка...'}</p>
					</div>
				</div>
			</ContainerComponent>
		</div>
	)
}

export default HeaderComponent
