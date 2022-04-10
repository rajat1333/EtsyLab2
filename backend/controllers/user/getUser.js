const connPool = require("../../db/mysql");
var mysql = require("mysql");
var session = require("express-session");
var constants = require("../../config/constants.json");
const Users = require('../../Models/UserModel');

const getUser = (req, res) => {
  let user = {
    email_id: req.body.emailId,
  };
  console.log("Inside Login Post Request");
  console.log("Req Body : ", req.body);

  // Users.findOne(user, (error, user) => {
  //   if (error) {
  //     res.writeHead(500, {
  //         'Content-Type': 'text/plain'
  //     })
  //     res.end("Error Occured");
  // }
  // if (user) {
  //     res.cookie('cookie', user.username, { maxAge: 900000, httpOnly: false, path: '/' });
  //     req.session.user = user;
  //     res.writeHead(200, {
  //         'Content-Type': 'text/plain'
  //     })
  //     res.end();
  // }
  // else {
  //     res.writeHead(401, {
  //         'Content-Type': 'text/plain'
  //     })
  //     res.end("Invalid Credentials");
  // }
  // });

  var sql =
    "SELECT * FROM user WHERE email_id = " + mysql.escape(req.body.emailId);
  console.log("Sql querry is : ", sql);


  connPool.query(sql, function (err, result) {
    console.log("querry executed and result is : " + JSON.stringify(result));
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
module.exports = getUser;
