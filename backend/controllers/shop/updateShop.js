const connPool = require("../../db/mysql");
var mysql = require("mysql");
var constants = require("../../config/constants.json");

const updateShop = (req, res) => {
  let shopName = req.body.shopName;
  let emailId = req.body.emailId;
  let imageSrc = req.body.imageSrc;

  console.log("Inside updateShop Post Request");
  console.log("imageSrc  is : " + imageSrc);
  console.log("Req Body : ", req.body);
  var sqlUpdateShop =
    "UPDATE shops SET shop_image = " + mysql.escape(imageSrc) + " WHERE name = " + mysql.escape(shopName);
  console.log("Sql querry is : ", sqlUpdateShop);
  connPool.query(sqlUpdateShop, function (err, result) {
    console.log("querry executed and result is : ");
    if (!err) {
     console.log("update succesful");
     res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    } 
  });
};
module.exports = updateShop;
