async function FiltrarSolutionBackend(dataFiltrarRed){
    document.body.style.cursor = 'wait';
    const urlFiltrarRed = 'http://127.0.0.1:8000/DGridDesign/v1.0.0/Solutions/filtrar/';
    /*    
    dataFiltrarRed = {
        idUser: iduser,
    }
    console.log(dataFiltrarRed)
    */
    /* console.log("urlFiltrarRed", urlFiltrarRed) */
    try {
        const response = await fetch(urlFiltrarRed, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataFiltrarRed)
        });
        document.body.style.cursor = 'default';
        const data = await response.json(); // Convierte la respuesta a JSON
 
/*         console.log("Respuesta Correcta");
        console.log("Respuesta:", data);  */
        
        return data; // Retorna los datos si quieres usarlos en otra parte del código
    } catch (error) {
        console.error("Error:", error);
        document.body.style.cursor = 'default';
        throw error; // Lanza el error para que el código que llama a esta función pueda manejarlo si es necesario
    }
}
