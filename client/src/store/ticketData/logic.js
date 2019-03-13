import { createLogic } from 'redux-logic';

import { fetchTickets } from '../../utils/api';
import {
    requestTickets,
    requestTicketsSuccess,
    requestTicketsFail,
} from './actions';

// eslint-disable-next-line import/prefer-default-export
export const requestTicketsLogic = createLogic({
    type: requestTickets,
    debounce: 500,
    latest: true,

    validate({ action }, allow, reject) {
        if (action.payload) {
            allow(action);
        } else {
            reject();
        }
    },

    process({ action }, dispatch, done) {
        fetchTickets(action.payload)
            .then(ticketData => (
                dispatch(requestTicketsSuccess(ticketData))
            ))
            .catch((err) => {
                console.error(err); // eslint-disable-line no-console
                dispatch(requestTicketsFail());
            })
            .then(() => done());
    },
});
