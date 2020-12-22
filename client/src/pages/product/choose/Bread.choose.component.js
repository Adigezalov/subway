import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setBreadAction} from '../../../redux/actions/product.actions'
import ChooseCardComponent from '../../../components/ChooseCard.component'
import {styles} from '../styles'

const BreadChooseComponent = () => {
	const dispatch = useDispatch()
	const breadProduct = useSelector(state => state.product.bread)
	const breads = useSelector(state => state.menu.menu.breads)

	const setChoose = bread => {
		dispatch(setBreadAction(bread))
	}

	return (
		<div style={styles.section}>
			<p style={styles.sectionTitle}>Выберите хлеб</p>
			<div style={styles.sectionCard}>
				{breads &&
					breads
						.filter(item => item.active)
						.sort((a, b) => (a.position > b.position ? 1 : -1))
						.map((bread, i) => {
							const position = {_id: bread._id, name: bread.bread.name}
							const active = bread._id === (breadProduct && breadProduct._id)
							return (
								<ChooseCardComponent
									key={i}
									name={bread.bread.name}
									active={active}
									position={position}
									image={bread.bread.image}
									setChoose={() => setChoose(position)}
								/>
							)
						})}
			</div>
		</div>
	)
}

export default BreadChooseComponent
