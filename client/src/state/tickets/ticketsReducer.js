import {
    REQUEST_TICKETS,
    RECEIVE_TICKETS,
    RESET_STATE,
    SET_CURRENCY,
    SET_LOCALE,
} from './ticketsActions';

const initialState = {
    isLoading: false,
    ticketData: {},
    hasTickets: false,
    currency: null,
    locale: null,
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
        case RESET_STATE:
            return { initialState };
        case SET_CURRENCY:
            return { ...state, currency: action.currency };
        case SET_LOCALE:
            return { ...state, locale: action.locale };
        default:
            return state;
    }
};

export default reducer;
