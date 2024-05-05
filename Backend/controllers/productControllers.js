import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getProducts=async(req,res)=>{
     const products=await Product.find();     //it will find all the products that are listed in product collection in the database//

    res.status(300).json({products,});
}


export const newProduct=async(req,res)=>{
   const product=await Product.create(req.body);  //create func is used to create a doc of whole model//

   res.status(200).json({ product,});
};


export const getProductDetails=async(req,res,next)=>{
    const product=await Product.findById(req?.params?.id);  
 
    if(!product)
    {
       return next(new ErrorHandler('Product not found',404));      //next is a middleware provided by express//
    }
    res.status(200).json({ product,});
 };



 export const updateProducts=async(req,res)=>{
    let product=await Product.findById(req?.params?.id);  //create func is used to create a doc of whole model//
 
    if(!product)                          //if product is not present//
    {
        return res.status(404).json({
       error: "Product not found",
        });
    }

    product=await Product.findByIdAndUpdate(req?.params?.id,req.body,{
        new:true,            //new keyword will make sure that the product is updated and updated product is shown//
    })
    res.status(200).json({ product,});
 };



 export const deleteProducts=async(req,res)=>{
    let product=await Product.findById(req?.params?.id);  //create func is used to create a doc of whole model//
 
    if(!product)                          //if product is not present//
    {
        return res.status(404).json({
       error: "Product not found",
        });
    }

   await product.deleteOne();

    res.status(200).json({ message:"Product deleted succesfully",});
 };