const express = require('express');
const getProduct = require('../controllers/products/getProduct');
const router =  express.Router();
const { checkAuth } = require("../config/passport");


router.post('/getProduct', checkAuth , getProduct);

module.exports = router;