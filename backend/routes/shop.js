const express = require('express');
const router =  express.Router();
const checkAvailability = require('../controllers/shop/checkAvailability');

router.post('/checkAvailability', checkAvailability);

module.exports = router;