import React, {useRef, useState} from 'react'
import {Avatar, Box, Checkbox, Divider, IconButton, InputAdornment, List, ListItem, MenuItem, Paper, TextField, Typography} from '@material-ui/core'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import {API_URL} from '../../config/config'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

const IMAGE_WIDTH = 70

const PromotionsPanel = ({
	changePositionPromotion,
	promotions,
	commonPromotions,
	addPromotion,
	commonAssemblyDiagrams,
	activePromotion,
	removePromotion,
	changePricePromotion,
	changeAssemblyDiagramPromotion,
	activeModifierPromotion,
	changePriceModifierPromotion,
}) => {
	const listItemRef = useRef()
	const [padding, setPadding] = useState(0)

	return (
		<Box pb={5}>
			<DragDropContext
				onDragEnd={result => {
					setPadding(0)
					changePositionPromotion(result.draggableId, result.source.index, result.destination.index)
				}}
				onDragStart={() => {
					setPadding(listItemRef.current.clientHeight)
				}}
			>
				<Droppable droppableId='droppable'>
					{(provided, snapshot) => (
						<List disablePadding {...provided.droppableProps} ref={provided.innerRef} style={{paddingBottom: padding}}>
							{promotions
								.sort((a, b) => {
									return a.position - b.position
								})
								.map((promotion, i) => {
									let name = ''
									let image = ''
									let modifiers = []
									commonPromotions.map(commonPromotion => {
										if (commonPromotion._id === promotion['promotion']) {
											name = commonPromotion.name
											image = commonPromotion.image
											modifiers = commonPromotion.modifiers
										}
									})
									return (
										<Draggable key={promotion['promotion']} draggableId={promotion['promotion']} index={i}>
											{(provided, snapshot) => (
												<Box mb={1} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
													<Paper elevation={3}>
														<ListItem disableGutters ref={listItemRef} style={{boxSizing: 'border-box'}}>
															<Box
																style={{
																	display: 'flex',
																	flexDirection: 'column',
																	width: '100%',
																}}
															>
																<Box
																	style={{
																		display: 'flex',
																		flexDirection: 'row',
																		width: '100%',
																		alignItems: 'center',
																		justifyContent: 'space-between',
																	}}
																>
																	<Box
																		style={{
																			display: 'flex',
																			flexDirection: 'row',
																			alignItems: 'center',
																		}}
																	>
																		<Checkbox
																			style={{paddingLeft: 0}}
																			checked={promotion.active}
																			onChange={event =>
																				activePromotion(promotion.promotion, event.target.checked)
																			}
																			color={'primary'}
																		/>
																		<Typography variant={'h6'}>{name}</Typography>
																	</Box>
																	<IconButton
																		aria-label='delete'
																		size={'small'}
																		onClick={() => removePromotion(promotion.promotion)}
																	>
																		<RemoveIcon color={'secondary'} />
																	</IconButton>
																</Box>

																<Box
																	style={{
																		display: 'flex',
																		flexDirection: 'row',
																	}}
																	mt={1}
																>
																	{image ? (
																		<Box mr={1}>
																			<Avatar
																				variant='square'
																				src={`${API_URL}/${image}`}
																				style={{
																					width: IMAGE_WIDTH,
																					height: IMAGE_WIDTH,
																				}}
																			/>
																		</Box>
																	) : null}
																	<Box style={{width: '100%'}}>
																		<TextField
																			fullWidth
																			size={'small'}
																			variant={'outlined'}
																			label={'Стоимость'}
																			type={'number'}
																			value={promotion.price}
																			onChange={event =>
																				changePricePromotion(promotion.promotion, event.target.value)
																			}
																			InputProps={{
																				endAdornment: <InputAdornment position='end'>руб.</InputAdornment>,
																			}}
																		/>
																		<Box mt={1}>
																			<TextField
																				select
																				fullWidth
																				label={'Схема сборки'}
																				value={promotion.assemblyDiagram}
																				onChange={event =>
																					changeAssemblyDiagramPromotion(
																						promotion.promotion,
																						event.target.value
																					)
																				}
																				variant={'outlined'}
																				size={'small'}
																			>
																				{commonAssemblyDiagrams.map(option => (
																					<MenuItem key={option._id} value={option._id}>
																						{option.name}
																					</MenuItem>
																				))}
																			</TextField>
																		</Box>
																	</Box>
																</Box>
																{modifiers && modifiers.length
																	? modifiers.map((modifier, m) => {
																			return (
																				<Box key={m} mt={1} pl={2}>
																					<Typography variant={'subtitle1'}>{modifier.name}</Typography>
																					{modifier.values.map((value, v) => {
																						let checked = false
																						let surcharge = 0
																						promotion.modifiers.map(mod => {
																							if (mod.value === value._id) {
																								checked = mod.active
																								surcharge = mod.surcharge
																							}
																						})
																						return (
																							<Box
																								key={v}
																								mt={1}
																								style={{
																									display: 'flex',
																									flexDirection: 'row',
																									alignItems: 'center',
																								}}
																							>
																								<Checkbox
																									style={{
																										paddingLeft: 0,
																										paddingBottom: 0,
																										paddingTop: 0,
																									}}
																									checked={checked}
																									onChange={() =>
																										activeModifierPromotion(
																											promotion.promotion,
																											value._id
																										)
																									}
																									color={'primary'}
																								/>
																								<TextField
																									size={'small'}
																									variant={'outlined'}
																									label={value.name}
																									type={'number'}
																									value={surcharge}
																									onChange={event =>
																										changePriceModifierPromotion(
																											promotion.promotion,
																											value._id,
																											event.target.value
																										)
																									}
																									InputProps={{
																										endAdornment: (
																											<InputAdornment position='end'>
																												руб.
																											</InputAdornment>
																										),
																										startAdornment: (
																											<InputAdornment position='end'>
																												<AddIcon
																													color={'primary'}
																													fontSize={'small'}
																												/>
																											</InputAdornment>
																										),
																									}}
																								/>
																							</Box>
																						)
																					})}
																				</Box>
																			)
																	  })
																	: null}
															</Box>
														</ListItem>
													</Paper>
												</Box>
											)}
										</Draggable>
									)
								})}
						</List>
					)}
				</Droppable>
			</DragDropContext>
			<Divider />
			<List disablePadding>
				{commonPromotions.map((commonPromotion, i) => {
					let visible = true
					promotions.map(promotion => {
						if (commonPromotion._id === promotion['promotion']) {
							visible = false
						}
					})
					return visible ? (
						<ListItem disableGutters key={i}>
							<Box
								style={{
									display: 'flex',
									flexDirection: 'row',
									width: '100%',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
							>
								<Box style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
									{commonPromotion.image ? (
										<Box mr={1}>
											<Avatar
												variant='square'
												src={`${API_URL}/${commonPromotion.image}`}
												style={{
													width: IMAGE_WIDTH,
													height: IMAGE_WIDTH,
												}}
											/>
										</Box>
									) : null}
									{commonPromotion.name}
								</Box>
								<IconButton
									aria-label='delete'
									size={'small'}
									onClick={() => {
										addPromotion(commonPromotion)
									}}
								>
									<AddIcon color={'primary'} />
								</IconButton>
							</Box>
						</ListItem>
					) : null
				})}
			</List>
		</Box>
	)
}

export default PromotionsPanel
