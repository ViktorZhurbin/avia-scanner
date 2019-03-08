const express = require('express');
const router = express.Router();

const tickets = require('../controllers/ticketDataController');

router.get('/api/mockData', tickets.mockData);
router.get('/api/createsession', tickets.createSession);
router.get('/api/getTicketData/:sessionKey', tickets.fetchTickets);

module.exports = router
