var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var app = express();
var constants = require("../config/config.json")

var connPool = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.user,
  password: constants.DB.password,
  port : constants.DB.port,
  database : constants.DB.database
});

connPool.getConnection(function(err) {
  if (err) throw err;
  console.log("Connected to mysql database!");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
