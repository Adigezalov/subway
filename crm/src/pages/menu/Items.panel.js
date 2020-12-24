import React, {useRef, useState} from 'react'
import {Box, Divider, List} from '@material-ui/core'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import UnaddedComponent from './Unadded.component'
import AddedComponent from './Added.component'

const ItemsPanel = ({
	isMenuSubItem,
	isProduct,
	isSixInch,
	isFootLong,
	isWrap,
	isSalad,
	withPrice,
	index,
	commonItems,
	commonAssemblyDiagrams,
	items,
	field,
	addItem,
	removeItem,
	changePositionItem,
	activeItem,
	changePriceItem,
	changeAssemblyDiagramItem,
	activeModifierSubItem,
	changePriceModifierSubItem,
}) => {
	const listItemRef = useRef()
	const [padding, setPadding] = useState(0)

	return (
		<Box pb={5}>
			<DragDropContext
				onDragEnd={result => {
					setPadding(0)
					!isMenuSubItem
						? changePositionItem(result.draggableId, result.source.index, result.destination.index)
						: changePositionItem(result.draggableId, result.source.index, result.destination.index, index)
				}}
				onDragStart={() => {
					setPadding(listItemRef.current.clientHeight)
				}}
			>
				<Droppable droppableId='droppable'>
					{(provided, snapshot) => (
						<List disablePadding {...provided.droppableProps} ref={provided.innerRef} style={{paddingBottom: padding}}>
							{items
								.sort((a, b) => {
									return a.position - b.position
								})
								.map((item, i) => {
									let name = ''
									let image = ''
									let modifiers = []
									commonItems.map(commonItem => {
										if (commonItem._id === item[field]) {
											name = commonItem.name
											image = isSixInch
												? commonItem.imageSixInch
												: isFootLong
												? commonItem.imageFootLong
												: isWrap
												? commonItem.imageWrap
												: isSalad
												? commonItem.imageSalad
												: commonItem.image
											modifiers = commonItem.modifiers
										}
									})
									return (
										<Draggable key={item[field]} draggableId={item[field]} index={i}>
											{(provided, snapshot) => (
												<Box mb={1} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
													<AddedComponent
														listItemRef={listItemRef}
														item={item}
														isMenuSubItem={isMenuSubItem}
														activeItem={activeItem}
														name={name}
														field={field}
														index={index}
														image={image}
														withPrice={withPrice}
														removeItem={removeItem}
														changePriceItem={changePriceItem}
														isProduct={isProduct}
														changeAssemblyDiagramItem={changeAssemblyDiagramItem}
														commonAssemblyDiagrams={commonAssemblyDiagrams}
														modifiers={modifiers}
														activeModifierSubItem={activeModifierSubItem}
														changePriceModifierSubItem={changePriceModifierSubItem}
													/>
												</Box>
											)}
										</Draggable>
									)
								})}
						</List>
					)}
				</Droppable>
			</DragDropContext>

			<Divider />
			<List disablePadding>
				{commonItems.map((commonItem, i) => {
					let image = isSixInch
						? commonItem.imageSixInch
						: isFootLong
						? commonItem.imageFootLong
						: isWrap
						? commonItem.imageWrap
						: isSalad
						? commonItem.imageSalad
						: commonItem.image
					let visible = true
					items.map(item => {
						if (commonItem._id === item[field]) {
							visible = false
						}
					})
					return visible ? (
						<UnaddedComponent
							key={i}
							image={image}
							commonItem={commonItem}
							isMenuSubItem={isMenuSubItem}
							addItem={addItem}
							index={index}
						/>
					) : null
				})}
			</List>
		</Box>
	)
}

export default ItemsPanel
