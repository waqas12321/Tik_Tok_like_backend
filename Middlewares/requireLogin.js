const mongoose=require("mongoose");
const User=require("../Models/Registration/User.js");
const dotenv=require("dotenv")
const jwt=require("jsonwebtoken")
//confid dotenv
dotenv.config();
const requireLogin=async(req,resp,next)=>{
    
    const authorization=req.headers.authorization;
    console.log(authorization);
    if(!authorization){

        return(
            resp.send({message:"You must have to logged in"})
        )
    }
    else{
        
        console.log(authorization);
        const token= authorization.toString().replace("Bearer ","");
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        if(!payload){
            resp.send({message:"You must have to logged in"})
        }
        else{
            const {_id}=payload;
            const user=await User.findById(_id);
           
            req.user=user;
            next();
        }

    }
}
module.exports=requireLogin;