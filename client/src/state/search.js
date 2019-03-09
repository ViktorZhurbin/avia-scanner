import { createAction, createReducer } from 'redux-starter-kit';
import localeCurrency from 'locale-currency';

import { getTodayPlusNDaysIsoString } from '../utils/string';
import { places } from '../constants/mockData';
import getBrowserLocale from '../utils/getBrowserLocale';

export const setCurrency = createAction('search/setCurrency');
export const setLocale = createAction('search/setLocale');
export const setOrigin = createAction('search/setOrigin');
export const setDestination = createAction('search/setDestination');
export const setDeparture = createAction('search/setDeparture');
export const resetSearch = createAction('search/resetSearch');

const initialState = {
    currency: {
        code: localeCurrency.getCurrency(getBrowserLocale()),
        name: '',
    },
    locale: getBrowserLocale(),
    origin: places[0],
    destination: places[1],
    departure: getTodayPlusNDaysIsoString(14),
};

const reducer = createReducer(initialState, {
    [setCurrency]: (state, { payload }) => ({
        ...state,
        currency: payload,
    }),
    [setLocale]: (state, { payload }) => ({
        ...state,
        locale: payload,
    }),
    [setOrigin]: (state, { payload }) => ({
        ...state,
        origin: payload,
    }),
    [setDestination]: (state, { payload }) => ({
        ...state,
        destination: payload,
    }),
    [setDeparture]: (state, { payload }) => ({
        ...state,
        departure: payload,
    }),
    [resetSearch]: () => initialState,
});

export default reducer;
