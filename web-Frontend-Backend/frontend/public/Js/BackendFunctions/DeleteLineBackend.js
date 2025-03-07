async function DeleteLineBackend(dataDeleteLine){
    document.body.style.cursor = 'wait';
    const urlDeleteLine = 'http://127.0.0.1:8000/DGridDesign/v1.0.0/Linea/delete/';
/*     var dataDeleteLine = {
        idred: 1,
        nombre: 1,
    } */
    await fetch(urlDeleteLine, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataDeleteLine)
    })
    .then(response => response.json()) // Convierte la respuesta a JSON
    .then(data => {
        /* console.log("Respuesta Correcta - Delete Line")
        console.log("Respuesta:", data); */
        document.body.style.cursor = 'default';
        return data
    })
    .catch(error => {
        document.body.style.cursor = 'default';
        console.error("Error:", error);
    });
   
}