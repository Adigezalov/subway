import React, {useEffect} from 'react'
import {API_URL} from '../../config/config'
import colors from '../../config/colors'
import diagrams from '../../config/diagrams'
import BreadChooseComponent from './choose/Bread.choose.component'
import {useSelector} from 'react-redux'
import VegetableChooseComponent from './choose/Vegetable.choose.component'
import SauceChooseComponent from './choose/Sauce.choose.component'
import SpiceChooseComponent from './choose/Spice.choose.component'
import ExtraChooseComponent from './choose/Extra.choose.component'
import CheeseChooseComponent from './choose/Cheese.choose.companent'
import WarmUpChooseComponent from './choose/WarmUp.choose.component'
import CutChooseComponent from './choose/Cut.choose.component'
import ModifierChooseComponent from './choose/Modifier.choose.component'
import QuantityChooseComponent from './choose/Quantity.choose.component'

const styles = {
	selectedProductImage: {
		padding: '0 10px',
		width: '100%',
	},
	selectedProductImg: {
		width: '100%',
	},
	selectedProductTitle: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		padding: '0 15px',
	},
	selectedProductPrice: {
		fontFamily: 'FootLong',
		fontSize: 18,
		color: colors.COLOR_SUBWAY_DARK_GREEN,
		textAlign: 'right',
	},
	buttonAddToCard: {
		position: 'fixed',
		bottom: 10,
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
	buttonAddToCardText: {
		color: colors.COLOR_SUBWAY_WHITE,
	},
}

const ProductComponent = ({addProductToBasket, setDisabledAddToBasket, setDisabledAddToBasketText}) => {
	const productReducer = useSelector(state => state.product)
	const product = useSelector(state => state.product.product)
	const diagram = useSelector(state => state.product.product.assemblyDiagram.alias)
	const field = product.unit ? 'unit' : product.product ? 'product' : 'promotion'

	useEffect(() => {
		let disabledAddToBasket = true
		let disabledAddToBasketText = ''
		if (
			diagram === diagrams.SANDWICH_SIX_INCH ||
			diagram === diagrams.SANDWICH_FOOT_LONG ||
			diagram === diagrams.BREAKFAST
		) {
			disabledAddToBasketText = 'Выберите составляющие сэндвича'
			disabledAddToBasket = !!productReducer.bread
		}
		if (diagram === diagrams.SALAD) {
			disabledAddToBasketText = 'Выберите овощи для салата'
			disabledAddToBasket = !!productReducer.vegetables.length
		}
		if (
			diagram === diagrams.PIECE_PRODUCT_AND_ONE_SAUCE ||
			diagram === diagrams.PIECE_PRODUCT_AND_ONE_SWEET_SAUCE
		) {
			disabledAddToBasketText = 'Выберите соус'
			disabledAddToBasket = !!productReducer.sauces.length
		}
		if (product.modifiers) {
			if (product[field].modifiers.length !== productReducer.modifiers.length) {
				product[field].modifiers.map(modifier => {
					disabledAddToBasketText = `${disabledAddToBasketText} ${modifier.name}`
				})
				disabledAddToBasket = product[field].modifiers.length === productReducer.modifiers.length
			}
		}
		setDisabledAddToBasket(disabledAddToBasket)
		setDisabledAddToBasketText(disabledAddToBasketText)
	}, [productReducer])

	return (
		<>
			<div style={{paddingBottom: 50}}>
				<div style={styles.selectedProductImage}>
					<img
						style={styles.selectedProductImg}
						src={
							product[field].image
								? `${API_URL}/${product[field].image}`
								: product[field].imageSixInch
								? `${API_URL}/${product[field].imageSixInch}`
								: product[field].imageFootLong
								? `${API_URL}/${product[field].imageFootLong}`
								: product[field].imageWrap
								? `${API_URL}/${product[field].imageWrap}`
								: `${API_URL}/${product[field].imageSalad}`
						}
						alt=''
					/>
				</div>
				<div style={styles.selectedProductTitle}>
					<p style={styles.selectedProductPrice}>
						{product.modifiers && product.modifiers.length ? 'от ' : null}
						{product.price} &#8381;
					</p>
				</div>
				{diagram === diagrams.PIECE_PRODUCT ||
				diagram === diagrams.PIECE_PRODUCT_AND_ONE_SAUCE ||
				diagram === diagrams.PIECE_PRODUCT_AND_ONE_SWEET_SAUCE ? (
					<QuantityChooseComponent />
				) : null}

				{product.modifiers ? <ModifierChooseComponent /> : null}

				{diagram === diagrams.SANDWICH_SIX_INCH ||
				diagram === diagrams.SANDWICH_FOOT_LONG ||
				diagram === diagrams.BREAKFAST ? (
					<BreadChooseComponent />
				) : null}
				{diagram === diagrams.SANDWICH_SIX_INCH ||
				diagram === diagrams.SANDWICH_FOOT_LONG ||
				diagram === diagrams.WRAP ||
				diagram === diagrams.SALAD ? (
					<CheeseChooseComponent />
				) : null}

				{diagram === diagrams.SANDWICH_SIX_INCH ||
				diagram === diagrams.SANDWICH_FOOT_LONG ||
				diagram === diagrams.WRAP ||
				diagram === diagrams.BREAKFAST ? (
					<WarmUpChooseComponent />
				) : null}

				{diagram === diagrams.SANDWICH_FOOT_LONG ? <CutChooseComponent /> : null}

				{diagram === diagrams.SANDWICH_SIX_INCH ||
				diagram === diagrams.SANDWICH_FOOT_LONG ||
				diagram === diagrams.WRAP ||
				diagram === diagrams.SALAD ? (
					<VegetableChooseComponent />
				) : null}

				{diagram === diagrams.SANDWICH_SIX_INCH ||
				diagram === diagrams.SANDWICH_FOOT_LONG ||
				diagram === diagrams.WRAP ||
				diagram === diagrams.SALAD ||
				diagram === diagrams.BREAKFAST ? (
					<SauceChooseComponent maxQty={3} />
				) : null}

				{diagram === diagrams.PIECE_PRODUCT_AND_ONE_SAUCE ? <SauceChooseComponent maxQty={1} /> : null}

				{diagram === diagrams.PIECE_PRODUCT_AND_ONE_SWEET_SAUCE ? (
					<SauceChooseComponent maxQty={1} isSweet />
				) : null}

				{diagram === diagrams.SANDWICH_SIX_INCH ||
				diagram === diagrams.SANDWICH_FOOT_LONG ||
				diagram === diagrams.WRAP ||
				diagram === diagrams.SALAD ||
				diagram === diagrams.BREAKFAST ? (
					<SpiceChooseComponent />
				) : null}

				{diagram === diagrams.SANDWICH_SIX_INCH ||
				diagram === diagrams.SANDWICH_FOOT_LONG ||
				diagram === diagrams.WRAP ||
				diagram === diagrams.SALAD ? (
					<ExtraChooseComponent double={diagram === diagrams.SANDWICH_FOOT_LONG} />
				) : null}
			</div>
			<div style={styles.buttonAddToCard} onClick={addProductToBasket}>
				<p style={styles.buttonAddToCardText}>Добавить в корзину</p>
			</div>
		</>
	)
}

export default ProductComponent
