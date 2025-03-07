function VerticalMirror(){

    selectedElements.forEach(ElementoSeleccionado => {

        if(ElementoSeleccionado.getAttribute("type") != "Node" ){
            // Si el elemento no es un nodo
            if( ElementoSeleccionado.getAttribute("type") != "S"){
                // Si el elemento no es una fuente - Roto los pines y no las imagenes
                // Tomo el pin de conexión y lo muestro
                childrens =  ElementoSeleccionado.children[0]
                pinNew = childrens.children.P
                pinNew.style.display = "flex";

                // Obtener la transformación aplicada al elemento
                var transformacion = childrens.style.transform;
                var matriz = transformacion.match(/(-?[0-9.]+)/g);
                
                try {
                    angulo = matriz[0];
                } catch (error) {
                    angulo = 0;
                }

                angulo -= 180; // Incrementamos el ángulo en 90 grados cada vez que se llama a la función
                let angulo2 = -angulo; // Incrementamos el ángulo en 90 grados cada vez que se llama a la función
                if (angulo == -360){
                    angulo = 0
                }
               
                childrens.style.transform = "rotate(" + angulo + "deg)";
                childrens.children[1].style.transform = "rotate(" + angulo2 + "deg)";
                childrens.children[0].style.transform = "rotate(0deg)";

                // Al moverse el pin cambio el lugar de ubicación de la linea
                LineChangePin(ElementoSeleccionado, pinNew)

                //Cambio los valores en el backend 
                var newPosition = rotateElementPosition(angulo, originalLeft, originalTop);
                console.log("newPosition", newPosition)
                ElementoSeleccionado.setAttribute("xPinL", newPosition.left)
                ElementoSeleccionado.setAttribute("yPinT", newPosition.top)
                ElementoSeleccionado.setAttribute("angle", angulo)
                
                // Actualizo los valores en el backend
                var dataChangeNode = {
                    idredOriginal: idredValue,
                    idNodoOriginal: ElementoSeleccionado.id,
                    // Nuevos Valores
                    xPinLNew: String(newPosition.left),
                    yPinTNew: String(newPosition.top),
                    anguloPinNew: angulo,
                }
                //angulo2 no lo tengo que guardar?
                CambiarNodoBackend(dataChangeNode)

                }else{
                    // Si el elemento es una fuente - Roto los pines y las imagenes
                    // Tomo el pin de conexión y lo muestro
                    childrens =  ElementoSeleccionado.children[0]
                    pinNew = childrens.children.P
                    pinNew.style.display = "flex";

                    // Obtener la transformación aplicada al elemento
                    var transformacion = ElementoSeleccionado.style.transform;
                    var matriz = transformacion.match(/(-?[0-9.]+)/g);
                    
                    try {
                        angulo = matriz[0];
                    } catch (error) {
                        angulo = 0;
                    }

                    angulo -= 180; // Incrementamos el ángulo en 90 grados cada vez que se llama a la función
                    if (angulo == -360){
                        angulo = 0
                    }
                    ElementoSeleccionado.style.transform = "rotate(" + angulo + "deg)";
                    // Al moverse el pin cambio el lugar de ubicación de la linea
                    LineChangePin(ElementoSeleccionado, pinNew)

                    // Actualizo los valores en el backend
                    var dataChangeNode = {
                        idredOriginal: idredValue,
                        idNodoOriginal: ElementoSeleccionado.id,
                        // Nuevos Valores
                        anguloPinNew: angulo,
                    }
                    CambiarNodoBackend(dataChangeNode)
                    ElementoSeleccionado.setAttribute("angle", angulo)
                  
                }
        }
    })

}


