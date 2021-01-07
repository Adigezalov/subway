import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {styles} from '../styles'
import ChooseCardComponent from '../../../components/ChooseCard.component'
import {setModifierAction} from '../../../redux/actions/product.actions'

const ModifierChooseComponent = () => {
	const dispatch = useDispatch()
	const modifierProduct = useSelector(state => state.product.modifiers)
	const modifiers = useSelector(state =>
		state.product.product.product
			? state.product.product.product.modifiers
			: state.product.product.promotion.modifiers
	)
	const activeModifiers = useSelector(state => state.product.product.modifiers)

	const setChoose = modifier => {
		dispatch(setModifierAction(modifier))
	}

	return (
		<>
			{activeModifiers && activeModifiers.length
				? modifiers &&
				  modifiers.map((modifier, i) => {
						return (
							<div key={i} style={styles.section}>
								<p style={styles.sectionTitle}>{modifier.name}</p>
								<div style={styles.sectionCard}>
									{modifier.values.map((value, j) => {
										return activeModifiers.map((activeModifier, m) => {
											if (activeModifier.value === value._id) {
												if (activeModifier.active) {
													const position = {
														_id: activeModifier._id,
														modifierGroup: modifier._id,
														name: value.name,
														price: activeModifier.surcharge,
													}
													let active = false
													modifierProduct.map(item => {
														if (item._id === activeModifier._id) {
															active = true
														}
													})
													return (
														<ChooseCardComponent
															key={j}
															name={value.name}
															active={active}
															setChoose={() => setChoose(position)}
															price={activeModifier.surcharge}
														/>
													)
												}
											}
										})
									})}
								</div>
							</div>
						)
				  })
				: null}
		</>
	)
}

// {activeModifiers
// 		.filter(item => item.active)
// 		.map((activeModifier, i) => {
// 			let name = ''
// 			modifier.values.map(value => {
// 				if (activeModifier.value === value._id) {
// 					name = value.name
// 				}
// 			})
// 			const position = {
// 				_id: activeModifier._id,
// 				modifierGroup: modifier._id,
// 				name: name,
// 				price: activeModifier.surcharge,
// 			}
// 			let active = false
// 			modifierProduct.map(item => {
// 				if (item._id === activeModifier._id) {
// 					active = true
// 				}
// 			})
// 			return (
// 					<ChooseCardComponent
// 							key={i}
// 							name={name}
// 							active={active}
// 							setChoose={() => setChoose(position)}
// 							price={activeModifier.surcharge}
// 					/>
// 			)
// 		})}

export default ModifierChooseComponent
