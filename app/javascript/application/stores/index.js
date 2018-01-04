import { createStore } from 'redux'
import app from '../reducers'

const initialState = {
    cities: {
        collection: []
    },
    addresses: {
        collection: []
    },
    products: {
        collection: []
    },
    orders: {
        collection: [],
        order: null,
        code: ''
    },
    users: {
        collection: [],
    },
};

const store = createStore(
    app,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store