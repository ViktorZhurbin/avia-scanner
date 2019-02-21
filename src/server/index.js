const express = require('express');

const mockTicketData = require('./mockTicketData');

const app = express();
const port = 8080;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.static('dist'));
app.get('/api/getTicketData', (req, res) => res.send({ data: mockTicketData }));

app.listen(port, () => console.log(`Listening on port ${port}!`));
