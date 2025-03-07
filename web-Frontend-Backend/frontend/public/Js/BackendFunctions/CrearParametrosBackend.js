async function CrearParametrosBackend(dataCreateParametros){
    document.body.style.cursor = 'wait';
    const urlCreateParametros = 'http://127.0.0.1:8000/DGridDesign/v1.0.0/Parametro/createParameter/';
/*  var dataCreateParametros = {
      idred: idredValue, // Id de la red
      N: 0, // Numero de nodos
      NG1:  0, // Numeros de Generaciones de tipo 1
      NG2:  0, // Numeros de Generaciones de tipo 2
      NG3:  0, // Numeros de Generaciones de tipo 3
      S:  0, // Numeros de fuentes
      NLoad:  0, // Numeros de cargas
      NLine:  0, // Numeros de lineas
      Nnodos:  0, // Numeros de nodos
      centerLat: 0, // latitud del centro
      centerLng: 0, // longitud del centro
      zoom: 0, // zoom
      zoomScale: 0, // scala
      ColorLine: '#4285f4', // Color de la linea
      WidthLine: 3,  // ancho de la linea
      ColorNode: '#4285f4', // color de la linea
      WidthNode: 0,//2.75 // ancho de la linea
      pinColor: "#4285f4" // color de los pines
    } */

    /* console.log("dataCreateParametros", dataCreateParametros) */
    await fetch(urlCreateParametros, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataCreateParametros)
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