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
    const response = await fetch(encodedURI).catch(handleError);
    const data = await response.json();

    return data && data.sessionKey;
};

export const fetchTickets = async (query = '', cancelToken = null) => {
    if (query.length === 0) {
        const encodedURI = window.encodeURI(api.mockData);
        const response = await fetch(encodedURI).catch(handleError);
        const data = await response.json();

        return data && data.body;
    }

    const sessionKey = await createApiSession(query, cancelToken);
    const encodedURI = window.encodeURI(`${api.getTickets}/${sessionKey}`);
    const response = await fetch(encodedURI).catch(handleError);
    const data = await response.json();

    return data && data.ok && data.body;
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
        currencyRates(base);
    }

    return rates;
};
