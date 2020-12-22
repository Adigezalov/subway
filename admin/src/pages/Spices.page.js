import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Box, List, ListItem, ButtonGroup, Button, Typography, Fab} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {cleanSpiceAction, deleteSpiceAction, fetchSpicesAction} from '../redux/actions/spice.actions'
import MainWrapper from '../layouts/MainWrapper'
import {DeleteConfirmation} from '../components/DeleteConfirmation'

const LINK_TO_EDIT = '/spice-edit'

const SpicesPage = () => {
	const dispatch = useDispatch()
	const items = useSelector(state => state.spice.spices)
	const [openDelete, setOpenDelete] = useState(null)

	useEffect(() => {
		return () => {
			dispatch(cleanSpiceAction())
		}
	}, [])

	useEffect(() => {
		dispatch(fetchSpicesAction())
	}, [])

	const deleteItem = id => {
		setOpenDelete(id)
	}

	const successDeleteConfirmation = () => {
		dispatch(deleteSpiceAction({id: openDelete}))
		setOpenDelete(null)
	}

	const closeDeleteConfirmation = () => {
		setOpenDelete(null)
	}

	return (
		<MainWrapper>
			<List>
				{items.map(item => (
					<ListItem key={item._id} style={{paddingLeft: 0, paddingRight: 0}}>
						<Box
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								width: '100%',
							}}
						>
							<Typography variant={'body2'}>{item.name}</Typography>
							<ButtonGroup size={'small'}>
								<Button color={'primary'} component={Link} to={`${LINK_TO_EDIT}/${item._id}`}>
									<EditIcon />
								</Button>
								<Button color={'secondary'} onClick={() => deleteItem(item._id)}>
									<DeleteIcon />
								</Button>
							</ButtonGroup>
						</Box>
					</ListItem>
				))}
			</List>
			<Box position={'fixed'} right={20} bottom={20}>
				<Fab
					size={'medium'}
					color='primary'
					aria-controls='simple-menu'
					aria-haspopup='true'
					component={Link}
					to={`${LINK_TO_EDIT}/new`}
				>
					<AddIcon />
				</Fab>
			</Box>
			<DeleteConfirmation
				visible={Boolean(openDelete)}
				success={successDeleteConfirmation}
				cancel={closeDeleteConfirmation}
			/>
		</MainWrapper>
	)
}

export default SpicesPage
