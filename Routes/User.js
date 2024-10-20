const express= require("express");

const router=express.Router();
const {registration, login,emailSend, changePassword}=require("../Controllers/User.js");
router.route('/Register').post(registration);
router.route('/Login',).post(login);
router.route('/EmailSend').post(emailSend);
router.route('/ChangePassword').post(changePassword);
module.exports=router;