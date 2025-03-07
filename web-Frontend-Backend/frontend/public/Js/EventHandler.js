// Este Script no se usa
let HandleFlagCreateNode = false;
let HandleFlagDrawingLine= false;
let HandleFlagIsMoving = false; 

function EventHandler(event){

    if(FlagCreateNode){
        // Se está creando un objeto 
    HandleFlagCreateNode = true; // Se inicio el manejo de la creación de objetos


    } else if (FlagDrawingLine){

        // Se está dibujando una linea
        HandleFlagDrawingLine = true; // Se inicio el manejo del dibujo

        // Desactivo la posibilida de mover una linea y los hover de una linea
        //svg.removeEventListener('onmousedown', mouseDownHandler);
        //svg.removeEventListener('onmousemove', mouseMoveHandler);

        // Desactivo la posibilidad de abrir un popUp de una linea
        //linea.removeEventListener("ondblclick",  openPopupLine);
        // Desactivo la posibilida de Arrastrar un objeto 
        //linea.removeAttribute("ondragend", "Arrastrar(event)");

        //lineas.removeEventListener("mouseover", hoverLineIni);
        //lineas.removeEventListener("mouseout", hoverLineEnd);

        // Desactivo la posibilidad de abrir el popUp de un Nodo
        //objectsInFramework.removeAttribute("ondblclick", "openPopup(event)");

    } else if (FlagIsMoving){
        // Se está moviendo una linea
        HandleFlagIsMoving = true; // Se inicio el manejo del movimiento de la linea

    } else if (HandleFlagCreateNode){

        HandleFlagCreateNode = false; // Se finalizó el manejo de la creación de objetos 

    } else if (HandleFlagDrawingLine){

        HandleFlagDrawingLine = false; // Se finalizó el manejo del dibujo

    } else if (HandleFlagIsMoving){

        HandleFlagIsMoving = false; // Se finalizó el manejo del movimiento de la linea

    } else {
        
    }

}