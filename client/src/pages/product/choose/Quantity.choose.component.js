import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setDownQuantityAction, setUpQuantityAction} from '../../../redux/actions/product.actions'
import {styles} from '../styles'
import colors from '../../../config/colors'
import MinusIconComponent from '../../../components/Minus.icon.component'
import PlusIconComponent from '../../../components/Plus.icon.component'

const QuantityChooseComponent = () => {
	const dispatch = useDispatch()
	const quantityProduct = useSelector(state => state.product.quantity)

	const setUpQuantity = () => {
		dispatch(setUpQuantityAction())
	}

	const setDownQuantity = () => {
		dispatch(setDownQuantityAction())
	}

	return (
		<div style={styles.section}>
			<p style={styles.sectionTitle}>Выберите количество</p>
			<div style={styles.sectionCard}>
				<div style={styles.pieceCounter}>
					<div style={styles.productSelect} onClick={setDownQuantity}>
						<MinusIconComponent color={colors.COLOR_SUBWAY_WHITE} />
					</div>
					<p>{quantityProduct}</p>
					<div style={styles.productSelect} onClick={setUpQuantity}>
						<PlusIconComponent color={colors.COLOR_SUBWAY_WHITE} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default QuantityChooseComponent
