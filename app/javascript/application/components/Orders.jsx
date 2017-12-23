import React from 'react'
import { Switch, Route } from 'react-router-dom'

import OrderList from './orders/OrderList'
import OrderForm from './orders/OrderForm'
import OrderCode from './orders/OrderCode'

const Orders = (props) => (
  <Switch>
    <Route exact path='/orders'      render={(routeProps) => <OrderList {...props} {...routeProps} />} />
    <Route exact path='/orders/new'  render={(routeProps) => <OrderForm {...props} {...routeProps} />} />
    <Route exact path='/orders/code' render={(routeProps) => <OrderCode {...props} {...routeProps} />} />
    <Route exact path='/'            render={(routeProps) => <OrderForm {...props} {...routeProps} />} />
  </Switch>
);

export default Orders
