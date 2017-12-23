import React from 'react'
import { Switch, Route } from 'react-router-dom'

import UserSignIn from './users/UserSignIn'
import UserList from './users/UserList'

const Orders = (props) => (
  <Switch>
    <Route exact path='/users/sign_in' render={(routeProps) => <UserSignIn {...props} {...routeProps} />} />
    <Route exact path='/users'         render={(routeProps) => <UserList {...props} {...routeProps} />} />
  </Switch>
);

export default Orders
