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
const logicMiddleware = createLogicMiddleware(arrLogic);

const [immutableStateInvariant, serializableStateInvariant] = getDefaultMiddleware();

let middleware = [logicMiddleware];
if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, logger, immutableStateInvariant, serializableStateInvariant];
}

const store = configureStore({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
