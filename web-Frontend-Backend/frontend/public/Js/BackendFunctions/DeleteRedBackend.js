async function DeleteRedBackend(dataDeleteRed){
    document.body.style.cursor = 'wait';
    const urlDeleteRed = 'http://127.0.0.1:8000/DGridDesign/v1.0.0/Red/delete/';

    await fetch(urlDeleteRed, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataDeleteRed)
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