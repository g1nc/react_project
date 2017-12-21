import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import Header from './layout/Header'
import OrderForm from './OrderForm'
import OrderList from './OrderList'

const App = (props) => (
  <div>
    <Header />
    <Row style={{paddingTop: '1rem'}}>
      <Col lg={12}>
        <Switch>
          <Route exact path='/orders'      render={(routeProps) => <OrderList {...props} {...routeProps} />} />
          <Route exact path='/orders/new'  render={(routeProps) => <OrderForm {...props} {...routeProps} />} />
          <Route exact path='/orders/code' render={(routeProps) => <OrderForm {...props} {...routeProps} />} />
          <Route path='/orders/:id'        render={(routeProps) => <OrderList {...props} {...routeProps} />} />
          <Route exact path='/'            render={(routeProps) => <OrderForm {...props} {...routeProps} />} />
        </Switch>
      </Col>
    </Row>
  </div>
);

export default App
