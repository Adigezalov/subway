import React from 'react'
import {Box} from '@material-ui/core'

const LoadingPage = () => {
	return (
		<Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
			<img src='../logo512.png' alt='' style={{width: 100, height: 100}} />
		</Box>
	)
}

export default LoadingPage
