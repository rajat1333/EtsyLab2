const express = require('express');
const getProduct = require('../controllers/products/getProduct');
const router =  express.Router();

router.post('/getProduct', getProduct);

module.exports = router;