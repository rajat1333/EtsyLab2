const connPool = require("../../db/mysql");
var mysql = require("mysql");
var constants = require("../../config/constants.json");
const Products = require('../../Models/ProductModel');

const addItem = (req, res) => {
  let newItem = new Products({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    shop_name: req.body.shop_name,
    category: req.body.category,
    quantity: req.body.quantity,
    image: req.body.image,
  });
  console.log("Inside addItem Post Request");
  console.log("Req Body : ", req.body);

  newItem.save((err, productItem)=>{
    if(err){
      console.log("error while adding new item is : " + err);
    }
    if(productItem){
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(constants.ITEM_ADDED_SUCCESSFULLY);
    }
  })
  // var sql =
  //   "INSERT INTO products (`name`, `description`, `price`, `shop_name`, `category`, `quantity`, `image`) VALUES (" +
  //   mysql.escape(newItem.name) +
  //   ", " +
  //   mysql.escape(newItem.description) +
  //   ", " +
  //   mysql.escape(newItem.price) +
  //   ", " +
  //   mysql.escape(newItem.shop_name) +
  //   ", " +
  //   mysql.escape(newItem.category) +
  //   ", " +
  //   mysql.escape(newItem.quantity) +
  //   ", " +
  //   mysql.escape(newItem.image) +
  //   ")";

  // console.log("Sql querry is : ", sql);
  // connPool.query(sql, function (err, result) {
  //   console.log("querry executed and result is : " + JSON.stringify(result));
  //   if (err) {
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
module.exports = addItem;
