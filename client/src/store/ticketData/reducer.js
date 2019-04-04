import { createReducer } from 'redux-starter-kit';

import {
    request,
    requestSuccess,
    requestCancel,
    reset,
    selectStop,
    setStops,
} from './actions';

const initialState = {
    isLoading: false,
    ticketData: {},
    hasTickets: false,
    selectedStops: {},
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
        selectedStops: {
            [payload.stopOptions[0]]: true,
        },
    }),

    [requestCancel]: state => ({
        ...state,
        isLoading: false,
    }),

    [selectStop]: (state, { payload }) => ({
        ...state,
        selectedStops: {
            ...state.selectedStops,
            [payload]: !state.selectedStops[payload],
        },
    }),

    [setStops]: (state, { payload }) => ({
        ...state,
        selectedStops: payload,
    }),

    [reset]: () => initialState,
});

export default reducer;
