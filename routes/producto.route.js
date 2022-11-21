const express = require("express");
const router = express.Router();
const ProductoController = require("../controllers/producto.controller");

router.get("", ProductoController.getAllProducts);

router.get("/:id", ProductoController.getProductById);

router.post("", ProductoController.addNewProduct);

router.put("/:id", ProductoController.updateProduct);

router.delete("/:id", ProductoController.deleteProduct);

module.exports = router;
