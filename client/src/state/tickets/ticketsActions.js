export const REQUEST_TICKETS = 'REQUEST_TICKETS';
export const RECEIVE_TICKETS = 'RECEIVE_TICKETS';
export const RESET_TICKETS = 'RESET_STATE';

export const requestTickets = () => ({
    type: REQUEST_TICKETS,
});

export const receiveTickets = ticketData => ({
    type: RECEIVE_TICKETS,
    ticketData,
});

export const resetTickets = () => ({
    type: RESET_TICKETS,
});
