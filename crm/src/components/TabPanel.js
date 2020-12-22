import {Box, Typography} from '@material-ui/core'
import React from 'react'

export const TabPanel = props => {
	const {children, value, index, ...other} = props

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={1}>{children}</Box>}
		</div>
	)
}
