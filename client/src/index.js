import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '@babel/polyfill';

import store from './store';
import App from './containers/App';

import 'react-calendar/dist/Calendar.css';
import './custom/calendar.css';

import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
