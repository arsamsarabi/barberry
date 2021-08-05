import React, { FC } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

import { useAuthContext } from '#context/AuthContext'
import routes from './routes'

export const PublicRoute: FC<RouteProps> = ({ component, ...rest }) => {
  const { isAuthenticated } = useAuthContext()

  return !isAuthenticated() ? (
    <Route {...rest} component={component} />
  ) : (
    <Redirect to={routes.HOME} />
  )
}

export default PublicRoute
