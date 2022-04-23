const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cartsSchema = new Schema({
    email_id: {type: String, required: false},
    quantity: {type: String, required: false},
    product_id: {type: String, required: false},
    name: {type: String, required: false},
    price: {type: String, required: false},
    shop_name: {type: String, required: false},
    gift_wrapped: {type: String, required: false},
    message: {type: String, required: false},
    image: {type: String, required: false}
},
{
    versionKey: false
});

const userModel = mongoose.model('cart', cartsSchema);
module.exports = userModel;