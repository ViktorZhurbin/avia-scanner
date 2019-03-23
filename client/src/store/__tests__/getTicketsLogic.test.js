import { createMockStore } from 'redux-logic-test';

import { requestTicketsLogic } from '../ticketData/logic';
import reducer from '../ticketData/reducer';
import {
    request,
    requestSuccess,
} from '../ticketData/actions';

const injectedDeps = {
    getTickets() {
        return Promise.resolve(42);
    },
};

describe('requestTicketsLogic test with reducer', () => {
    let store;
    beforeEach(() => {
        store = createMockStore({
            reducer,
            logic: [requestTicketsLogic],
            injectedDeps,
        });
    });

    it('should fetch answer and dispatch', (done) => {
        store.dispatch(request(42));
        store.whenComplete(() => {
            expect(store.actions).toEqual([
                request(42),
                requestSuccess(42),
            ]);
            done();
        });
    });
});
