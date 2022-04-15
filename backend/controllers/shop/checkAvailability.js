const connPool = require("../../db/mysql");
var mysql = require("mysql");
var constants = require("../../config/constants.json");
const Shops = require('../../Models/ShopModel');

const checkAvailability = (req, res) => {
  let shopName = req.body.shopName;
  let emailId = req.body.emailId;

  console.log("Inside checkAvailability Post Request");
  console.log("Email id is : " + emailId);
  console.log("Req Body : ", req.body);

  Shops.findOne({name : shopName}, (err, shopObj)=>{
    if (err) {
      console.log("Error is " + err);
  }
  if (shopObj) {
    console.log("Shop obj from mongo is " + shopObj);
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.end(constants.USER_NAME_UNAVAILABLE);
  }else{
    var newShop = new Shops({ name : shopName, email_id : emailId});
    newShop.save((err, data)=>{
      if(err){
        console.log("error occured while inserting shop")
      }
      else{
        console.log("Entry for shop has been added successfully");
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(constants.USER_NAME_AVAILABLE);
      }
    });
  }
  })
  // var sqlShopAvailability =
  //   "SELECT * FROM shops WHERE name = " + mysql.escape(shopName);
  // console.log("Sql querry is : ", sqlShopAvailability);
  // connPool.query(sqlShopAvailability, function (err, result) {
  //   console.log("querry executed and result is : ");
  //   if (err || result.length === 0) {
  //     //code to create shop object
  //     var sqlInsertShop =
  //       "INSERT INTO shops (`name`, `email_id`) VALUES (" +
  //       mysql.escape(shopName) +
  //       ", " +
  //       mysql.escape(emailId) +
  //       ")";
  //     console.log("Sql querry is : ", sqlInsertShop);
  //     connPool.query(sqlInsertShop, function (err, result) {
  //       if (err || result.length === 0) {
  //         console.log("error occured while inserting shop")
  //       } else {
  //           console.log("Entry for shop has been added successfully");
  //       }
  //     });

  //     res.writeHead(200, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end(constants.USER_NAME_AVAILABLE);
  //   } else {
  //     res.writeHead(200, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end(constants.USER_NAME_UNAVAILABLE);
  //   }
  // });
};
module.exports = checkAvailability;
