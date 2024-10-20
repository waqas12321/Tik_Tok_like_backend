const mongoose=require("mongoose");
const POST=require("../Models/Post.js");

const createPost=async(req,resp)=>{
    const {title,body,video}=req.body;
    
     console.warn(req.user);
    const post= new POST({
        title,
        body,
        video,
        postedBy:req.user
    })
    const result=await post.save();
    if(result){
        return(
            resp.send({message:"video posted suuccessfully",post:post})
        )
    }
    else{
        resp.send({message:"video isn't posted "})
    }
    
}
//////////////////getPost////////
const getPost=async(req,resp)=>{
    const data=await POST.find();
    if(data){
        resp.send(data);

    }
    else{
        resp.send({message:"Failed to fetch data"})
    }
}
/////////////likes///////////////
const likePost=async(req,resp)=>{
   const data=await POST.findByIdAndUpdate(req.body.postid,{
    $push:{like:req.user._id}
   },{
    new:true
   })
   if(data){
    return(
        console.warn("You liked a video")
    )
   }else{
    console.warn(" failed to like a video")
   }

}

////////////////unlike//////////////
const unlikePost=async(req,resp)=>{


   const data=await POST.findByIdAndUpdate(req.body.postid,{
    $pull:{like:req.user._id}
   },{
    new:true
   })
   if(data){
    resp.send({message:"You dislike a video"})

   }
   else{
    resp.send({message:"failed dislike a video"})

   }
}
/////////////comments//////////////////////////
const commentsPost=async(req,resp)=>{
    const comments={
        comment:req.body.text,
        postedBy:req.user
    }
    const data=await POST.findByIdAndUpdate(req.body.postid,{
        $push:{comments:comments}
    },{
        new:true
    })
    if(data){
        resp.send({message:"comment add successfully"});
    }
    else{
        resp.send({message:"failed to comment"});
    }
}
////////////////////share//////////////////////////

const sharePost=async(req,resp)=>{
    const data=await POST.findByIdAndUpdate(req.body.postid,{
     $push:{like:req.user._id}
    },{
     new:true
    })
    if(data){
     return(
         resp.send("You shared a video")
     )
    }else{
     resp.send(" failed to share a video")
    }
 
 }

  /////////////////////delete///////////////////////
  const deletePost=async(req,resp)=>{
         const post=await POST.findOne({id:req.params.postId});
         if(post){
            if(post.postedBy._id.toString()===req.user._id.toString()){
                POST.remove();
            }
            else{
                resp.send({message:"Invalid user"})
            }
         }
         else{
            resp.send({message:"Failed to delete post"})
        }
    
  }
  


module.exports={createPost,getPost,likePost,unlikePost,commentsPost,sharePost,deletePost};