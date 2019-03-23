import { createLogic } from 'redux-logic';

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

    process({ getTickets, action }, dispatch, done) {
        getTickets(action.payload)
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
