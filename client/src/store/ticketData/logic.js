import { createLogic } from 'redux-logic';

import { fetchTickets } from '../../utils/api';
import { validateQuery } from '../../utils/string';
import {
    requestTickets,
    requestTicketsSuccess,
    requestTicketsFail,
    requestTicketsCancel,
} from './actions';

// eslint-disable-next-line import/prefer-default-export
export const requestTicketsLogic = createLogic({
    type: requestTickets,
    cancelType: requestTicketsCancel,
    throttle: 1000,
    latest: true,

    validate({ action }, allow, reject) {
        if (validateQuery(action.payload)) {
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
