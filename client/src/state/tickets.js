import { createReducer, createAction } from 'redux-starter-kit';

export const requestTickets = createAction('tickets/request');
export const receiveTickets = createAction('tickets/receive');
export const resetTickets = createAction('tickets/reset');

const initialState = {
    isLoading: false,
    ticketData: {},
    hasTickets: false,
};

const reducer = createReducer(initialState, {
    [requestTickets]: state => ({
        ...state,
        isLoading: true,
    }),
    [receiveTickets]: (state, { payload }) => ({
        ...state,
        isLoading: false,
        ticketData: payload,
        hasTickets: payload && payload.allTickets
            && payload.allTickets.length > 0,
    }),
    [resetTickets]: () => initialState,
});

export default reducer;
