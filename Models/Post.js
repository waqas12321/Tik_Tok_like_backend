const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types;
const USER=require("../Models/Registration/User.js")

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        reqired:true
    },
    body:{
        type:String,
        reqired:true

    },
    video:{
        type:String,
        default:"no video"
    },
    like:[{type:ObjectId,ref:"USER"}],
    comments:[{
        comment:{
            type:String,
          },
        postedBy:{
            type:ObjectId,
            ref:"USER"
        }
    }],
    share:[{
      type:ObjectId,
      ref:"USER"
    }],
    postedBy:{
        type:ObjectId,
        ref:USER
    }
})
module.exports=mongoose.model("POST",postSchema);