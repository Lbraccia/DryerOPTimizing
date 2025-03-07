// Controles con la tecla esc
// Para deseleccionar con la tecla Esc
// IMPORTANTE VER!
document.addEventListener('keydown', function(event) {
    // Verificar si la tecla presionada es la tecla "Escape"
    if (event.key === 'Escape') {
        Esc()
    }
}); 


function Esc(){
        
        // Detener el evento
        /* event.preventDefault(); */
        frameworkBox.removeEventListener("click", capturarPosicion);
        frameworkBox.style.cursor = ""; 
        Mensajes.style.visibility = "hidden";

        //Para detener el evento si se está Moviendo una Linea 
        if(FlagIsMoving && selectedLine != null){
            // Detener el Evento de mover una linea 
            // Se está moviendo una linea
            startX = selectedLine.getAttribute('x1Original');
            startY = selectedLine.getAttribute('y1Original');
            endX = selectedLine.getAttribute('x2Original');
            endY = selectedLine.getAttribute('y2Original');
            
            // Hago que la recta vuelva a la posición original

            // Calcular longitud y ángulo Finales
            var length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
            var angle = Math.atan2(endY - startY, endX - startX);

            // Creo la linea desde los puntos de inicio a los puntos finales
            selectedLine.style.left = parseFloat(startX) + "px";
            selectedLine.style.top = parseFloat(startY) + "px";
            selectedLine.style.width = `${length}px`;
            selectedLine.style.transform = `rotate(${angle}rad)`;
            selectedLine.style.transformOrigin= 'top left';

            selectedLine.setAttribute('x1', startX);
            selectedLine.setAttribute('y1', startY);
            selectedLine.setAttribute('x2', endX);
            selectedLine.setAttribute('y2', endY);
            console.log(selectedLine.getAttribute('x1'))
            // Restauro todas las variables

            pinNew = null; 
            newNode = null; 
            newPosition = null; 
            selectedLine = null; 
            selectedPoint = null; 
            selectedElement = null; 
            startX = null; 
            startY = null;
            endX = null; 
            endY = null;
            source = null; 
            receptor = null; 
            flagExist = false; 
            pinIdIni = null; 
            pinIdEnd = null; 
            FlagIsMoving = false; 
/* 
            event.preventDefault();
            event.stopPropagation(); */

        } else{
            FlagIsMoving = false;
/*             event.preventDefault();
            event.stopPropagation(); */

        }

        //Para detener el evento si se está dibujando un Linea 
        if(FlagDrawingLine && NewLine != null){
            source = NewLine.getAttribute("Source");
            pinIdIni = NewLine.getAttribute("pinIdIni");
            HandlePinConection(frameworkBox, source, pinIdIni)
            frameworkBox.removeChild(NewLine);

            // Restauro todas las variables 
            FlagDrawingLine = false; 
            pinIni = null; 
            pinIdIni = null; 
            pinEnd = null; 
            pinIdEnd = null; 
            startXTemp = null;
            startYTemp = null; 
            startX = null;
            startY = null;  
            endX = null; 
            endY = null; 
            source = null; 
            receptor = null; 
            NewLine = null; 
            flagExist = false;

/*             event.preventDefault();
            event.stopPropagation(); */

        } else if (selectedElements.length != 0 || selectedLines.length != 0){
            // Deselecciono los elementos si hay seleccionados
            Deselection()
        }
        else {
            FlagDrawingLine = false;
/*             event.preventDefault();
            event.stopPropagation(); */

        }

        // Minimizo los popUps
        closePopupNode();
        closePopupLine();
        closePopupLoad();
        closePopupGenerations();
        closePopupGrid();
        closePopupParametros()
        closePopupLoadRed()

        // Para la función de nueva linea
        if(FlagNewLineFunction){
            FlagNewLineFunction = false;
            FlagShift = false; 
            frameworkBox.style.cursor = "";

            // Para ocultar los pines al soltar el cltr
            FlagShift = false; 
            // Vuevlo a ponerle el estilo original del cursor a los pines
            let pinEs= document.querySelectorAll('.pin');
            pinEs.forEach(pinE => {
                pinE.style.cursor= "grab";
                pinE.style.zIndex = -5;
                pinE.style.backgroundColor = ColorNode;
            });



        }

        


}