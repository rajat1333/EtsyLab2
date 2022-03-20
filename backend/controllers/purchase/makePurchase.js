const connPool = require("../../db/mysql");
var mysql = require("mysql");
var constants = require("../../config/constants.json");

const makePurchase = (req, res) => {
  let initialQuantity = 0;
  let purchaseParameters = {
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    email_id: req.body.email_id,
    name: req.body.name,
    price: req.body.price,
  };

  console.log("Inside makePurchase Post Request");
  console.log("Req Body : ", req.body);

  //code for initial quantity
  let sqlQuerry =
    "Select * from products WHERE id = " +
    mysql.escape(purchaseParameters.product_id);
  connPool.query(sqlQuerry, function (err, result) {
    console.log("result is : " + JSON.stringify(result));
    let p = result[0];
    initialQuantity = p.quantity;
    console.log("initial quntity is : " + initialQuantity);

    //add entry to purchase table
    var sqlInsert =
      "INSERT INTO purchases (`email_id`, `quantity`, `product_id`, `name`, `price` ) VALUES (" +
      mysql.escape(purchaseParameters.email_id) +
      ", " +
      mysql.escape(purchaseParameters.quantity) +
      ", " +
      mysql.escape(purchaseParameters.product_id) +
      ", " +
      mysql.escape(purchaseParameters.name) +
      ", " +
      mysql.escape(purchaseParameters.price) +
      ")";

    console.log("Sql querry is : ", sqlInsert);
    connPool.query(sqlInsert, function (err, result) {
      
      if (err) {
        console.log(err);
      }
      else{
        console.log(
            "sqlInsert executed and result is : " + JSON.stringify(result)
          );
      }
    });

    //delete entry from cart table
    var sqlDelete =
      "DELETE FROM cart WHERE (`email_id` = " +
      mysql.escape(purchaseParameters.email_id) +
      ");";
    console.log("sqlDelete querry is : ", sqlDelete);
    connPool.query(sqlDelete, function (err, result) {
          if (err) {
            console.log(err);
          }else{
            console.log(
                "sqlDelete executed and result is : " + JSON.stringify(result)
              );
          }
    })

    var updateQuerry =
      "UPDATE products SET `quantity` = " +
      mysql.escape(initialQuantity - purchaseParameters.quantity) +
      " WHERE (`id` = " +
      mysql.escape(purchaseParameters.product_id) +
      ");";

    console.log("updateQuerry  is : ", updateQuerry);
    connPool.query(updateQuerry, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("updateQuerry executed and result is : " + JSON.stringify(result));
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(constants.ITEM_EDITED_SUCCESSFULLY);
      }
    });
  });
};
module.exports = makePurchase;
