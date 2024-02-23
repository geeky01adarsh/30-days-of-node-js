const { Router } = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, findProductById, getProductsByCategory } = require("../Controllers/products.controller");

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", createProduct);
productRouter.get("/category/:category", getProductsByCategory);
productRouter.get("/:id", findProductById);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
