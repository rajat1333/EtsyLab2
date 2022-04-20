const connPool = require("../../db/mysql");
var mysql = require("mysql");
var session = require("express-session");
var constants = require("../../config/constants.json");
const Users = require('../../Models/UserModel');


const updateUser = (req, res) => {
  let user = {
    email_id: req.body.email_id,
    user_name: req.body.user_name,
    name: req.body.name,
    phone_number: req.body.phone_number,
    image: req.body.image,
    date_of_birth: req.body.date_of_birth,
    city: req.body.city,
    country: req.body.country
  };
  console.log("Inside update user Post Request");
  console.log("Req Body : ", req.body);

  Users.findOneAndUpdate( { _id : req.body.id } , user, {new: true} , (err, updatedUser)=>{
    console.log("inside find and update")
    console.log("updatedUser " +  updatedUser)
    console.log("err " + err)
    if (err) {
      console.log("Error occoured while updating user is " + err);
      return;
    }
    if(updatedUser){
      console.log("updated use is " + updatedUser);
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(updatedUser));
    }
  });

  // var sql =
  //   "UPDATE user SET `user_name` = " +
  //   mysql.escape(user.user_name) +
  //   ", `email_id` = " +
  //   mysql.escape(user.email_id) +
  //   ", `name` = " +
  //   mysql.escape(user.name) +
  //   ", `phone_number` = " +
  //   mysql.escape(user.phone_number) +
  //   ", `image` = " +
  //   mysql.escape(user.image) +
  //   ", `date_of_birth` = " +
  //   mysql.escape(user.date_of_birth) +
  //   ", `city` = " +
  //   mysql.escape(user.city) +
  //   ", `country` = " +
  //   mysql.escape(user.country) +
  //   " WHERE (`id` = " +
  //   mysql.escape(user.id) +
  //   ");";
  // console.log("Sql querry is : ", sql);
  // connPool.query(sql, function (err, result) {
  //   console.log("querry executed and result is : " + JSON.stringify(result));
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   res.writeHead(200, {
  //     "Content-Type": "application/json",
  //   });
  //   res.end(JSON.stringify(result));
  // });
};
module.exports = updateUser;
