const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favouritesSchema = new Schema({
    product_id: {type: String, required: false},
    customer_email_id: {type: String, required: false}
},
{
    versionKey: false
});

const userModel = mongoose.model('favourite', favouritesSchema);
module.exports = userModel;