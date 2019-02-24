import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SearchLayout from '../SearchLayout';
import LandingLayout from '../LandingLayout';

import styles from './App.module.css';

const App = () => (
    <BrowserRouter>
        <div className={styles.container}>
            <Switch>
                <Route path="/" exact component={LandingLayout} />
                <Route path="/search/:searchId" component={SearchLayout} />
                <Route render={() => <p>Not Found</p>} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default App;
