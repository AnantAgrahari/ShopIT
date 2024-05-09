import express from "express";
import { getProducts, newProduct, getProductDetails, updateProducts,deleteProducts } from "../controllers/productControllers.js";
import { authorizeRoles,isAuthenticatedUser } from "../middlewares/auth.js";
const router=express.Router();   //will enable the routes function//

router.route("/products").get(isAuthenticatedUser,authorizeRoles('admin'),getProducts);
router.route("/admin/products").post(newProduct);

router.route("/products/:id").get(getProductDetails);


router.route("/admin/products/:id").put(updateProducts);
router.route("/admin/products/:id").delete(deleteProducts);
export default router;

//max. of this routes are protected routes and only authenticated users can access this and for that middleware is created//

//only admins can post or update or delete the products//