import { createReducer } from 'redux-starter-kit';

import {
    request,
    requestSuccess,
    requestCancel,
    reset,
    setStops,
    resetStops,
} from './actions';

const initialState = {
    isLoading: false,
    ticketData: {},
    hasTickets: false,
    selectedStops: [],
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
        selectedStops: [payload.stopOptions[0]],
    }),

    [requestCancel]: state => ({
        ...state,
        isLoading: false,
    }),

    [setStops]: (state, { payload }) => ({
        ...state,
        selectedStops: payload,
    }),

    [resetStops]: state => ({
        ...state,
        selectedStops: [state.ticketData.stopOptions[0]],
    }),

    [reset]: () => initialState,
});

export default reducer;
