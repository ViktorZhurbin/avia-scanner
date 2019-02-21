import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../Home';

import styles from './App.module.css';

const App = () => (
    <BrowserRouter>
        <div className={styles.container}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route render={() => <p>Not Found</p>} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default App;
