import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import cl from 'classnames/bind';

import SearchLayout from '../SearchLayout';
import LandingLayout from '../LandingLayout';
import Header from '../Header';

import styles from './index.css';

const cx = cl.bind(styles);

const App = () => (
    <BrowserRouter>
        <div className={cx('container')}>
            <Header />
            <Switch>
                <Route path="/" exact component={LandingLayout} />
                <Route path="/search" component={SearchLayout} />
                <Route render={() => <p>Not Found</p>} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default App;
