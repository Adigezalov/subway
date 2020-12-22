import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setCheeseAction} from '../../../redux/actions/product.actions'
import ChooseCardComponent from '../../../components/ChooseCard.component'
import {styles} from '../styles'

const CheeseChooseComponent = () => {
	const dispatch = useDispatch()
	const cheeseProduct = useSelector(state => state.product.cheese)

	const setChoose = () => {
		dispatch(setCheeseAction())
	}

	return (
		<div style={styles.section}>
			<p style={styles.sectionTitle}>Добавить сыр?</p>
			<div style={styles.sectionCard}>
				<ChooseCardComponent name={'Добавить'} active={cheeseProduct} setChoose={() => setChoose()} />
				<ChooseCardComponent name={'Без сыра'} active={!cheeseProduct} setChoose={() => setChoose()} />
			</div>
		</div>
	)
}

export default CheeseChooseComponent
