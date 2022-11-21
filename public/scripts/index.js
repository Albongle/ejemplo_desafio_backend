import { getDatosFetch, postDatosFetch } from "./fetch.js";
import { renderObjetos } from "./render.js";
const socket = io();
const send = document.getElementById("send");

socket.on("new:producto",(data)=>{
    if(data.status === "ok"){
        getDatosFetch("/api/productos")
        .then((datos)=>{
            renderObjetos(datos);
        })
        .catch(error=>console.error(error));
    }

});


window.addEventListener("DOMContentLoaded",async ()=>{
    send.addEventListener("click",handlerNewProducto);
    let datos = await getDatosFetch("/api/productos");
    renderObjetos(datos);
})

const handlerNewProducto= async(event)=>{
    event.preventDefault();
    let obj = {
        thumbnail:document.forms[0].url.value,
        title:  document.forms[0].title.value,
        price : document.forms[0].price.value,
    };
    let respuesta = await postDatosFetch("api/productos",obj);
    respuesta != null ? socket.emit("new:producto", {status:"ok"}) : socket.emit("new:producto", {status:"no ok"});
    deleteForm();
};


const deleteForm = ()=>{
   document.forms[0].title.value="";
   document.forms[0].price.value=0;
}
