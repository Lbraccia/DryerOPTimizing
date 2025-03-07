async function CrearRedBackend(dataCreateRed){
    document.body.style.cursor = 'wait';
    const urlCreateRed = 'http://127.0.0.1:8000/DGridDesign/v1.0.0/Red/createRed/';
/*  var dataCreateRed = {
      nombre: selected.id, 
      fecha:  "2024-07-08",
      hora: "14:30:00", // Posición x 
      idusuario: 1, // Posición y
    } */
    
    console.log("=== CrearNodoBackend ====")
    console.log("dataCreateNodo", dataCreateRed)
    await fetch(urlCreateRed, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataCreateRed)
    }).then(response => response.json()) // Convierte la respuesta a JSON
    .then(data => {
 /*        console.log("Respuesta Correcta")
        console.log("Respuesta:", data); */
        document.body.style.cursor = 'default';
        return data
    })
    .catch(error => {
        document.body.style.cursor = 'default';
        console.error("Error:", error);
    });
   
}