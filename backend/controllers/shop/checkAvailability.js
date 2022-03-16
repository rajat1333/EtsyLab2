const connPool = require('../../db/mysql');
var mysql = require('mysql');
var session = require('express-session');
var constants = require("../../config/constants.json")


const checkAvailability = (req, res) =>{
    
    let userName = req.body.userName;
    console.log("Inside checkAvailability Post Request");
    console.log("Req Body : " , req.body);
    var sql = "SELECT * FROM shops WHERE name = " + mysql.escape(userName);
    console.log("Sql querry is : ",sql);
    connPool.query(sql, function(err, result){
        console.log("querry executed and result is : " );
        if(err || result.length === 0){
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            })
            res.end(constants.USER_NAME_AVAILABLE);
        }else{
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end(constants.USER_NAME_UNAVAILABLE);
        }
    });
}
module.exports = checkAvailability;
