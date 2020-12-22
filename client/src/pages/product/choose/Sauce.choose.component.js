import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setAllSauceAction, setSauceAction} from '../../../redux/actions/product.actions'
import ChooseCardComponent from '../../../components/ChooseCard.component'
import {styles} from '../styles'

const SauceChooseComponent = ({maxQty, isSweet}) => {
	const dispatch = useDispatch()
	const sauceProduct = useSelector(state => state.product.sauces)
	const sauces = useSelector(state => state.menu.menu.sauces)

	const setChoose = sauce => {
		dispatch(setSauceAction(sauce, maxQty))
	}

	const setAllSauce = () => {
		dispatch(setAllSauceAction())
	}

	return (
		<div style={styles.section}>
			<p style={styles.sectionTitle}>Выберите соусы</p>
			<div style={styles.sectionCard}>
				<ChooseCardComponent
					name={'Без соусов'}
					active={!sauceProduct.length}
					setChoose={() => setAllSauce()}
				/>
				{sauces &&
					sauces
						.filter(item => item.active && item.sauce.isSweet === Boolean(isSweet))
						.sort((a, b) => (a.position > b.position ? 1 : -1))
						.map((sauce, i) => {
							const position = {_id: sauce._id, name: sauce.sauce.name}
							let active = false
							sauceProduct.map(item => {
								if (item._id === sauce._id) {
									active = true
								}
							})
							return (
								<ChooseCardComponent
									key={i}
									name={sauce.sauce.name}
									active={active}
									position={position}
									setChoose={() => setChoose(position)}
								/>
							)
						})}
			</div>
		</div>
	)
}

export default SauceChooseComponent
