const express = require('express');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/', expressStaticGzip(
    path.join(__dirname, 'client/build'), {
        enableBrotli: true,
        orderPreference: ['br'],
    }));

app.use(require('./server/routes/tickets'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));
