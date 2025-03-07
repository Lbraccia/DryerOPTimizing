async function DeleteNodeBackend(dataDeleteNode){
    document.body.style.cursor = 'wait';
    const urlDeleteNodo = 'http://127.0.0.1:8000/DGridDesign/v1.0.0/Nodo/delete/';
/*     console.log("========= DeleteNodeBackend ============")
    console.log(dataDeleteNode) */
    await fetch(urlDeleteNodo, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataDeleteNode)
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