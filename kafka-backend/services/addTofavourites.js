const Favourite = require('../models/FavouriteModel');

function handle_request(msg, callback){
   
    console.log("Inside login kafka backend");
    console.log("Inside add to fav");
    console.log("Inside add to fav");
    console.log(msg);
    let newFavourite = new Favourite({
        email_id: msg.body.email_id,
        name: msg.body.name,
        description: msg.body.description,
        price: msg.body.price,
        shop_name: msg.body.shop_name,
        category: msg.body.category,
        quantity: msg.body.quantity,
        image: msg.body.image,
      });
      newFavourite.save((err, productItem)=>{
        if(err){
          console.log("error while adding new item is : " + err);
        }
        if(productItem){
            console.log("productItem is : " + JSON.stringify(productItem));
        }
        callback(err, productItem);
      });
};

exports.handle_request = handle_request;


