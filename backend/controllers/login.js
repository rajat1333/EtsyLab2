const connPool = require('../db/mysql');
var mysql = require('mysql');
var session = require('express-session');
var constants = require("../config/constants.json")
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');
const { auth } = require("../config/passport");
auth();
const Users = require('../Models/UserModel');

const login = (req, res) =>{
    let inputUser = {
        email_id : req.body.emailId,
        password : req.body.password
    }
    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);
    console.log("inputUser : ",inputUser);

    Users.findOne({ email_id: req.body.emailId, password: req.body.password }, (error, mongoUser) => {
        console.log("users find " + mongoUser );
        console.log("Error is " + error);
        if (error) {
            console.log("Error is " + error);
          
      }
      if (mongoUser) {
        console.log("User from mongo is  " + JSON.stringify(mongoUser) );

        const payload = { _id: mongoUser._id, username: mongoUser.email_id};
        const token = jwt.sign(payload, secret, {
            expiresIn: 1008000
        });
        res.status(200).end("JWT " + token);


        // res.cookie('cookie', mongoUser.email_id ,{maxAge: 900000, httpOnly: false, path : '/'});
        // req.session.user = mongoUser;
        // res.writeHead(200,{
        //     'Content-Type' : 'text/plain'
        // })
        console.log("successful login");
        res.end(constants.SUCCESSFUL_LOGIN);
      }
      else {
        res.writeHead(200, {
            'Content-Type' : 'text/plain'
        })
        res.end(constants.INVALID_CREDENTIALS);
        console.log("Invalid credentials");
      }
    });

      


    // var sql = "SELECT * FROM user WHERE email_id = " + mysql.escape(req.body.emailId) + " and password = " 
    // + mysql.escape(req.body.password);
    // console.log("Sql querry is : ",sql);

    // connPool.query(sql, function(err, result){
    //     console.log("querry executed and result is : " );
    //     if(err || result.length === 0){
    //         res.writeHead(200, {
    //             'Content-Type' : 'text/plain'
    //         })
    //         res.end(constants.INVALID_CREDENTIALS);
    //     }else{
    //         res.cookie('cookie', user.emailId ,{maxAge: 900000, httpOnly: false, path : '/'});
    //         req.session.user = user;
    //         res.writeHead(200,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         res.end(constants.SUCCESSFUL_LOGIN);
    //     }
    // });


}
module.exports = login;