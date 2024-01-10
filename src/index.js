const express = require('express');
// const pasth = require("path");
const bcrypt = require("bcrypt");
const users = require("./config");
const orders = require('./orderconfig');





const app = express();
//convert data into json format
app.use(express.json());

app.use(express.urlencoded({extended: false}));


//use EJS as the viw engine
app.set('view engine', 'ejs');
// static file
app.use(express.static("public"));





app.get("/login",(req, res) => {
    res.render("login");
});

app.get("/signup", (req,res) => {
    res.render("signup");
});

// Handle the checkout button click
app.get('/checkout', (req, res) => {
    res.render('checkout'); // Render the checkout page
});


app.get('/index', (req, res) => {
    res.render('index'); // Render the index page
});





///////////////////////////////////////////////////////////////////
// Define a route to handle checkout data
// Handle the checkout button click
// app.post('/checkout', async (req, res) => {
//     try {
//         const orderData = {
//             fullName: req.body.fullName,
//             phoneNumber: req.body.phoneNumber,
//             address: req.body.address
//         };
//         console.log('Received order data:', orderData)

//         // Save the new order to the database using the 'orders' model
//         const newOrder = await orders.create(orderData);

// if (newOrder) {
//     console.log('Order placed:', newOrder);
//     res.status(200).send('Order placed successfully');
// } else {
//     console.error('Error creating order'); // Log error if order creation failed
//     res.status(500).send('Error placing order');
// }

//     } catch (error) {
//         console.error('Error placing order:', error);
//         res.status(500).send('Error placing order');
//     }
// });
 

  //////////////////////////////////////////////////////////






//register user
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    //check if the user already exists in the database
    const existingUser =await users.findOne({name: data.name});
    const existingEmail =await users.findOne({email: data.email});

    if(existingUser) {
        res.send("User already exists. Please choose a diffrent username.")
    }else if(existingEmail){
        res.send("Email already exists. Please choose a diffrent username.")

    }else{
        //hash the password using bcrypt
        const saltRounds = 10;// Number of salt round for bcrypt 
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword // replace the original password with the hashed one
        
        const userdata = await users.insertMany(data);
        console.log(userdata);


          // After successful signup, create a success message
    const successMessage = 'Successfully signed up! Welcome aboard.';

    // Pass the success message to the rendered page
    res.render('login', { successMessage });
    }

    
})


//login user
app.post("/login", async (req,res) => {
    try{
        const check = await users.findOne({name: req.body.username});
        if(!check){
            res.send("user name cannot be found");
        }
        //compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            return res.redirect('/index');
        }else{
            return res.send("wrong password");
        }
    }catch(error){
        console.error(error);
        return res.status(500).send("wrong details");
    }
});























app.post('/checkout', async (req, res) => {
    try {
        const orderData = {
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            city: req.body.city

        };

        console.log('Received order data:', orderData);

        // Save the new order to the database using the 'orders' model
        const newOrder = await orders.create(orderData);
        console.log(newOrder);
        res.redirect('/index');

        // res.status(200).send('Order placed successfully');
        // window.alert('Thank you for your purchase! Your order has been successfully processed.');
        // res.redirect('/index');
    } catch (error) {
        console.error('Error placing order:', error);
        // res.status(500).send('Error placing order');
    }
});







const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port : ${port}`);

})