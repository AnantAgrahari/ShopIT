import express from "express";
const app=express();
import dotenv from 'dotenv';
import { connectDatabase } from "./config/dbConnect.js";        //stores the sensitive info securely without being exposed into codebase//
dotenv.config ({path:"backend/config/config.env"});
connectDatabase()
import productRoutes from "./routes/products.js";


app.use("/api/v1",productRoutes);
app.listen(process.env.PORT,() =>{
    console.log(`server started on port :${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});