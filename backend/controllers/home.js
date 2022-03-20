const connPool = require("../db/mysql");
var mysql = require("mysql");
var session = require("express-session");
var constants = require("../config/constants.json");

const home = (req, res) => {
  let email_id = req.body.emaiId;
  console.log("Inside Products");
  console.log("email is : " + email_id);

  connPool.query("Select * from products WHERE NOT shop_name = " + mysql.escape(email_id), function (err, result) {
  // connPool.query("Select * from products", function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(result));
  });
};
module.exports = home;

// //Route to get All Books when user visits the Home Page
// app.get('/home', function(req,res){
//     console.log("Inside Home Login");
//     res.writeHead(200,{
//         'Content-Type' : 'application/json'
//     });
//     console.log("Books : ",JSON.stringify(books));
//     res.end(JSON.stringify(books));

// })
