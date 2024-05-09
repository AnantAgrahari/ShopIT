import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";

export const registerUser=catchAsyncErrors(async(req,res,next)=>{
    const { name,email,password}= req.body;
     const user=await User.create({
        name, email, password,
     });
      
    sendToken(user,201,res);
});



export const loginUser=catchAsyncErrors(async(req,res,next)=>{
    const { email,password}= req.body;

    if(!email || !password)
    {
        return next(new ErrorHandler('Please enter email and password',400))
    }
      
     //find user in the DB//
     const user=await User.findOne({email}).select("+password")
     if(!user)
     {
        return next(new ErrorHandler('Invalid email and password',401))
     }
   
      //check if password is correct//
      const isPasswordMatched= await user.comparePassword(password);
      
      if(!isPasswordMatched)
     {
        return next(new ErrorHandler('Invalid email and password',401))
     }

    sendToken(user,200,res);
});

