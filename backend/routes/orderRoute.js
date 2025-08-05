
const express=require('express');
const orderRouter=express.Router();

const {placeOrder,verifyOrder}=require('../controllers/orderController');
const authMiddleware=require('../middleware/auth');


orderRouter.post('/place',authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);

module.exports=orderRouter;

