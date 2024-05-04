import Product from "../models/product.js";

export const getProducts=async(req,res)=>{
     const products=await Product.find();     //it will find all the products that are listed in product collection in the database//

    res.status(300).json({products,});
}

export const newProduct=async(req,res)=>{
   const product=await Product.create(req.body);  //create func is used to create a doc of whole model//

   res.status(200).json({ product,});
};