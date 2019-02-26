const https = require('https');

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
};

// uncomment to test
/*
convertCurrency(10, 'USD', 'RUB', (err, amount) => {
  console.log(amount);
});
*/
