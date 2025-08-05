
const express=require('express');
const orderRouter=express.Router();

const {placeOrder,verifyOrder,userOrders,listOfOrders,updateStatus}=require('../controllers/orderController');
const authMiddleware=require('../middleware/auth');
const adminMiddleware = require("../middleware/adminMiddleware");


orderRouter.post('/place',authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorders',authMiddleware, userOrders);
orderRouter.get('/list',listOfOrders);
orderRouter.post('/status', updateStatus);

module.exports=orderRouter;

