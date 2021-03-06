import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import cyrillicToTranslit from 'cyrillic-to-translit-js'
import {Box, Button, Fab, IconButton, MenuItem, TextField, Typography} from '@material-ui/core'
import {API_URL} from '../config/config'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import CheckIcon from '@material-ui/icons/Check'
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox'
import AddBoxIcon from '@material-ui/icons/AddBox'
import {cleanProductAction, createProductAction, fetchProductAction} from '../redux/actions/product.actions'
import {fetchMenuItemsAction} from '../redux/actions/menuItem.actions'
import {createReset} from '../redux/actions/app.actions'
import MainWrapper from '../layouts/MainWrapper'

const BACK = '/products'
const TITLE = 'Новый продукт'

const EditProductPage = () => {
	const {id} = useParams()
	const dispatch = useDispatch()
	const history = useHistory()
	const product = useSelector(state => state.product.product)
	const create = useSelector(state => state.app.create)
	const menuItems = useSelector(state => state.menuItem.menuItems)
	const [isNew, setIsNew] = useState(false)
	const [editItem, setEditItem] = useState({name: '', alias: '', image: '', menuItem: '', description: ''})
	const [modifiers, setModifiers] = useState([])
	const [disabled, setDisabled] = useState(true)
	const [disabledSelect, setDisabledSelect] = useState(true)
	const [previewImage, setPreviewImage] = useState(null)

	useEffect(() => {
		dispatch(fetchMenuItemsAction())
		return () => {
			dispatch(cleanProductAction())
			dispatch(createReset())
		}
	}, [])

	useEffect(() => {
		id === 'new' && setIsNew(true)
		id !== 'new' && dispatch(fetchProductAction({id}))
	}, [id])

	useEffect(() => {
		product && setEditItem({...product})
		product && setModifiers(product.modifiers)
		product && setPreviewImage(`${API_URL}/${product.image}`)
	}, [product])

	useEffect(() => {
		setDisabled(!editItem.name || !editItem.alias)
	}, [editItem])

	useEffect(() => {
		setDisabledSelect(!menuItems.length)
	}, [menuItems])

	useEffect(() => {
		isNew && setEditItem({...editItem, alias: cyrillicToTranslit().transform(editItem.name, '-')})
	}, [editItem.name])

	useEffect(() => {
		create && history.push(BACK)
	}, [create])

	const handleChangeField = (event, field) => {
		setEditItem({...editItem, [field]: event.target.value})
	}

	const handleChangeImage = event => {
		setEditItem({...editItem, image: event.target.files[0]})
		setPreviewImage(URL.createObjectURL(event.target.files[0]))
	}

	const handleAddModifierField = () => {
		modifiers.push({name: '', values: []})
		setModifiers(modifiers.slice())
	}

	const handleRemoveModifierField = index => {
		modifiers.splice(index, 1)
		setModifiers(modifiers.slice())
	}

	const handleAddValueField = index => {
		modifiers[index].values.unshift({name: '', surcharge: 0})
		setModifiers(modifiers.slice())
	}

	const handleRemoveValueField = (indexModifier, indexValue) => {
		modifiers[indexModifier].values.splice(indexValue, 1)
		setModifiers(modifiers.slice())
	}

	const handleChangeModifierField = (event, index) => {
		modifiers[index].name = event.target.value
		setModifiers(modifiers.slice())
	}

	const handleChangeValueField = (event, indexModifier, indexValue) => {
		modifiers[indexModifier].values[indexValue].name = event.target.value
		setModifiers(modifiers.slice())
	}

	const deleteImage = () => {
		setPreviewImage(null)
		setEditItem({...editItem, image: ''})
	}

	const createItem = () => {
		dispatch(createProductAction({editItem: {...editItem, modifiers}}))
	}

	return (
		<MainWrapper>
			<Box>
				<Typography variant={'subtitle1'}>{TITLE}</Typography>
			</Box>
			<Box pb={1}>
				<Box>
					<input
						accept='image/*'
						style={{display: 'none'}}
						id='contained-button-file'
						multiple
						type='file'
						onChange={handleChangeImage}
					/>
					<label htmlFor='contained-button-file'>
						<Button variant='contained' color='primary' component='span' fullWidth>
							{previewImage ? 'Изменить картинку' : 'Выбрать картинку'}
						</Button>
					</label>
				</Box>
				{previewImage ? (
					<Box mb={2} style={{position: 'relative', width: '100%'}}>
						<img src={previewImage} alt={'Image'} style={{width: '100%'}} />
						<IconButton style={{position: 'absolute', top: 5, right: 5}} onClick={deleteImage}>
							<DeleteForeverIcon color={'secondary'} />
						</IconButton>
					</Box>
				) : null}
				<Box mt={2}>
					<TextField
						size={'small'}
						fullWidth
						variant={'outlined'}
						label={'Название'}
						value={editItem.name}
						onChange={event => handleChangeField(event, 'name')}
					/>
				</Box>
				<Box mt={2}>
					<TextField
						size={'small'}
						fullWidth
						variant={'outlined'}
						label={'Псевдоним'}
						value={editItem.alias}
						disabled={!isNew}
						onChange={event => handleChangeField(event, 'alias')}
					/>
				</Box>
				<Box mt={2}>
					<TextField
						select
						fullWidth
						label={'Раздел меню'}
						value={editItem.menuItem}
						onChange={event => handleChangeField(event, 'menuItem')}
						variant={'outlined'}
						size={'small'}
						disabled={disabledSelect}
					>
						{menuItems.map(option => (
							<MenuItem key={option._id} value={option._id}>
								{option.name}
							</MenuItem>
						))}
					</TextField>
				</Box>
				<Box mt={2}>
					<TextField
						size={'small'}
						fullWidth
						variant={'outlined'}
						label={'Описание'}
						value={editItem.description}
						multiline
						rows={4}
						onChange={event => handleChangeField(event, 'description')}
					/>
				</Box>

				<Box mt={2}>
					<Box
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
						}}
					>
						<Typography variant={'subtitle1'}>Модификаторы:</Typography>
						<IconButton size={'small'} onClick={handleAddModifierField}>
							<AddBoxIcon color={'primary'} />
						</IconButton>
					</Box>
					<Box mt={2}>
						{modifiers.map((modifier, i) => (
							<Box key={i}>
								<Box mt={2} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
									<IconButton size={'small'} onClick={() => handleRemoveModifierField(i)}>
										<IndeterminateCheckBoxIcon color={'secondary'} />
									</IconButton>
									<TextField
										size={'small'}
										fullWidth
										variant={'outlined'}
										label={'Название'}
										value={modifier.name}
										onChange={event => handleChangeModifierField(event, i)}
									/>
									<IconButton size={'small'} onClick={() => handleAddValueField(i)}>
										<AddBoxIcon color={'primary'} />
									</IconButton>
								</Box>
								<Box pl={1}>
									{modifier.values.map((value, j) => (
										<Box
											key={j}
											mt={1}
											style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
										>
											<IconButton size={'small'} onClick={() => handleRemoveValueField(i, j)}>
												<IndeterminateCheckBoxIcon color={'secondary'} />
											</IconButton>
											<TextField
												size={'small'}
												fullWidth
												variant={'outlined'}
												label={'Значение'}
												value={value.name}
												onChange={event => handleChangeValueField(event, i, j)}
											/>
										</Box>
									))}
								</Box>
							</Box>
						))}
					</Box>
				</Box>

				<Box position={'fixed'} right={20} bottom={20}>
					<Fab
						size={'medium'}
						color='primary'
						aria-controls='simple-menu'
						aria-haspopup='true'
						disabled={disabled}
						onClick={createItem}
					>
						<CheckIcon />
					</Fab>
				</Box>
			</Box>
		</MainWrapper>
	)
}

export default EditProductPage
