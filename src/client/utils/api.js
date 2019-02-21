import axios from 'axios';

const handleError = (error) => {
    console.warn(error);
    return null;
};

const baseUrl = 'http://localhost:8080';
const getTickets = 'api/getTicketData';
// const corsAnywhere = 'https://cors-anywhere.herokuapp.com';

export default async () => {
    const encodedURI = window.encodeURI(`${baseUrl}/${getTickets}`);
    const { data } = await axios.get(encodedURI).catch(handleError);

    const responseOK = await data && data.data.length > 0;

    return responseOK ? data.data : null;
};
