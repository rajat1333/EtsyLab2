const express = require('express');
const router =  express.Router();
const home = require('../controllers/home');
const { checkAuth } = require("../config/passport");


router.post('/', checkAuth, home);
module.exports = router;