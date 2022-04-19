const connPool = require("../../db/mysql");
var mysql = require('mysql');
const Purchase = require('../../Models/PurchaseModel');


const getPurchaseItems = (req, res) =>{
    let email_id = req.body.email_id;
    console.log("Inside getPurchaseItems");
    console.log("email id is : " + email_id);

    Purchase.find({ email_id : req.body.email_id}, (err, purchaseItems)=>{
      if (err) {
        console.log(err);
        return;
      }
      if(purchaseItems){
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        console.log("cart items is : " + JSON.stringify(purchaseItems))
        res.end(JSON.stringify(purchaseItems));
      }
    });

  //   let sqlQuerry = "Select * from purchases WHERE email_id = " +  mysql.escape(email_id);
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
module.exports = getPurchaseItems;