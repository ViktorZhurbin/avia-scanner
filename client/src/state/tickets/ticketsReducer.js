import {
    REQUEST_TICKETS,
    RECEIVE_TICKETS,
    RESET_TICKETS,
} from './ticketsActions';

const initialState = {
    isLoading: false,
    ticketData: {},
    hasTickets: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_TICKETS:
            return { ...state, isLoading: true };
        case RECEIVE_TICKETS:
            return {
                ...state,
                ticketData: action.ticketData,
                isLoading: false,
                hasTickets: action.ticketData && action.ticketData.allTickets
                    && action.ticketData.allTickets.length > 0,
            };
        case RESET_TICKETS:
            return { ...initialState };
        default:
            return state;
    }
};

export default reducer;
