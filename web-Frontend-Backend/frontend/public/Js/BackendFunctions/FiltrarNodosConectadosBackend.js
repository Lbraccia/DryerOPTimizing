async function FiltrarNodosConectadosBackend(dataFiltrarNode){

    // Permite filtar los nodos conecados a un nodo
    document.body.style.cursor = 'wait';
    const urlFiltrarNodo = 'http://127.0.0.1:8000/DGridDesign/v1.0.0/Nodo/Nodos_conectados/';

    /* dataFiltrarNode = {
        idred: 1, // Id de la red
        idNodo: 2, // Nodo al que se le quiere ver las conexiones
        idNodo request.data.get('idNodo', None)
        tipos_nodos: 2 #Se pueden ingresar varios separados por &
        tipo_line: 'B' #Se pueden ingresar varios separados por &
        fields: request.data.get('fields', None)

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

/*         console.log("Respuesta Correcta");
        console.log("Respuesta:", data);  */
        document.body.style.cursor = 'default';
        return data; // Retorna los datos si quieres usarlos en otra parte del código
    } catch (error) {
        console.error("Error:", error);
        document.body.style.cursor = 'default';
        throw error; // Lanza el error para que el código que llama a esta función pueda manejarlo si es necesario
    }
}
