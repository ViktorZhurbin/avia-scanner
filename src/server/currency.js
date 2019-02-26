// const unirest = require('unirest');
const https = require('https');

// const convertCurrency = require('./testCurrency');

// const baseUrl = 'https://free.currencyconverterapi.com';
// const apiKey = '91ba9cf6354f4e83126b';
// const currencyList = ['USD', 'EUR', 'RUB'];

module.exports = {
    convertCurrency: (amount, fromCurrency, toCurrency, cb) => {
        const apiKey = '91ba9cf6354f4e83126b';
        const baseUrl = 'https://api.currencyconverterapi.com/api/v6/convert?q=';

        const from = encodeURIComponent(fromCurrency);
        const to = encodeURIComponent(toCurrency);
        const query = `${from}_${to}`;

        const url = `${baseUrl}query&compact=ultra&apiKey=${apiKey}`;

        https.get(url, (res) => {
            let body = '';

            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                try {
                    const jsonObj = JSON.parse(body);

                    const val = jsonObj[query];
                    if (val) {
                        const total = val * amount;
                        cb(null, Math.round(total * 100) / 100);
                    } else {
                        const err = new Error(`Value not found for ${query}`);
                        console.log(err);
                        cb(err);
                    }
                } catch (e) {
                    console.log('Parse error: ', e);
                    cb(e);
                }
            });
        }).on('error', (e) => {
            console.log('Got an error: ', e);
            cb(e);
        });
    },

    fetchCurrencyRates: (req, res) => {
        this.convertCurrency(1, 'USD', 'RUB', (err, amount) => {
            console.log(amount);
            res.json({
                body: amount,
            });
        });
        // console.log(req.query);
        // const { baseCurrency } = req.params;
        // const base = baseCurrency ? `base=${baseCurrency}` : '';
        // const fullUrl = `${baseUrl}?access_key=${apiKey}&${base}&symbols=${currencyList}`;

        // unirest.get(fullUrl)
        //     .header('X-RapidAPI-Key', '166e56093cmsh7cb5c98216f8318p11d2eejsn8fe0d9372517')
        //     .end((result) => {
        //         console.log(result.status, result.headers, result.body);
        //         res.json({
        //             body: result.body,
        //         });
        //     });
    },
};
