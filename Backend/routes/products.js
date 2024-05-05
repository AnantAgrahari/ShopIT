import express from "express";
import { getProducts, newProduct, getProductDetails, updateProducts,deleteProducts } from "../controllers/productControllers.js";
const router=express.Router();   //will enable the routes function//

router.route("/products").get(getProducts);
router.route("/admin/products").post(newProduct);
router.route("/products/:id").get(getProductDetails);
router.route("/products/:id").put(updateProducts);
router.route("/products/:id").delete(deleteProducts);
export default router;