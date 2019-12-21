const axios = require('axios');
const { mockRates } = require('../mockData/currencyRates');
const { handleError } = require('../utils/api');

const apiKey = process.env.BASE_URL_CURRENCY;
const baseUrl = process.env.API_KEY_CURRENCY;

module.exports = {
    fetchCurrencyRates: async (req, res) => {
        const base = req.params.base;
        const currencyList = ['USD', 'EUR', 'RUB'];
        const requiredRates = currencyList.filter(item => item !== base);

        const from = encodeURIComponent(base);
        const toFirst = encodeURIComponent(requiredRates[0]);
        const toSecond = encodeURIComponent(requiredRates[1]);
        const queryOne = `${from}_${toFirst}`;
        const queryTwo = `${from}_${toSecond}`;

        const url = `${baseUrl}apiKey=${apiKey}&q=${queryOne},${queryTwo}&compact=ultra`;

        let rates = {};
        try {
            const response = await axios.get(url).catch(handleError);
            // console.log(response.statusText, response.data);
            Object.entries(response.data).map(([key, value]) => {
                const [baseCurrency, currency] = key.split('_');
                rates[currency] = value;
                rates[baseCurrency] = 1;
            });
        } catch (error) {
            console.warn(error);
            rates = mockRates(base);
        }

        res.json({
            body: rates,
        });
    },
};
