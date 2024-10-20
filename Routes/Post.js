const express=require("express");
const router=express.Router();
const requireLogin=require("../Middlewares/requireLogin.js");
const {createPost,likePost,unlikePost,commentsPost,sharePost,deletePost, getPost}=require("../Controllers/Post.js");


router.route('/Create').post(requireLogin,createPost);
router.route('/Get').get(getPost);
router.route('/Like').put(requireLogin,likePost);
router.route('/Unlike').put(requireLogin,unlikePost);
router.route('/Comment').put(requireLogin,commentsPost);
router.route('/Share').put(requireLogin,sharePost);
router.route("/delete/:postId").delete(requireLogin,deletePost);
module.exports=router;