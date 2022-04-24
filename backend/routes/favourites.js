const express = require('express');
const router =  express.Router();
const addTofavourites = require('../controllers/favourites/addTofavourites');
const getFavouriteItems = require('../controllers/favourites/getFavouriteItems');
const addItem = require('../controllers/shop/addItem');
const { checkAuth } = require("../config/passport");


router.post('/addTofavourites', checkAuth , addTofavourites);
router.post('/getFavouriteItems', checkAuth , getFavouriteItems);

module.exports = router;