const axios = require('axios');
const qs = require('qs');

const mockTicketData = require('../mockData/ticketData');
const { formatTickets } = require('../utils/formatTickets');
const { handleError } = require('../utils/api');

const baseUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing';
const apiKey = '166e56093cmsh7cb5c98216f8318p11d2eejsn8fe0d9372517';

module.exports = {
    mockData: (req, res) => {
        res.json({
            body: mockTicketData,
        });
    },

    createSession: async (req, res) => {
        console.log('creating session\n', req.query);
        const {
            origin,
            destination,
            departure,
            locale,
            currency,
        } = req.query;

        const [, country] = locale && locale.split('-');

        const data = {
            country,
            currency,
            locale,
            originPlace: `${origin}-sky`,
            destinationPlace: `${destination}-sky`,
            outboundDate: departure,
            adults: 1,
        }

        const options = {
            method: 'POST',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify(data),
        }

        try {
            const { headers } = await axios(`${baseUrl}/v1.0`, options).catch(handleError);
            const sessionUrl = headers && headers.location;
            const sessionKey = sessionUrl && sessionUrl.split('/').pop();

            res.json({
                sessionKey,
            });
        } catch (error) {
            console.warn(error);
        }
    },

    fetchTickets: async (req, res) => {
        console.log('fetchTickets');
        const key = req.params.sessionKey;
        console.log('sessionKey', key);
        const reqUrl = `${baseUrl}/uk2/v1.0/${key}?pageIndex=0&pageSize=10`;
        console.log(reqUrl);

        try {
            const { data } = await axios.get(reqUrl, {
                headers: { 'X-RapidAPI-Key': apiKey },
            }).catch(handleError);
            // console.log(status, headers, data);

            res.json({
                body: data && formatTickets(data),
            });
        } catch (error) {
            console.warn(error);
        }
    },
};
