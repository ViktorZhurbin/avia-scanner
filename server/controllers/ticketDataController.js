const unirest = require('unirest');

const mockTicketData = require('../mockData/ticketData');
const tickets = require('../helpers/tickets');

const baseUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing';
const apiKey = '166e56093cmsh7cb5c98216f8318p11d2eejsn8fe0d9372517';

module.exports = {
    mockData: (req, res) => {

        res.json({
            body: mockTicketData,
        });
    },

    createSession: (req, res) => {
        console.log('creteSession query', req.query);
        const {
            origin,
            destination,
            departure,
            locale,
            currency,
        } = req.query;

        const [, country] = locale && locale.split('-');

        unirest.post(`${baseUrl}/v1.0`)
            .header('X-RapidAPI-Key', apiKey)
            .header('Content-Type', 'application/x-www-form-urlencoded')
            .send(`country=${country}`)
            .send(`currency=${currency}`)
            .send(`locale=${locale}`)
            .send(`originPlace=${origin}-sky`)
            .send(`destinationPlace=${destination}-sky`)
            .send(`outboundDate=${departure}`)
            .send('adults=1')
            .end((result) => {
                // console.log(result.body);
                const sessionUrl = result.headers.location;
                const sessionKey = sessionUrl && sessionUrl.split('/').pop();
                // console.log('sessionKey', sessionKey);
                res.json({ sessionKey });
            });
    },

    fetchTickets: (req, res) => {
        console.log('fetchingTickets');
        const key = req.params.sessionKey;
        // console.log('sessionKey', key);
        const reqUrl = `${baseUrl}/uk2/v1.0/${key}?pageIndex=0&pageSize=10`;
        // console.log(reqUrl);
        unirest.get(reqUrl)
            .header('X-RapidAPI-Key', apiKey)
            .end((result) => {
                if (result) {
                    const {
                        status,
                        ok,
                        headers,
                        body,
                    } = result;
                    // console.log(status, headers, body);
                    const formatted = body && tickets.format(body);

                    res.json({
                        status,
                        ok,
                        headers,
                        body: formatted,
                    });
                } else {
                    console.log('NO RESULT');
                }
            });
    },
};
