import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Snackbar, Typography} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import {hideSuccessAction} from '../redux/actions/app.actions'

const Alert = props => {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

export const Success = () => {
	const dispatch = useDispatch()
	const success = useSelector(state => state.app.success)

	const handleClose = () => {
		dispatch(hideSuccessAction())
	}

	return (
		<Snackbar open={success} autoHideDuration={4000} onClose={handleClose}>
			<Alert onClose={handleClose} severity='success'>
				<Typography>Сохранено</Typography>
			</Alert>
		</Snackbar>
	)
}
