import { createAction } from 'redux-starter-kit';

export const setCurrency = createAction('search/setCurrency');
export const setLocale = createAction('search/setLocale');
export const setOrigin = createAction('search/setOrigin');
export const setDestination = createAction('search/setDestination');
export const setDeparture = createAction('search/setDeparture');
export const setFormInput = createAction('search/setFormInput');
export const resetSearch = createAction('search/reset');
