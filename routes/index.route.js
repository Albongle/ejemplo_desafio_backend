const express = require("express");
const router = express.Router();
const productoRouter = require("./producto.route");

router.use("/api/productos", productoRouter);

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
