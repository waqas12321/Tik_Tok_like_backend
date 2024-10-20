const mongoose=require('mongoose');
const dotenv=require("dotenv");


//config dotenv
dotenv.config();

const connection= async(req,resp)=>{
   try{
   await mongoose.connect(process.env.MONGO_URL,()=>{
        console.warn("connectionSuccesfull");
    })
   }
   catch(error){
    console.warn(error);
   }
}
connection();
