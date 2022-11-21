
export const renderObjetos = (arrObjeto)=>{
    const sectionProductos = document.querySelector("#section-productos");
    sectionProductos.innerHTML = "",
    sectionProductos.appendChild(createTable(arrObjeto));
}

const createTable =(arrObjetos)=>{
    const table = document.createElement("table");
    table.appendChild(createThead(arrObjetos));
    table.appendChild(createTbody(arrObjetos));
    return table;
}
const createThead = (arrObjetos)=>{
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    if(Array.isArray(arrObjetos))
    {
        for (const iterator in arrObjetos[0]){
            if(iterator === "id"){
                continue;
            } 
            tr.innerHTML+= `<th>${iterator}</th>`;
        }
    }
    thead.appendChild(tr);
    return thead;
}
const createTbody = (arrObjetos)=>{
    const tbody = document.createElement("tbody");
    
    if(Array.isArray(arrObjetos))
    {
        arrObjetos.forEach(element=>{
            const tr = document.createElement("tr");
            for (const iterator in element) {
                if(iterator === "id"){
                    tr.setAttribute("data-id",element[iterator]);
                }else if(iterator === "thumbnail"){
                    tr.innerHTML+=`<td><img src="${element[iterator]}" alt="${element["title"]}"></td>`
                }else{
                    tr.innerHTML+=`<td>${element[iterator]}</td>`
                }
            }
            tbody.appendChild(tr);
        });
    }
    return tbody;
}