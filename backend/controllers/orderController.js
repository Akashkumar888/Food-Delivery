const Razorpay = require('razorpay');
const crypto = require('crypto');
const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Place order and create Razorpay order
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    const newOrder = new orderModel({
      userId: req.userId,
      items,
      amount,
      address,
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    const options = {
      amount: amount * 100, // INR to paise
      currency: 'INR',
      receipt: newOrder._id.toString(),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      success: true,
      order: razorpayOrder,
      orderId: newOrder._id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Place Order Error:", error);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
};

// Verify Razorpay Signature
const verifyOrder = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId,
  } = req.body;

  try {
    const hash = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (hash === razorpay_signature) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: 'Payment verified' });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    console.error("Verify Order Error:", error);
    res.status(500).json({ success: false, message: 'Verification failed' });
  }
};

// Get orders of current logged-in user
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("User Orders Error:", error);
    res.status(500).json({ success: false, message: 'Could not fetch orders' });
  }
};

// Get all orders (Admin)
const listOfOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("List Orders Error:", error);
    res.status(500).json({ success: false, message: 'Could not list orders' });
  }
};

// Update order status (Admin)
const updateStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ success: false, message: 'Failed to update status' });
  }
};

// In controllers/orderController.js

const placeOrderCOD = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    const newOrder = new orderModel({
      userId: req.userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      status: "Pending"
    });

    await newOrder.save();

    // Clear cart after placing order
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    res.json({
      success: true,
      message: "COD Order placed successfully",
      orderId: newOrder._id
    });
  } catch (error) {
    console.error("Place COD Order Error:", error);
    res.status(500).json({ success: false, message: "Failed to place COD order" });
  }
};


module.exports = {
  placeOrder,
  verifyOrder,
  userOrders,
  listOfOrders,
  updateStatus,
  placeOrderCOD
};


