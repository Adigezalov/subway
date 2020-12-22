import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useToasts} from 'react-toast-notifications'
import {hideErrorAction} from '../redux/actions/app.actions'

const ErrorComponent = () => {
	const {addToast} = useToasts()
	const dispatch = useDispatch()
	const error = useSelector(state => state.app.error)

	useEffect(() => {
		!!error &&
			addToast(error, {
				appearance: 'error',
				autoDismiss: true,
				autoDismissTimeout: 5000,
			})
		setTimeout(() => {
			dispatch(hideErrorAction())
		}, 5000)
	}, [error])

	return null
}

export default ErrorComponent
