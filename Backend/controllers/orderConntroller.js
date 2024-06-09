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



async function getSalesData(startDate,endDate){
    const salesData=await Order.aggregate([
        {
            // Stage 1 -filter results 
            $match:{
                createdAt :{
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                },
            },
        },
        {
            //stage 2- group Data
            $group:{
                _id:{
                    date: {$dateToString:{format: "%Y-%m-%d",date: "$createdAt"}}
                },
                totalSales:{ $sum : "$totalAmount"},
                numOrder:{ $sum: 1}, //count the no. of orders
            },
        },
    ]);
   // create a map to store sales data and num of order by data//
   const salesMap=new Map();
   let totalSales=0;
   let totalNumOrders=0;
   salesData.forEach((entry)=>{
    const date=entry?._id.date;
    const sales=entry?.totalSales;
    const numOrders=entry?.numOrders;

    salesMap.set(date,{sales,numOrders});
    totalSales+=sales;
    totalNumOrders+=numOrders;
   });

   //generate an array of dates between start and end date//
    const datesBetween=getDatesBetween(startDate,endDate)
     
    //create final sales data array with 0 for dates without sales//
    const finalSalesData=datesBetween.map((date)=>({
        data,
        sales: (salesMap.get(date) || {sales:0}).sales,
        numOrders: (salesMap.get(date) || {numOrders:0}).numOrders,
    }));
    return {salesData: finalSalesData,totalSales,totalNumOrders};
}


function getDatesBetween(startDate,endDate){
    const dates=[];
    let currentDate=new Date(endDate);
    while(currentDate<=new Date(endDate)){
   const formattedDate= currentDate.toISOString().split("T")[0];
   dates.push(formattedDate);
   currentDate.setDate(currentDate.getDate()+1);
}
       return dates;
}




// get sales data => /api/v1/admin/get_sales//
export const getSales=catchAsyncErrors(async(req,res,next)=>{
    
const startDate=new Date(req.query.startDate);
const endDate=new Date(req.query.endDate);

startDate.setUTCHours(0,0,0,0);
endDate.setUTCHours(23,59,59,999);

 const {salesData,totalSales,totalNumOrders}= await getSalesData(startDate,endDate);

    res.status(200).json({ 
        totalSales,
        totalNumOrders,
        sales:salesData,
    });
});


