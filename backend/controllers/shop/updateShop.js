const connPool = require("../../db/mysql");
var mysql = require("mysql");
var constants = require("../../config/constants.json");
const Shops = require('../../models/ShopModel');


const updateShop = (req, res) => {
  let shopName = req.body.shopName;
  //let emailId = req.body.emailId;
  let imageSrc = req.body.imageSrc;

  console.log("Inside updateShop Post Request");
  console.log("imageSrc  is : " + imageSrc);
  console.log("Req Body : ", req.body);

  const filter = { name: shopName};
  const update = { shop_image : imageSrc }; 

  // `doc` is the document _before_ `update` was applied
  Shops.findOneAndUpdate(filter, update, {new: true} , (err, updatedShop)=>{
    if(err){
      console.log("Error is " + err)
    }
    if(!err && updatedShop ){
      console.log("update succesful updated shop obj is " + updatedShop);
     res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(updatedShop));
    }
  });




  // var sqlUpdateShop =
  //   "UPDATE shops SET shop_image = " + mysql.escape(imageSrc) + " WHERE name = " + mysql.escape(shopName);
  // console.log("Sql querry is : ", sqlUpdateShop);
  // connPool.query(sqlUpdateShop, function (err, result) {
  //   console.log("querry executed and result is : ");
  //   if (!err) {
  //    console.log("update succesful");
  //    res.writeHead(200, {
  //       "Content-Type": "application/json",
  //     });
  //     res.end(JSON.stringify(result));
  //   } 
  // });
};
module.exports = updateShop;
