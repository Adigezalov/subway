import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setCutAction} from '../../../redux/actions/product.actions'
import ChooseCardComponent from '../../../components/ChooseCard.component'
import {styles} from '../styles'

const CutChooseComponent = () => {
	const dispatch = useDispatch()
	const cutProduct = useSelector(state => state.product.cut)

	const setChoose = () => {
		dispatch(setCutAction())
	}

	return (
		<div style={styles.section}>
			<p style={styles.sectionTitle}>Разрезать пополам?</p>
			<div style={styles.sectionCard}>
				<ChooseCardComponent name={'Да'} active={cutProduct} setChoose={() => setChoose()} />
				<ChooseCardComponent name={'Нет'} active={!cutProduct} setChoose={() => setChoose()} />
			</div>
		</div>
	)
}

export default CutChooseComponent
