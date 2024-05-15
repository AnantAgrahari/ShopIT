import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";

import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

//register user
export const registerUser=catchAsyncErrors(async(req,res,next)=>{
    const { name,email,password}= req.body;
     const user=await User.create({
        name, email, password,
     });
     
    sendToken(user,201,res);
    res.status(200).json({
        success: true,
    })
});


//login user//
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




// Logout user
export const logoutUser=catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{                                           //by setting the token value to null,we can delete the cookie//
        expires: new Date(Date.now()),                        //deletes the cookie instantly//
        httpOnly: true,
    });
    res.status(200).json({
        message: "Logged out",
    })
});





// Forgot password 
export const forgotPassword=catchAsyncErrors(async(req,res,next)=>{
      
     //find user in the DB//
     const user=await User.findOne({email:req.body.email});
     if(!user)                                                              //if user is not there in database//
     {
        return next(new ErrorHandler('user not found with this email',404))
     }
   
      //get reset password token if user is present//
      const resetToken= user.getResetPasswordToken();
      await user.save();       //will save resetPasswordToken & resetPasswordExpire field in the DB
      
      // Create resetPassword url
      const resetUrl=`${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;        //this reset url will be sent in the email
     const message=getResetPasswordTemplate(user?.name,resetUrl);

     try {
        await sendEmail({                       //sending of email
            email: user.email,
            subject: "ShopIt password Recovery",
            message,
        });

        res.status(200).json({                    
            message:`email sent to: ${user.email}`,                //if sentEmail func. executes successfully then it will show confirmation message//
        });
     } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire=undefined;
        await user.save();
        return next(new ErrorHandler(error?.message,500));
     }
});



// Reset Password 
export const resetPassword=catchAsyncErrors(async(req,res,next)=>{
  //hash the url token//
 const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex"); 
 const user=await User.findOne({
    resetPasswordToken,
    resetPasswordExpire:{ $gt: Date.now()}
 })

 if(!user)
 {
    return next(new ErrorHandler("Password reset token is invalid or has been expired",400));
 }

  if(req.body.password !== req.body.confirmPassword)
  {
    return next(new ErrorHandler("Password does not match",400));
  }

  // Set the new password

   user.password=req.body.password;         //it will hash the new password and save it in the DB//

   user.resetPasswordToken=undefined;
   user.resetPasswordExpire=undefined;
   await user.save();

   sendToken(user,200,res);             //after the new password is set, then it will send the token again//

});



// get current user details
export const getUserProfile=catchAsyncErrors(async(req,res,next)=>
{
    const user=await User.findById(req?.user?._id);               //req.user will get the details of the current user//
     
    res.status(200).json({
     user,   
    })
});



// update password endpoint
export const updatePassword=catchAsyncErrors(async(req,res,next)=>
{
   const user=await User.findById(req?.user?._id).select("+password");

   //check the previous user password//
   const isPasswordMatched=await user.comparePassword(req.body.oldPassword);

   if(!isPasswordMatched){
    return next(new ErrorHandler('Old password is incorrect',400))
   }

   user.password=req.body.password;        //req.body.password is the new password or the updated password and it will be hashed and will be saved in the DB//
   user.save();
   res.status(200).json({
    success: true,
   });
});