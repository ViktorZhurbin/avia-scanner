import {
    call,
    put,
    takeLatest,
    delay
} from 'redux-saga/effects';

import { fetchTickets } from '../../utils/api';
import {
    request,
    requestSuccess,
    requestFail,
    requestCancel,
    requestRetry
} from './actions';

function* fetchTicketDataApi(query) {
    if (!query) {
        const mockData = yield call(fetchTickets);
        return mockData;
    }
    for (let i = 1; i <= 5; i += 1) {
        try {
            const ticketData = yield call(fetchTickets, query);
            return ticketData;
        } catch (error) {
            if (i < 5) {
                yield put(requestRetry(error));
                yield delay(2000);
            } else {
                yield put(requestFail());
                yield put(requestCancel());
            }
        }
    }

    throw new Error('API request failed');
}

function* fetchTicketData({ payload }) {
    yield delay(500);
    if (!payload) {
        const mockData = yield call(fetchTicketDataApi);
        yield put(requestSuccess(mockData));
        return;
    }
    const ticketData = yield call(fetchTicketDataApi, payload);
    yield put(requestSuccess(ticketData));
}

function* ticketDataSaga() {
    yield takeLatest(request, fetchTicketData);
}

export default ticketDataSaga;
