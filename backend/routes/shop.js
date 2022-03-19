const express = require('express');
const router =  express.Router();
const checkAvailability = require('../controllers/shop/checkAvailability');
const shopExists = require('../controllers/shop/shopExists');
const shopProducts = require('../controllers/shop/shopProducts');
const updateShop = require('../controllers/shop/updateShop');

router.post('/checkAvailability', checkAvailability);
router.post('/shopExists', shopExists);
router.post('/updateShop', updateShop);
router.post('/shopProducts', shopProducts);

module.exports = router;