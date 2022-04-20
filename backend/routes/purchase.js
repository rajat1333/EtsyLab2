const express = require('express');
const getPurchaseItems = require('../controllers/purchase/getPurchaseItems');
const makePurchase = require('../controllers/purchase/makePurchase');
const router =  express.Router();
const { checkAuth } = require("../config/passport");


router.post('/makePurchase', checkAuth , makePurchase);
router.post('/getPurchaseItems', checkAuth , getPurchaseItems);

module.exports = router;