import React from 'react'
import ContainerComponent from '../../components/Container.component'
import {API_URL} from '../../config/config'
import colors from '../../config/colors'
import PlusIconComponent from '../../components/Plus.icon.component'

const IMAGE_WIDTH = 70

const styles = {
	product: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottom: '1px solid',
		borderColor: '#eeeeee',
		padding: '20px 0',
	},
	productDescription: {
		display: 'flex',
		alignItems: 'center',
	},

	productImage: {
		minWidth: IMAGE_WIDTH,
		width: IMAGE_WIDTH,
		height: IMAGE_WIDTH / 1.5,
	},
	productImageImg: {
		width: '100%',
	},
	productInfo: {
		marginLeft: 15,
	},
	productTitle: {
		fontSize: 14,
		marginBottom: 12,
		textTransform: 'uppercase',
	},
	productPrice: {
		fontFamily: 'FootLong',
	},
	productSelect: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 35,
		height: 35,
		backgroundColor: colors.COLOR_SUBWAY_GREEN,
		borderRadius: 40,
		margin: '0 10px',
	},
}

const MenuListComponent = ({menu, field, setProduct, menuItem}) => {
	return (
		<ContainerComponent>
			{menuItem.alias === 'Razlivnie-napitki' || menuItem.alias === 'Goryachie-napitki' ? (
				<div style={{padding: '0 10px', marginBottom: 10}}>
					<p style={{fontSize: 14, color: colors.COLOR_INACTIVE}}>
						Внимание! {menuItem.name} доступны при заказе навынос.
					</p>
				</div>
			) : null}
			{menu &&
				menu
					.filter(item => item.active)
					.sort((a, b) => (a.position > b.position ? 1 : -1))
					.map((item, i) => {
						return (
							<div
								key={i}
								style={styles.product}
								onClick={() => {
									setProduct({...item, menuItem})
								}}
							>
								<div style={styles.productDescription}>
									<div style={styles.productImage}>
										<img
											style={styles.productImageImg}
											src={
												item[field].image
													? `${API_URL}/${item[field].image}`
													: item[field].imageSixInch
													? `${API_URL}/${item[field].imageSixInch}`
													: item[field].imageFootLong
													? `${API_URL}/${item[field].imageFootLong}`
													: item[field].imageWrap
													? `${API_URL}/${item[field].imageWrap}`
													: `${API_URL}/${item[field].imageSalad}`
											}
											alt=''
										/>
									</div>
									<div style={styles.productInfo}>
										<p style={styles.productTitle}>{item[field].name}</p>
										<p style={styles.productPrice}>
											{item.modifiers && item.modifiers.length ? 'от ' : null}
											{item.price} &#8381;
										</p>
									</div>
								</div>
								<div>
									<div style={styles.productSelect}>
										<PlusIconComponent color={colors.COLOR_SUBWAY_WHITE} />
									</div>
								</div>
							</div>
						)
					})}
		</ContainerComponent>
	)
}

export default MenuListComponent
