import mongoose from "mongoose";
const productSchema=new mongoose.Schema({
    name:{
        type: String,
        required:[true,'Please enter product name'],  // if product name is not mentioned then it will throw error to write the name// 
        maxLength:[200,"product name cannot exceed 200 characters"],
    },
    price:{
        type: Number,
        required:[true,'Please enter product price'],
        maxLength:[5,"product name cannot exceed 200 characters"],
    },
    dewscription:{
        type: String,
        required:[true,"Please enter product description"],
    }, 
    rating:{
        type:Number,
        default: 0
    },
    images:[
        {
            public_id:String,
            url: String,
        },
    ],
    category:{
        type: String,
        required:[true,'Please enter product category'],
        enum:{                      //in enum we restrict the user to some specific values//                        
            values:["Laptops,electronics,cameras,headphones, food,headphones,home,outdoorzx"],                  
            message:"Please select correct category",
        },
    },
});