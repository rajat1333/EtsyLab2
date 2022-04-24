const connPool = require("../../db/mysql");
var mysql = require('mysql');
const Cart = require('../../models/CartModel');


const getCartItems = (req, res) =>{
    let email_id = req.body.email_id;
    console.log("Inside getCartItems");
    console.log("email_id is : " + email_id);

    Cart.find({ email_id : req.body.email_id}, (err, cartProduct)=>{
      if (err) {
        console.log(err);
        return;
      }
      if(cartProduct){
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        console.log("cart items is : " + JSON.stringify(cartProduct))
        res.end(JSON.stringify(cartProduct));
      }
    });

  //   let sqlQuerry = "Select * from cart WHERE email_id = " +  mysql.escape(email_id);
  //   connPool.query(sqlQuerry, function (err, result) {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   res.writeHead(200, {
  //     "Content-Type": "application/json",
  //   });
  //   console.log("cart items is : " + JSON.stringify(result))
  //   res.end(JSON.stringify(result));
  // });
}
module.exports = getCartItems;