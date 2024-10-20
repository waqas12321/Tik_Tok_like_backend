const express=require("express");


const {checkout}=require('../Controllers/Checkout.js');

const router=express.Router();


router.post('/payment',checkout);

module.exports=router;