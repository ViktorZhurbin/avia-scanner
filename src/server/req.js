const unirest = require('unirest');
const moment = require('moment');

const mockTicketData = require('./mockTicketData');

const baseUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing';
const apiKey = '166e56093cmsh7cb5c98216f8318p11d2eejsn8fe0d9372517';

module.exports = {
    mockData: (req, res) => {
        res.json({
            body: mockTicketData,
        });
    },

    createSession: (req, res) => {
        // console.log(req.query);
        const today = moment().format('YYYY-MM-DD');
        const {
            origin = 'SVO',
            destination = 'LHR',
            departure = today,
            locale = 'en-US',
        } = req.query;

        const [, country] = locale.split('-');

        unirest.post(`${baseUrl}/v1.0`)
            .header('X-RapidAPI-Key', apiKey)
            .header('Content-Type', 'application/x-www-form-urlencoded')
            .send(`country=${country}`)
            .send('currency=USD')
            .send(`locale=${locale}`)
            .send(`originPlace=${origin}-sky`)
            .send(`destinationPlace=${destination}-sky`)
            .send(`outboundDate=${departure}`)
            .send('adults=1')
            .end((result) => {
                // console.log(result.status, result.ok, result.headers.location);
                const sessionUrl = result.headers.location;
                const key = sessionUrl && sessionUrl.split('/').pop();
                res.json({ sessionKey: key });
            });
    },

    fetchTickets: (req, res) => {
        const key = req.params.sessionKey;
        // console.log(key);
        const reqUrl = `${baseUrl}/uk2/v1.0/${key}?pageIndex=0&pageSize=10`;
        // console.log(reqUrl);
        unirest.get(reqUrl)
            .header('X-RapidAPI-Key', apiKey)
            .end((result) => {
                // console.log(result.status, result.headers, result.body);
                res.json({
                    status: result.status,
                    ok: result.ok,
                    headers: result.headers,
                    body: result.body,
                });
            });
    },
};
