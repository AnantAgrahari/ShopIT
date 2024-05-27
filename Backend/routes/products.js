import express from "express";
import { getProducts, newProduct, getProductDetails, updateProducts,deleteProducts, createProductReview, getProductReviews, deleteReview } from "../controllers/productControllers.js";
import { authorizeRoles,isAuthenticatedUser } from "../middlewares/auth.js";
const router=express.Router();   //will enable the routes function//

router.route("/products").get(getProducts);         //authorizeRoles is also a middleware//
router.route("/admin/products").post(isAuthenticatedUser,authorizeRoles('admin'),newProduct); 

router.route("/products/:id").get(getProductDetails);


router.route("/admin/products/:id").put(isAuthenticatedUser,authorizeRoles('admin'),updateProducts);        // Only admins can update or delete the products//
router.route("/admin/products/:id").delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProducts);

router.route("/reviews").get(isAuthenticatedUser,getProductReviews).put(isAuthenticatedUser,createProductReview); 

router.route("/admin/reviews").delete(isAuthenticatedUser,authorizeRoles('admin'),deleteReview);



export default router;

//max. of this routes are protected routes and only authenticated users can access this and for that middleware is created//

//only admins can post or update or delete the products//