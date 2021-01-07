import React, {useEffect} from 'react'
import MainWrapper from '../layouts/MainWrapper'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Box, Button, ButtonGroup, Checkbox, Fab, FormControlLabel, Paper, Typography} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import {
	activateRestaurantAction,
	fetchRestaurantsAction,
	paidRestaurantAction,
} from '../redux/actions/restaurant.actions'

const RestaurantsPage = () => {
	const dispatch = useDispatch()
	const restaurants = useSelector(state => state.restaurant.restaurants)

	useEffect(() => {
		dispatch(fetchRestaurantsAction())
	}, [])

	const activateRestaurant = (event, id) => {
		dispatch(activateRestaurantAction({active: event.target.checked, id}))
	}

	const paidRestaurant = (event, id) => {
		dispatch(paidRestaurantAction({paid: event.target.checked, id}))
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
								{/*<Button color='primary' component={Link} to={`/restaurant-edit/${restaurant._id}`}>*/}
								{/*	<EditIcon />*/}
								{/*</Button>*/}
							</Box>
							<Box>
								<FormControlLabel
									control={
										<Checkbox
											checked={restaurant.active}
											onChange={event => activateRestaurant(event, restaurant._id)}
											color='primary'
										/>
									}
									label='Актививен'
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={restaurant.paid}
											onChange={event => paidRestaurant(event, restaurant._id)}
											color='primary'
										/>
									}
									label='Оплачен'
								/>
							</Box>
						</Box>
					</Paper>
				))}
			</Box>
		</MainWrapper>
	)
}

export default RestaurantsPage
