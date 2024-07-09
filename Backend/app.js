import express from "express";
const app=express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/dbConnect.js";        //stores the sensitive info securely without being exposed into codebase//
import errorMiddleware from "./middlewares/errors.js";

import path from 'path';
// import { fileURLToPath } from "url";
const _filename=fileURLToPath(import.meta.url);
const _dirname=path.dirname(_filename);



//handle uncaught exceptions//

process.on("uncaughtException",(err)=>{
    console.log(`ERROR: ${err}`);
    console.log("Shutting down due to uncaught exception");
    process.exit(1);
});

dotenv.config ({path:"backend/config/config.env"});
connectDatabase();
app.use(express.json());       //without this, file will not be converted into json//

app.use(cookieParser());        //handle all the cookies//

import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
import { fileURLToPath } from "url";
app.use("/api/v1",productRoutes);                      //this is the main route without which route cannot be start//
app.use("/api/v1",authRoutes);
app.use("/api/v1",orderRoutes);

if(process.env.NODE_ENV==="PRODUCTION"){
    app.use(express.static(path.join(_dirname,"../frontend/build")));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(_dirname,"../frontend/build/index.html"))
    })
}

app.use(errorMiddleware);                               //it will handle all the errors for us// 
const server=app.listen(process.env.PORT,() =>{
    console.log(`server started on port :${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});


//handle unhandled promise rejections//

process.on("unhandledRejection",(err)=>{
    console.log(`ERROR: ${err}`);
    console.log("Shutting down server due to unhandled promise rejection");
    server.close(()=>{
        process.exit(1);
    });
});