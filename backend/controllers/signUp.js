const connPool = require('../db/mysql');
var mysql = require('mysql');
var session = require('express-session');
var constants = require("../config/constants.json")


const signUp = (req, res) =>{
    let user = {
        username : req.body.username,
        password : req.body.password,
        emailId : req.body.emailId
    }
    console.log("Inside Sign Up Post Request");
    console.log("Req Body : ",req.body);
    var sql = "INSERT INTO user (`user_name`, `password`, `email_id`) VALUES (" + mysql.escape(req.body.username) +", " 
    + mysql.escape(req.body.password) + ", " + mysql.escape(req.body.emailId) + ")"; 
    
    console.log("Sql querry is : ",sql);
    connPool.query(sql, function(err, result){
        console.log("querry executed and result is : " );
        if(err || result.length === 0){
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            })
            res.end(constants.USER_ALREADY_EXISTS);
        }else{
            //res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            //req.session.user = user;
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end(constants.USER_CREATED);
        }
    });
}
module.exports = signUp;
