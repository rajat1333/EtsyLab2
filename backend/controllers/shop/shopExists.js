const connPool = require("../../db/mysql");
var mysql = require("mysql");
var session = require("express-session");
var constants = require("../../config/constants.json");

const shopExists = (req, res) => {

  let emailId = req.body.emailId;

  var sqlShopExists =
    "SELECT * FROM shops WHERE email_id = " + mysql.escape(emailId);
  console.log("Sql querry is : ", sqlShopExists);
  connPool.query(sqlShopExists, function (err, result) {
    console.log("querry executed ");
    res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    // if (err || result.length === 0) {
    //   res.writeHead(200, {
    //     "Content-Type": "text/plain",
    //   });
    //   res.end(constants.SHOP_DONOT_EXISTS);
    // } else {
    //   res.writeHead(200, {
    //     "Content-Type": "application/json",
    //   });
    //   res.end(JSON.stringify(result));
    // }
  });
};
module.exports = shopExists;
