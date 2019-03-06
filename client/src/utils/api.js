import qs from 'query-string';

import { requestTickets, receiveTickets } from '../state/tickets/ticketsActions';
import { currencyRates as mockCurrencyRates } from '../constants/mockData';

const handleError = (error) => {
    console.warn(error); // eslint-disable-line
    return null;
};

const api = {
    createSession: 'api/createsession',
    getTickets: 'api/getTicketData',
    mockData: 'api/mockData',
    currencyRates: '/api/currencyRates',
};

export const fetchCurrencyRates = async (base) => {
    const apiKey = '91ba9cf6354f4e83126b';
    const curBaseUrl = 'https://free.currencyconverterapi.com/api/v6/convert?';
    const currencyList = ['USD', 'EUR', 'RUB'];
    const requiredRates = currencyList.filter(item => item !== base);

    const from = encodeURIComponent(base);
    const toFirst = encodeURIComponent(requiredRates[0]);
    const toSecond = encodeURIComponent(requiredRates[1]);
    const queryOne = `${from}_${toFirst}`;
    const queryTwo = `${from}_${toSecond}`;

    const url = `${curBaseUrl}apiKey=${apiKey}&q=${queryOne},${queryTwo}&compact=ultra`;
    const encodedURI = encodeURI(url);
    const response = await fetch(encodedURI).catch(handleError);
    const data = await response.json();

    const rates = {};
    if (response) {
        Object.entries(data).map(([key, value]) => {
            const [baseCurrency, currency] = key.split('_');
            rates[currency] = value;
            rates[baseCurrency] = 1;
            return null;
        });
    } else {
        mockCurrencyRates(base);
    }

    return rates;
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
            const tickets = data && data.body;
            const currencyRates = mockCurrencyRates('USD');

            dispatch(receiveTickets({ ...tickets, currencyRates }));
            return;
        }

        const sessionKey = await createApiSession(query);

        const encodedURI = window.encodeURI(`${api.getTickets}/${sessionKey}`);
        const response = await fetch(encodedURI).catch(handleError);
        const data = await response.json();
        const tickets = data && data.body;

        const { currency } = qs.parse(query);
        const currencyRates = await fetchCurrencyRates(currency);

        dispatch(receiveTickets({ ...tickets, currencyRates }));
    }
);
