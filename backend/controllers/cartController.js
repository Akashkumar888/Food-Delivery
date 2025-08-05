
const userModel=require('../models/userModel');

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.userId }); // ✅ Fix here
    let cartData = await userData.cartData || {};

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } 
    else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData }); // ✅ Fix here
    res.json({ success: true, message: "Added To Cart" });
  } 
  catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Error" });
  }
};


const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.userId });
    let cartData = await userData.cartData || {};

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] <= 0) {
        delete cartData[req.body.itemId];
      }
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });
    res.json({ success: true, message: "Removed From Cart" });
  } 
  catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Error" });
  }
};


const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    let cartData=await user.cartData || {};
    res.json({ success: true, cartData});
  } 
  catch (error) {
    console.log("Error", error);
    res.json({ success: false, message: "Error fetching cart" });
  }
};


module.exports={addToCart,removeFromCart,getCart};

