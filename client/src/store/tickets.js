import { createReducer, createAction } from 'redux-starter-kit';
import { fetchTickets } from '../utils/api';

export const setLoading = createAction('tickets/setLoading');
export const receiveTickets = createAction('tickets/receive');
export const resetTickets = createAction('tickets/reset');

export const fetchTicketData = query => (
    (dispatch) => {
        dispatch(setLoading(true));
        fetchTickets(query).then(
            ticketData => dispatch(receiveTickets(ticketData)),
        ).then(
            () => dispatch(setLoading(false)),
        );
    }
);

const initialState = {
    isLoading: false,
    ticketData: {},
    hasTickets: false,
};

const reducer = createReducer(initialState, {
    [setLoading]: (state, { payload }) => ({
        ...state,
        isLoading: payload,
    }),
    [receiveTickets]: (state, { payload }) => ({
        ...state,
        ticketData: payload,
        hasTickets: payload && payload.allTickets
            && payload.allTickets.length > 0,
    }),
    [resetTickets]: () => initialState,
});

export default reducer;
