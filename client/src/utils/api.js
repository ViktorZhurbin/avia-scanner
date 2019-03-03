import axios from 'axios';

import { currencyRates } from '../constants/mockData';

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

export const createApiSession = async (query) => {
    const apiURI = window.encodeURI(api.createSession);
    const encodedURI = window.encodeURI(`${apiURI}/${query}`);
    const { data } = await axios.get(encodedURI).catch(handleError);

    const sessionKey = data && data.sessionKey;
    return sessionKey;
};

export const fetchTickets = async (query = '') => {
    if (query.length === 0) {
        const encodedURI = window.encodeURI(api.mockData);
        const { data } = await axios.get(encodedURI).catch(handleError);

        return data && data.body;
    }

    const sessionKey = await createApiSession(query);
    const encodedURI = window.encodeURI(`${api.getTickets}/${sessionKey}`);
    const { data } = await axios.get(encodedURI).catch(handleError);
    const tickets = data && data.ok && data.body;

    return tickets;
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
    const response = await axios.get(encodedURI).catch(handleError);
    const rates = {};
    if (response) {
        Object.entries(response.data).map(([key, value]) => {
            const [baseCurrency, currency] = key.split('_');
            rates[currency] = value;
            rates[baseCurrency] = 1;
            return null;
        });
    } else {
        currencyRates(base);
    }

    return rates;
};
