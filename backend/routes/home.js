const express = require('express');
const router =  express.Router();
const home = require('../controllers/home');

router.post('/', home);
module.exports = router;