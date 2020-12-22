import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setExtraAction} from '../../../redux/actions/product.actions'
import ChooseCardComponent from '../../../components/ChooseCard.component'
import {styles} from '../styles'

const ExtraChooseComponent = ({double}) => {
	const dispatch = useDispatch()
	const extraProduct = useSelector(state => state.product.extras)
	const extras = useSelector(state => state.menu.menu.extras)

	const setChoose = extra => {
		dispatch(setExtraAction(extra))
	}

	return (
		<div style={styles.section}>
			<p style={styles.sectionTitle}>Сделайте сытнее</p>
			<div style={styles.sectionCard}>
				{extras &&
					extras
						.filter(item => item.active)
						.sort((a, b) => (a.position > b.position ? 1 : -1))
						.map((extra, i) => {
							const price = double ? extra.price * 2 : extra.price
							const position = {_id: extra._id, name: extra.extra.name, price: price}
							let active = false
							extraProduct.map(item => {
								if (item._id === extra._id) {
									active = true
								}
							})
							return (
								<ChooseCardComponent
									key={i}
									name={extra.extra.name}
									active={active}
									position={position}
									image={extra.extra.image}
									price={price}
									setChoose={() => setChoose(position)}
								/>
							)
						})}
			</div>
		</div>
	)
}

export default ExtraChooseComponent
