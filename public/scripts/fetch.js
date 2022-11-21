export const getDatosFetch = async (url)=>{
    try{
        const res =  await fetch(url);
        if(!res.ok)
        {
            throw {error : res.status , statusText : res.statusText}
        }
        let data = await res.json();
        return data;
    }
    catch(error){
        console.error(error);
    }
}

export const postDatosFetch = async (url,objeto)=>{
    try{

        const options  =  {method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"},body:JSON.stringify(objeto)};
        const res =  await fetch(url,options);
        if(!res.ok)
        {
            throw {error : res.status , statusText : res.statusText}
        }
        let data = await res.json();
        
        return data;
    }
    catch(error){
        console.error(error);
    }
};

