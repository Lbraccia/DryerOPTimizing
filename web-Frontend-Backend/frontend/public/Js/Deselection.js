// Permite deseleccionar elementos
function Deselection() {
    // Verifico si hay lineas o elementos seleccionados
    if(selectedElements.length != 0 || selectedLines.length != 0){
        // Cambio el color de los elementos y lineas al normal
        selectedElements.forEach(element => {
            element.style.border = WidthNode + "px solid " + ColorNode;

            // Oculto los pines salvo para el nodo
            if(element.getAttribute("type") != "Node" ){
                childrens =  element.children[0]
                pinNew = childrens.children.P
                pinNew.style.display = "none";
            }
        });
        
        selectedLines.forEach(element => {
           // element.style.height = `${WidthLine}px`;
           // element.style.backgroundColor = ColorLine;
           // element.style.opacity = "1"; // Define la opacidad del trazo
           element.classList.remove('selection-line');
        });
    }

    // Vuevlo a ponerle el estilo original del cursor a los pines
    let pinEs= document.querySelectorAll('.pin');
    pinEs.forEach(pinE => {
        pinE.style.cursor= "grab";
        pinE.style.zIndex = -5;
        pinE.style.backgroundColor = ColorNode;
    });



    // Volvemos a colocar el boton de Seleccion global para seleccionar
    SelectButtonImg.src = "Img/Icons/select.svg"
    SelectButtonText.textContent = "Select All"

                
    FlagSelected = false; // Coloco la bandera a false (No hay elementos seleccionados)
    // Limpio las matrices de selección
    selectedElements = [];
    selectedElementsAnterior = [];
    selectedLines = [];
    selectedLinesAnterior = [];
}