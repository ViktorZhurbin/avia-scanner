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

const getURI = (...args) => {
    const string = `${[baseUrl, ...args].join('/')}`;

    return window.encodeURI(string);
};

export const createApiSession = async (query) => {
    const encodedURI = getURI(api.createSession);
    const { data } = await axios.get(encodedURI + query).catch(handleError);
    const sessionKey = data && data.sessionKey;
    return sessionKey;
};

export const fetchTickets = async (query = '') => {
    if (query.length === 0) {
        const encodedURI = getURI(api.mockData);
        const { data } = await axios.get(encodedURI).catch(handleError);

        return data && data.body;
    }

    const sessionKey = await createApiSession(query);
    const encodedURI = getURI(api.getTickets, sessionKey);
    const { data } = await axios.get(encodedURI).catch(handleError);

    return data && data.ok && data.body;
};

export const getFormattedTickets = async (query) => {
    const tickets = await fetchTickets(query);

    return formatTickets(tickets);
};
