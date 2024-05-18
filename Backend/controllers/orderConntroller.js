import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.js";
import ErrorHandler from "../utils/errorHandler.js";


//create new order

export const newOrder=catchAsyncErrors(async(req,res,next)=>{
    const {
        orderItems,shippingInfo,itemsPrice,taxAmount,shippingAmount,
        totalAmount,paymentMethod,paymentInfo,
    }=req.body;   

    const order=await Order.create({
        orderItems,shippingInfo,itemsPrice,taxAmount,shippingAmount,
        totalAmount,paymentMethod,paymentInfo,
        user: req.user._id,        //it is the one who has given the order//
    });
    
    res.status(200).json({
        order,
    });
});



// get order details by order id//
export const getOrderDetails=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);          //finds if the order exists in the DB with that id//

    if(!order)
    {
        return next(new   ErrorHandler('No order found with this ID',404))
    }  
    res.status(200).json({
        order,
    });
});




// Get current user(logged in) orders//
export const myOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find({user: req.user._id});
 res.status(200).json({
    orders,
 });
});





