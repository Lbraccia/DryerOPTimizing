function CrearObjetoClick(e) {

// Acciones dentro del framework Generadas desde el menú
    
    objetoClick = e.target.parentNode.parentNode;
    frameworkBox.addEventListener("click", capturarPosicion);
    frameworkBox.style.cursor = "copy";
    Mensajes.style.visibility = "visible";
    Mensajes.style.opacity = "1";
    // Le doy estilo a el div de mensajes
    // Incorporo información de acuerdo al tipo de objeto agregado
    if (objetoClick.id === "I1"){
        // Si el objeto arrastrado es un nodo lo creo
        var Mensaje = "Node Creation Enabled "
        Mensajes.children[0].innerText = Mensaje; 
        Mensajes.style.backgroundColor = "rgb(168,199, 250)";
        Mensajes.children[1].style.backgroundColor = "#4285f4";

    } else if(objetoClick.id === "I2") {
        // Si el objeto arrastrardo es un generación tipo 1 la creo
        var Mensaje = "Solar Energy Creation Enabled "
        Mensajes.children[0].innerText = Mensaje; 
        Mensajes.style.backgroundColor = "rgb(199, 187, 241)";
        Mensajes.children[1].style.backgroundColor = "#9929f5";


    } else if(objetoClick.id === "I3") {
        // Si el objeto arrastrardo es un generación tipo 2 la creo
        var Mensaje = "Win Energy Creation Enabled "
        Mensajes.children[0].innerText = Mensaje; 
        Mensajes.style.backgroundColor = "rgb(255, 200, 224)";
        Mensajes.children[1].style.backgroundColor = "#D1388F";
      
    } else if(objetoClick.id === "I4") {
        // Si el objeto arrastrardo es un generación tipo 3 la creo
        var Mensaje = "Storage Creation Enabled "
        Mensajes.children[0].innerText = Mensaje; 
        Mensajes.style.backgroundColor = "rgb(189, 237, 186)";
        Mensajes.children[1].style.backgroundColor = "#8abb88";

    } else if(objetoClick.id === "I5") {
        // Si el objeto arrastrardo es una carga 
        var Mensaje = "Load Creation Enabled "
        Mensajes.children[0].innerText = Mensaje;  
        Mensajes.style.backgroundColor = "rgb(255, 254, 176)";
        Mensajes.children[1].style.backgroundColor = "#fbbc05";
        
    } else if(objetoClick.id === "I6") {
        // Si el objeto arrastrardo es una fuente 
        var Mensaje = "Load Creation Enabled "
        Mensajes.children[0].innerText = Mensaje; 
        Mensajes.style.backgroundColor = "rgb(255, 214, 176)";
        Mensajes.children[1].style.backgroundColor = "#f65314";

    } else if(objetoClick.id === "I7") {
        // Si el objeto arrastrardo es una fuente 
        var Mensaje = "Grid Creation Enabled "
        Mensajes.children[0].innerText = Mensaje; 
        Mensajes.style.backgroundColor = "#aaa6e5";
        Mensajes.children[1].style.backgroundColor = "#4e42f4";

    } else {

    }
}


// Función para capturar la posición del mouse en el siguiente clic
function capturarPosicion(e) {
   CrearObjeto(e)
   /* //Si quiero agregar un solo elemento
    frameworkBox.removeEventListener("click", capturarPosicion);
   frameworkBox.style.cursor = ""; 
   */

}

function StopCreation(){
   frameworkBox.removeEventListener("click", capturarPosicion);
   //frameworkBox.style.cursor = "grab"; 
   frameworkBox.style.cursor = "default";
   Mensajes.style.visibility = "hidden";
}