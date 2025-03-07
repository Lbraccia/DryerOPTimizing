async function CambiarNodoBackend(dataChangeNode){
    document.body.style.cursor = 'wait';
    const urlChangeNodo = 'http://127.0.0.1:8000/DGridDesign/v1.0.0/Nodo/change/';
    /* var dataChangeNode = {
        idredOriginal: 1,
        idNodoOriginal: 1,
        // Nuevos Valores
        idredNew: 1,
        idNodoNew: 1, 
        nombreNew: 1,
        idtiponodoNew: 1,
        xNew: 5,
        yNew: 5,
        pNew: 5,
        qNew: 5,
        fiNew: 5,
        pLBNew: 5,
        qLBNew: 5,
        pUBNew: 5,
        qUBNew: 5,
        VLBNew: 5,
        VUBNew: 5,
        anguloPinNew: 5,
        gridNew: 5,
    }
    */ 
    /* console.log("========= CambiarNodoBackend ============")
    console.log(dataChangeNode) */
    await fetch(urlChangeNodo, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataChangeNode)
    })
    .then(response => response.json()) // Convierte la respuesta a JSON
    .then(data => {
/*         console.log("Respuesta Correcta")
        console.log("Respuesta:", data); */
        document.body.style.cursor = 'default';
        return data
    })
    .catch(error => {
        document.body.style.cursor = 'default';
        console.error("Error:", error);
    });
   
}