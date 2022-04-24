const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favouritesSchema = new Schema({
    email_id: {type: String, required: false},
    name: {type: String, required: false},
    price: {type: String, required: false},
    quantity: {type: String, required: false},
    shop_name: {type: String, required: false},
    description: {type: String, required: false},
    image: {type: String, required: false},
    category: {type: String, required: false},
},
{
    versionKey: false
});

const userModel = mongoose.model('favourite', favouritesSchema);
module.exports = userModel;