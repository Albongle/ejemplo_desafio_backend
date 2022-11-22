const productModel = require("../modules/producto.model");
const producto = new productModel();

module.exports = class ProductoController {
  static getAllProducts(req, res) {
    res.status(200).json(producto.getProductos());
  }

  static getProductById(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    let obj = producto.getProductoById(id);
    obj != null
      ? res.status(200).json(obj)
      : res.status(400).json({ error: "Producto no encontrado" });
  }

  static addNewProduct(req, res) {
    let obj = { ...req.body };
    let objRetorno = producto.setProducto(obj);
    req.app.io.sockets.emit("new:producto", producto.getProductos()); //al haber un cambio en productos informo
    objRetorno !== null
      ? res.status(200).json(obj)
      : res.status(406).json({ error: "Error en la carga del producto" });
  }

  static updateProduct(req, res) {
    let { id } = req.params;
    let obj = { ...req.body };
    id = parseInt(id);
    req.app.io.sockets.emit("new:producto", producto.getProductos()); //al haber un cambio en productos informo
    producto.updateProducto(id, obj)
      ? res.status(200).json({ status: ` Producto con Id ${id} actualizado` })
      : res.status(406).json({ error: "Producto no encontrado" });
  }

  static deleteProduct(req, res) {
    let { id } = req.params;
    id = parseInt(id);
    req.app.io.sockets.emit("new:producto", producto.getProductos()); //al haber un cambio en productos informo
    producto.deleteProducto(id)
      ? res.status(200).json({ status: ` Producto con Id ${id} eliminado` })
      : res.status(406).json({ error: "Producto no encontrado" });
  }
};
