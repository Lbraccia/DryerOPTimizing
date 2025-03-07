// Eventos manejados con el click
document.addEventListener('click', function(event) {
    event.preventDefault();

    //Para Deseleccionar elementos seleccionados con click fuera del objeto y fuera del framework
    if (FlagSelected && FlagDraggingSelection == false){
        // Se hizo click por fuera o un objeto del menu
        if ((event.target.classList == "objeto" && event.target.getAttribute("NodeName") === null) || 
             (event.target.tagName != "svg" && event.target.tagName == "menuFramework")  ){
            // Deselecciono los elementos
            Deselection()
        } /* else if(event.target.id != idAnterior){
            // Deselecciono los elementos
            console.log("Entro")
            idAnterior = event.target.id
            Deselection();
           

        } */
    }

    //Para Minimizar el Popup de los Nodos
    if (event.target !== popupNode && popupNode.style.display== "flex"){
        // Verificar si el clic ocurrió fuera del área del popup
        if (event.target !== popupNode && !popupNode.contains(event.target) && 
            event.target !== popupStructure && !popupStructure.contains(event.target) && 
            event.target !== popupFigure && !popupFigure.contains(event.target)) {
            // Si el clic fue fuera del popup, minimizar el popup (ocultarlo, cerrarlo, etc.)
            // Cerrar el pop-up
            closePopupNode();
        }
    }

    //Para Minimizar el Popup de las Generaciones
    if (event.target !== popupGenerations && popupGenerations.style.display== "flex"){
        // Verificar si el clic ocurrió fuera del área del popup
        if (event.target !== popupGenerations && !popupGenerations.contains(event.target) && 
            event.target !== popupStructure && !popupStructure.contains(event.target) && 
            event.target !== popupFigure && !popupFigure.contains(event.target)) {
            // Si el clic fue fuera del popup, minimizar el popup (ocultarlo, cerrarlo, etc.)
            // Ver que guardar
            // Cerrar el pop-up
            closePopupGenerations();
        }
    }

        //Para Minimizar el Popup de las Cargas
        if (event.target !== popupLoad && popupLoad.style.display== "flex"){
            // Verificar si el clic ocurrió fuera del área del popup
            if (event.target !== popupLoad && !popupLoad.contains(event.target) && 
            event.target !== popupFigure && !popupFigure.contains(event.target)) {
                // Si el clic fue fuera del popup, minimizar el popup (ocultarlo, cerrarlo, etc.)
                actualizarLoad(event);
                // Cerrar el pop-up
                closePopupLoad();
            }
        }

    //Para Minimizar el Popup de las Lineas
    if (event.target !== popupLine && popupLine.style.display == "flex"){
        // Verificar si el clic ocurrió fuera del área del popup
        if (event.target !== popupLine && !popupLine.contains(event.target) && 
            event.target !== popupStructure && !popupStructure.contains(event.target) ) {
            // Si el clic fue fuera del popup, minimizar el popup (ocultarlo, cerrarlo, etc.)
            var iL = popupLine.getAttribute("i");
            var r = document.getElementById('R').value;
            var x = document.getElementById('X').value;
            var z = document.getElementById('Z').value;

            // Actualizar los datos del nodo
            Line[iL].R = r;
            Line[iL].X = x;
            Line[iL].Z = Math.sqrt(Math.pow(r,2) + Math.pow(x,2));

            // Cerrar el pop-up
            closePopupLine();
        }
    }

    //Para Minimizar el Popup de los Parámetros
    if (event.target !== popupParameters && popupParameters.style.display== "flex"){
        // Verificar si el clic ocurrió fuera del área del popup
        if (event.target !== popupParameters && !popupParameters.contains(event.target)) {
            // Si el clic fue fuera del popup, minimizar el popup (ocultarlo, cerrarlo, etc.)
            // Cerrar el pop-up
            closePopupParametros();
        }
    }

    //Para Minimizar el Popup de las redes
    if (event.target !== popupLoadRed && popupLoadRed.style.display == "flex"){
        // Verificar si el clic ocurrió fuera del área del popup
        if (event.target !== popupLoadRed && !popupLoadRed.contains(event.target)) {
            // Si el clic fue fuera del popup, minimizar el popup (ocultarlo, cerrarlo, etc.)
            // Cerrar el pop-up
            closePopupLoadRed();
        }
    }
    

    //Para Minimizar el Popup de las Grid
    if (event.target !== popupGrid && popupGrid.style.display == "flex"){
        // Verificar si el clic ocurrió fuera del área del popup
        if (event.target !== popupGrid && !popupGrid.contains(event.target) && 
            event.target !== popupFigure && !popupFigure.contains(event.target)) {
            // Si el clic fue fuera del popup, minimizar el popup (ocultarlo, cerrarlo, etc.)
            // Cerrar el pop-up
            closePopupGrid();
        }
    }

    
/*     //Para Minimizar el Popup de las Figuras
    if (event.target !== popupFigure && popupFigure.style.display == "block" && FlagPopUpFigure == true){
        // Verificar si el clic ocurrió fuera del área del popup
        
        if (event.target !== popupFigure && !popupFigure.contains(event.target)  && FlagPopUpFigure == true) {
            // Si el clic fue fuera del popup, minimizar el popup (ocultarlo, cerrarlo, etc.)
            // Cerrar el pop-up
            closePopupFigure()
        }
    } */
});

/* 
// Eventos manejados con el doble click
document.addEventListener('dblclick', function(event) {
    event.preventDefault(); // Opcional: previene el comportamiento predeterminado del doble clic
    console.log("Entro doble click");
    console.log("event.target.id: ", event.target.id)
    // Para Deseleccionar elementos seleccionados con doble click fuera del objeto y fuera del framework
    if (FlagSelected && FlagDraggingSelection == false) {
        // Se hizo doble click por fuera o un objeto del menu
        if ((event.target.classList == "objeto" && event.target.getAttribute("NodeName") === null) || 
             (event.target.tagName != "svg" && event.target.tagName == "menuFramework")) {
            // Deselecciono los elementos
            Deselection();
        } else if(event.target.id != idAnterior){
            // Deselecciono los elementos
            console.log("Entro")
            Deselection();
            idAnterior = event.target.id

        }
    }

}); */