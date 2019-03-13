import { createAction, createReducer } from 'redux-starter-kit';
import localeCurrency from 'locale-currency';
import qs from 'query-string';

import { getTodayPlusNDaysIsoString } from '../utils/dateTime';
import getBrowserLocale from '../utils/getBrowserLocale';
import { places } from '../constants/mockData';

export const setCurrency = createAction('search/setCurrency');
export const setLocale = createAction('search/setLocale');
export const setOrigin = createAction('search/setOrigin');
export const setDestination = createAction('search/setDestination');
export const setDeparture = createAction('search/setDeparture');
export const setFormInput = createAction('search/setFormInput');
export const resetSearch = createAction('search/reset');

const initialState = {
    currency: {
        code: localeCurrency.getCurrency(getBrowserLocale()),
        name: '',
    },
    locale: getBrowserLocale(),
    origin: {},
    destination: {},
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
    [setFormInput]: (state, { payload }) => {
        const { origin, destination, departure } = qs.parse(payload);
        const originPlace = places.find(({ code }) => code === origin);
        const destinationPlace = places.find(({ code }) => code === destination);

        return {
            ...state,
            origin: originPlace,
            destination: destinationPlace,
            departure,
        };
    },
    [resetSearch]: () => initialState,
});

export default reducer;
