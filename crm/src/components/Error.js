import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import {hideErrorAction} from '../redux/actions/app.actions'

const Alert = props => {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

export const Error = () => {
	const dispatch = useDispatch()
	const error = useSelector(state => state.app.error)

	const handleClose = () => {
		dispatch(hideErrorAction())
	}

	return (
		<Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity='warning'>
				{error}
			</Alert>
		</Snackbar>
	)
}
