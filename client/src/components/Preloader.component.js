import React from 'react'

const styles = {
	linearActivity: {
		overflow: 'hidden',
		width: '50%',
		height: 4,
		backgroundColor: '#B3E5FC',
		margin: '20px auto',
	},
	indeterminate: {
		position: 'relative',
		width: '100%',
		height: '100%',
		'&:before': {
			content: '',
			position: 'absolute',
			height: '100%',
			backgroundColor: '#03A9F4',
			animation: 'indeterminate_first 1.5s infinite ease-out',
		},
	},
}

const PreloaderComponent = () => {
	return (
		<div style={styles.linearActivity}>
			<div style={styles.indeterminate} />
		</div>
	)
}

export default PreloaderComponent
