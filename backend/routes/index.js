var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var app = express();

var con = mysql.createConnection({
  host: "etsy.cdj42dsuxllh.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "admin1234",
  port : 3306,
  database : "etsy"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to mysql database!");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
