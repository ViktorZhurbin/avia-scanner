import { createLogic } from 'redux-logic';

import { fetchTickets } from '../../utils/api';
import { validateQueryString } from '../../utils/string';
import {
    request,
    requestSuccess,
    requestFail,
    requestCancel,
} from './actions';

// eslint-disable-next-line import/prefer-default-export
export const requestTicketsLogic = createLogic({
    type: request,
    cancelType: requestCancel,
    throttle: 1000,
    latest: true,

    validate({ action }, allow, reject) {
        const { isValid } = validateQueryString(action.payload);
        if (isValid) {
            allow(action);
        } else {
            reject();
        }
    },

    process({ action }, dispatch, done) {
        fetchTickets(action.payload)
            .then(ticketData => (
                dispatch(requestSuccess(ticketData))
            ))
            .catch(() => {
                dispatch(requestFail());
                dispatch(requestCancel());
            })
            .then(() => done());
    },
});
