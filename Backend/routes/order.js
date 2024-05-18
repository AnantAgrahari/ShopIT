import express from "express"
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { getOrderDetails, myOrders, newOrder } from "../controllers/orderConntroller.js";
const router=express.Router();

 router.route("/orders/new").post(isAuthenticatedUser,newOrder);
 router.route("/orders/:id").get(isAuthenticatedUser,getOrderDetails);
 router.route("/my/orders").get(isAuthenticatedUser,myOrders);
export default router;
