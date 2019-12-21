const axios = require('axios');
const qs = require('qs');
require('dotenv').config();
const mockTicketData = require('../mockData/ticketData');
const { formatTickets } = require('../utils/formatTickets');
const { handleError } = require('../utils/api');

const baseUrl = process.env.BASE_URL_TICKET;
const apiKey = process.env.API_KEY_TICKET;

module.exports = {
    mockData: (req, res) => {
        res.json({
            body: mockTicketData,
        });
    },

    createSession: async (req, res, next) => {
        console.log('creating session with query:\n', req.query);
        const { origin, destination, departure, locale, currency } = req.query;

        const [, country] = locale && locale.split('-');

        const data = {
            country,
            currency,
            locale,
            originPlace: `${origin}-sky`,
            destinationPlace: `${destination}-sky`,
            outboundDate: departure,
            adults: 1,
        };

        const options = {
            method: 'POST',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify(data),
        };

        try {
            const { headers } = await axios(`${baseUrl}/v1.0`, options).catch(
                handleError
            );
            const { location } = headers;
            const sessionKey = location && location.split('/').pop();

            res.json({
                body: sessionKey,
            });
        } catch (error) {
            // console.log(error);
            next(error);
        }
    },

    fetchTickets: async (req, res, next) => {
        console.log('fetching tickets');
        const key = req.params.sessionKey;
        console.log('session key OK:', Boolean(key));
        const reqUrl = `${baseUrl}/uk2/v1.0/${key}?pageIndex=0&pageSize=10`;

        try {
            const { data } = await axios
                .get(reqUrl, {
                    headers: { 'X-RapidAPI-Key': apiKey },
                })
                .catch(handleError);

            res.json({
                body: data && formatTickets(data),
            });
        } catch (error) {
            next(error);
        }
    },
};
