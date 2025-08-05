

const orderModel=require('../models/orderModel');
const userModel=require("../models/userModel");
const Stripe=require('stripe');

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);


const placeOrder=async(req,res)=>{
  
  const frontend_url="http://localhost:5173";
  try {
    const newOrder=new orderModel({
      userId:req.userId,
      items:req.body.items,
      amount:req.body.amount,
      address:req.body.address,
    })
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});// {} means clear all data
    const line_items = req.body.items.map((item) => {
       return {
        price_data: {
          currency: "INR",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100 * 80, // Usually only *100 is enough; *80 might be a mistake
        },
        quantity: item.quantity,
      };
    });


    line_items.push({
      price_data:{
        currency:"INR",
        product_data:{
          name: "Delivery Charges",
        },
        unit_amount: 2*100*80
      },
      quantity:1,
    })

    const session=await stripe.checkout.sessions.create({
      line_items:line_items,
      mode:"payment",
      success_url: `${frontend_url}/verify/?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify/?success=false&orderId=${newOrder._id}`
    });
    
    res.json({success:true,session_url:session.url});
  } 
  catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const verifyOrder=async(req,res)=>{
  try {
    
  } catch (error) {
    
  }
}

module.exports={placeOrder,verifyOrder};

