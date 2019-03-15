const express = require('express');
const router = express.Router();

const currency = require('../controllers/currencyController');

router.get('/api/getCurrencyRates/:base', currency.fetchCurrencyRates)

module.exports = router
