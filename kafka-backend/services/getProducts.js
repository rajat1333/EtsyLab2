const Products = require('../models/ProductModel');

function handle_request(msg, callback){
   
    console.log("Inside login kafka backend");

    console.log(msg);
    Products.find({}, (err, allProducts)=>{
        if (err) {
          console.log(err);
          callback(err, null);

        }
        if(allProducts){
            callback(null, allProducts);
        }
      });
};

exports.handle_request = handle_request;


