import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Box, Button, ButtonGroup, Checkbox, Fab, Paper, Typography} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import MainWrapper from '../layouts/MainWrapper'
import {activateRestaurantAction, fetchRestaurantsAction} from '../redux/actions/restaurant.actions'

const DashboardPage = () => {
	const dispatch = useDispatch()
	const restaurants = useSelector(state => state.restaurant.restaurants)

	useEffect(() => {
		dispatch(fetchRestaurantsAction())
	}, [])

	const activateRestaurant = (event, id) => {
		dispatch(activateRestaurantAction({active: event.target.checked, id}))
	}

	return (
		<MainWrapper>
			<Box pt={1} pb={1} pr={1} pl={1}>
				{restaurants.map((restaurant, i) => (
					<Paper key={i} elevation={3}>
						<Box p={1}>
							<Box
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
							>
								<Typography variant={'subtitle1'}>Subway №{restaurant.number}</Typography>
								<Checkbox
									checked={restaurant.active}
									onChange={event => activateRestaurant(event, restaurant._id)}
									color='primary'
								/>
							</Box>
							<Typography variant={'subtitle2'}>{restaurant.name}</Typography>
							<Box mt={3} style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
								<ButtonGroup variant='outlined' color={'primary'}>
									<Button component={Link} to={`/restaurant-edit/${restaurant._id}`}>
										<EditIcon />
									</Button>
									<Button component={Link} to={`/menu/${restaurant._id}`}>
										<MenuBookIcon />
									</Button>
								</ButtonGroup>
							</Box>
						</Box>
					</Paper>
				))}
				<Box position={'fixed'} right={20} bottom={20}>
					<Fab
						size={'medium'}
						color='primary'
						aria-controls='simple-menu'
						aria-haspopup='true'
						component={Link}
						to={'/restaurant-edit/new'}
					>
						<AddIcon />
					</Fab>
				</Box>
			</Box>
		</MainWrapper>
	)
}

export default DashboardPage
