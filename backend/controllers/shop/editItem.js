const connPool = require("../../db/mysql");
var mysql = require("mysql");
var constants = require("../../config/constants.json");
const Products = require('../../Models/ProductModel');


const editItem = (req, res) => {
  let newItem = {
    // id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    shop_name: req.body.shop_name,
    category: req.body.category,
    quantity: req.body.quantity,
    image: req.body.image,
  };
  console.log("Inside editItem Post Request");
  console.log("Req Body : ", req.body);

  Products.findOneAndUpdate( { _id : req.body._id} , newItem, {new: true} , (err, updatedProduct)=>{
    if (err) {
      console.log("error while updating product is " + err);
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(constants.USER_ALREADY_EXISTS);
    }
    if(updatedProduct){
      console.log("updated product is " + JSON.stringify(updatedProduct));
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(constants.ITEM_EDITED_SUCCESSFULLY);
    }
  });
  // var sql =
  //   "UPDATE products SET `name` = " +
  //   mysql.escape(newItem.name) +
  //   ", `price` = " +
  //   mysql.escape(newItem.price) +
  //   ", `quantity` = " +
  //   mysql.escape(newItem.quantity) +
  //   ", `shop_name` = " +
  //   mysql.escape(newItem.shop_name) +
  //   ", `description` = " +
  //   mysql.escape(newItem.description) +
  //   ", `image` = " +
  //   mysql.escape(newItem.image) +
  //   ", `category` = " +
  //   mysql.escape(newItem.category) +
  //   " WHERE (`id` = " +
  //   mysql.escape(req.body.id) +
  //   ");";

  // console.log("Sql querry is : ", sql);
  // connPool.query(sql, function (err, result) {
  //   console.log("querry executed and result is : " + JSON.stringify(result));
  //   if (err) {
  //     console.log(err);
  //     res.writeHead(200, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end(constants.USER_ALREADY_EXISTS);
  //   } else {
  //     res.writeHead(200, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end(constants.ITEM_EDITED_SUCCESSFULLY);
  //   }
  // });
};
module.exports = editItem;
