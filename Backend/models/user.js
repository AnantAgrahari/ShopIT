import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
 const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please enter your name"],
        maxLength:[50,"your name cannot exceed 50 characters"]
    },
    email:{
        type: String,
        required:[true,"please enter your email"],
        unique:true,                                          //2 users cannot have same email//
    },
    password:{
        type: String,
        required: [true,"please enter your password"],
        minLength:[6, "Your password should be at least of 6 characters"],
        select: false,                               // select false means that dont send this password in response to the user//
    },
    avatar:{
        public_id: String ,
        url: String,                                    //url of the image//
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



 //encrypting the password before saving the user//

  userSchema.pre('save',async function(next){          //pre func in mongoose is used as before saving the user, encrypt the password//
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)    //  10 is the salt value, which means that higher the salt value, stronger the password will be hashed//
  });       //this means the current password//


  
  //return JWT token//
  userSchema.methods.getJwtToken=function(){
   return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_TIME,                  //after the expiry time the user has to login again//
    } );
  };

    // compare user password//
    userSchema.methods.comparePassword=async function (enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password);              //entered password is the password enterd by the user and this.password is the password that is there in the database//
    }

    
    //Generate reset password token//
    userSchema.methods.getResetPasswordToken=function(){
        //create token//
        const resetToken= crypto.randomBytes(20).toString('hex');      // This will give us the reset token, In the email we will send this token//
        
        //hash and set to resetPasswordToken field
        this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest('hex');

         //set token expire time
         this.resetPasswordExpire=Date.now()+ 30*60*1000;
         return resetToken;

    }


export default mongoose.model("User",userSchema);