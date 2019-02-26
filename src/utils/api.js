import axios from 'axios';
// import qs from 'query-string';

import formatTickets from './formatTicketData';

const handleError = (error) => {
    console.warn(error); // eslint-disable-line
    return null;
};

const baseUrl = 'http://localhost:8080';
const api = {
    createSession: 'api/createsession',
    getTickets: 'api/getTicketData',
    mockData: 'api/mockData',
    currencyRates: '/api/currencyRates',
};

const getURI = (...args) => {
    const string = `${[baseUrl, ...args].join('/')}`;

    return window.encodeURI(string);
};

export const createApiSession = async (query) => {
    const encodedURI = getURI(api.createSession);
    const { data } = await axios.get(`${encodedURI}?${query}`).catch(handleError);
    const sessionKey = data && data.sessionKey;
    return sessionKey;
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
    const { data } = await axios.get(encodedURI).catch(handleError);
    const rates = {};
    Object.entries(data).map(([key, value]) => {
        const [baseCurrency, currency] = key.split('_');
        rates[currency] = value;
        rates[baseCurrency] = 1;
        return null;
    });

    return rates;
};

export const fetchTickets = async (query = '') => {
    if (query.length === 0) {
        const encodedURI = getURI(api.mockData);
        const { data } = await axios.get(encodedURI).catch(handleError);

        return data && data.body;
    }

    const sessionKey = await createApiSession(query);

    // const baseCurrency = qs.stringify(query).currency;
    // const currencyRates = await fetchCurrencyRates(baseCurrency);

    const encodedURI = getURI(api.getTickets, sessionKey);
    const { data } = await axios.get(encodedURI).catch(handleError);

    const tickets = data && data.ok && data.body;
    // tickets.currencyRates = currencyRates;
    // console.log(tickets);

    return tickets;
};

export const getFormattedTickets = async (query) => {
    const tickets = await fetchTickets(query);

    return formatTickets(tickets);
};
