import React, {useEffect} from 'react'
import colors from '../config/colors'
import {useDispatch} from 'react-redux'
import {setUrlAction} from '../redux/actions/app.actions'

const styles = {
	emptyPromotion: {
		marginTop: 30,
		color: colors.COLOR_INACTIVE,
		textAlign: 'center',
		fontSize: 16,
	},
}

const PromotionsPage = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setUrlAction(window.location.pathname))
	}, [])

	return <p style={styles.emptyPromotion}>Раздел скоро появится</p>
}

export default PromotionsPage
