const User = require('../Models/Registration/User.js');
const nodeMailer = require('nodemailer');
const Otp=require('../Models/Registration/Otp.js');
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv")
//config dotenv
dotenv.config();
///////////////////////////////////Register/////////////////////////////////////////
const registration =  async(req, resp) => {
    const {  email, password} = req.body
  try {
   const user=await User.findOne({email: email});
        if(user){
            resp.send({message: "User already registerd"})
        } else {
            const user = new User({
                
                email,
                password
            })
          const result=await user.save();
                if(!result) {
                    resp.send({message:"Unable to registerd user"})
                } else {
                    resp.send( { message: "Successfully Registered, Please login now." })
                }
            
        
    
  }
 } catch (error) {
    resp.send(error);
    
  }
}
///////////////////////Login///////////////////////////////////////////
const login = async (req, resp) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, (error, user) => {
        if (user) {
            if (password === user.password) {
                const token=jwt.sign({_id:user.id},process.env.JWT_SECRET);
                resp.send({ message: "Login Successfull", user: user,token })
               

            }
            else {
                resp.send({ message: "password didn't match" })
            }
        }
        else {
            resp.send({ message: "User not registered" })
        }
    })
}
////////////////////////////emailSend////////////////////////////////////
const emailSend = async (req, resp) => {
    const { email } = req.body;
  
    User.findOne({ email: email }, (error, user) => {
        if (user) {
            const optCode = Math.floor((Math.random() * 10000))
            const otp = new Otp({
                email: email,
                code: optCode,
            })
            otpResponse = otp.save();
            const transporter = nodeMailer.createTransport({
                host: 'smtp.gmail.com',
                port: '587',
                secure: false,
                requireTLS: true,
                auth: {
                    user: "umar888khan@gmail.com",
                    pass: "uwxyieicopppzngi",
                },
            });
            const mailOptions = {
                from: "umar888khan@gmail.com",
                to: `${email}`,
                subject: "Reset Password",
                text: `Your Otp code is ${optCode}`
            }
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {

                    resp.send(err)
                }
                else {
                  
                    resp.status(200).send(info.response)
                }
            })

        }
        else {
            resp.send({ message: "Please enter correct email" });
        }

    });
}
///////////////////////////////changePassword///////////////////////////////////////////
const changePassword = async (req, resp) => {
    const { email, code, password } = req.body;
    Otp.find({ email: email, code: code }, (err, user) => {
        if (user) {
            User.findOne({ email: email }, (err, user) => {
                if (user) {                
                    user.password = password;
                    user.save();
                    console.warn(user);
                }
            })
        }
        else {
            resp.send({ message: "Please enter correct otp" });
        }
    })
}
module.exports = { registration, login, emailSend, changePassword };