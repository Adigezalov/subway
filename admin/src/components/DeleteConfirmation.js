import React from 'react'
import {Box, ButtonGroup, IconButton, Modal, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'

const useStyles = makeStyles(theme => ({
	modal: {
		position: 'absolute',
		top: 80,
		right: 10,
		left: 10,
		backgroundColor: 'white',
		borderRadius: 5,
		outline: 0,
	},
	editButtons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
}))

export const DeleteConfirmation = ({visible, success, cancel}) => {
	const classes = useStyles()

	return (
		<Modal open={visible} onClose={cancel}>
			<Box className={classes.modal} p={1}>
				<Typography variant={'h6'}>Подтвердите удаление</Typography>
				<Box pt={1} className={classes.editButtons}>
					<ButtonGroup color={'primary'}>
						<IconButton onClick={success}>
							<DoneIcon />
						</IconButton>
						<IconButton onClick={cancel}>
							<ClearIcon color={'secondary'} />
						</IconButton>
					</ButtonGroup>
				</Box>
			</Box>
		</Modal>
	)
}
