import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import './styles/application.scss'

import store from './stores'

const root = document.querySelector('#root');

let alert  = root.dataset.alert;
let notice = root.dataset.notice;

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App alert={alert} notice={notice} />
        </BrowserRouter>
    </Provider>,
    root
);
