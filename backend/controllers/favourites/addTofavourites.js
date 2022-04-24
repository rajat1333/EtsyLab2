const connPool = require("../../db/mysql");
var mysql = require("mysql");
var constants = require("../../config/constants.json");
const Products = require('../../models/ProductModel');
const Favourite = require('../../models/FavouriteModel');
var kafka = require('../../kafka/client');


const addTofavourites = (req, res) => {

    
  console.log("Inside addTofavourites Post Request");
  console.log("Req Body : ", req.body);
  msg={};
  msg.body=req.body;
  kafka.make_request('post_addTofavourites',msg, function(err,productItem){
    console.log('in result');
    console.log(productItem);
    if (err){
        console.log("Inside err");
        console.log("error while adding new item is : " + err);
    }
    if (productItem) {
      console.log("User from mongo is  " + JSON.stringify(productItem) );
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(constants.ITEM_ADDED_SUCCESSFULLY);
    }
});

//   let newFavourite = new Favourite({
//     email_id: req.body.email_id,
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     shop_name: req.body.shop_name,
//     category: req.body.category,
//     quantity: req.body.quantity,
//     image: req.body.image,
//   });
//   newFavourite.save((err, productItem)=>{
//     if(err){
//       console.log("error while adding new item is : " + err);
//     }
//     if(productItem){
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(constants.ITEM_ADDED_SUCCESSFULLY);
//     }
//   })
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
module.exports = addTofavourites;
