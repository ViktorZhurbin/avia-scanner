const express = require('express');
const unirest = require('unirest');

// const mockTicketData = require('./mockTicketData');

const baseUrl = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing';
const apiKey = '166e56093cmsh7cb5c98216f8318p11d2eejsn8fe0d9372517';

const app = express();
const port = 8080;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static('dist'));

app.get('api/createsession', (req, res) => {
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
            // console.log(result.status, result.ok, result.headers.location);
            const sessionUrl = result.headers.location;
            const key = sessionUrl && sessionUrl.split('/').pop();
            res.json({ sessionKey: key });
        });
});

app.get('/api/getTicketData/:sessionKey', (req, res) => {
    const key = req.params.sessionKey;
    console.log(key);
    const reqUrl = `${baseUrl}/uk2/v1.0/${key}?pageIndex=0&pageSize=10`;
    console.log(reqUrl);
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
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
