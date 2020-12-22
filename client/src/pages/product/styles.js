import colors from '../../config/colors'

export const styles = {
	section: {
		marginTop: 15,
	},
	sectionCard: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		// justifyContent: 'space-between',
	},
	sectionTitle: {
		fontFamily: 'FootLong',
		fontSize: 18,
		marginBottom: 10,
		paddingLeft: 15,
		color: colors.COLOR_SUBWAY_DARK_GREEN,
	},
	button: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
		padding: 2,
		border: '1px solid',
		borderRadius: 5,
		width: '100%',
		height: '47%',
	},
	pieceCounter: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: '20px auto 20px',
		width: '60%',
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
