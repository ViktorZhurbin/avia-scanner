const unirest = require('unirest');

const baseUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing';
const apiKey = '166e56093cmsh7cb5c98216f8318p11d2eejsn8fe0d9372517';

const createSession = () => {
    unirest.post(`${baseUrl}/v1.0`)
        .header('X-RapidAPI-Key', apiKey)
        .header('Content-Type', 'application/x-www-form-urlencoded')
        .send('country=US')
        .send('currency=USD')
        .send('locale=en-US')
        .send('originPlace=SFO-sky')
        .send('destinationPlace=LHR-sky')
        .send('inboundDate=2019-03-05')
        .send('outboundDate=2019-03-03')
        .send('adults=1')
        .end((result) => {
            console.log(result.status, result.headers, result.body);
        });
};

const fetchTickets = (sessionKey) => {
    unirest.get(`${baseUrl}/uk2/v1.0/{${sessionKey}}?pageIndex=0&pageSize=10`)
        .header('X-RapidAPI-Key', apiKey)
        .end((result) => {
            console.log(result.status, result.headers, result.body);
        });
};

export { createSession, fetchTickets };
