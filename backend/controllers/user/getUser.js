const connPool = require("../../db/mysql");
var mysql = require("mysql");
var session = require("express-session");
var constants = require("../../config/constants.json");

const getUser = (req, res) => {
  let user = {
    emailId: req.body.emailId,
  };
  console.log("Inside Login Post Request");
  console.log("Req Body : ", req.body);
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
