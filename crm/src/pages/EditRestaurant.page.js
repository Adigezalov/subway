import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import MainWrapper from '../layouts/MainWrapper'
import {Box, Checkbox, Fab, FormControlLabel, InputAdornment, TextField, Typography, Paper, MenuList, ListItem} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import GpsFixedIcon from '@material-ui/icons/GpsFixed'
import {defaultWeek} from '../config/defaultWeek'
import {cleanAddressesAction, fetchAddressesAction} from '../redux/actions/address.actions'
import {fetchPaymentOptionsAction} from '../redux/actions/paymentOption.actions'
import {cleanRestaurantAction, createRestaurantAction, fetchRestaurantAction} from '../redux/actions/restaurant.actions'
import {PhoneMask} from '../components/PhoneMask'
import {DebounceField} from '../components/DebounceField'

const BACK = '/'
const TITLE = 'Новый ресторан'

const EditRestaurantPage = () => {
	const {id} = useParams()
	const dispatch = useDispatch()
	const restaurant = useSelector(state => state.restaurant.restaurant)
	const addresses = useSelector(state => state.address.addresses)
	const paymentOptions = useSelector(state => state.paymentOption.paymentOptions)
	const [isNew, setIsNew] = useState(false)
	const [disabled, setDisabled] = useState(true)
	const [editRestaurant, setEditRestaurant] = useState({
		name: '',
		number: '',
		phone: '',
		address: '',
		latitude: 0.0,
		longitude: 0.0,
		delivery: false,
		pickup: true,
		amountForFreeDelivery: 0,
		distanceForFreeDelivery: 0,
		timeForStopDelivery: '',
	})
	const [schedule, setSchedule] = useState(defaultWeek)
	const [payment, setPayment] = useState([])
	const [visibleSuggestions, setVisibleSuggestions] = useState(false)

	useEffect(() => {
		dispatch(fetchPaymentOptionsAction())
		return () => {
			dispatch(cleanAddressesAction())
			dispatch(cleanRestaurantAction())
		}
	}, [])

	useEffect(() => {
		id === 'new' && setIsNew(true)
		id !== 'new' && dispatch(fetchRestaurantAction({id}))
	}, [id])

	useEffect(() => {
		restaurant && setEditRestaurant({...restaurant})
		restaurant && setSchedule(restaurant.schedule)
		restaurant && setPayment(restaurant.payment)
	}, [restaurant])

	useEffect(() => {
		setDisabled(!editRestaurant.name || !editRestaurant.number || !editRestaurant.phone || !editRestaurant.address || !payment.length)
	}, [editRestaurant, payment])

	useEffect(() => {
		editRestaurant.address && dispatch(fetchAddressesAction({address: editRestaurant.address}))
	}, [editRestaurant.address])

	const handleChangeField = (event, field) => {
		setEditRestaurant({...editRestaurant, [field]: event.target.value})
	}

	const handleChangeCheckbox = (event, field) => {
		setEditRestaurant({...editRestaurant, [field]: event.target.checked})
	}

	const handleChangeDayField = (event, field, index) => {
		schedule[index][field] = event.target.value
		setSchedule(schedule.slice())
	}

	const handleChangeDayCheckbox = (event, index) => {
		schedule[index].isWorkingDay = event.target.checked
		setSchedule(schedule.slice())
	}

	const handleChangePaymentField = (event, id) => {
		let newPayment
		if (event.target.checked) {
			newPayment = payment
			newPayment.push(id)
		} else {
			newPayment = payment.filter(item => item !== id)
		}
		setPayment(newPayment.slice())
	}

	const renderSchedule = () => {
		return schedule.map((day, i) => (
			<Box key={i} mt={2} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
				<Box>
					<Checkbox
						color='primary'
						style={{paddingLeft: 0}}
						size={'small'}
						checked={day.isWorkingDay}
						onChange={event => handleChangeDayCheckbox(event, i)}
					/>
					<Typography variant={'caption'}>{day.name}</Typography>
				</Box>
				<Box style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
					<Box mr={1}>
						<TextField
							size={'small'}
							fullWidth
							variant={'outlined'}
							label={'С'}
							type={'time'}
							value={day.from}
							onChange={event => handleChangeDayField(event, 'from', i)}
							InputProps={{
								style: {fontSize: 12},
								step: 1800,
							}}
						/>
					</Box>
					<TextField
						size={'small'}
						fullWidth
						variant={'outlined'}
						label={'До'}
						type={'time'}
						value={day.to}
						onChange={event => handleChangeDayField(event, 'to', i)}
						InputProps={{
							style: {fontSize: 12},
							step: 1800,
						}}
					/>
				</Box>
			</Box>
		))
	}

	const renderPaymentOptions = () => {
		return paymentOptions.map((paymentOption, i) => {
			let checked = payment.includes(paymentOption._id)
			return (
				<Box key={i}>
					<FormControlLabel
						control={
							<Checkbox color='primary' checked={checked} onChange={event => handleChangePaymentField(event, paymentOption._id)} />
						}
						label={paymentOption.name}
					/>
				</Box>
			)
		})
	}

	const createRestaurant = () => {
		dispatch(createRestaurantAction({editRestaurant: {...editRestaurant, schedule, payment}}))
	}

	const handleChooseAddress = selected => {
		setEditRestaurant({
			...editRestaurant,
			latitude: selected.geo_lat,
			longitude: selected.geo_lon,
			address: `${selected.city}, ${selected.street_with_type}, ${selected.house}`,
		})
		setVisibleSuggestions(false)
	}

	return (
		<MainWrapper>
			<Box pb={2} pr={1} pl={1}>
				<Box>
					<Typography variant={'h6'}>{TITLE}</Typography>
				</Box>
				<Box mt={1}>
					<TextField
						size={'small'}
						fullWidth
						variant={'outlined'}
						label={'Название'}
						value={editRestaurant.name}
						onChange={event => handleChangeField(event, 'name')}
					/>
				</Box>
				<Box mt={2}>
					<TextField
						disabled={!isNew}
						size={'small'}
						fullWidth
						variant={'outlined'}
						label={'Номер в системе Subway'}
						value={editRestaurant.number}
						onChange={event => handleChangeField(event, 'number')}
					/>
				</Box>
				<Box mt={2}>
					<TextField
						size={'small'}
						fullWidth
						variant={'outlined'}
						label={'Номер телефона'}
						value={editRestaurant.phone}
						onChange={event => handleChangeField(event, 'phone')}
						InputProps={{inputComponent: PhoneMask}}
					/>
				</Box>
				<Box mt={2} position={'relative'}>
					<TextField
						size={'small'}
						fullWidth
						variant={'outlined'}
						label={'Адрес'}
						multiline
						rows={3}
						value={editRestaurant.address}
						onChange={event => handleChangeField(event, 'address')}
						onBlur={() => {
							setTimeout(() => setVisibleSuggestions(false), 50)
						}}
						onFocus={() => setVisibleSuggestions(true)}
						InputProps={{
							inputComponent: DebounceField,
						}}
					/>
					{addresses.length && visibleSuggestions ? (
						<Box position={'absolute'} top={80} style={{backgroundColor: 'white', zIndex: 10}}>
							<Paper elevation={3}>
								<MenuList>
									{addresses.map((address, i) => (
										<ListItem
											key={i}
											onClick={() => {
												handleChooseAddress(address.data)
											}}
										>
											<Typography>{address.value}</Typography>
										</ListItem>
									))}
								</MenuList>
							</Paper>
						</Box>
					) : null}
					<Box position={'absolute'} top={-9} right={5}>
						<GpsFixedIcon fontSize={'small'} style={{color: editRestaurant.latitude && editRestaurant.longitude ? 'green' : 'grey'}} />
					</Box>
				</Box>
				<Box
					mt={1}
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<FormControlLabel
						control={
							<Checkbox color='primary' checked={editRestaurant.delivery} onChange={event => handleChangeCheckbox(event, 'delivery')} />
						}
						label='Доставка'
					/>
					<FormControlLabel
						control={
							<Checkbox color='primary' checked={editRestaurant.pickup} onChange={event => handleChangeCheckbox(event, 'pickup')} />
						}
						label='Самовынос'
					/>
				</Box>
				{editRestaurant.delivery ? (
					<>
						<Box mt={1}>
							<TextField
								size={'small'}
								fullWidth
								variant={'outlined'}
								label={'Сумма бесплатной доставки'}
								type={'number'}
								value={editRestaurant.amountForFreeDelivery}
								onChange={event => handleChangeField(event, 'amountForFreeDelivery')}
								InputProps={{
									endAdornment: <InputAdornment position='end'>руб.</InputAdornment>,
								}}
							/>
						</Box>
						<Box mt={2}>
							<TextField
								size={'small'}
								fullWidth
								variant={'outlined'}
								label={'Радиус бесплатной доставки'}
								type={'number'}
								value={editRestaurant.distanceForFreeDelivery}
								onChange={event => handleChangeField(event, 'distanceForFreeDelivery')}
								InputProps={{
									endAdornment: <InputAdornment position='end'>м.</InputAdornment>,
								}}
							/>
						</Box>
						<Box mt={2}>
							<TextField
								size={'small'}
								fullWidth
								variant={'outlined'}
								label={'Оформление доставки'}
								type={'time'}
								value={editRestaurant.timeForStopDelivery}
								onChange={event => handleChangeField(event, 'timeForStopDelivery')}
								InputProps={{
									startAdornment: <InputAdornment position='start'>до</InputAdornment>,
									step: 1800,
								}}
							/>
						</Box>
					</>
				) : null}
				<Box mt={2}>
					<Typography variant={'h6'}>Режим работы</Typography>
				</Box>
				<Box mt={2}>{renderSchedule()}</Box>
				<Box mt={2}>
					<Typography variant={'h6'}>Способы оплаты</Typography>
				</Box>
				<Box>{renderPaymentOptions()}</Box>
			</Box>
			<Box position={'fixed'} right={20} bottom={20}>
				<Fab size={'medium'} color='primary' disabled={disabled} onClick={createRestaurant}>
					<CheckIcon />
				</Fab>
			</Box>
		</MainWrapper>
	)
}

export default EditRestaurantPage
