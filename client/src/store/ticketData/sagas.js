import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchTickets } from '../../utils/api';
import {
    request,
    requestSuccess,
    requestFail,
} from './actions';

function* fetchTicketData(action) {
    try {
        const ticketData = yield call(fetchTickets, action.payload);
        yield put(requestSuccess(ticketData));
    } catch (err) {
        yield put(requestFail());
    }
}

function* ticketDataSaga() {
    yield takeLatest(request, fetchTicketData);
}

export default ticketDataSaga;
