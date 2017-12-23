import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import Header from './layout/Header'
import Orders from './Orders'
import UserList from './users/UserList'

const App = (props) => (
  <div>
    <Header alertMessage={props.alertMessage} noticeMessage={props.noticeMessage} />
    <Row style={{paddingTop: '1rem'}}>
      <Col lg={12}>
        <Switch>
          <Route path='/orders' component={Orders} />
          <Route exact path='/users' render={(routeProps) => <UserList {...props} {...routeProps} />} />
          <Route exact path='/' component={Orders} />
        </Switch>
      </Col>
    </Row>
  </div>
);

export default App
