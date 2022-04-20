const express = require('express');
const router =  express.Router();
const signUp = require('../controllers/signUp');
const { checkAuth } = require("../config/passport");


router.post('/', signUp);
module.exports = router;