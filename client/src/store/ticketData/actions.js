import { createAction } from 'redux-starter-kit';

export const request = createAction('tickets/request');
export const requestSuccess = createAction('tickets/requestSuccess');
export const requestFail = createAction('tickets/requestFail');
export const requestCancel = createAction('tickets/requestCancel');
export const requestRetry = createAction('tickets/requestRetry');
export const reset = createAction('tickets/reset');
export const selectStop = createAction('tickets/selectStop');
export const setStops = createAction('tickets/setStops');
