const express = require('express');
const addItem = require('../controllers/shop/addItem');
const router =  express.Router();
const checkAvailability = require('../controllers/shop/checkAvailability');
const editItem = require('../controllers/shop/editItem');
const shopExists = require('../controllers/shop/shopExists');
const shopProducts = require('../controllers/shop/shopProducts');
const updateShop = require('../controllers/shop/updateShop');

router.post('/checkAvailability', checkAvailability);
router.post('/shopExists', shopExists);
router.post('/updateShop', updateShop);
router.post('/shopProducts', shopProducts);
router.post('/addItem', addItem);
router.post('/editItem', editItem);

module.exports = router;