async function CambiarRedBackend(dataChangeRed){
    document.body.style.cursor = 'wait';
    const urlChangeRed = 'http://127.0.0.1:8000/DGridDesign/v1.0.0/Red/change/';
    /* var dataChangeRed = {
        idredOriginal: 1,
        idNombre: 1,
        // Nuevos Valores
        idredNew: 1,
        idNombreNew: 1, 
        fechaNew: 1,
        horaNew: 1,
        idusuarioNew: 5,
        statusNew: 'Load',
    }
    */ 
    /* console.log("========= CambiarNodoBackend ============")
    console.log(dataChangeRed) */
    await fetch(urlChangeRed, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataChangeRed)
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