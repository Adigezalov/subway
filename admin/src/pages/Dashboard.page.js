import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Box, Button, Fab, Menu, MenuItem} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import {MENU_LIST} from '../config/menuList'
import MainWrapper from '../layouts/MainWrapper'
import {NEW_MENU_LIST} from '../config/newMenuList'

const DashboardPage = () => {
	const [anchorEl, setAnchorEl] = useState(null)

	const handleOpenMenu = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleCloseMenu = () => {
		setAnchorEl(null)
	}

	return (
		<MainWrapper>
			<Box pb={1}>
				{MENU_LIST.map((menu, i) => (
					<Box key={i} mb={1}>
						<Button
							color='primary'
							variant='outlined'
							fullWidth
							component={Link}
							to={menu.link}
							size={'medium'}
						>
							{menu.title}
						</Button>
					</Box>
				))}
				<Box position={'fixed'} right={20} bottom={20}>
					<Fab
						size={'medium'}
						color='primary'
						aria-controls='simple-menu'
						aria-haspopup='true'
						onClick={handleOpenMenu}
					>
						<AddIcon />
					</Fab>
				</Box>
				<Menu
					id='simple-menu'
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
					transformOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					onClose={handleCloseMenu}
				>
					{NEW_MENU_LIST.map((menu, i) => (
						<MenuItem key={i} component={Link} to={menu.link}>
							<AddIcon color={'primary'} /> {menu.title}
						</MenuItem>
					))}
				</Menu>
			</Box>
		</MainWrapper>
	)
}

export default DashboardPage
