import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config ({path:"backend/config/config.env"});
export const connectDatabase=()=>{

    let DB_URI="";

    if(process.env.NODE_ENV==="DEVELOPMENT") DB_URI=process.env.DB_LOCAL_URI;
    if(process.env.NODE_ENV==="PRODUCTION") DB_URI=process.env.DB_URI;
    mongoose.connect('mongodb+srv://anant:2jvw8VHYKdCX9BeU@cluster0.3h6loaz.mongodb.net/').then((con)=>{
        console.log(`MongoDb Database connected with Host: ${con?.connection?.host}`);
    }) ;
};