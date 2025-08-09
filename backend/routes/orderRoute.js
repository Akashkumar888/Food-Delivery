const express = require('express');
const orderRouter = express.Router();

const {
  placeOrder,
  verifyOrder,
  userOrders,
  listOfOrders,
  updateStatus,
  placeOrderCOD
} = require('../controllers/orderController');

const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');

// Authenticated user routes
orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorders', authMiddleware, userOrders);

// Admin routes
orderRouter.get('/list',  listOfOrders);
orderRouter.post('/status', updateStatus);


orderRouter.post('/place-cod', authMiddleware, placeOrderCOD); // <-- new COD route

module.exports = orderRouter;

