import React, { FC } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

import { useAuthContext } from '#context/AuthContext'
import LoadinPage from '#components/Loading'
import routes from './routes'

export const PrivateRoute: FC<RouteProps> = ({ component, ...rest }) => {
  const { isAuthenticated, loading } = useAuthContext()

  if (loading) return <LoadinPage />

  return isAuthenticated() ? (
    <Route {...rest} component={component} />
  ) : (
    <Redirect to={routes.SIGNIN} />
  )
}

export default PrivateRoute
