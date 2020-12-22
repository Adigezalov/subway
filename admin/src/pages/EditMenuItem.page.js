import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import cyrillicToTranslit from 'cyrillic-to-translit-js'
import {Box, Fab, TextField, Typography} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import {cleanMenuItemAction, createMenuItemAction, fetchMenuItemAction} from '../redux/actions/menuItem.actions'
import {createReset} from '../redux/actions/app.actions'
import MainWrapper from '../layouts/MainWrapper'

const BACK = '/menu-items'
const TITLE = 'Новый пункт меню'

const EditMenuItemPage = () => {
	const {id} = useParams()
	const dispatch = useDispatch()
	const history = useHistory()
	const menuItem = useSelector(state => state.menuItem.menuItem)
	const create = useSelector(state => state.app.create)
	const [isNew, setIsNew] = useState(false)
	const [editItem, setEditItem] = useState({name: '', alias: '', image: ''})
	const [disabled, setDisabled] = useState(true)

	useEffect(() => {
		return () => {
			dispatch(cleanMenuItemAction())
			dispatch(createReset())
		}
	}, [])

	useEffect(() => {
		id === 'new' && setIsNew(true)
		id !== 'new' && dispatch(fetchMenuItemAction({id}))
	}, [id])

	useEffect(() => {
		menuItem && setEditItem({...menuItem})
	}, [menuItem])

	useEffect(() => {
		setDisabled(!editItem.name || !editItem.alias)
	}, [editItem])

	useEffect(() => {
		isNew && setEditItem({...editItem, alias: cyrillicToTranslit().transform(editItem.name, '-')})
	}, [editItem.name])

	useEffect(() => {
		create && history.push(BACK)
	}, [create])

	const handleChangeField = (event, field) => {
		setEditItem({...editItem, [field]: event.target.value})
	}

	const createItem = () => {
		dispatch(createMenuItemAction({editItem}))
	}

	return (
		<MainWrapper>
			<Box>
				<Typography variant={'subtitle1'}>{TITLE}</Typography>
			</Box>
			<Box mt={1}>
				<Typography variant={'caption'}>
					Не надо создавать разделы: Сэндвичи, Роллы, Салаты, Акции. Они будут по умолчанию.
				</Typography>
			</Box>
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
		</MainWrapper>
	)
}

export default EditMenuItemPage
