import {
    call,
    put,
    takeLatest,
    delay,
} from 'redux-saga/effects';

import { fetchTickets } from '../../utils/api';
import {
    request,
    requestSuccess,
    requestFail,
} from './actions';

function* fetchTicketData(action) {
    for (let i = 1; i <= 5; i += 1) {
        try {
            const ticketData = yield call(fetchTickets, action.payload);
            yield put(requestSuccess(ticketData));
        } catch (err) {
            if (i < 5) {
                yield call(delay, 1000);
            } else {
                yield put(requestFail());
            }
        }
    }

    throw new Error('API request failed');
}

function* ticketDataSaga() {
    yield takeLatest(request, fetchTicketData);
}

export default ticketDataSaga;
