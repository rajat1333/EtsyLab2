const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usersSchema = new Schema({
    user_name: {type: String, required: false},
    name: {type: String, required: false},
    image: {type: String, required: false},
    date_of_birth: {type: String, required: false},
    city: {type: String, required: false},
    country: {type: String, required: false},
    phone_number: {type: String, required: false},
    email_id: {type: String, required: true},
    password: {type: String, required: false}
},
{
    versionKey: false
});

const userModel = mongoose.model('user', usersSchema);
module.exports = userModel;