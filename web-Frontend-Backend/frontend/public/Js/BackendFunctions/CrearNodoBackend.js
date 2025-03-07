async function CrearNodoBackend(dataCreateNodo){
    document.body.style.cursor = 'wait';
    // Activo la animacion del mouse
    //startLoad()
    const urlCreateNodo = 'http://127.0.0.1:8000/DGridDesign/v1.0.0/Nodo/createNodo/';
/*  var dataCreateNodo = {
      idred: idredValue,
      idNodo: selected.id, 
      nombre: N,
      idtiponodo:  "1",
      x: x, // Posición x 
      y: y, // Posición y
      lat: 0, // Posición x 
      lng: 0, // Posición y
      p: 0, // potencia activa
      q: 0, // potencia reactiva
      fi: 0, // angulo de generacion
      pLB: 0, // limite inferior de la potencia activa
      qLB: 0, // limite inferior de la potencia reactiva
      pUB: 0, // limite superior de la potencia activa
      qUB: 0, // limite superior de la potencia reactiva
      VLB: 0, // limite inferior de la potencia activa
      VUB: 0, // limite superior de la potencia activa
      anguloPin: "0", // posición del pin
      grid: "false" // Si tiene un source conectado
    } */
    /*
    console.log("=== CrearNodoBackend ====")
    console.log("dataCreateNodo", dataCreateNodo) */
    await fetch(urlCreateNodo, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataCreateNodo)
    })
    .then(response => response.json()) // Convierte la respuesta a JSON
    .then(data => {
        /* console.log("Respuesta Correcta")
        console.log("Respuesta:", data); */
        document.body.style.cursor = 'default';
        // Finalizo la animacion del mouse
        //endLoad(MouseAnimation)
        return data
    })
    .catch(error => {
        document.body.style.cursor = 'default';
        console.error("Error:", error);
        // Finalizo la animacion del mouse
        //endLoad(MouseAnimation)
    });
   
}