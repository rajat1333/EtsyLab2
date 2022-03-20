const connPool = require("../../db/mysql");
var mysql = require('mysql');


const getProduct = (req, res) =>{
    let id = req.body.id;
    console.log("Inside get getProduct");
    console.log("Product id is : " + id);
    let sqlQuerry = "Select * from products WHERE id = " +  mysql.escape(id);
    connPool.query(sqlQuerry, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(result));
  });
}
module.exports = getProduct;