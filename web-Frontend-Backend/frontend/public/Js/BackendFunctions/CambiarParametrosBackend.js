async function CambiarParametrosBackend(dataCambiarParametros){
    document.body.style.cursor = 'wait';
    const urlCambiarParametros = 'http://127.0.0.1:8000/DGridDesign/v1.0.0/Parametro/change/';
/*     var dataCambiarParametros = {
        idredOriginal: 1, // Id de la red
        // Nuevos Valores
        NNew: 0, // Numero de nodos
        PNew: 0, // Numero de periodos
        NG1New:  0, // Numeros de Generaciones de tipo 1
        NG2New:  0, // Numeros de Generaciones de tipo 2
        NG3New:  0, // Numeros de Generaciones de tipo 3
        SNew:  0, // Numeros de fuentes
        NLoadNew:  0, // Numeros de cargas
        NLineNew:  0, // Numeros de lineas
        NnodosNew:  0, // Numeros de nodos
        centerLatNew:  0, // Lat del centro del mapa
        centerLngNew:  0, // Lng del centro del mapa
        zoomNew:  0, // Lng del centro del mapa
        zoomScaleNew:  0, // Lng del centro del mapa
        ColorLineNew:  0, // Numeros de nodos
        WidthLineNew:  0, // Lat del centro del mapa
        ColorNodeNew:  0, // Lng del centro del mapa
        WidthNodeNew:  0, // Lng del centro del mapa
        pinColorNew:  0, // Lng del centro del mapa
    } */
    /* console.log("dataCambiarParametros", dataCambiarParametros) */
    await fetch(urlCambiarParametros, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataCambiarParametros)
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