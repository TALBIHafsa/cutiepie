const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut") ;

//check database connected or bot
connect.then(() => {
    console.log("Database connected Successfully");

})
.catch(() => {
    console.log("Database cannot be connected");

});

// saving the users infos---------------------------------------------------------------------------------------------

//create a schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },    
    password: {
        type:String,
        required: true

    }
});

//collection part
const users = new mongoose.model("users", LoginSchema);

module.exports = users;
