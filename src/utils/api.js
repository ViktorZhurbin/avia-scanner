import axios from 'axios';

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
};

// const corsAnywhere = 'https://cors-anywhere.herokuapp.com';

const getURI = (...args) => {
    const string = `${[baseUrl, ...args].join('/')}`;

    return window.encodeURI(string);
};

export const createApiSession = async () => {
    const encodedURI = getURI(api.createSession);
    const { data } = await axios.get(encodedURI).catch(handleError);

    const sessionKey = data && data.sessionKey;
    return sessionKey;
};

export const fetchTickets = async (options) => {
    if (options && options.mockData) {
        const encodedURI = getURI(api.mockData);
        const { data } = await axios.get(encodedURI).catch(handleError);

        return data && data.body;
    }

    const sessionKey = await createApiSession();
    const encodedURI = getURI(api.getTickets, sessionKey);
    const { data } = await axios.get(encodedURI).catch(handleError);

    return data && data.ok && data.body;
};

export const getFormattedTickets = async (options) => {
    const tickets = await fetchTickets(options);

    return formatTickets(tickets);
};
