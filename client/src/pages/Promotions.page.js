import React, {useEffect, useState} from 'react'
import colors from '../config/colors'
import {useDispatch, useSelector} from 'react-redux'
import {setUrlAction} from '../redux/actions/app.actions'
import {cleanProductAction, setProductAction} from '../redux/actions/product.actions'
import {addProductToBasketAction} from '../redux/actions/basket.actions'
import ModalComponent from '../components/Modal.component'
import ProductComponent from './product/Product.component'
import {useToasts} from 'react-toast-notifications'
import {API_URL} from '../config/config'
import {setIsPromotionAction} from '../redux/actions/order.actions'

const styles = {
	emptyPromotion: {
		marginTop: 30,
		color: colors.COLOR_INACTIVE,
		textAlign: 'center',
		fontSize: 16,
	},
}

const PromotionsPage = () => {
	const dispatch = useDispatch()
	const {addToast} = useToasts()
	const menu = useSelector(state => state.menu.menu)
	const product = useSelector(state => state.product)
	const footerHeight = useSelector(state => state.app.footerHeight)
	const [disableAddToBasket, setDisabledAddToBasket] = useState(false)
	const [disableAddToBasketText, setDisabledAddToBasketText] = useState(null)

	useEffect(() => {
		dispatch(setUrlAction(window.location.pathname))
	}, [])

	const setProduct = product => {
		dispatch(setProductAction(product))
	}

	const cleanProduct = () => {
		dispatch(cleanProductAction())
	}

	const addProductToBasket = () => {
		if (disableAddToBasket) {
			dispatch(addProductToBasketAction(product))
			dispatch(setIsPromotionAction(true))
			dispatch(cleanProductAction())
		} else {
			addToast(disableAddToBasketText, {
				appearance: 'error',
				autoDismiss: true,
			})
		}
	}

	return (
		<div style={{flexGrow: 1, display: 'flex', flexDirection: 'column', paddingBottom: footerHeight}}>
			<div style={{padding: '0 10px', marginBottom: 10}}>
				<p style={{fontSize: 14, color: colors.COLOR_INACTIVE}}>Внимание! Акции доступны при заказе навынос.</p>
			</div>
			{menu &&
				menu.promotions
					.filter(item => item.active)
					.sort((a, b) => (a.position > b.position ? 1 : -1))
					.map((promotion, i) => {
						return (
							<div
								key={i}
								onClick={() =>
									setProduct({
										...promotion,
										menuItem: {name: 'Акции', alias: 'promotions', position: 100},
									})
								}
								style={{marginBottom: 10}}
							>
								<img src={`${API_URL}/${promotion.promotion.image}`} alt='' style={{width: '100%'}} />
							</div>
						)
					})}
			{product.product ? (
				<ModalComponent
					title={
						product.product.unit
							? product.product.unit.name
							: product.product.product
							? product.product.product.name
							: product.product.promotion.name
					}
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

export default PromotionsPage
