export const REQUEST_TICKETS = 'REQUEST_TICKETS';
export const RECEIVE_TICKETS = 'RECEIVE_TICKETS';
export const RESET_STATE = 'RESET_STATE';
export const SET_CURRENCY = 'SET_CURRENCY';
export const SET_LOCALE = 'SET_LOCALE';

export const setCurrency = currency => ({
    type: SET_CURRENCY,
    currency,
});

export const setLocale = locale => ({
    type: SET_LOCALE,
    locale,
});

export const requestTickets = () => ({
    type: REQUEST_TICKETS,
});

export const resetTickets = () => ({
    type: RESET_STATE,
});

export const receivedTickets = ticketData => ({
    type: RECEIVE_TICKETS,
    ticketData,
});
