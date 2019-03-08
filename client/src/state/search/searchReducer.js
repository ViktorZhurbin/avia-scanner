import localeCurrency from 'locale-currency';

import { getISODatStringOfTodayPlusNdays } from '../../utils/string';
import { places } from '../../constants/mockData';
import getBrowserLocale from '../../utils/getBrowserLocale';

import {
    SET_ORIGIN,
    SET_DESTINATION,
    SET_CURRENCY,
    SET_LOCALE,
    SET_DEPARTURE,
    RESET_SEARCH,
} from './searchActions';

const initialState = {
    currency: {
        code: localeCurrency.getCurrency(getBrowserLocale()),
        name: '',
    },
    locale: getBrowserLocale(),
    origin: places[0],
    destination: places[1],
    departure: getISODatStringOfTodayPlusNdays(14),
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENCY:
            return { ...state, currency: action.currency };
        case SET_LOCALE:
            return { ...state, locale: action.locale };
        case SET_ORIGIN:
            return { ...state, origin: action.origin };
        case SET_DESTINATION:
            return { ...state, destination: action.destination };
        case SET_DEPARTURE:
            return { ...state, departure: action.departure };
        case RESET_SEARCH:
            return { ...initialState };
        default:
            return state;
    }
};

export default reducer;
