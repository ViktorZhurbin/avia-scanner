import qs from 'query-string';

const api = {
    createSession: 'api/createsession',
    getTickets: 'api/getTicketData',
    mockData: 'api/mockData',
    getCurrencyRates: '/api/getCurrencyRates'
};

const fetchCurrencyRates = async (base) => {
    const encodedURI = window.encodeURI(`${api.getCurrencyRates}/${base}`);
    const response = await fetch(encodedURI);
    const data = await response.json();

    return data && data.body;
};

export const createApiSession = async (query) => {
    const encodedURI = window.encodeURI(`${api.createSession}/${query}`);
    const response = await fetch(encodedURI);
    const data = await response.json();

    return data && data.body;
};

export const fetchMockTicketData = async (query) => {
    const encodedURI = window.encodeURI(`${api.mockData}/${query}`);
    const response = await fetch(encodedURI);
    const data = await response.json();

    return { ...(data && data.body) };
};

export const ticketRequestController = new AbortController();

export const fetchTickets = async ({ search, isMock }) => {
    try {
        if (isMock) {
            const mockData = await fetchMockTicketData(search);

            return mockData;
        }

        const sessionKey = await createApiSession(search);
        if (!sessionKey) {
            throw new Error('session key error');
        }
        const { currency } = qs.parse(search);
        const currencyRates = await fetchCurrencyRates(currency);

        const ticketsURI = window.encodeURI(`${api.getTickets}/${sessionKey}`);
        const { signal } = ticketRequestController;
        const response = await fetch(ticketsURI, { signal });
        const data = await response.json();
        const tickets = data && data.body;

        return { ...tickets, currencyRates };
    } catch (error) {
        throw error;
    }
};

export const filterTickets = (ticketList, filters) =>
    ticketList
        ? ticketList.filter((ticket) => filters.includes(ticket.stops))
        : [];
