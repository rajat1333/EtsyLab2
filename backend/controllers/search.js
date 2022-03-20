const connPool = require('../db/mysql');
var mysql = require('mysql');
var session = require('express-session');
var constants = require("../config/constants.json")


const search = (req, res) =>{
    
    let searchString = req.body.searchString;
    console.log("input search stirg is : " + searchString);
    searchString = "%" + searchString + "%";
    console.log("Inside Products");
    connPool.query("Select * from products WHERE name LIKE " + mysql.escape(searchString) , function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(result));
  });
}
module.exports = search;
