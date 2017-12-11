import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import WrappedOrderForm from './OrderForm'

const App = (props) => (
    <Router>
        <div>
            <Route
                path='/'
                render={(routeProps) => <WrappedOrderForm {...props} {...routeProps} />}
            />
        </div>
    </Router>
);

// You will need this on the bottom of each component file
// to make it available through ES6 'import' statements.

export default App
