import React, {useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import colors from '../config/colors'
import HomeIconComponent from './Home.icon.component'
import PromotionIconComponent from './Promotion.icon.component'
import RestaurantsIconComponent from './Restaurants.icon.component'
import BasketIconComponent from './Basket.icon.component'
import PhoneIconComponent from './Phone.icon.component'
import {useDispatch, useSelector} from 'react-redux'
import {setFooterHeightAction} from '../redux/actions/app.actions'

export const styles = {
	footer: {
		position: 'fixed',
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 100,
		borderTop: '1px solid',
		borderColor: colors.COLOR_SUBWAY_YELLOW,
		backgroundColor: colors.COLOR_SUBWAY_WHITE,
	},
	footerButton: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '7px 5px',
		height: '100%',
		cursor: 'pointer',
	},
	footerButtonText: {
		fontFamily: 'SixInch',
		fontSize: 9,
		textTransform: 'uppercase',
		marginTop: 5,
	},
	footerButtonTextActive: {
		color: colors.COLOR_SUBWAY_RED,
	},
	footerButtonTextInactive: {
		color: 'grey',
	},
	click: {
		webkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
	},
}

const FooterComponent = () => {
	const dispatch = useDispatch()
	const url = useSelector(state => state.app.url)
	const price = useSelector(state => state.basket.price)
	const footerHeightRef = useRef()

	useEffect(() => {
		footerHeightRef.current && dispatch(setFooterHeightAction(footerHeightRef.current.clientHeight))
	}, [footerHeightRef])

	return (
		<div style={styles.footer} ref={footerHeightRef}>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(5, 1fr)',
				}}
			>
				<Link style={styles.click} to='/'>
					<div style={styles.footerButton}>
						<HomeIconComponent color={url === '/' ? colors.COLOR_SUBWAY_RED : colors.COLOR_INACTIVE} />
						<p style={styles.footerButtonText}>
							<span style={url === '/' ? styles.footerButtonTextActive : styles.footerButtonTextInactive}>
								меню
							</span>
						</p>
					</div>
				</Link>
				<Link style={styles.click} to='/promotion'>
					<div style={styles.footerButton}>
						<PromotionIconComponent
							color={url === '/promotion' ? colors.COLOR_SUBWAY_RED : colors.COLOR_INACTIVE}
						/>
						<p style={styles.footerButtonText}>
							<span
								style={
									url === '/promotion'
										? styles.footerButtonTextActive
										: styles.footerButtonTextInactive
								}
							>
								акции
							</span>
						</p>
					</div>
				</Link>
				<Link style={styles.click} to='/restaurants'>
					<div style={styles.footerButton}>
						<RestaurantsIconComponent
							color={url === '/restaurants' ? colors.COLOR_SUBWAY_RED : colors.COLOR_INACTIVE}
						/>
						<p style={styles.footerButtonText}>
							<span
								style={
									url === '/restaurants'
										? styles.footerButtonTextActive
										: styles.footerButtonTextInactive
								}
							>
								рестораны
							</span>
						</p>
					</div>
				</Link>
				<Link style={styles.click} to='/cart'>
					<div style={styles.footerButton}>
						<BasketIconComponent
							color={url === '/cart' ? colors.COLOR_SUBWAY_RED : colors.COLOR_INACTIVE}
						/>
						<p style={styles.footerButtonText}>
							<span
								style={
									url === '/cart' ? styles.footerButtonTextActive : styles.footerButtonTextInactive
								}
							>
								корзина
							</span>
						</p>
						{price ? (
							<div
								style={{
									position: 'absolute',
									top: 5,
									right: -5,
									padding: '3px 5px 1px 6px',
									backgroundColor: colors.COLOR_SUBWAY_RED,
									borderRadius: 10,
								}}
							>
								<p
									style={{
										fontSize: 10,
										color: colors.COLOR_SUBWAY_WHITE,
										lineHeight: '10px',
									}}
								>
									{price} &#8381;
								</p>
							</div>
						) : null}
					</div>
				</Link>
				<Link style={styles.click} to='/contacts'>
					<div style={styles.footerButton}>
						<PhoneIconComponent
							color={url === '/contacts' ? colors.COLOR_SUBWAY_RED : colors.COLOR_INACTIVE}
						/>
						<p style={styles.footerButtonText}>
							<span
								style={
									url === '/contacts'
										? styles.footerButtonTextActive
										: styles.footerButtonTextInactive
								}
							>
								контакты
							</span>
						</p>
					</div>
				</Link>
			</div>
		</div>
	)
}

export default FooterComponent
