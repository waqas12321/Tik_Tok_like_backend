const express = require('express');
const cors = require('cors');
const dotenv=require("dotenv")



const app = express();
app.use(express.json());
app.use(cors());
require('./DB/Config.js');

//config dotenv

dotenv.config();

const userRoutes=require('./Routes/User.js')
const userCheckout=require("./Routes/Checkout.js")
const userPost=require("./Routes/Post.js")






//Middleware or set routes


//authentication
app.use('/users',userRoutes);

//checkout
app.use("/checkout",userCheckout)

//post
app.use("/post",userPost);










// listen server at port 3001
app.listen(process.env.PORT, () => {
    console.log("Started at port 8080");
})