const express = require('express');
const router =  express.Router();
const search = require('../controllers/search');
const { checkAuth } = require("../config/passport");


router.post('/', checkAuth , search);
module.exports = router;