import axios from 'axios';

const handleError = (error) => {
    console.warn(error);
    return null;
};
// const baseUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing';
// const apiKey = '166e56093cmsh7cb5c98216f8318p11d2eejsn8fe0d9372517';

const baseUrl = 'http://localhost:8080';
const createSession = 'api/createsession';
const getTickets = 'api/getTicketData';
// const corsAnywhere = 'https://cors-anywhere.herokuapp.com';

export const createApiSession = async () => {
    const encodedURI = window.encodeURI(`${baseUrl}/${createSession}`);
    const { data } = await axios.get(encodedURI).catch(handleError);

    const sessionKey = data && data.sessionKey;
    return sessionKey;
};

export const fetchTickets = async () => {
    const sessionKey = await createApiSession();
    const encodedURI = window.encodeURI(`${baseUrl}/${getTickets}/${sessionKey}`);
    const { data } = await axios.get(encodedURI).catch(handleError);
    console.log(data.body);

    return data && data.ok && data.body;
};
