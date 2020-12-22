import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setWarmUpAction} from '../../../redux/actions/product.actions'
import ChooseCardComponent from '../../../components/ChooseCard.component'
import {styles} from '../styles'

const WarmUpChooseComponent = () => {
	const dispatch = useDispatch()
	const warmUpProduct = useSelector(state => state.product.warmUp)

	const setChoose = () => {
		dispatch(setWarmUpAction())
	}

	return (
		<div style={styles.section}>
			<p style={styles.sectionTitle}>Подогреть?</p>
			<div style={styles.sectionCard}>
				<ChooseCardComponent name={'Да'} active={warmUpProduct} setChoose={() => setChoose()} />
				<ChooseCardComponent name={'Нет'} active={!warmUpProduct} setChoose={() => setChoose()} />
			</div>
		</div>
	)
}

export default WarmUpChooseComponent
