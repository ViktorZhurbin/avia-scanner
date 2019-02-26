const express = require('express');
const tickets = require('./tickets');
const currency = require('./currency');

const app = express();
const port = 8080;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static('dist'));

app.get('/api/createsession', (req, res) => tickets.createSession(req, res));
app.get('/api/getTicketData/:sessionKey', (req, res) => tickets.fetchTickets(req, res));
app.get('/api/mockData', (req, res) => tickets.mockData(req, res));

app.get('/api/currencyRates', (req, res) => currency.fetchCurrencyRates(req, res));

app.listen(port, () => console.log(`Listening on port ${port}!`));
