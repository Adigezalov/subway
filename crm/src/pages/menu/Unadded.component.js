import React from 'react'
import {Avatar, Box, IconButton, ListItem} from '@material-ui/core'
import {API_URL} from '../../config/config'
import AddIcon from '@material-ui/icons/Add'

const IMAGE_WIDTH = 70

const UnaddedComponent = ({image, commonItem, isMenuSubItem, addItem, index}) => {
	return (
		<ListItem disableGutters>
			<Box
				style={{
					display: 'flex',
					flexDirection: 'row',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Box style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
					{image ? (
						<Box mr={1}>
							<Avatar
								variant='square'
								src={`${API_URL}/${image}`}
								style={{
									width: IMAGE_WIDTH,
									height: IMAGE_WIDTH / 1.5,
								}}
							/>
						</Box>
					) : null}
					{commonItem.name}
				</Box>
				<IconButton
					aria-label='delete'
					size={'small'}
					onClick={() => {
						!isMenuSubItem ? addItem(commonItem) : addItem(commonItem, index)
					}}
				>
					<AddIcon color={'primary'} />
				</IconButton>
			</Box>
		</ListItem>
	)
}

export default UnaddedComponent
