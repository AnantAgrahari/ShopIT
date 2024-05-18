import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
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




// Get all Orders-  Admin route//
export const allOrders=catchAsyncErrors(async(req,res,next)=>{
    const orders=await Order.find();
 res.status(200).json({
    orders,
 });
});




// update Order with order id-  Admin route//
export const updateOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    if(!order)
    {
        return next(new ErrorHandler('No order found with this ID',404));
    }
     
    if(order?.orderStatus==="Delivered"){
        return next (new ErrorHandler('You have alreday deliveered the product',400));
    }

    // Update products stock
    order?.orderItems?.forEach(async(item)=>{
        const product=await Product.findById(item?.product?.toString());
        if(!product){
            return next(new ErrorHandler('No Product found with this ID',404));
        }

        product.stock=product.stock-item.quantity;              // decreases the product stock by the no. of quantity user has purchased//
        await product.save({validateBeforeSave: false});
    });

    order.orderStatus=req.body.status;
    order.deliveredAt=Date.now();
    
    await order.save();

    res.status(200).json({
    success:true,
 });
});



// delete order by id//
export const deleteOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);        

    if(!order)
    {
        return next(new ErrorHandler('No order found with this ID',404))
    }  

    await order.deleteOne();
    res.status(200).json({
        success: true,
    });
});


