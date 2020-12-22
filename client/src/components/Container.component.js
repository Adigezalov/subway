import React from 'react'

export const styles = {
	container: {
		position: 'relative',
		minWidth: 320,
		maxWidth: 400,
		// minHeight: "100%",
		margin: '0 auto',
		padding: '0 10px',
	},
}

const ContainerComponent = ({children}) => {
	return <div style={styles.container}>{children}</div>
}

export default ContainerComponent
