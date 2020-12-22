import React from 'react'
import {useSelector} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

export const PublicRoute = ({page, ...rest}) => {
	const token = useSelector(state => state.app.token)

	return (
		<Route
			{...rest}
			render={({location}) =>
				token || localStorage.getItem('token') ? (
					<Redirect
						to={{
							pathname: '/',
							state: {from: location},
						}}
					/>
				) : (
					page
				)
			}
		/>
	)
}
