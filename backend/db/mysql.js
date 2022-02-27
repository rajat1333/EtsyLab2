var mysql = require('mysql');
var constants = require("../config/config.json")

var connPool = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.user,
  password: constants.DB.password,
  port : constants.DB.port,
  database : constants.DB.database
});

connPool.getConnection(function(err) {
  if (err) throw err;
  console.log("Connected to mysql database!");
});
module.exports = connPool;