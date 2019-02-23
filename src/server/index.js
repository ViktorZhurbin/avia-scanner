const express = require('express');
const queries = require('./req');

const app = express();
const port = 8080;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static('dist'));

app.get('/api/createsession', (req, res) => queries.createSession(req, res));
app.get('/api/getTicketData/:sessionKey', (req, res) => queries.fetchTickets(req, res));
app.get('/api/mockData', (req, res) => queries.mockData(req, res));

app.listen(port, () => console.log(`Listening on port ${port}!`));
