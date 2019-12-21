import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import createSagaMiddleware from 'redux-saga';

import ticketsReducer from './ticketData/reducer';
import searchReducer from './searchQuery/reducer';
import ticketDataSaga from './ticketData/sagas';

const reducer = {
    tickets: ticketsReducer,
    search: searchReducer
};

const sagaMiddleware = createSagaMiddleware();

const [immutableStateInvariant, serializableStateInvariant] = getDefaultMiddleware();

let middleware = [sagaMiddleware];
if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable global-require */
    const { logger } = require('redux-logger');
    /* eslint-enable global-require */
    middleware = [...middleware, logger, immutableStateInvariant, serializableStateInvariant];
}

const store = configureStore({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production'
});

sagaMiddleware.run(ticketDataSaga);

export default store;
