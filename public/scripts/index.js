import { getDatosFetch, postDatosFetch } from "./fetch.js";
import { renderObjetos } from "./render.js";
const socket = io();
const send = document.getElementById("send");

socket.on("new:producto", (data) => {
  renderObjetos(data);
});

window.addEventListener("DOMContentLoaded", () => {
  send.addEventListener("click", handlerNewProducto);
  getDatosFetch("/api/productos")
    .then((data) => renderObjetos(data))
    .catch((error) => console.log(error));
});

const handlerNewProducto = (event) => {
  event.preventDefault();
  let obj = {
    thumbnail: document.forms[0].url.value,
    title: document.forms[0].title.value,
    price: document.forms[0].price.value,
  };
  postDatosFetch("/api/productos", obj)
    .then(() => deleteForm())
    .catch((error) => console.log(error));
};

const deleteForm = () => {
  document.forms[0].title.value = "";
  document.forms[0].price.value = 0;
};
