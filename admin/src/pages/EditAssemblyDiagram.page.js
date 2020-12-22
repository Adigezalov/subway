import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import cyrillicToTranslit from 'cyrillic-to-translit-js'
import {Box, Fab, TextField, Typography} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import {
	cleanAssemblyDiagramAction,
	createAssemblyDiagramAction,
	fetchAssemblyDiagramAction,
} from '../redux/actions/assemblyDiagram.actions'
import {createReset} from '../redux/actions/app.actions'
import MainWrapper from '../layouts/MainWrapper'

const BACK = '/assembly-diagrams'
const TITLE = 'Новая схема сборки'

const EditAssemblyDiagramPage = () => {
	const {id} = useParams()
	const dispatch = useDispatch()
	const history = useHistory()
	const assemblyDiagram = useSelector(state => state.assemblyDiagram.assemblyDiagram)
	const create = useSelector(state => state.app.create)
	const [isNew, setIsNew] = useState(false)
	const [editItem, setEditItem] = useState({name: '', alias: ''})
	const [disabled, setDisabled] = useState(true)

	useEffect(() => {
		return () => {
			dispatch(cleanAssemblyDiagramAction())
			dispatch(createReset())
		}
	}, [])

	useEffect(() => {
		id === 'new' && setIsNew(true)
		id !== 'new' && dispatch(fetchAssemblyDiagramAction({id}))
	}, [id])

	useEffect(() => {
		assemblyDiagram && setEditItem({...assemblyDiagram})
	}, [assemblyDiagram])

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
		dispatch(createAssemblyDiagramAction({editItem}))
	}

	return (
		<MainWrapper>
			<Box>
				<Typography variant={'subtitle1'}>{TITLE}</Typography>
			</Box>
			<Box mt={1}>
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

export default EditAssemblyDiagramPage
