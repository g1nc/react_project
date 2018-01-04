import React from 'react'
import { Route } from 'react-router-dom'

import CodeContainer   from '../containers/CodeContainer'
import OrderContainer  from '../containers/OrderContainer';
import OrdersContainer from '../containers/OrdersContainer';
import SignInContainer from '../containers/SignInContainer';
import UsersContainer  from '../containers/UsersContainer';

const OrderRoutes = (props) => (
    <div>
        <Route exact path='/orders'      component={OrdersContainer} />
        <Route exact path='/orders/new'  component={OrderContainer} />
        <Route exact path='/orders/code' component={CodeContainer} />
        <Route exact path='/'            component={OrderContainer} />
    </div>
);

const UserRoutes = (props) => (
    <div>
        <Route exact path='/users/sign_in' component={SignInContainer} />
        <Route exact path='/users'         component={UsersContainer} />
    </div>
);

const AppRoutes = (props) => (
    <div>
        <OrderRoutes/>
        <UserRoutes/>
    </div>
);

export default AppRoutes