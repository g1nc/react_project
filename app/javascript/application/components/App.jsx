import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import OrderForm from './OrderForm'
import OrderList from './OrderList'

const App = (props) => (
    <Router>
        <div>
            <Route path='/orders'     render={(routeProps) => <OrderList {...props} {...routeProps} />} />
            <Route path='/orders/new' render={(routeProps) => <OrderForm {...props} {...routeProps} />} />
            <Route path='/orders/:id' render={(routeProps) => <OrderList {...props} {...routeProps} />} />
        </div>
    </Router>
);

export default App
