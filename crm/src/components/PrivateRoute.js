import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import LoadingPage from '../pages/Loading.page'

export const PrivateRoute = ({page, ...rest}) => {
	const token = useSelector(state => state.app.token)

	return (
		<Route
			{...rest}
			render={({location}) =>
				token || localStorage.getItem('token') ? (
					token ? (
						page
					) : (
						<LoadingPage />
					)
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: {from: location},
						}}
					/>
				)
			}
		/>
	)
}
