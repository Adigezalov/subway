import React, {useEffect, useRef, useState} from 'react'
import colors from '../config/colors'
import PlusIconComponent from './Plus.icon.component'

export const styles = {
	modal: {
		position: 'fixed',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		padding: '50px 0 0',
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		zIndex: 200,
	},

	modalContainer: {
		position: 'relative',
		width: '100%',
		height: '100%',
		margin: '0 auto',
		overflowX: 'auto',
		backgroundColor: colors.COLOR_SUBWAY_WHITE,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},

	modalTitle: {
		position: 'fixed',
		left: 0,
		right: 0,
		width: '100%',
		fontFamily: 'FootLong',
		fontSize: 18,
		paddingTop: 20,
		paddingLeft: 10,
		paddingBottom: 10,
		color: colors.COLOR_SUBWAY_YELLOW,
		backgroundColor: colors.COLOR_SUBWAY_WHITE,
		borderRadius: '20px 20px 0 0',
		zIndex: 100,
	},
	modalClose: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'fixed',
		top: 55,
		right: 7,
		padding: 7,
		borderRadius: '100%',
		transform: 'rotate(45deg)',
		zIndex: 200,
		webkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
	},
}

const ModalComponent = ({title, children, close}) => {
	const [titleHeight, setTitleHeight] = useState(0)
	const titleRef = React.createRef()

	useEffect(() => {
		titleRef.current && setTitleHeight(titleRef.current.clientHeight)
	}, [titleRef])

	return (
		<div style={styles.modal}>
			<div style={styles.modalContainer}>
				<p style={styles.modalTitle} ref={titleRef}>
					{title}
				</p>
				<div style={{paddingTop: titleHeight}}>{children}</div>
				{close ? (
					<div style={styles.modalClose} onClick={close}>
						<PlusIconComponent color={colors.COLOR_SUBWAY_DARK_GREEN} />
					</div>
				) : null}
			</div>
		</div>
	)
}

export default ModalComponent
