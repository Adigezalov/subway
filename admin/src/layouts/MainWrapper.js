import React from 'react'
import {useDispatch} from 'react-redux'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, Button, Box, IconButton} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {logOutAction} from '../redux/actions/authorization.actions'

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: '100%',
	},
	title: {
		flexGrow: 1,
		textDecoration: 'none',
		color: 'white',
	},
}))

const MainWrapper = ({children}) => {
	let location = useLocation()
	const history = useHistory()
	const classes = useStyles()
	const dispatch = useDispatch()

	const logOut = () => {
		dispatch(logOutAction())
	}

	const back = () => {
		history.goBack()
	}

	return (
		<Box className={classes.root}>
			<AppBar position='fixed'>
				<Toolbar>
					{location.pathname === '/' ? null : (
						<IconButton edge='start' color='inherit' onClick={back}>
							<ArrowBackIcon />
						</IconButton>
					)}
					<Typography variant='h6' className={classes.title}>
						<Link className={classes.title} to={'/'}>
							Subway
						</Link>
					</Typography>
					<Button size={'small'} color='inherit' onClick={logOut}>
						Выход
					</Button>
				</Toolbar>
			</AppBar>
			<Box pt={8} pl={1} pr={1}>
				{children}
			</Box>
		</Box>
	)
}

export default MainWrapper
