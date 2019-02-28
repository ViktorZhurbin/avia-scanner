const express = require('express');
const path = require('path');

const tickets = require('./server/tickets');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/createsession', (req, res) => tickets.createSession(req, res));
app.get('/api/getTicketData/:sessionKey', (req, res) => tickets.fetchTickets(req, res));
app.get('/api/mockData', (req, res) => tickets.mockData(req, res));

// const port = 5000;
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));