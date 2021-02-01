import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setHeaderHeightAction, setUrlAction} from '../../redux/actions/app.actions'
import {fetchMenuAction} from '../../redux/actions/menu.actions'
import colors from '../../config/colors'
import MenuListComponent from './MenuList.component'
import ModalComponent from '../../components/Modal.component'
import ProductComponent from '../product/Product.component'
import {cleanProductAction, setProductAction} from '../../redux/actions/product.actions'
import {addProductToBasketAction} from '../../redux/actions/basket.actions'
import {useToasts} from 'react-toast-notifications'
import SwipeableViews from 'react-swipeable-views'
import {setIsPromotionAction} from '../../redux/actions/order.actions'

const STANDARD_MENU = [
	{
		id: 'sixinch',
		name: 'Сэндвичи 15 см',
		menuItem: 'sixInches',
	},
	{
		id: 'footlong',
		name: 'Сэндвичи 30 см',
		menuItem: 'footLongs',
	},
	{
		id: 'salad',
		name: 'Салаты',
		menuItem: 'salads',
	},
	{
		id: 'wrap',
		name: 'Роллы',
		menuItem: 'wraps',
	},
]

const styles = {
	menuContainer: {
		position: 'fixed',
		left: 0,
		right: 0,
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		overflowX: 'scroll',
		paddingBottom: 3,
		backgroundColor: colors.COLOR_SUBWAY_WHITE,
		zIndex: 200,
	},
	swiperContainer: {
		flexGrow: 0,
		display: 'flex',
		paddingTop: 10,
	},
	menuItemContainer: {
		flex: '1 0 auto',
		padding: '0 0 3px',
		margin: '0 5px',
		textAlign: 'center',
	},
	menuTitle: {
		transition: '0.5s',
		fontSize: 18,
	},
	emptyMenu: {
		marginTop: 30,
		color: colors.COLOR_INACTIVE,
		textAlign: 'center',
		fontSize: 16,
	},
}

const MenuPage = () => {
	const dispatch = useDispatch()
	const {addToast} = useToasts()
	const restaurant = useSelector(state => state.restaurant.restaurant)
	const menu = useSelector(state => state.menu.menu)
	const headerHeight = useSelector(state => state.app.headerHeight)
	const footerHeight = useSelector(state => state.app.footerHeight)
	const product = useSelector(state => state.product)
	const [menuItem, setMenuItem] = useState(0)
	const [menuHeight, setMenuHeight] = useState(0)
	const [disableAddToBasket, setDisabledAddToBasket] = useState(false)
	const [disableAddToBasketText, setDisabledAddToBasketText] = useState(null)
	const parentRef = useRef()

	useEffect(() => {
		dispatch(setUrlAction(window.location.pathname))
		restaurant && dispatch(fetchMenuAction({id: restaurant._id}))
	}, [])

	useEffect(() => {
		parentRef.current && setMenuHeight(parentRef.current.clientHeight)
	}, [parentRef])

	const handleSlideMenu = index => {
		window.scrollTo(0, 0)
		setMenuItem(index)
		const parent = parentRef.current.getBoundingClientRect()
		const element = parentRef.current.childNodes[index].getBoundingClientRect()
		parentRef.current.scrollLeft += element.x + element.width / 2 - parent.width / 2
	}

	const setProduct = product => {
		dispatch(setProductAction(product))
	}

	const cleanProduct = () => {
		dispatch(cleanProductAction())
	}

	const addProductToBasket = () => {
		if (disableAddToBasket) {
			dispatch(addProductToBasketAction(product))
			if (
				product.product.menuItem.alias === 'Razlivnie-napitki' ||
				product.product.menuItem.alias === 'Goryachie-napitki'
			) {
				dispatch(setIsPromotionAction(true))
			}
			dispatch(cleanProductAction())
		} else {
			addToast(disableAddToBasketText, {
				appearance: 'error',
				autoDismiss: true,
			})
		}
	}

	return (
		<div
			style={{
				flexGrow: 1,
				display: 'flex',
				flexDirection: 'column',
				paddingBottom: footerHeight,
			}}
		>
			<div ref={parentRef} style={{...styles.menuContainer, top: headerHeight - 2}}>
				{menu &&
					menu.menuItems &&
					STANDARD_MENU.map((item, i) => {
						return (
							<div key={i} style={styles.menuItemContainer}>
								<div
									style={{
										transition: '0.7s',
										borderBottom: menuItem === i ? '1px solid' : 'none',
										borderColor: menuItem === i ? colors.COLOR_SUBWAY_RED : 'transparent',
									}}
									onClick={() => {
										handleSlideMenu(i)
									}}
								>
									<p
										style={{
											...styles.menuTitle,
											color: menuItem === i ? colors.COLOR_SUBWAY_RED : colors.COLOR_INACTIVE,
										}}
									>
										{item.name}
									</p>
								</div>
							</div>
						)
					})}
				{menu &&
					menu.menuItems &&
					menu.menuItems
						.filter(item => item.active)
						.sort((a, b) => (a.position > b.position ? 1 : -1))
						.map((item, i) => {
							return (
								<div key={i} style={styles.menuItemContainer}>
									<div
										style={{
											transition: '0.7s',
											borderBottom: menuItem === i + 4 ? '1px solid' : 'none',
											borderColor: menuItem === i + 4 ? colors.COLOR_SUBWAY_RED : 'transparent',
										}}
										onClick={() => {
											handleSlideMenu(i + 4)
										}}
									>
										<p
											style={{
												...styles.menuTitle,
												color:
													menuItem === i + 4
														? colors.COLOR_SUBWAY_RED
														: colors.COLOR_INACTIVE,
											}}
										>
											{item.menuItem.name}
										</p>
									</div>
								</div>
							)
						})}
			</div>
			{menu && menu.menuItems ? (
				<div
					style={{
						...styles.swiperContainer,
						paddingTop: 26,
						minHeight: window.innerHeight - footerHeight - headerHeight - menuHeight,
					}}
				>
					<SwipeableViews
						index={menuItem}
						onSwitching={index => handleSlideMenu(Math.round(index))}
						animateHeight={true}
					>
						{STANDARD_MENU.map((item, i) => {
							return (
								<MenuListComponent
									key={i}
									menu={menu[item.menuItem]}
									field={'unit'}
									setProduct={setProduct}
									menuItem={{alias: item.menuItem, name: item.name, position: i}}
								/>
							)
						})}
						{menu.menuItems.map((item, i) => {
							return (
								<MenuListComponent
									key={i}
									menu={item.items}
									field={'product'}
									setProduct={setProduct}
									menuItem={{...item.menuItem, position: i + 4}}
								/>
							)
						})}
					</SwipeableViews>
				</div>
			) : (
				<p style={styles.emptyMenu}>Загружаем меню ...</p>
			)}
			{product.product ? (
				<ModalComponent
					title={product.product.unit ? product.product.unit.name : product.product.product.name}
					close={() => cleanProduct()}
				>
					<ProductComponent
						addProductToBasket={addProductToBasket}
						setDisabledAddToBasket={setDisabledAddToBasket}
						setDisabledAddToBasketText={setDisabledAddToBasketText}
					/>
				</ModalComponent>
			) : null}
		</div>
	)
}

export default MenuPage
