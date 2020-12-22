import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {Box, Checkbox, Fab, FormControlLabel, TextField, Typography} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import {cleanUserAction, createUserAction, fetchUserAction} from '../redux/actions/user.actions'
import {createReset} from '../redux/actions/app.actions'
import MainWrapper from '../layouts/MainWrapper'

const BACK = '/users'
const TITLE = 'Новый пользователь'

const EditUserPage = () => {
	const {id} = useParams()
	const dispatch = useDispatch()
	const history = useHistory()
	const user = useSelector(state => state.user.user)
	const create = useSelector(state => state.app.create)
	const [isNew, setIsNew] = useState(false)
	const [editItem, setEditItem] = useState({
		email: '',
		password: '',
		oldPassword: '',
		admin: false,
		restaurateur: true,
		legalEntity: '',
		itn: '',
		psrn: '',
		address: '',
	})
	const [disabled, setDisabled] = useState(true)

	useEffect(() => {
		return () => {
			dispatch(cleanUserAction())
			dispatch(createReset())
		}
	}, [])

	useEffect(() => {
		id === 'new' && setIsNew(true)
		id !== 'new' && dispatch(fetchUserAction({id}))
	}, [id])

	useEffect(() => {
		user && setEditItem({...user, oldPassword: '', password: ''})
	}, [user])

	useEffect(() => {
		isNew && setDisabled(!editItem.email || !editItem.password)
		!isNew && setDisabled(!editItem.email || !editItem.password || !editItem.oldPassword)
	}, [editItem])

	useEffect(() => {
		create && history.push(BACK)
	}, [create])

	const handleChangeField = (event, field) => {
		setEditItem({...editItem, [field]: event.target.value})
	}

	const handleChangeCheckbox = (event, field) => {
		setEditItem({...editItem, [field]: event.target.checked})
	}

	const createItem = () => {
		dispatch(createUserAction({editItem}))
	}

	return (
		<MainWrapper>
			<Box>
				<Typography variant={'subtitle1'}>{TITLE}</Typography>
			</Box>
			<Box mt={1}>
				<TextField
					disabled={!isNew}
					size={'small'}
					fullWidth
					variant={'outlined'}
					label={'Email'}
					value={editItem.email}
					onChange={event => handleChangeField(event, 'email')}
				/>
			</Box>
			<Box mt={2}>
				<TextField
					size={'small'}
					fullWidth
					variant={'outlined'}
					label={'Юр.лицо'}
					value={editItem.legalEntity}
					onChange={event => handleChangeField(event, 'legalEntity')}
				/>
			</Box>
			<Box mt={2}>
				<TextField
					size={'small'}
					fullWidth
					variant={'outlined'}
					label={'ИНН'}
					value={editItem.itn}
					onChange={event => handleChangeField(event, 'itn')}
				/>
			</Box>
			<Box mt={2}>
				<TextField
					size={'small'}
					fullWidth
					variant={'outlined'}
					label={'ОГРН'}
					value={editItem.psrn}
					onChange={event => handleChangeField(event, 'psrn')}
				/>
			</Box>
			<Box mt={2}>
				<TextField
					size={'small'}
					fullWidth
					variant={'outlined'}
					label={'Юр.адрес'}
					multiline
					rows={3}
					value={editItem.address}
					onChange={event => handleChangeField(event, 'address')}
				/>
			</Box>
			{!isNew ? (
				<Box mt={2}>
					<Typography variant={'subtitle1'}>Изменить пароль</Typography>
				</Box>
			) : null}
			{!isNew ? (
				<Box mt={2}>
					<TextField
						size={'small'}
						fullWidth
						variant={'outlined'}
						label={'Текущий пароль'}
						value={editItem.oldPassword}
						onChange={event => handleChangeField(event, 'oldPassword')}
					/>
				</Box>
			) : null}
			<Box mt={2}>
				<TextField
					size={'small'}
					fullWidth
					variant={'outlined'}
					label={'Новый пароль'}
					value={editItem.password}
					onChange={event => handleChangeField(event, 'password')}
				/>
			</Box>
			<Box mt={2}>
				<FormControlLabel
					control={
						<Checkbox
							color='primary'
							checked={editItem.admin}
							onChange={event => handleChangeCheckbox(event, 'admin')}
						/>
					}
					label='Администратор'
				/>
			</Box>
			<Box mt={2}>
				<FormControlLabel
					control={
						<Checkbox
							color='primary'
							checked={editItem.restaurateur}
							onChange={event => handleChangeCheckbox(event, 'restaurateur')}
						/>
					}
					label='Ресторатор'
				/>
			</Box>
			<Box position={'fixed'} right={20} bottom={20}>
				<Fab
					size={'medium'}
					color='primary'
					aria-controls='simple-menu'
					aria-haspopup='true'
					disabled={isNew ? disabled : false}
					onClick={createItem}
				>
					<CheckIcon />
				</Fab>
			</Box>
		</MainWrapper>
	)
}

export default EditUserPage
