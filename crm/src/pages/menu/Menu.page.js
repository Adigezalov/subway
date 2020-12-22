import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import MainWrapper from '../../layouts/MainWrapper'
import {AppBar, Box, Button, Tab, Tabs} from '@material-ui/core'
import {
	cleanDataForMenuAction,
	fetchAssemblyDiagramsAction,
	fetchBreadsAction,
	fetchExtrasAction,
	fetchMenuItemsAction,
	fetchProductsAction,
	fetchSaucesAction,
	fetchSpicesAction,
	fetchUnitsAction,
	fetchVegetablesAction,
} from '../../redux/actions/dataForMenu.action'
import {TabPanel} from '../../components/TabPanel'
import ItemsPanel from './Items.panel'
import {cleanMenuAction, createMenuAction, fetchMenuAction} from '../../redux/actions/menu.actions'

const a11yProps = index => {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	}
}

const MenuPage = () => {
	const dispatch = useDispatch()
	const {id} = useParams()
	const commonMenuItems = useSelector(state => state.dataForMenu.menuItems)
	const commonAssemblyDiagrams = useSelector(state => state.dataForMenu.assemblyDiagrams)
	const commonBreads = useSelector(state => state.dataForMenu.breads)
	const commonExtras = useSelector(state => state.dataForMenu.extras)
	const commonVegetables = useSelector(state => state.dataForMenu.vegetables)
	const commonSauces = useSelector(state => state.dataForMenu.sauces)
	const commonSpices = useSelector(state => state.dataForMenu.spices)
	const commonUnits = useSelector(state => state.dataForMenu.units)
	const commonProducts = useSelector(state => state.dataForMenu.products)
	const menu = useSelector(state => state.menu.menu)
	const [value, setValue] = useState(0)
	const [menuItems, setMenuItems] = useState([])
	const [breads, setBreads] = useState([])
	const [extras, setExtras] = useState([])
	const [vegetables, setVegetables] = useState([])
	const [sauces, setSauces] = useState([])
	const [spices, setSpices] = useState([])
	const [sixInches, setSixInches] = useState([])
	const [footLongs, setFootLongs] = useState([])
	const [salads, setSalads] = useState([])
	const [wraps, setWraps] = useState([])

	useEffect(() => {
		dispatch(fetchMenuItemsAction())
		dispatch(fetchAssemblyDiagramsAction())
		dispatch(fetchBreadsAction())
		dispatch(fetchExtrasAction())
		dispatch(fetchVegetablesAction())
		dispatch(fetchSaucesAction())
		dispatch(fetchSpicesAction())
		dispatch(fetchUnitsAction())
		dispatch(fetchProductsAction())
		dispatch(fetchMenuAction({restaurant: id}))
		return () => {
			dispatch(cleanMenuAction())
			dispatch(cleanDataForMenuAction())
		}
	}, [])

	useEffect(() => {
		menu && menu._id && setMenuItems(menu.menuItems)
		menu && menu._id && setBreads(menu.breads)
		menu && menu._id && setExtras(menu.extras)
		menu && menu._id && setVegetables(menu.vegetables)
		menu && menu._id && setSauces(menu.sauces)
		menu && menu._id && setSpices(menu.spices)
		menu && menu._id && setSixInches(menu.sixInches)
		menu && menu._id && setFootLongs(menu.footLongs)
		menu && menu._id && setSalads(menu.salads)
		menu && menu._id && setWraps(menu.wraps)
	}, [menu])

	const handleChangeTab = (event, newValue) => {
		setValue(newValue)
	}
	const addItem = (items, field, setItems, item) => {
		items.push({
			[field]: item._id,
			position: item.position,
			active: true,
			price: 0,
			assemblyDiagram: '',
			items: [],
		})
		items.map((item, i) => {
			item.position = i
		})
		setItems(items.slice())
	}
	const removeItem = (items, field, setItems, id) => {
		const newItems = items.filter(item => item[field] !== id).slice()
		newItems.map((newItem, i) => {
			newItem.position = i
		})
		setItems(newItems.slice())
	}
	const changePositionItem = (items, field, setItems, id, oldPosition, newPosition) => {
		items.map(item => {
			if (item[field] === id) {
				item.position = newPosition
			} else {
				if (newPosition - oldPosition < 0) {
					if (item.position >= newPosition && item.position < oldPosition) {
						item.position += 1
					}
				}
				if (newPosition - oldPosition > 0) {
					if (item.position <= newPosition && item.position > oldPosition) {
						item.position -= 1
					}
				}
			}
		})
		setItems(items.slice())
	}
	const activeItem = (items, field, setItems, id, active) => {
		items.map(item => {
			if (item[field] === id) {
				item.active = active
			}
		})
		setItems(items.slice())
	}
	const changePriceItem = (items, field, setItems, id, price) => {
		items.map(item => {
			if (item[field] === id) {
				item.price = price
			}
		})
		setItems(items.slice())
	}
	const changeAssemblyDiagramItem = (items, field, setItems, id, assemblyDiagram) => {
		items.map(item => {
			if (item[field] === id) {
				item.assemblyDiagram = assemblyDiagram
			}
		})
		setItems(items.slice())
	}

	const addSubItem = (items, index, field, setItems, item) => {
		items[index].items.push({
			[field]: item._id,
			position: item.position,
			active: true,
			price: 0,
			assemblyDiagram: '',
			modifiers: [],
		})
		items[index].items.map((item, i) => {
			item.position = i
		})
		setItems(items.slice())
	}
	const removeSubItem = (items, index, field, setItems, id) => {
		items[index].items = items[index].items.filter(item => item[field] !== id)
		items[index].items.map((item, i) => {
			item.position = i
		})
		setItems(items.slice())
	}
	const changePositionSubItem = (items, index, field, setItems, id, oldPosition, newPosition) => {
		items[index].items.map(item => {
			if (item[field] === id) {
				item.position = newPosition
			} else {
				if (newPosition - oldPosition < 0) {
					if (item.position >= newPosition && item.position < oldPosition) {
						item.position += 1
					}
				}
				if (newPosition - oldPosition > 0) {
					if (item.position <= newPosition && item.position > oldPosition) {
						item.position -= 1
					}
				}
			}
		})
		setItems(items.slice())
	}
	const activeSubItem = (items, index, field, setItems, id, active) => {
		items[index].items.map(item => {
			if (item[field] === id) {
				item.active = active
			}
		})
		setItems(items.slice())
	}
	const changePriceSubItem = (items, index, field, setItems, id, price) => {
		items[index].items.map(item => {
			if (item[field] === id) {
				item.price = price
			}
		})
		setItems(items.slice())
	}
	const changeAssemblyDiagramSubItem = (items, index, field, setItems, id, assemblyDiagram) => {
		items[index].items.map(item => {
			if (item[field] === id) {
				item.assemblyDiagram = assemblyDiagram
			}
		})
		setItems(items.slice())
	}
	const activeModifierSubItem = (items, index, indexValue, field, setItems, id, value) => {
		console.log(index)
		items[index].items.map(item => {
			if (item[field] === id) {
				let isNew = true
				item.modifiers.map(modifier => {
					if (modifier.value === value) {
						isNew = false
					}
				})
				if (isNew) {
					item.modifiers.push({
						value: value,
						surcharge: 0,
						active: true,
					})
				} else {
					item.modifiers.map(modifier => {
						if (modifier.value === value) {
							modifier.active = !modifier.active
						}
					})
				}
			}
		})
		setItems(items.slice())
	}
	const changePriceModifierSubItem = (items, index, indexValue, field, setItems, id, value, surcharge) => {
		items[index].items.map(item => {
			if (item[field] === id) {
				item.modifiers.map(modifier => {
					if (modifier.value === value) {
						modifier.surcharge = surcharge
					}
				})
			}
		})
		setItems(items.slice())
	}

	//Начало работы с пунктами меню
	const addMenuItem = menuItem => {
		addItem(menuItems, 'menuItem', setMenuItems, menuItem)
	}
	const removeMenuItem = menuItem => {
		removeItem(menuItems, 'menuItem', setMenuItems, menuItem)
	}
	const changePositionMenuItem = (id, oldPosition, newPosition) => {
		changePositionItem(menuItems, 'menuItem', setMenuItems, id, oldPosition, newPosition)
	}
	const activeMenuItem = (id, active) => {
		activeItem(menuItems, 'menuItem', setMenuItems, id, active)
	}
	//Конец работы с пунктами меню

	//Начало работы с хлебом
	const addBread = bread => {
		addItem(breads, 'bread', setBreads, bread)
	}
	const removeBread = bread => {
		removeItem(breads, 'bread', setBreads, bread)
	}
	const changePositionBread = (id, oldPosition, newPosition) => {
		changePositionItem(breads, 'bread', setBreads, id, oldPosition, newPosition)
	}
	const activeBread = (id, active) => {
		activeItem(breads, 'bread', setBreads, id, active)
	}
	//Конец работы с хлебом

	//Начало работы с овощами
	const addVegetable = vegetable => {
		addItem(vegetables, 'vegetable', setVegetables, vegetable)
	}
	const removeVegetable = vegetable => {
		removeItem(vegetables, 'vegetable', setVegetables, vegetable)
	}
	const changePositionVegetable = (id, oldPosition, newPosition) => {
		changePositionItem(vegetables, 'vegetable', setVegetables, id, oldPosition, newPosition)
	}
	const activeVegetable = (id, active) => {
		activeItem(vegetables, 'vegetable', setVegetables, id, active)
	}
	//Конец работы с овощами

	//Начало работы с соусами
	const addSauce = sauce => {
		addItem(sauces, 'sauce', setSauces, sauce)
	}
	const removeSauce = sauce => {
		removeItem(sauces, 'sauce', setSauces, sauce)
	}
	const changePositionSauce = (id, oldPosition, newPosition) => {
		changePositionItem(sauces, 'sauce', setSauces, id, oldPosition, newPosition)
	}
	const activeSauce = (id, active) => {
		activeItem(sauces, 'sauce', setSauces, id, active)
	}
	//Конец работы с соусами

	//Начало работы со специями
	const addSpice = spice => {
		addItem(spices, 'spice', setSpices, spice)
	}
	const removeSpice = spice => {
		removeItem(spices, 'spice', setSpices, spice)
	}
	const changePositionSpice = (id, oldPosition, newPosition) => {
		changePositionItem(spices, 'spice', setSpices, id, oldPosition, newPosition)
	}
	const activeSpice = (id, active) => {
		activeItem(spices, 'spice', setSpices, id, active)
	}
	//Конец работы со специями

	//Начало работы с допами
	const addExtra = extra => {
		addItem(extras, 'extra', setExtras, extra)
	}
	const removeExtra = extra => {
		removeItem(extras, 'extra', setExtras, extra)
	}
	const changePositionExtra = (id, oldPosition, newPosition) => {
		changePositionItem(extras, 'extra', setExtras, id, oldPosition, newPosition)
	}
	const activeExtra = (id, active) => {
		activeItem(extras, 'extra', setExtras, id, active)
	}
	const changePriceExtra = (id, price) => {
		changePriceItem(extras, 'extra', setExtras, id, price)
	}
	//Конец работы с допами

	//Начало работы с 15
	const addSixInch = sixInch => {
		addItem(sixInches, 'unit', setSixInches, sixInch)
	}
	const removeSixInch = sixInch => {
		removeItem(sixInches, 'unit', setSixInches, sixInch)
	}
	const changePositionSixInch = (id, oldPosition, newPosition) => {
		changePositionItem(sixInches, 'unit', setSixInches, id, oldPosition, newPosition)
	}
	const activeSixInch = (id, active) => {
		activeItem(sixInches, 'unit', setSixInches, id, active)
	}
	const changePriceSixInch = (id, price) => {
		changePriceItem(sixInches, 'unit', setSixInches, id, price)
	}
	const changeAssemblyDiagramSixInch = (id, assemblyDiagram) => {
		changeAssemblyDiagramItem(sixInches, 'unit', setSixInches, id, assemblyDiagram)
	}
	//Конец работы с 15

	//Начало работы с 30
	const addFootLong = footLong => {
		addItem(footLongs, 'unit', setFootLongs, footLong)
	}
	const removeFootLong = footLong => {
		removeItem(footLongs, 'unit', setFootLongs, footLong)
	}
	const changePositionFootLong = (id, oldPosition, newPosition) => {
		changePositionItem(footLongs, 'unit', setFootLongs, id, oldPosition, newPosition)
	}
	const activeFootLong = (id, active) => {
		activeItem(footLongs, 'unit', setFootLongs, id, active)
	}
	const changePriceFootLong = (id, price) => {
		changePriceItem(footLongs, 'unit', setFootLongs, id, price)
	}
	const changeAssemblyDiagramFootLong = (id, assemblyDiagram) => {
		changeAssemblyDiagramItem(footLongs, 'unit', setFootLongs, id, assemblyDiagram)
	}
	//Конец работы с 30

	//Начало работы с S
	const addSalad = salad => {
		addItem(salads, 'unit', setSalads, salad)
	}
	const removeSalad = salad => {
		removeItem(salads, 'unit', setSalads, salad)
	}
	const changePositionSalad = (id, oldPosition, newPosition) => {
		changePositionItem(salads, 'unit', setSalads, id, oldPosition, newPosition)
	}
	const activeSalad = (id, active) => {
		activeItem(salads, 'unit', setSalads, id, active)
	}
	const changePriceSalad = (id, price) => {
		changePriceItem(salads, 'unit', setSalads, id, price)
	}
	const changeAssemblyDiagramSalad = (id, assemblyDiagram) => {
		changeAssemblyDiagramItem(salads, 'unit', setSalads, id, assemblyDiagram)
	}
	//Конец работы с S

	//Начало работы с W
	const addWrap = wrap => {
		addItem(wraps, 'unit', setWraps, wrap)
	}
	const removeWrap = wrap => {
		removeItem(wraps, 'unit', setWraps, wrap)
	}
	const changePositionWrap = (id, oldPosition, newPosition) => {
		changePositionItem(wraps, 'unit', setWraps, id, oldPosition, newPosition)
	}
	const activeWrap = (id, active) => {
		activeItem(wraps, 'unit', setWraps, id, active)
	}
	const changePriceWrap = (id, price) => {
		changePriceItem(wraps, 'unit', setWraps, id, price)
	}
	const changeAssemblyDiagramWrap = (id, assemblyDiagram) => {
		changeAssemblyDiagramItem(wraps, 'unit', setWraps, id, assemblyDiagram)
	}
	//Конец работы с W

	//Начало работы с продуктами
	const addProduct = (product, index) => {
		addSubItem(menuItems, index, 'product', setMenuItems, product)
	}
	const removeProduct = (product, index) => {
		removeSubItem(menuItems, index, 'product', setMenuItems, product)
	}
	const changePositionProduct = (id, oldPosition, newPosition, index) => {
		changePositionSubItem(menuItems, index, 'product', setMenuItems, id, oldPosition, newPosition)
	}
	const activeProduct = (id, active, index) => {
		activeSubItem(menuItems, index, 'product', setMenuItems, id, active)
	}
	const changePriceProduct = (id, price, index) => {
		changePriceSubItem(menuItems, index, 'product', setMenuItems, id, price)
	}
	const changeAssemblyDiagramProduct = (id, assemblyDiagram, index) => {
		changeAssemblyDiagramSubItem(menuItems, index, 'product', setMenuItems, id, assemblyDiagram)
	}
	const activeModifierSubProduct = (id, value, index, indexValue) => {
		activeModifierSubItem(menuItems, index, indexValue, 'product', setMenuItems, id, value)
	}
	const changePriceModifierSubPrice = (id, value, index, indexValue, surcharge) => {
		changePriceModifierSubItem(menuItems, index, indexValue, 'product', setMenuItems, id, value, surcharge)
	}
	//Конец работы с продуктами

	const createMenu = () => {
		dispatch(
			createMenuAction({
				menu: {menuItems, breads, extras, vegetables, sauces, spices, sixInches, footLongs, salads, wraps},
				restaurant: id,
				menuId: menu && menu._id ? menu._id : false,
			})
		)
	}

	return (
		<MainWrapper>
			<AppBar position='static' color='default'>
				<Tabs
					value={value}
					onChange={handleChangeTab}
					indicatorColor='primary'
					textColor='primary'
					variant='scrollable'
					scrollButtons='auto'
					aria-label='scrollable auto tabs example'
				>
					<Tab label='Пункты меню' {...a11yProps(0)} />
					<Tab label='Хлеб' {...a11yProps(1)} />
					<Tab label='Овощи' {...a11yProps(2)} />
					<Tab label='Соусы' {...a11yProps(3)} />
					<Tab label='Специи' {...a11yProps(4)} />
					<Tab label='Допы' {...a11yProps(5)} />
					<Tab label='Сэндвичи 15 см' {...a11yProps(6)} />
					<Tab label='Сэндвичи 30 см' {...a11yProps(7)} />
					<Tab label='Салаты' {...a11yProps(8)} />
					<Tab label='Роллы' {...a11yProps(9)} />
					{menuItems
						.sort((a, b) => {
							return a.position - b.position
						})
						.map((menuItem, i) => {
							let name = ''
							commonMenuItems.map(commonMenuItem => {
								if (commonMenuItem._id === menuItem.menuItem) {
									name = commonMenuItem.name
								}
							})
							return <Tab key={i} label={name} {...a11yProps(10 + i)} />
						})}
					<Tab label='Акции' {...a11yProps(menuItems.length + 10)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<ItemsPanel
					commonItems={commonMenuItems}
					items={menuItems}
					field={'menuItem'}
					addItem={addMenuItem}
					removeItem={removeMenuItem}
					changePositionItem={changePositionMenuItem}
					activeItem={activeMenuItem}
				/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<ItemsPanel
					commonItems={commonBreads}
					items={breads}
					field={'bread'}
					addItem={addBread}
					removeItem={removeBread}
					changePositionItem={changePositionBread}
					activeItem={activeBread}
				/>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<ItemsPanel
					commonItems={commonVegetables}
					items={vegetables}
					field={'vegetable'}
					addItem={addVegetable}
					removeItem={removeVegetable}
					changePositionItem={changePositionVegetable}
					activeItem={activeVegetable}
				/>
			</TabPanel>
			<TabPanel value={value} index={3}>
				<ItemsPanel
					commonItems={commonSauces}
					items={sauces}
					field={'sauce'}
					addItem={addSauce}
					removeItem={removeSauce}
					changePositionItem={changePositionSauce}
					activeItem={activeSauce}
				/>
			</TabPanel>
			<TabPanel value={value} index={4}>
				<ItemsPanel
					commonItems={commonSpices}
					items={spices}
					field={'spice'}
					addItem={addSpice}
					removeItem={removeSpice}
					changePositionItem={changePositionSpice}
					activeItem={activeSpice}
				/>
			</TabPanel>
			<TabPanel value={value} index={5}>
				<ItemsPanel
					withPrice
					commonItems={commonExtras}
					items={extras}
					field={'extra'}
					addItem={addExtra}
					removeItem={removeExtra}
					changePositionItem={changePositionExtra}
					activeItem={activeExtra}
					changePriceItem={changePriceExtra}
				/>
			</TabPanel>
			<TabPanel value={value} index={6}>
				<ItemsPanel
					isProduct
					isSixInch
					withPrice
					commonItems={commonUnits.filter(unit => unit.isSixInch)}
					commonAssemblyDiagrams={commonAssemblyDiagrams}
					items={sixInches}
					field={'unit'}
					addItem={addSixInch}
					removeItem={removeSixInch}
					changePositionItem={changePositionSixInch}
					activeItem={activeSixInch}
					changePriceItem={changePriceSixInch}
					changeAssemblyDiagramItem={changeAssemblyDiagramSixInch}
				/>
			</TabPanel>
			<TabPanel value={value} index={7}>
				<ItemsPanel
					isProduct
					isFootLong
					withPrice
					commonItems={commonUnits.filter(unit => unit.isFootLong)}
					commonAssemblyDiagrams={commonAssemblyDiagrams}
					items={footLongs}
					field={'unit'}
					addItem={addFootLong}
					removeItem={removeFootLong}
					changePositionItem={changePositionFootLong}
					activeItem={activeFootLong}
					changePriceItem={changePriceFootLong}
					changeAssemblyDiagramItem={changeAssemblyDiagramFootLong}
				/>
			</TabPanel>
			<TabPanel value={value} index={8}>
				<ItemsPanel
					isProduct
					isSalad
					withPrice
					commonItems={commonUnits.filter(unit => unit.isSalad)}
					commonAssemblyDiagrams={commonAssemblyDiagrams}
					items={salads}
					field={'unit'}
					addItem={addSalad}
					removeItem={removeSalad}
					changePositionItem={changePositionSalad}
					activeItem={activeSalad}
					changePriceItem={changePriceSalad}
					changeAssemblyDiagramItem={changeAssemblyDiagramSalad}
				/>
			</TabPanel>
			<TabPanel value={value} index={9}>
				<ItemsPanel
					isProduct
					isWrap
					withPrice
					commonItems={commonUnits.filter(unit => unit.isWrap)}
					commonAssemblyDiagrams={commonAssemblyDiagrams}
					items={wraps}
					field={'unit'}
					addItem={addWrap}
					removeItem={removeWrap}
					changePositionItem={changePositionWrap}
					activeItem={activeWrap}
					changePriceItem={changePriceWrap}
					changeAssemblyDiagramItem={changeAssemblyDiagramWrap}
				/>
			</TabPanel>
			{menuItems
				.sort((a, b) => {
					return a.position - b.position
				})
				.map((menuItem, i) => {
					return (
						<TabPanel key={i} value={value} index={10 + i}>
							{value === 10 + i ? (
								<ItemsPanel
									isMenuSubItem
									isProduct
									withPrice
									index={i}
									commonItems={commonProducts.filter(product => product.menuItem === menuItem.menuItem)}
									commonAssemblyDiagrams={commonAssemblyDiagrams}
									items={menuItem.items}
									field={'product'}
									addItem={addProduct}
									removeItem={removeProduct}
									changePositionItem={changePositionProduct}
									activeItem={activeProduct}
									changePriceItem={changePriceProduct}
									changeAssemblyDiagramItem={changeAssemblyDiagramProduct}
									activeModifierSubItem={activeModifierSubProduct}
									changePriceModifierSubItem={changePriceModifierSubPrice}
								/>
							) : null}
						</TabPanel>
					)
				})}
			{/*<TabPanel value={value} index={9}>*/}
			{/*	<ItemsPanel*/}
			{/*			isProduct*/}
			{/*			isWrap*/}
			{/*			withPrice*/}
			{/*			commonItems={commonUnits.filter(unit => unit.isWrap)}*/}
			{/*			commonAssemblyDiagrams={commonAssemblyDiagrams}*/}
			{/*			items={wraps}*/}
			{/*			field={'unit'}*/}
			{/*			addItem={addWrap}*/}
			{/*			removeItem={removeWrap}*/}
			{/*			changePositionItem={changePositionWrap}*/}
			{/*			activeItem={activeWrap}*/}
			{/*			changePriceItem={changePriceWrap}*/}
			{/*			changeAssemblyDiagramItem={changeAssemblyDiagramWrap}*/}
			{/*	/>*/}
			{/*</TabPanel>*/}
			<Box position={'fixed'} bottom={10} left={0} right={0} pl={1} pr={1}>
				<Button variant='contained' color={'primary'} fullWidth onClick={createMenu}>
					Сохранить
				</Button>
			</Box>
		</MainWrapper>
	)
}

export default MenuPage
