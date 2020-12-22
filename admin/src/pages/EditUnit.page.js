import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import cyrillicToTranslit from 'cyrillic-to-translit-js'
import {Box, Button, Checkbox, Fab, FormControlLabel, IconButton, TextField, Typography} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import CheckIcon from '@material-ui/icons/Check'
import {cleanUnitAction, createUnitAction, fetchUnitAction} from '../redux/actions/unit.actions'
import {createReset} from '../redux/actions/app.actions'
import {API_URL} from '../config/config'
import MainWrapper from '../layouts/MainWrapper'

const BACK = '/units'
const TITLE = 'Новый юнит'

const EditUnitPage = () => {
	const {id} = useParams()
	const dispatch = useDispatch()
	const history = useHistory()
	const unit = useSelector(state => state.unit.unit)
	const create = useSelector(state => state.app.create)
	const [isNew, setIsNew] = useState(false)
	const [editItem, setEditItem] = useState({
		name: '',
		alias: '',
		description: '',
		imageSixInch: '',
		imageFootLong: '',
		imageWrap: '',
		imageSalad: '',
		isSixInch: true,
		isFootLong: true,
		isWrap: true,
		isSalad: true,
	})
	const [disabled, setDisabled] = useState(true)
	const [previewImage, setPreviewImage] = useState({
		imageSixInch: '',
		imageFootLong: '',
		imageWrap: '',
		imageSalad: '',
	})

	useEffect(() => {
		return () => {
			dispatch(cleanUnitAction())
			dispatch(createReset())
		}
	}, [])

	useEffect(() => {
		id === 'new' && setIsNew(true)
		id !== 'new' && dispatch(fetchUnitAction({id}))
	}, [id])

	useEffect(() => {
		unit && setEditItem({...unit})
		unit &&
			setPreviewImage({
				imageSixInch: `${API_URL}/${unit.imageSixInch}`,
				imageFootLong: `${API_URL}/${unit.imageFootLong}`,
				imageWrap: `${API_URL}/${unit.imageWrap}`,
				imageSalad: `${API_URL}/${unit.imageSalad}`,
			})
	}, [unit])

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

	const handleChangeImage = (event, field) => {
		setEditItem({...editItem, [field]: event.target.files[0]})
		setPreviewImage({...previewImage, [field]: URL.createObjectURL(event.target.files[0])})
	}

	const handleChangeCheckbox = (event, field) => {
		setEditItem({...editItem, [field]: event.target.checked})
	}

	const deleteImage = field => {
		setPreviewImage({...previewImage, [field]: ''})
		setEditItem({...editItem, [field]: ''})
	}

	const createItem = () => {
		dispatch(createUnitAction({editItem}))
	}

	return (
		<MainWrapper>
			<Box pb={2}>
				<Box>
					<Typography variant={'subtitle1'}>{TITLE}</Typography>
				</Box>
				<Box mt={1} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
					<Box style={{width: '49%'}}>
						<input
							accept='image/*'
							style={{display: 'none'}}
							id='contained-button-file-sixinch'
							multiple
							type='file'
							onChange={event => handleChangeImage(event, 'imageSixInch')}
						/>
						<label htmlFor='contained-button-file-sixinch'>
							<Button variant='contained' color='primary' component='span' fullWidth>
								{previewImage.imageSixInch ? 'Изменить 15' : 'Выбрать 15'}
							</Button>
						</label>
					</Box>

					<Box style={{width: '49%'}}>
						<input
							accept='image/*'
							style={{display: 'none'}}
							id='contained-button-file-footlong'
							multiple
							type='file'
							onChange={event => handleChangeImage(event, 'imageFootLong')}
						/>
						<label htmlFor='contained-button-file-footlong'>
							<Button variant='contained' color='primary' component='span' fullWidth>
								{previewImage.imageFootLong ? 'Изменить 30' : 'Выбрать 30'}
							</Button>
						</label>
					</Box>
				</Box>
				<Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} mt={1}>
					<Box style={{width: '49%'}}>
						<input
							accept='image/*'
							style={{display: 'none'}}
							id='contained-button-file-wrap'
							multiple
							type='file'
							onChange={event => handleChangeImage(event, 'imageWrap')}
						/>
						<label htmlFor='contained-button-file-wrap'>
							<Button variant='contained' color='primary' component='span' fullWidth>
								{previewImage.imageWrap ? 'Изменить w' : 'Выбрать w'}
							</Button>
						</label>
					</Box>

					<Box style={{width: '49%'}}>
						<input
							accept='image/*'
							style={{display: 'none'}}
							id='contained-button-file-salad'
							multiple
							type='file'
							onChange={event => handleChangeImage(event, 'imageSalad')}
						/>
						<label htmlFor='contained-button-file-salad'>
							<Button variant='contained' color='primary' component='span' fullWidth>
								{previewImage.imageSalad ? 'Изменить s' : 'Выбрать s'}
							</Button>
						</label>
					</Box>
				</Box>
				<Box
					style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}
					mt={1}
				>
					{previewImage.imageSixInch ? (
						<Box mb={2} style={{position: 'relative', width: '49%'}}>
							<img src={previewImage.imageSixInch} alt={'Image'} style={{width: '100%'}} />
							<IconButton
								style={{position: 'absolute', top: 5, right: 5}}
								onClick={() => deleteImage('imageSixInch')}
							>
								<DeleteForeverIcon color={'secondary'} />
							</IconButton>
						</Box>
					) : null}

					{previewImage.imageFootLong ? (
						<Box mb={2} style={{position: 'relative', width: '49%'}}>
							<img src={previewImage.imageFootLong} alt={'Image'} style={{width: '100%'}} />
							<IconButton
								style={{position: 'absolute', top: 5, right: 5}}
								onClick={() => deleteImage('imageFootLong')}
							>
								<DeleteForeverIcon color={'secondary'} />
							</IconButton>
						</Box>
					) : null}

					{previewImage.imageWrap ? (
						<Box mb={2} style={{position: 'relative', width: '49%'}}>
							<img src={previewImage.imageWrap} alt={'Image'} style={{width: '100%'}} />
							<IconButton
								style={{position: 'absolute', top: 5, right: 5}}
								onClick={() => deleteImage('imageWrap')}
							>
								<DeleteForeverIcon color={'secondary'} />
							</IconButton>
						</Box>
					) : null}

					{previewImage.imageSalad ? (
						<Box mb={2} style={{position: 'relative', width: '49%'}}>
							<img src={previewImage.imageSalad} alt={'Image'} style={{width: '100%'}} />
							<IconButton
								style={{position: 'absolute', top: 5, right: 5}}
								onClick={() => deleteImage('imageSalad')}
							>
								<DeleteForeverIcon color={'secondary'} />
							</IconButton>
						</Box>
					) : null}
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
					<FormControlLabel
						control={
							<Checkbox
								color='primary'
								checked={editItem.isSixInch}
								onChange={event => handleChangeCheckbox(event, 'isSixInch')}
							/>
						}
						label='Может быть SixInch'
					/>
				</Box>
				<Box mt={2}>
					<FormControlLabel
						control={
							<Checkbox
								color='primary'
								checked={editItem.isFootLong}
								onChange={event => handleChangeCheckbox(event, 'isFootLong')}
							/>
						}
						label='Может быть FootLong'
					/>
				</Box>
				<Box mt={2}>
					<FormControlLabel
						control={
							<Checkbox
								color='primary'
								checked={editItem.isWrap}
								onChange={event => handleChangeCheckbox(event, 'isWrap')}
							/>
						}
						label='Может быть Wrap'
					/>
				</Box>
				<Box mt={2}>
					<FormControlLabel
						control={
							<Checkbox
								color='primary'
								checked={editItem.isSalad}
								onChange={event => handleChangeCheckbox(event, 'isSalad')}
							/>
						}
						label='Может быть Salad'
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
			</Box>
		</MainWrapper>
	)
}

export default EditUnitPage
