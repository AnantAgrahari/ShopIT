import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";



export const getProducts=catchAsyncErrors(async(req,res,next)=>{
    const resPerPage=4;
    const apiFilters=new APIFilters(Product,req.query).search().filters();    //searches the product with just a keyword//
    let products=await apiFilters.query;      //same here also//
    let filteredProductsCount=products.length;          //this will give you the count of total products with that particular keyword//

    apiFilters.pagination(resPerPage);
    products=await apiFilters.query.clone();   // we are executing it for the 2nd time so we have to clone it//

    res.status(200).json({resPerPage,filteredProductsCount,products}); 
});


export const newProduct=catchAsyncErrors(async(req,res)=>{
   req.body.user=req.user._id;
   
    const product=await Product.create(req.body);  //create func is used to create a doc of whole model//

   res.status(200).json({ product,});
});


export const getProductDetails=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req?.params?.id).populate('reviews.user');  
 
    if(!product)
    {
       return next(new ErrorHandler('Product not found',404));      //next is a middleware provided by express//
    }
    res.status(200).json({ product,});
 });


 //get products- admin => /api/v1/admin/products
 export const getAdminProducts=catchAsyncErrors(async(req,res,next)=>{
   const products=await Product.find();

   res.status(200).json({ products,});
});



 export const updateProducts=catchAsyncErrors(async(req,res)=>{
    let product=await Product.findById(req?.params?.id);  //create func is used to create a doc of whole model//
 
    if(!product)                          //if product is not present//
    {
        return next(new ErrorHandler('Product not found',404));
    }

    product=await Product.findByIdAndUpdate(req?.params?.id,req.body,{
        new:true,            //new keyword will make sure that the product is updated and updated product is shown//
    })
    res.status(200).json({ product,});
 });



 export const deleteProducts=catchAsyncErrors(async(req,res)=>{
    let product=await Product.findById(req?.params?.id);  //create func is used to create a doc of whole model//
 
    if(!product)                          //if product is not present//
    {
        return next(new ErrorHandler('Product not found',404));
    }

   await product.deleteOne();

    res.status(200).json({ message:"Product deleted succesfully",});
 });




// create/update product review//
 export const createProductReview=catchAsyncErrors(async(req,res,next)=>{
  const {rating,comment,productId}=req.body;
  
  const review={
    user: req?.user?._id,
    rating: Number(rating),
    comment,
  };
  const product=await Product.findById(productId);
 
    if(!product)                          
    {
        return next(new ErrorHandler('Product not found',404));
    }

 const isReviewed=product?.reviews?.find((r)=>r.user.toString()===req?.user?._id.toString());                //if the user has given the review then we can update it ,if not,then create new one//
 if(isReviewed){
    product.reviews.forEach((review)=>{
        if(review?.user?.toString()===req?.user?._id.toString())
        {
            review.comment=comment;
            review.rating=rating;
        }    });
 }
 else{
    product.reviews.push(review);
    product.numOfReviews=product.reviews.length;
 }

 product.ratings=product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length;

 await product.save({validateBeforeSave: false});
    res.status(200).json({ success:true,});
 });






 // get Product reviews//
 export const getProductReviews=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.query.id);

    if(!product)                          
    {
        return next(new ErrorHandler('Product not found',404));
    }

    res.status(200).json({reviews: product.reviews,});
 });





 // delete product review//
 export const deleteReview=catchAsyncErrors(async(req,res,next)=>{
  
  let product=await Product.findById(req.query.productId);
   
      if(!product)                          
      {
          return next(new ErrorHandler('Product not found',404));
      }
  
    const reviews=product?.reviews?.filter((review)=>review._id.toString()!==req?.query?.id.toString());
   const numOfReviews=reviews.length;
  
   const ratings=numOfReviews===0?0:product.reviews.reduce((acc,item)=>item.rating+acc,0)/numOfReviews;
    
    product=await Product.findByIdAndUpdate(req.query.productId,{ reviews,numOfReviews,ratings},{new: true});
      res.status(200).json({ success:true,product});
   });
  


   //Can user review  /api/v1/can_review
   export const canUserReview=catchAsyncErrors(async(req,res)=>{
     const orders=await Order.find({
        user: req.user._id,
        "orderItems.product": req.query.productId,
     });

     if(orders.length===0){
        return res.status(200).json({
            canReview: false
        })
     }
    res.status(200).json({canReview: true,});
 });