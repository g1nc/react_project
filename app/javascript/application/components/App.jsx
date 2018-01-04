import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import Header from './layout/Header'
import AppRoutes from '../routes/index';

const App = (props) => (
  <div>
    <Header token={getMetaContent} alert={props.alert} notice={props.notice} />
    <Row style={{paddingTop: '1rem'}}>
      <Col lg={12}>
        <Switch>
          <AppRoutes/>
        </Switch>
      </Col>
    </Row>
  </div>
);

const getMetaContent = () => {
  var metas = document.getElementsByTagName('meta');
  for (var i=0; i<metas.length; i++) {
    if (metas[i].getAttribute("name") == name) {
      return metas[i].getAttribute("content");
    }
  }
  return "";
};

export default App
