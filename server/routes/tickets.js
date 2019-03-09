const express = require('express');
const router = express.Router();

const tickets = require('../controllers/ticketDataController');
const currency = require('../controllers/currencyController');

router.get('/api/mockData', tickets.mockData);
router.get('/api/createsession', tickets.createSession);
router.get('/api/getTicketData/:sessionKey', tickets.fetchTickets);
router.get('/api/getCurrencyRates/:base', currency.fetchCurrencyRates)

module.exports = router
