async function FiltrarLineaBackend(dataFiltrarLinea){
    document.body.style.cursor = 'wait';
    const urlFiltrarLinea = 'http://127.0.0.1:8000/DGridDesign/v1.0.0/Linea/filtrar/';

/*     dataFiltrarLinea = {
        idred: 1,
    } */

    try {
        const response = await fetch(urlFiltrarLinea, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataFiltrarLinea)
        });

        const data = await response.json(); // Convierte la respuesta a JSON

        /* console.log("Respuesta Correcta");
        console.log("Respuesta:", data);  */
        document.body.style.cursor = 'default';
        return data; // Retorna los datos si quieres usarlos en otra parte del código
    } catch (error) {
        console.error("Error:", error);
        document.body.style.cursor = 'default';
        throw error; // Lanza el error para que el código que llama a esta función pueda manejarlo si es necesario
    }
}
