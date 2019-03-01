import React from 'react';
import ReactDOM from 'react-dom';

import '@babel/polyfill';

import App from './containers/App';

import 'react-calendar/dist/Calendar.css';
import './custom/calendar.css';

import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
