import React from 'react'
import {Avatar, Box, Checkbox, IconButton, InputAdornment, ListItem, MenuItem, Paper, TextField, Typography} from '@material-ui/core'
import {API_URL} from '../../config/config'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'

const IMAGE_WIDTH = 70

const AddedComponent = ({
	listItemRef,
	item,
	isMenuSubItem,
	activeItem,
	name,
	field,
	index,
	image,
	withPrice,
	removeItem,
	changePriceItem,
	isProduct,
	changeAssemblyDiagramItem,
	commonAssemblyDiagrams,
	modifiers,
	activeModifierSubItem,
	changePriceModifierSubItem,
}) => {
	return (
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
								checked={item.active}
								onChange={event =>
									!isMenuSubItem
										? activeItem(item[field], event.target.checked)
										: activeItem(item[field], event.target.checked, index)
								}
								color={'primary'}
							/>
							{image && !withPrice ? (
								<Box mr={1}>
									<Avatar
										variant='square'
										src={`${API_URL}/${image}`}
										style={{
											width: IMAGE_WIDTH,
											height: IMAGE_WIDTH / 1.5,
										}}
									/>
								</Box>
							) : null}
							<Typography variant={'h6'}>{name}</Typography>
						</Box>
						<IconButton
							aria-label='delete'
							size={'small'}
							onClick={() => (!isMenuSubItem ? removeItem(item[field]) : removeItem(item[field], index))}
						>
							<RemoveIcon color={'secondary'} />
						</IconButton>
					</Box>
					{withPrice ? (
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
											height: IMAGE_WIDTH / 1.5,
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
									value={item.price}
									onChange={event =>
										!isMenuSubItem
											? changePriceItem(item[field], event.target.value)
											: changePriceItem(item[field], event.target.value, index)
									}
									InputProps={{
										endAdornment: <InputAdornment position='end'>руб.</InputAdornment>,
									}}
								/>
								{isProduct ? (
									<Box mt={1}>
										<TextField
											select
											fullWidth
											label={'Схема сборки'}
											value={item.assemblyDiagram}
											onChange={event =>
												!isMenuSubItem
													? changeAssemblyDiagramItem(item[field], event.target.value)
													: changeAssemblyDiagramItem(item[field], event.target.value, index)
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
								) : null}
							</Box>
						</Box>
					) : null}
					{modifiers && modifiers.length
						? modifiers.map((modifier, m) => {
								return (
									<Box key={m} mt={1} pl={2}>
										<Typography variant={'subtitle1'}>{modifier.name}</Typography>
										{modifier.values.map((value, v) => {
											let checked = false
											let surcharge = 0
											item.modifiers.map(mod => {
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
														onChange={() => activeModifierSubItem(item[field], value._id, index, v)}
														color={'primary'}
													/>
													<TextField
														size={'small'}
														variant={'outlined'}
														label={value.name}
														type={'number'}
														value={surcharge}
														onChange={event =>
															changePriceModifierSubItem(item[field], value._id, index, v, event.target.value)
														}
														InputProps={{
															endAdornment: <InputAdornment position='end'>руб.</InputAdornment>,
															startAdornment: (
																<InputAdornment position='end'>
																	<AddIcon color={'primary'} fontSize={'small'} />
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
	)
}

export default AddedComponent
