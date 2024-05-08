import mongoose from "mongoose";
 const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please enter your name"],
        maxLength:[50,"your name cannot exceed 50 characters"]
    },
    email:{
        type: String,
        required:[true,"please enter your email"],
        unique:true,    //2 users cannot have same email//
    },
    password:{
        type: String,
        required: [true, "please  enter your password"],
        minLength:[6, "Your password should be at least  of 6 characters"],
        select: false,                  // select false means that dont send this password in response to the user//
    },
    avatar:{
        public_id: String ,
        url: String,           //url of the image//
    },
    role:{
        type: String,
        default: "user",
    },
     
    resetPasswordToken: String,
    resetPasswordExpire: Date,
 },
 { timestamps: true }                 // it will show all the details about when the it is created and updated//
 );

export default mongoose.model("User",userSchema);