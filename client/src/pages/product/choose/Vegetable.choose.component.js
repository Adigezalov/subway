import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setAllVegetableAction, setVegetableAction} from '../../../redux/actions/product.actions'
import ChooseCardComponent from '../../../components/ChooseCard.component'
import {styles} from '../styles'
import colors from '../../../config/colors'

const WINDOW_WIDTH = window.innerWidth

const VegetableChooseComponent = () => {
	const dispatch = useDispatch()
	const vegetableProduct = useSelector(state => state.product.vegetables)
	const vegetables = useSelector(state => state.menu.menu.vegetables)
	const [activeVegetables, setActiveVegetables] = useState(0)

	useEffect(() => {
		let qty = 0
		vegetables.map(vegetable => {
			vegetable.active && ++qty
		})
		setActiveVegetables(qty)
	}, [])

	const setChoose = vegetable => {
		dispatch(setVegetableAction(vegetable))
	}

	const setAllVegetables = all => {
		let newVegetables = []
		all &&
			vegetables.map(vegetable => {
				if (vegetable.active) {
					newVegetables.push({_id: vegetable._id, name: vegetable.vegetable.name})
				}
			})
		dispatch(setAllVegetableAction(newVegetables))
	}

	return (
		<div style={styles.section}>
			<p style={styles.sectionTitle}>Выберите овощи</p>
			<div style={styles.sectionCard}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: WINDOW_WIDTH / 3,
						padding: 3,
						minHeight: 40,
						justifyContent: 'space-between',
					}}
				>
					<div
						onClick={() => setAllVegetables(true)}
						style={Object.assign({}, styles.button, {
							boxShadow:
								vegetableProduct.length === activeVegetables
									? 'inset 0 0 10px rgba(245, 196, 0, 0.5)'
									: 'none',
							borderColor:
								vegetableProduct.length === activeVegetables
									? colors.COLOR_SUBWAY_YELLOW
									: colors.COLOR_INACTIVE,
						})}
					>
						<p style={{fontSize: 12, textAlign: 'center'}}>Все овощи</p>
					</div>
					<div
						onClick={() => setAllVegetables(false)}
						style={Object.assign({}, styles.button, {
							boxShadow: !vegetableProduct.length ? 'inset 0 0 10px rgba(245, 196, 0, 0.5)' : 'none',
							borderColor: !vegetableProduct.length ? colors.COLOR_SUBWAY_YELLOW : colors.COLOR_INACTIVE,
						})}
					>
						<p style={{fontSize: 12, textAlign: 'center'}}>Без овощей</p>
					</div>
				</div>
				{vegetables &&
					vegetables
						.filter(item => item.active)
						.sort((a, b) => (a.position > b.position ? 1 : -1))
						.map((vegetable, i) => {
							const position = {_id: vegetable._id, name: vegetable.vegetable.name}
							let active = false
							vegetableProduct.map(item => {
								if (item._id === vegetable._id) {
									active = true
								}
							})
							return (
								<ChooseCardComponent
									key={i}
									name={vegetable.vegetable.name}
									active={active}
									position={position}
									image={vegetable.vegetable.image}
									setChoose={() => setChoose(position)}
								/>
							)
						})}
			</div>
		</div>
	)
}

export default VegetableChooseComponent
