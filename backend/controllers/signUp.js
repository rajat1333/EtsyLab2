const connPool = require("../db/mysql");
var mysql = require("mysql");
var session = require("express-session");
var constants = require("../config/constants.json");
const Users = require("../Models/UserModel");

const signUp = (req, res) => {
  let inputUser = new Users({
    user_name: req.body.username,
    password: req.body.password,
    email_id: req.body.emailId,
  });
  console.log("Inside Sign Up Post Request");
  console.log("inputUser : ", inputUser);

  Users.findOne(inputUser, (error, mongoUser) => {
    console.log("users find " + mongoUser );
    console.log("Error is " + error);
    if (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end();
    }
    if (mongoUser) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(constants.USER_ALREADY_EXISTS);
    } else {
      inputUser.save((error, data) => {
        if (error) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end();
        } else {
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end(constants.USER_CREATED);
        }
      });
    }
  });
  // var sql = "INSERT INTO user (`user_name`, `password`, `email_id`) VALUES (" + mysql.escape(req.body.username) +", "
  // + mysql.escape(req.body.password) + ", " + mysql.escape(req.body.emailId) + ")";

  // console.log("Sql querry is : ",sql);
  // connPool.query(sql, function(err, result){
  //     console.log("querry executed and result is : " );
  //     if(err || result.length === 0){
  //         res.writeHead(200, {
  //             'Content-Type' : 'text/plain'
  //         })
  //         res.end(constants.USER_ALREADY_EXISTS);
  //     }else{
  //         //res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
  //         //req.session.user = user;
  //         res.writeHead(200,{
  //             'Content-Type' : 'text/plain'
  //         })
  //         res.end(constants.USER_CREATED);
  //     }
  // });
};
module.exports = signUp;
