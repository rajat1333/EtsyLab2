const express = require('express');
const addToCart = require('../controllers/cart/addToCart');
const getCartItems = require('../controllers/cart/getCartItems');
const router =  express.Router();
const { checkAuth } = require("../config/passport");


router.post('/addToCart', checkAuth , addToCart);
router.post('/getCartItems', checkAuth , getCartItems);
module.exports = router;