const connPool = require("../../db/mysql");
var mysql = require("mysql");
var session = require("express-session");
var constants = require("../../config/constants.json");
const Cart = require('../../models/CartModel');


const addToCart = (req, res) => {
  let cartProduct = new Cart({
    email_id: req.body.email_id,
    quantity: req.body.quantity,
    product_id: req.body.product_id,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    shop_name: req.body.shop_name,
    gift_wrapped: req.body.gift_wrapped,
    message: req.body.message,
  });
  
  console.log("product obj : " +  JSON.stringify(cartProduct))
  console.log("Inside addToCart Post Request");
  console.log("Req Body : ", req.body);

  cartProduct.save((err, mongoCartProduct)=>{
    if(err){
      console.log("error while adding item in cart : " + err);
    }
    if(mongoCartProduct){
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(constants.ITEM_ADDED_SUCCESSFULLY);
    }
  });

  // var sql =
  //   "INSERT INTO cart (`email_id`, `quantity`, `product_id`, `name`, `price` ) VALUES (" +
  //   mysql.escape(cartProduct.email_id) +
  //   ", " +
  //   mysql.escape(cartProduct.quantity) +
  //   ", " +
  //   mysql.escape(cartProduct.product_id) +
  //   ", " +
  //   mysql.escape(cartProduct.name) +
  //   ", " +
  //   mysql.escape(cartProduct.price) +
  //   ")";

  // console.log("Sql querry is : ", sql);
  // connPool.query(sql, function (err, result) {
  //   console.log("querry executed and result is : ");
  //   if (err ) {
  //       console.log(err)
  //     res.writeHead(200, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end(constants.USER_ALREADY_EXISTS);
  //   } else {
  //     res.writeHead(200, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end(constants.ITEM_ADDED_SUCCESSFULLY);
  //   }
  // });
};
module.exports = addToCart;
