const express = require('express');
const router = express.Router();
const razorpay = require('../config/razorpayInstance');

router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Razorpay Create Order Error:", err);
    res.status(500).json({ message: "Error creating Razorpay order" });
  }
});

module.exports = router;
