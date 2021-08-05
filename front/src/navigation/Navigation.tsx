import React, { FC, lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Loading from '#components/Loading'
import routes from './routes'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const Home = lazy(() => import('#pages/Home'))
const Accounts = lazy(() => import('#pages/Accounts'))
const Signin = lazy(() => import('#pages/Signin'))
const Signup = lazy(() => import('#pages/Signup'))
const ForgotPassword = lazy(() => import('#pages/ForgotPassword'))

const Navigation: FC = () => (
  <Suspense fallback={<Loading />}>
    <Router>
      <Switch>
        <PrivateRoute path={routes.HOME} exact component={Home} />
        <PrivateRoute path={routes.ACCOUNTS} exact component={Accounts} />

        <PublicRoute path={routes.SIGNIN} exact component={Signin} />
        <PublicRoute path={routes.SIGNUP} exact component={Signup} />
        <PublicRoute
          path={routes.FORGOT_PASSWORD}
          exact
          component={ForgotPassword}
        />

        <Route>
          <Redirect to={routes.SIGNIN} />
        </Route>
      </Switch>
    </Router>
  </Suspense>
)

export default Navigation
