import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { logger } from 'redux-logger';
import { createLogicMiddleware } from 'redux-logic';

import ticketsReducer from './ticketData/reducer';
import searchReducer from './searchQuery/reducer';
import { requestTicketsLogic } from './ticketData/logic';

const reducer = {
    tickets: ticketsReducer,
    search: searchReducer,
};

const arrLogic = [requestTicketsLogic];
let middleware = [...getDefaultMiddleware(), createLogicMiddleware(arrLogic)];
if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, logger];
}

const store = configureStore({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
