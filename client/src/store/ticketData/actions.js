import { createAction } from 'redux-starter-kit';

export const requestTickets = createAction('tickets/request');
export const requestTicketsSuccess = createAction('tickets/requestSuccess');
export const requestTicketsFail = createAction('tickets/requestFail');
export const resetTickets = createAction('tickets/reset');
