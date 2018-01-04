import {combineReducers} from 'redux';

import orders from './orders'
import users from './users'
import addresses from './addresses'
import products from './products'
import cities from './cities'

const app = combineReducers({
    orders,
    users,
    addresses,
    products,
    cities
});

export default app