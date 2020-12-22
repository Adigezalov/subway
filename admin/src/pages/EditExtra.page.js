import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import cyrillicToTranslit from 'cyrillic-to-translit-js'
import {Box, Button, Fab, IconButton, TextField, Typography} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import CheckIcon from '@material-ui/icons/Check'
import {cleanExtraAction, createExtraAction, fetchExtraAction} from '../redux/actions/extra.actions'
import {createReset} from '../redux/actions/app.actions'
import {API_URL} from '../config/config'
import MainWrapper from '../layouts/MainWrapper'

const BACK = '/extras'
const TITLE = 'Новый доп'

const EditExtraPage = () => {
	const {id} = useParams()
	const dispatch = useDispatch()
	const history = useHistory()
	const extra = useSelector(state => state.extra.extra)
	const create = useSelector(state => state.app.create)
	const [isNew, setIsNew] = useState(false)
	const [editItem, setEditItem] = useState({name: '', alias: '', image: ''})
	const [disabled, setDisabled] = useState(true)
	const [previewImage, setPreviewImage] = useState(null)

	useEffect(() => {
		return () => {
			dispatch(cleanExtraAction())
			dispatch(createReset())
		}
	}, [])

	useEffect(() => {
		id === 'new' && setIsNew(true)
		id !== 'new' && dispatch(fetchExtraAction({id}))
	}, [id])

	useEffect(() => {
		extra && setEditItem({...extra})
		extra && setPreviewImage(`${API_URL}/${extra.image}`)
	}, [extra])

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

	const handleChangeImage = event => {
		setEditItem({...editItem, image: event.target.files[0]})
		setPreviewImage(URL.createObjectURL(event.target.files[0]))
	}

	const deleteImage = () => {
		setPreviewImage(null)
		setEditItem({...editItem, image: ''})
	}

	const createItem = () => {
		dispatch(createExtraAction({editItem}))
	}

	return (
		<MainWrapper>
			<Box>
				<Typography variant={'subtitle1'}>{TITLE}</Typography>
			</Box>
			<Box mt={1}>
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

export default EditExtraPage
