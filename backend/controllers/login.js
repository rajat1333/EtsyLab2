const connPool = require('../db/mysql');
var mysql = require('mysql');
var session = require('express-session');
var constants = require("../config/constants.json")

var Users = [{
    username : "admin",
    password : "admin"
}]


const login = (req, res) =>{
    let user = {
        emailId : req.body.emailId,
        password : req.body.password
    }
    console.log("Inside Login Post Request");
    console.log("Req Body : ",req.body);
    var sql = "SELECT * FROM user WHERE email_id = " + mysql.escape(req.body.emailId) + " and password = " 
    + mysql.escape(req.body.password);
    console.log("Sql querry is : ",sql);
    connPool.query(sql, function(err, result){
        console.log("querry executed and result is : " );
        if(err || result.length === 0){
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            })
            res.end(constants.INVALID_CREDENTIALS);
        }else{
            res.cookie('cookie', user.emailId ,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = user;
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end(constants.SUCCESSFUL_LOGIN);
        }
    });
}
module.exports = login;

// Users.filter(function(user){
    //     if(user.username === req.body.username && user.password === req.body.password){
    //         console.log("inside validate user");
    //         res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
    //         req.session.user = user;
    //         res.writeHead(200,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         res.end("Successful Login");
    //     }
    //     else{
    //         res.writeHead(200,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         res.end("Login Failed. Please enter Valid credentials")
    //     }
    // })