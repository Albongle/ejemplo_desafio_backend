module.exports = class Producto {
  static #arrProductos = [
    {
      id: 1,
      thumbnail: "/assets/img/equipos/G60s.png",
      title: "Motorola G60S",
      price: 47999,
    },
    {
      id: 2,
      thumbnail: "/assets/img/equipos/12.png",
      title: "Iphone 12",
      price: 215999,
    },
    {
      id: 3,
      thumbnail: "/assets/img/equipos/12ProMax.png",
      title: "Iphone 12ProMax",
      price: 305999,
    },
    {
      id: 4,
      thumbnail: "/assets/img/equipos/A22.png",
      title: "Samsung A22",
      price: 19000,
    },
    {
      id: 5,
      thumbnail: "/assets/img/equipos/A32.png",
      title: "Samsung A32",
      price: 39669,
    },
  ];

  getProductos() {
    return Producto.#arrProductos.length === 0 ? null : Producto.#arrProductos;
  }
  getProductoById(id) {
    return id != undefined && typeof id === "number"
      ? Producto.#arrProductos.find((element) => element.id === id)
      : null;
  }

  setProducto(objeto) {
    if (
      objeto.title != undefined &&
      objeto.thumbnail != undefined &&
      objeto.thumbnail != "" &&
      objeto.price != undefined &&
      parseInt(objeto.price) != NaN
    ) {
      let id = this.#getMaxId();
      id++;
      objeto.id = id;
      let objReturn = {
        id: objeto.id,
        thumbnail: objeto.thumbnail,
        title: objeto.title,
        price: objeto.price,
      };
      Producto.#arrProductos.push(objReturn);
      return objReturn;
    }
    return null;
  }
  updateProducto(id, objeto) {
    if (
      objeto.title != undefined &&
      objeto.thumbnail != undefined &&
      objeto.thumbnail != "" &&
      objeto.price != undefined &&
      parseInt(objeto.price) != NaN &&
      id != undefined &&
      typeof id === "number"
    ) {
      let pos = Producto.#arrProductos.findIndex(
        (element) => element.id === id
      );
      if (pos > -1) {
        Producto.#arrProductos.splice(pos, 1);
        Producto.#arrProductos.push({
          id: objeto.id,
          thumbnail: objeto.thumbnail,
          title: objeto.title,
          price: objeto.price,
        });
        return true;
      }
    }
    return false;
  }
  deleteProducto(id) {
    if (id != undefined && typeof id === "number") {
      let pos = Producto.#arrProductos.findIndex(
        (element) => element.id === id
      );
      if (pos > -1) {
        Producto.#arrProductos.splice(pos, 1);
        return true;
      }
    }
    return false;
  }

  #getMaxId() {
    return Producto.#arrProductos.length === 0
      ? 0
      : Producto.#arrProductos.reduce(
          (acum, proximo) => (acum > proximo.id ? acum : proximo.id),
          0
        );
  }
};
