async function CrearLineaBackend(dataCreateLine){
    document.body.style.cursor = 'wait';
    const urlCreateLine = 'http://127.0.0.1:8000/DGridDesign/v1.0.0/Linea/createLine/';
/*     var dataCreateLine = {
        idred: 1,
        nombre: 1,
        source: 1,
        receptor: 2,
        startX: 1,
        startY: 2,
        endX: 1,
        endY: 2,
        pinIdIni: 1,
        pinIdEnd: 2,
    } */
    /* console.log("dataCreateLine", dataCreateLine) */
    await fetch(urlCreateLine, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataCreateLine)
    })
    .then(response => response.json()) // Convierte la respuesta a JSON
    .then(data => {
        /* console.log("Respuesta Correcta")
        console.log("Respuesta:", data); */
        document.body.style.cursor = 'default';
        return data
    })
    .catch(error => {
        document.body.style.cursor = 'default';
        console.error("Error:", error);
    });
   
}