import express from "express";
import {
  addProduct,
  deleteProduct,
  updateProduct,
  getProducts,
} from "../controllers/produto.js";

const router = express.Router();

router.get("/", getProducts);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
router.post("/", addProduct);

export default router;
