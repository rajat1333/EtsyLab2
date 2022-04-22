const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var shopsSchema = new Schema({
    name: {type: String, required: false},
    email_id: {type: String, required: false},
    shop_image: {type: String, required: false}
},
{
    versionKey: false
});

const userModel = mongoose.model('shop', shopsSchema);
module.exports = userModel;