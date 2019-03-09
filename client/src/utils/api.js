import qs from 'query-string';

import { requestTickets, receiveTickets } from '../state/tickets';

const handleError = (error) => {
    console.warn(error); // eslint-disable-line
    return null;
};

const api = {
    createSession: 'api/createsession',
    getTickets: 'api/getTicketData',
    mockData: 'api/mockData',
    getCurrencyRates: '/api/getCurrencyRates',
};

const fetchCurrencyRates = async (base) => {
    const currencyURI = window.encodeURI(`${api.getCurrencyRates}/${base}`);
    const currencyResponse = await fetch(currencyURI).catch(handleError);
    const currencyData = await currencyResponse.json();

    return currencyData && currencyData.body;
};

export const createApiSession = async (query) => {
    const apiURI = window.encodeURI(api.createSession);
    const encodedURI = window.encodeURI(`${apiURI}/${query}`);
    const response = await fetch(encodedURI).catch(handleError);
    const data = await response.json();

    return data && data.sessionKey;
};

export const fetchTickets = (query = '') => (
    async (dispatch) => {
        dispatch(requestTickets());
        if (query.length === 0) {
            const encodedURI = window.encodeURI(api.mockData);
            const response = await fetch(encodedURI).catch(handleError);
            const data = await response.json();
            const ticketData = data && data.body;

            dispatch(receiveTickets({ ...ticketData }));
            return;
        }

        const sessionKey = await createApiSession(query);
        const { currency } = qs.parse(query);
        const currencyRates = await fetchCurrencyRates(currency);

        const ticketsURI = window.encodeURI(`${api.getTickets}/${sessionKey}`);
        const ticketsResponse = await fetch(ticketsURI).catch(handleError);
        const ticketsData = await ticketsResponse.json();
        const tickets = ticketsData && ticketsData.body;

        dispatch(receiveTickets({ ...tickets, currencyRates }));
    }
);
