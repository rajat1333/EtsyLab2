const express = require('express');
const router =  express.Router();
const checkAvailability = require('../controllers/shop/checkAvailability');
const shopExists = require('../controllers/shop/shopExists');

router.post('/checkAvailability', checkAvailability);
router.post('/shopExists', shopExists);

module.exports = router;