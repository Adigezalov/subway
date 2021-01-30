import React from 'react'
import colors from '../config/colors'
import {API_URL} from '../config/config'

const WINDOW_WIDTH = window.innerWidth

const styles = {
	root: {
		display: 'flex',
		width: WINDOW_WIDTH / 3,
		padding: '3px 3px 0',
		minHeight: 40,
		marginBottom: 6,
	},
	position: {
		position: 'relative',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
		padding: 5,
		border: '1px solid',
		borderColor: colors.COLOR_INACTIVE,
		borderRadius: 5,
	},
	positionImage: {
		width: '100%',
	},
	positionImageImg: {
		width: '100%',
	},
	positionTitle: {
		fontSize: 12,
		textAlign: 'center',
	},
	price: {
		position: 'absolute',
		top: -8,
		right: 5,
		border: '1px solid',
		borderColor: '#eeeeee',
		borderRadius: 5,
		backgroundColor: colors.COLOR_SUBWAY_WHITE,
		padding: '2px 5px 1px',
	},
	weight: {
		position: 'absolute',
		top: -8,
		left: 5,
		border: '1px solid',
		borderColor: '#eeeeee',
		borderRadius: 5,
		backgroundColor: colors.COLOR_SUBWAY_WHITE,
		padding: '2px 5px 1px',
	},
	positionPrice: {
		width: '100%',
		textAlign: 'right',
		fontFamily: 'FootLong',
		fontSize: 10,
		color: colors.COLOR_SUBWAY_YELLOW,
	},
}

const ChooseCardComponent = ({active, setChoose, image, name, price, weight}) => {
	return (
		<div style={styles.root}>
			<div
				style={Object.assign({}, styles.position, {
					boxShadow: active ? 'inset 0 0 10px rgba(245, 196, 0, 0.5)' : 'none',
					borderColor: active ? colors.COLOR_SUBWAY_YELLOW : colors.COLOR_INACTIVE,
				})}
				onClick={setChoose}
			>
				{image ? (
					<div style={styles.positionImage}>
						<img style={styles.positionImageImg} src={`${API_URL}/${image}`} alt='' />
					</div>
				) : null}
				<p style={styles.positionTitle}>{name}</p>
				{weight ? (
					<div style={styles.weight}>
						<p style={styles.positionPrice}>{weight} гр</p>
					</div>
				) : null}
				{price ? (
					<div style={styles.price}>
						<p style={styles.positionPrice}>+ {price} &#8381;</p>
					</div>
				) : null}
			</div>
		</div>
	)
}

export default ChooseCardComponent
