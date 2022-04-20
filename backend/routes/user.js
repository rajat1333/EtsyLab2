const express = require('express');
const router =  express.Router();
const login = require('../controllers/login');
const getUser = require('../controllers/user/getUser');
const updateUser = require('../controllers/user/updateUser');
const { checkAuth } = require("../config/passport");


router.post('/getUser', checkAuth,  getUser);
router.post('/updateUser', checkAuth,  updateUser);
module.exports = router;