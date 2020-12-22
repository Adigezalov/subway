import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {TextField, Button, Box} from '@material-ui/core'
import {logInAction} from '../redux/actions/authorization.actions'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	form: {
		display: 'flex',
		width: 300,
		flexDirection: 'column',
	},
}))

const LoginPage = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [disabled, setDisabled] = useState(true)

	useEffect(() => {
		email.length && password.length ? setDisabled(false) : setDisabled(true)
	}, [email, password])

	const logIn = () => {
		dispatch(logInAction({email, password}))
	}

	return (
		<Box className={classes.root}>
			<Box className={classes.form}>
				<Box mb={1}>
					<TextField
						size={'small'}
						fullWidth
						variant={'outlined'}
						label={'Логин'}
						value={email}
						onChange={event => {
							setEmail(event.target.value)
						}}
					/>
				</Box>
				<Box mb={1}>
					<TextField
						size={'small'}
						fullWidth
						type={'password'}
						variant={'outlined'}
						label={'Пароль'}
						value={password}
						onChange={event => {
							setPassword(event.target.value)
						}}
					/>
				</Box>
				<Box>
					<Button
						size={'small'}
						fullWidth
						variant='contained'
						color='primary'
						disabled={disabled}
						onClick={logIn}
					>
						Войти
					</Button>
				</Box>
			</Box>
		</Box>
	)
}

export default LoginPage
