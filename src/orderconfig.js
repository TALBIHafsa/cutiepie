const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut") ;

//check database connected or bot
connect.then(() => {
    console.log("Database connected Successfully");

})
.catch(() => {
    console.log("Database cannot be connected");

});

// saving the orders infos---------------------------------------------------------------------------------------------


// Create a schema
const OrdersSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String, // Change data type from Integer to Number
        required: true
    },    
    address: {
        type: String, // Corrected duplicate field declaration
        required: true
    },
    city: {
        type: String, 
        required: true
    }
});

// Create a Mongoose model
const orders = new mongoose.model("orders", OrdersSchema);

module.exports = orders;

