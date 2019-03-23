import { createReducer } from 'redux-starter-kit';

import {
    request,
    requestSuccess,
    requestCancel,
    reset,
} from './actions';

const initialState = {
    isLoading: false,
    ticketData: {},
    hasTickets: false,
};

const reducer = createReducer(initialState, {
    [request]: state => ({
        ...state,
        isLoading: true,
    }),

    [requestSuccess]: (state, { payload }) => ({
        ...state,
        isLoading: false,
        ticketData: payload,
        hasTickets: payload && payload.allTickets
            && payload.allTickets.length > 0,
    }),

    [requestCancel]: state => ({
        ...state,
        isLoading: false,
    }),

    [reset]: () => initialState,
});

export default reducer;
