import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";



export const getProducts=catchAsyncErrors(async(req,res)=>{
    const resPerPage=4;
    const apiFilters=new APIFilters(Product,req.query).search().filters();    //searches the product with just a keyword//
    let products=await apiFilters.query;      //same here also//
    let filteredProductsCount=products.length;          //this will give you the count of total products with that particular keyword//

    apiFilters.pagination(resPerPage);
    products=await apiFilters.query.clone();   // we are executing it for the 2nd time so we have to clone it//

    res.status(300).json({resPerPage,filteredProductsCount,products}); 
});


export const newProduct=catchAsyncErrors(async(req,res)=>{
   req.body.user=req.user._id;
   
    const product=await Product.create(req.body);  //create func is used to create a doc of whole model//

   res.status(200).json({ product,});
});


export const getProductDetails=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req?.params?.id);  
 
    if(!product)
    {
       return next(new ErrorHandler('Product not found',404));      //next is a middleware provided by express//
    }
    res.status(200).json({ product,});
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