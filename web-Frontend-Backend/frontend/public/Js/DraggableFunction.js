function DraggableFunction(){
    // Función para establecer que los elementos sean draggleables

    selected.draggable = true;
    // Nombre de los nodos   
    //selected.textContent = NodeName; 

    // Agrego evento de arrastre al nodo
    selected.addEventListener('dragstart', function(event) {       
        // Si hay elementos seleccionados
        if (selectedElements.length != 0) {
        
            // Tomo el elemento de referencia para calcular la posición del resto de los elementos seleccionados
            // Este elemento es el que se hace click para arrastrar
            let objetoSeleccionadoClick = event.target
            FlagDraggingSelection = false
            // Chequeo si el elemtno seleccionado es uno de los que se toma como referencia para arrastrar
            selectedElements.forEach(objetoSeleccionado => {
                if(objetoSeleccionado.id == objetoSeleccionadoClick.id){
                    // Si el elemento tomado como referencia está denteo de los seleccionados entonces 
                    // Puedo continuar con el Dragging
                    FlagDraggingSelection =true;
                } 
            })

            //Si se puedo continuar empiezo con el arrastre
            if(FlagDraggingSelection){
                // Comienzo el arrastre
                event.dataTransfer.setDragImage(document.createElement('div'), 0, 0);
                FlagDraggingSelection = true;
                // Tengo que chequear si hago click sobre algun objeto dentro de los seleccionados

                // Tomo la Posicón del elemntos de refencia
                let xOriginalRef = parseFloat(objetoSeleccionadoClick.style.left);
                let yOriginalRef = parseFloat(objetoSeleccionadoClick.style.top); 
                // Calculo las posiciones relativas de los otros elementos seleccionados
                selectedElements.forEach(objetoSeleccionado => {
                    // Posición  de los elementos seleccionados
                    let xOriginal = parseFloat(objetoSeleccionado.style.left);
                    let yOriginal = parseFloat(objetoSeleccionado.style.top); 
                    // Calculo las posiciones relativas
                    let dxRef = xOriginalRef - xOriginal ; // Relación de posición entre El objeto arrastado y el objeto de referencia
                    let dyRef = yOriginalRef - yOriginal ; // Relación de posición entre El objeto arrastado y el objeto de referencia
                    // Agrego las posicones relativas como atributos a los objetos
                    objetoSeleccionado.setAttribute("dxRef", dxRef);
                    objetoSeleccionado.setAttribute("dyRef", dyRef);
                });
            }
        }
    });

    // Durante el arrastre
    selected.addEventListener('drag', function(event) {
        if(FlagDraggingSelection){
            // Arrastro los elementos
            Arrastrar(event, dxRef, dyRef)
        }
    });

    // Finalizo el arrastre
    selected.addEventListener('dragend', function(event) {
        //Elimino los atributos de referencia para los elementos seleccionados
        selectedElements.forEach(objetoSeleccionado => {
            objetoSeleccionado.removeAttribute("dxRef");
            objetoSeleccionado.removeAttribute("dyRef");

            var dataChangeNode = {
                idredOriginal: idredValue,
                idNodoOriginal: objetoSeleccionado.id,
                // Nuevos Valores
                xNew: parseFloat(objetoSeleccionado.style.left),
                yNew: parseFloat(objetoSeleccionado.style.top),
                latNew: parseFloat(objetoSeleccionado.getAttribute("cordX")),
                lngNew: parseFloat(objetoSeleccionado.getAttribute("cordY")),
            }

            CambiarNodoBackend(dataChangeNode)
        

            for (let i = 0; i < lineas.length; i++) {

                source = lineas[i].getAttribute("Source")
                receptor = lineas[i].getAttribute("Receptor")
    
                if(source == objetoSeleccionado.id){

                    nombre = lineas[i].getAttribute("linename")
                    var dataChangeLine = {
                        idredOriginal: idredValue,
                        nombreOriginal: nombre,
                        // Nuevos Valores
                        startXNew: lineas[i].getAttribute('startX'),
                        startYNew: lineas[i].getAttribute('startY'),
                        endXNew: lineas[i].getAttribute('endX'),
                        endYNew: lineas[i].getAttribute('endY'),
                        xPinLNew: lineas[i].getAttribute('xPinL'),
                        yPinTNew: lineas[i].getAttribute('yPinT'),
                        x1OriginalNew: lineas[i].getAttribute('startX'),
                        y1OriginalNew: lineas[i].getAttribute('startY'),
                        x2OriginalNew: lineas[i].getAttribute('endX'),
                        y2OriginalNew: lineas[i].getAttribute('endY'),
                        StartLatNew: lineas[i].getAttribute('StartLat'),
                        StartLngNew: lineas[i].getAttribute('StartLng'), 
                        EndLatNew: lineas[i].getAttribute('EndLat'), 
                        EndLngNew: lineas[i].getAttribute('EndLng'),
                    }
                    CambiarLineaBackend(dataChangeLine)
    
                } else if(receptor == objetoSeleccionado.id) {
                    nombre = lineas[i].getAttribute("linename")
                    var dataChangeLine = {
                        idredOriginal: idredValue,
                        nombreOriginal: nombre,
                        // Nuevos Valores
                        startXNew: lineas[i].getAttribute('startX'),
                        startYNew: lineas[i].getAttribute('startY'),
                        endXNew: lineas[i].getAttribute('endX'),
                        endYNew: lineas[i].getAttribute('endY'),
                        xPinLNew: lineas[i].getAttribute('xPinL'),
                        yPinTNew: lineas[i].getAttribute('yPinT'),
                        x1OriginalNew: lineas[i].getAttribute('startX'),
                        y1OriginalNew: lineas[i].getAttribute('startY'),
                        x2OriginalNew: lineas[i].getAttribute('endX'),
                        y2OriginalNew: lineas[i].getAttribute('endY'),
                        StartLatNew: lineas[i].getAttribute('StartLat'),
                        StartLngNew: lineas[i].getAttribute('StartLng'), 
                        EndLatNew: lineas[i].getAttribute('EndLat'), 
                        EndLngNew: lineas[i].getAttribute('EndLng'),
                    }
                    CambiarLineaBackend(dataChangeLine)   
                }
                
            }




        });
        FlagDraggingSelection = false;
    });

}