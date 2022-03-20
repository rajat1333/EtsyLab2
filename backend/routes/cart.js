const express = require('express');
const addToCart = require('../controllers/cart/addToCart');
const getCartItems = require('../controllers/cart/getCartItems');
const router =  express.Router();

router.post('/addToCart', addToCart);
router.post('/getCartItems', getCartItems);
module.exports = router;