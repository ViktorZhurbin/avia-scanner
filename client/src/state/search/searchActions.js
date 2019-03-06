export const SET_CURRENCY = 'SET_CURRENCY';
export const SET_LOCALE = 'SET_LOCALE';
export const SET_ORIGIN = 'SET_ORIGIN';
export const SET_DESTINATION = 'SET_DESTINATION';
export const SET_DEPARTURE = 'SET_DEPARTURE';
export const RESET_SEARCH = 'RESET_SEARCH';

export const setCurrency = currency => ({
    type: SET_CURRENCY,
    currency,
});

export const setLocale = locale => ({
    type: SET_LOCALE,
    locale,
});

export const setOrigin = origin => ({
    type: SET_ORIGIN,
    origin,
});

export const setDestination = destination => ({
    type: SET_DESTINATION,
    destination,
});

export const setDeparture = departure => ({
    type: SET_DEPARTURE,
    departure,
});

export const resetSearch = () => ({
    type: RESET_SEARCH,
});
