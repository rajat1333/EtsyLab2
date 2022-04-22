const Users = require('../models/UserModel');

function handle_request(msg, callback){
   
    console.log("Inside login kafka backend");
    console.log(msg);
    Users.findOne({ email_id: msg.body.emailId, password: msg.body.password }, (error, mongoUser) => {
      console.log("users find " + mongoUser );
      console.log("Error is " + error);
      if (error) {
          console.log("Error is " + error);
    }
    callback(error, mongoUser);
    console.log("after callback");
  });
};

exports.handle_request = handle_request;


