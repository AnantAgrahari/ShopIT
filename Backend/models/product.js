import mongoose from "mongoose";          //this model is created for admin,who will list all the product//
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
    description:{
        type: String,
        required:[true,"Please enter product description"],
    }, 
    ratings:{
        type:Number,
        default: 0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url: {
                type: String,
                required:true,
            },
        },
    ],
    category:{
        type: String,
        required:[true,'Please enter product category'],
        enum:{                      //in enum we restrict the user to some specific values,the user cannot enter the products other than the mentioned array//                        
            values:["Laptops","Electronics","Cameras","Headphones", "Food","Home","Outdoor","Accessories"],                  //similar to drop down menu//
            message:"Please select correct category",
        },
    },
    seller:{
        type: String,
        required:[true,"Please enter product seller"],
    },
    stock:{
        type: Number,
        required:[true,"Please enter product stock"],
    },
    numOfReviews:{
        type: Number,
        default: 0,
    },
    reviews:[
        {
            user:{                                    //this is that user that has created the review//
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required: true
            },
            rating:{
                type: Number,
                required:true
            },
            comment:{
                type: String,
                required: true
            },
        },
    ],
    user:{                                      //this is that user that has created the product//
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },    
},
   { timestamps: true }              //mongooose will automatically create a at what date it is created// 
);
export default mongoose.model("Product",productSchema);