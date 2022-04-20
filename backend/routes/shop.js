const express = require('express');
const addItem = require('../controllers/shop/addItem');
const router =  express.Router();
const checkAvailability = require('../controllers/shop/checkAvailability');
const editItem = require('../controllers/shop/editItem');
const shopExists = require('../controllers/shop/shopExists');
const shopProducts = require('../controllers/shop/shopProducts');
const updateShop = require('../controllers/shop/updateShop');
const { checkAuth } = require("../config/passport");


router.post('/checkAvailability', checkAuth , checkAvailability);
router.post('/shopExists', checkAuth , shopExists);
router.post('/updateShop', checkAuth , updateShop);
router.post('/shopProducts', checkAuth , shopProducts);
router.post('/addItem', checkAuth , addItem);
router.post('/editItem', checkAuth , editItem);

module.exports = router;