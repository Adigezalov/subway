import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useToasts} from 'react-toast-notifications'
import {hideSuccessAction} from '../redux/actions/app.actions'

const SuccessComponent = () => {
	const {addToast} = useToasts()
	const dispatch = useDispatch()
	const success = useSelector(state => state.app.success)

	useEffect(() => {
		!!success &&
			addToast(success, {
				appearance: 'success',
				autoDismiss: false,
				onDismiss: () => {
					dispatch(hideSuccessAction())
				},
			})
	}, [success])

	return null
}

export default SuccessComponent
