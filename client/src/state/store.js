import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { logger } from 'redux-logger';

import ticketsReducer from './tickets/ticketsReducer';

const reducer = {
    tickets: ticketsReducer,
};

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
