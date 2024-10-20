const uuid =require('uuid').v4
const dotenv=require("dotenv");


//config dotenv
dotenv.config();
//config uuid

const stripe = require('stripe')(process.env.SECURITY_KEY);



const checkout=async(req,resp)=>{
  console.warn(req.body);
  let error,status;
  try {
    const {product,token}=req.body;
    const customer=await stripe.customers.create({
      email:token.email,
      source:token.id
    })
    const key=uuid()

    const charge=await stripe.charges.create({
      amount:product.price*100,
      currency:"use",
      customer:customer.id,
      reciept_email:token.email,
      description:`Purchased the ${product.name}`,
      shipping:{
        name:token.card.name,
        address:{
          line1:token.card.address_line1,
          line2:token.card.address_line2,
          city:token.card.address_city,
          country:token.card.address_country,
          postal_code:token.card.address_zip,
        },
      },

    },
    {
      key
    }
    );
    console.log("Charge",{charge});
    status="success"
  } catch (error) {
    console.log(error);
    status="failure"
    
  }
  resp.json({
    error,
    status
  })

   

}
module.exports={checkout};