import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setAllSpiceAction, setSpiceAction} from '../../../redux/actions/product.actions'
import ChooseCardComponent from '../../../components/ChooseCard.component'
import {styles} from '../styles'

const SpiceChooseComponent = () => {
	const dispatch = useDispatch()
	const spiceProduct = useSelector(state => state.product.spices)
	const spices = useSelector(state => state.menu.menu.spices)

	const setChoose = spice => {
		dispatch(setSpiceAction(spice))
	}

	const setAllSpices = () => {
		dispatch(setAllSpiceAction())
	}

	return (
		<div style={styles.section}>
			<p style={styles.sectionTitle}>Выберите специи</p>
			<div style={styles.sectionCard}>
				<ChooseCardComponent
					name={'Без специй'}
					active={!spiceProduct.length}
					setChoose={() => setAllSpices()}
				/>
				{spices &&
					spices
						.filter(item => item.active)
						.sort((a, b) => (a.position > b.position ? 1 : -1))
						.map((spice, i) => {
							const position = {_id: spice._id, name: spice.spice.name}
							let active = false
							spiceProduct.map(item => {
								if (item._id === spice._id) {
									active = true
								}
							})
							return (
								<ChooseCardComponent
									key={i}
									name={spice.spice.name}
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

export default SpiceChooseComponent
