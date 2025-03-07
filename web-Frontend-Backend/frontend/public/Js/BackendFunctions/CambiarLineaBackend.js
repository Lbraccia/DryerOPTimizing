async function CambiarLineaBackend(dataChangeLine){
    document.body.style.cursor = 'wait';
    const urlChangeLine = 'http://127.0.0.1:8000/DGridDesign/v1.0.0/Linea/change/';
    /* var dataChangeLine = {
        idredOriginal: 1,
        nombreOriginal: 2,
        // Nuevos Valores
        idredNew: 1, // Si no cambia el valor lo tengo que pasar igual con (idredNew: idredOriginal)
        nombreNew: 2,
        //rNew: 1,
        //xNew: 1, 
        //zNew: 1,
        //qNew: 200,
        startXNew:1,
        startYNew: 1,
        //endXNew: 200,
        //endYNew: 200,
        pinIdIniNew: "1",
        //pinIdEndNew: 200,
        x1OriginalNew: 1,
        y1OriginalNew: 1,
        //x2OriginalNew: 200,
        //y2OriginalNew: 200,
        sourceNew: 2,
        //receptorNew: 2,
        //sentidoNew: true,
    }
 */
    /*
    console.log("===== Linea ======")
    console.log(dataChangeLine) */
    await fetch(urlChangeLine, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataChangeLine)
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