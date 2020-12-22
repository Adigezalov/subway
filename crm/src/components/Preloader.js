import React from 'react'
import {useSelector} from 'react-redux'
import {Backdrop, CircularProgress} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 10,
		color: '#fff',
	},
}))

export const Preloader = () => {
	const classes = useStyles()
	const loading = useSelector(state => state.app.loading)

	return (
		<Backdrop className={classes.backdrop} open={loading}>
			<CircularProgress color='inherit' />
		</Backdrop>
	)
}
