import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Box, List, ListItem, ButtonGroup, Button, Typography, Fab} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import {fetchUsersAction} from '../redux/actions/user.actions'
import MainWrapper from '../layouts/MainWrapper'

const LINK_TO_EDIT = '/user-edit'

const UsersPage = () => {
	const dispatch = useDispatch()
	const items = useSelector(state => state.user.users)

	useEffect(() => {
		dispatch(fetchUsersAction())
	}, [])

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
							<Typography variant={'body1'} style={{color: item.admin ? 'orange' : null}}>
								{item.email}
							</Typography>
							<ButtonGroup size={'small'}>
								<Button color={'primary'} component={Link} to={`${LINK_TO_EDIT}/${item._id}`}>
									<EditIcon />
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
		</MainWrapper>
	)
}

export default UsersPage
