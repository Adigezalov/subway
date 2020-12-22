import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Box, List, ListItem, ButtonGroup, Button, Typography, Fab, Avatar} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {deleteSauceAction, fetchSaucesAction} from '../redux/actions/sauce.actions'
import MainWrapper from '../layouts/MainWrapper'
import {DeleteConfirmation} from '../components/DeleteConfirmation'
import {API_URL} from '../config/config'

const LINK_TO_EDIT = '/sauce-edit'
const IMAGE_WIDTH = 48

const SaucesPage = () => {
	const dispatch = useDispatch()
	const items = useSelector(state => state.sauce.sauces)
	const [openDelete, setOpenDelete] = useState(null)

	useEffect(() => {
		dispatch(fetchSaucesAction())
	}, [])

	const deleteItem = id => {
		setOpenDelete(id)
	}

	const successDeleteConfirmation = () => {
		dispatch(deleteSauceAction({id: openDelete}))
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
							<Box
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
								}}
							>
								<Avatar
									variant='square'
									src={`${API_URL}/${item.image}`}
									style={{width: IMAGE_WIDTH, height: IMAGE_WIDTH / 1.5}}
								/>
								<Box ml={1}>
									<Typography variant={'body2'}>{item.name}</Typography>
								</Box>
							</Box>
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

export default SaucesPage
