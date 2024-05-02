import express from "express";
import { getProducts } from "../controllers/productControllers.js";
const router=express.Router();   //will enable the routes function//

router.route("/products").get(getProducts);
export default router;