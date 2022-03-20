const express = require('express');
const router =  express.Router();
const login = require('../controllers/login');
const getUser = require('../controllers/user/getUser');
const updateUser = require('../controllers/user/updateUser');

router.post('/getUser', getUser);
router.post('/updateUser', updateUser);
module.exports = router;