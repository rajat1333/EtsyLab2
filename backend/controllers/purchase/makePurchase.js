const connPool = require("../../db/mysql");
var mysql = require("mysql");
var constants = require("../../config/constants.json");
const Purchase = require('../../Models/PurchaseModel');
const Products = require('../../Models/ProductModel');
const Cart = require('../../Models/CartModel');



const makePurchase = (req, res) => {
  let initialQuantity = 0;
  let purchaseItem = new Purchase({
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    email_id: req.body.email_id,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    shop_name: req.body.shop_name,
    gift_wrapped: req.body.gift_wrapped,
    message: req.body.message,
    date: new Date().toLocaleString()
  });

  console.log("Inside makePurchase Post Request");
  console.log("Req Body : ", req.body);

  //code for initial quantity

  Products.find({ _id : req.body.product_id }, (err, product)=>{
    if(err){
      console.log(err)
    }
    if(product){
      console.log("result is : " + JSON.stringify(product));
      let p = product[0];
      initialQuantity = p.quantity;
      console.log("initial quntity is : " + initialQuantity);

      //add entry to purchase table
      purchaseItem.save((err, mongoPurchaseItem )=>{
        if(err){
          console.log(err)
        }
        if(mongoPurchaseItem){
          console.log(
            "purshase obj added to Mongo is : " + JSON.stringify(mongoPurchaseItem)
          );
        }
        //delete entry from cart table
        Cart.deleteMany({email_id : req.body.email_id}, (err)=>{
          if (err) {
            console.log(err);
          }else{
            console.log(
                "Mongo delete executed  "
              );
          }
        } );

        Products.findOneAndUpdate( { _id : req.body.product_id} , { quantity : initialQuantity - purchaseItem.quantity }, {new: true} , (err, updatedProduct)=>{
          if (err) {
            console.log(err);
          } 
          if(updatedProduct){
            console.log("updateQuerry executed and result is : " + JSON.stringify(updatedProduct));
            res.writeHead(200, {
              "Content-Type": "text/plain",
            });
            res.end(constants.ITEM_EDITED_SUCCESSFULLY);
          }
        });


      })
    }
    
  });



  // let sqlQuerry =
  //   "Select * from products WHERE id = " +
  //   mysql.escape(purchaseItem.product_id);
  // connPool.query(sqlQuerry, function (err, result) {
  //   console.log("result is : " + JSON.stringify(result));
  //   let p = result[0];
  //   initialQuantity = p.quantity;
  //   console.log("initial quntity is : " + initialQuantity);

  //   //add entry to purchase table
  //   var sqlInsert =
  //     "INSERT INTO purchases (`email_id`, `quantity`, `product_id`, `name`, `price` ) VALUES (" +
  //     mysql.escape(purchaseItem.email_id) +
  //     ", " +
  //     mysql.escape(purchaseItem.quantity) +
  //     ", " +
  //     mysql.escape(purchaseItem.product_id) +
  //     ", " +
  //     mysql.escape(purchaseItem.name) +
  //     ", " +
  //     mysql.escape(purchaseItem.price) +
  //     ")";

  //   console.log("Sql querry is : ", sqlInsert);
  //   connPool.query(sqlInsert, function (err, result) {
      
  //     if (err) {
  //       console.log(err);
  //     }
  //     else{
  //       console.log(
  //           "sqlInsert executed and result is : " + JSON.stringify(result)
  //         );
  //     }
  //   });

  //   //delete entry from cart table
  //   var sqlDelete =
  //     "DELETE FROM cart WHERE (`email_id` = " +
  //     mysql.escape(purchaseItem.email_id) +
  //     ");";
  //   console.log("sqlDelete querry is : ", sqlDelete);
  //   connPool.query(sqlDelete, function (err, result) {
  //         if (err) {
  //           console.log(err);
  //         }else{
  //           console.log(
  //               "sqlDelete executed and result is : " + JSON.stringify(result)
  //             );
  //         }
  //   })

  //   var updateQuerry =
  //     "UPDATE products SET `quantity` = " +
  //     mysql.escape(initialQuantity - purchaseItem.quantity) +
  //     " WHERE (`id` = " +
  //     mysql.escape(purchaseItem.product_id) +
  //     ");";

  //   console.log("updateQuerry  is : ", updateQuerry);
  //   connPool.query(updateQuerry, function (err, result) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("updateQuerry executed and result is : " + JSON.stringify(result));
  //       res.writeHead(200, {
  //         "Content-Type": "text/plain",
  //       });
  //       res.end(constants.ITEM_EDITED_SUCCESSFULLY);
  //     }
  //   });
  // });
};
module.exports = makePurchase;
