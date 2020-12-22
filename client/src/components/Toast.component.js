import React from 'react'
import {DefaultToast} from 'react-toast-notifications'
import colors from '../config/colors'

const styles = {
	toast: {
		padding: 10,
		borderRadius: 10,
	},

	toastText: {
		color: colors.COLOR_SUBWAY_DARK_GREEN,
	},
}

const ToastComponent = ({children, ...props}) => {
	return (
		<DefaultToast style={{width: '100%'}} {...props}>
			<div style={{width: '100%'}}>
				<div style={styles.toastText}>{children}</div>
			</div>
		</DefaultToast>
	)
}

export default ToastComponent
