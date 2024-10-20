const mongoose=require('mongoose');
const otpSchema=new mongoose.Schema({
    email:String,
    code:Number,

})
module.exports= mongoose.model("otp",otpSchema);