async function FiltrarNodeBackend(dataFiltrarNode){
    document.body.style.cursor = 'wait';
    const urlFiltrarNodo = 'http://127.0.0.1:8000/DGridDesign/v1.0.0/Nodo/filtrar/';

/*     dataFiltrarNode = {
        idred: 1,
        idNodo: 1,
    } */
   /*  console.log(dataFiltrarNode) */
    try {
        const response = await fetch(urlFiltrarNodo, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataFiltrarNode)
        });

        const data = await response.json(); // Convierte la respuesta a JSON

       /*  console.log("Respuesta Correcta");
        console.log("Respuesta:", data);  */
        document.body.style.cursor = 'default';
        return data; // Retorna los datos si quieres usarlos en otra parte del código
    } catch (error) {
        console.error("Error:", error);
        document.body.style.cursor = 'default';
        throw error; // Lanza el error para que el código que llama a esta función pueda manejarlo si es necesario
    }
}
