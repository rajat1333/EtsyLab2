const Favourite = require('../models/FavouriteModel');
const Purchase = require('../models/PurchaseModel');
const Products = require('../models/ProductModel');
const Cart = require('../models/CartModel');
function handle_request(msg, callback){
   
    console.log("Inside login kafka backend");
    console.log("Inside makePurchase");
    console.log("Inside makePurchase");
    console.log(msg);

    let initialQuantity = 0;
  let purchaseItem = new Purchase({
    product_id: msg.body.product_id,
    quantity: msg.body.quantity,
    email_id: msg.body.email_id,
    name: msg.body.name,
    price: msg.body.price,
    image: msg.body.image,
    shop_name: msg.body.shop_name,
    gift_wrapped: msg.body.gift_wrapped,
    message: msg.body.message,
    date: new Date().toLocaleString()
  });

  //code for initial quantity

  Products.find({ _id : msg.body.product_id }, (err, product)=>{
    if(err){
      console.log(err)
    }
    if(product){
      console.log("result is : " + JSON.stringify(product));
      let p = product[0];
      initialQuantity = p.quantity;
      console.log("initial quntity is : " + initialQuantity);

      //add entry to purchase table
      purchaseItem.save((err, mongoPurchaseItem )=>{
        if(err){
          console.log(err)
        }
        if(mongoPurchaseItem){
          console.log(
            "purshase obj added to Mongo is : " + JSON.stringify(mongoPurchaseItem)
          );
        }
        //delete entry from cart table
        Cart.deleteMany({email_id : msg.body.email_id}, (err)=>{
          if (err) {
            console.log(err);
          }else{
            console.log(
                "Mongo delete executed  "
              );
          }
        } );

        Products.findOneAndUpdate( { _id : msg.body.product_id} , { quantity : initialQuantity - purchaseItem.quantity }, {new: true} , (err, updatedProduct)=>{
          if (err) {
            console.log(err);
          } 
          if(updatedProduct){
            console.log("updateQuerry executed and result is : " + JSON.stringify(updatedProduct));
            callback(err, updatedProduct);
          }
        });


      })
    }
    
  });
};

exports.handle_request = handle_request;


