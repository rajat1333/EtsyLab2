const express = require('express');
const getPurchaseItems = require('../controllers/purchase/getPurchaseItems');
const makePurchase = require('../controllers/purchase/makePurchase');
const router =  express.Router();

router.post('/makePurchase', makePurchase);
router.post('/getPurchaseItems', getPurchaseItems);

module.exports = router;