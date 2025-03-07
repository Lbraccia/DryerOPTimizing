
frameworkBox.addEventListener('mousedown', function(event) {
    // Verificamos que boton se apretó
    switch (event.button) {
        case 0:
            isClickDerecho = true;
            //console.log("Click derecho");
            break;
        case 1:
            isClickMedio = true;
            map.dragging.enable(); 
            //console.log("Click del medio");
            break;
        case 2:
            isClickIzquierdo = true;
            //console.log("Click izquierdo");
            break;
        default:
            console.log("Otro botón del ratón");
    }

    // Si se hizo un click derecho
    if(isClickDerecho){
        // Verificamos si la tecla shift está apretada - No se puede seleccionar
        if (FlagShift == false && FlagOpenLock == false && FlagIsMoving == false) {
            rectFramework = frameworkBox.getBoundingClientRect();
            var mouseX = event.clientX - rectFramework.left;
            var mouseY = event.clientY - rectFramework.top;

            if (selectedElements.length == 0 && selectedLines.length == 0){
                FlagSelected = false
            } 

            let eventTarget = event.target;
            // Se agrega el siguiente if porque al seleccionar un nodo me está apuntando al pin y no al div padre
            if( eventTarget.parentNode.parentNode.getAttribute("type") != "Node"){
                eventTarget = event.target;
            } else {
                eventTarget = eventTarget.parentNode.parentNode;
            }
            
            // Si no hay elementos seleccionados
            if (FlagSelected == false){
                // Se hace un clicl sobre algo diferente a un objeto o una linea
                if(!eventTarget.classList.contains('objeto') && !eventTarget.classList.contains('line') ){
                    // Se comienza la selección
                    FlagDragging = true; // Se comienza el Draggin de la selección
                    // Tomo la posición del draggeo del mouse
                    dragStartX = mouseX;
                    dragStartY = mouseY;

                } // Se hace click sobre un objeto .classList.contains('objeto')
                else if (eventTarget.classList.contains('objeto')){
                    // Selección
                    // Si hago click en un unico nodo pero no hay nada seleccionado previamente
                    selectedElements.push(eventTarget)

                    // Cambio el color del nodo al de Selección
                    eventTarget.style.border = SelectionWidth + "px solid " + SelectionColor;
                    FlagSelected = true; // Se seleccionó un elemnto
                    selectedElementsAnterior = selectedElements;

                    // Si todos los elementos fueron seleccionados coloco el boton de selección como deseleccionar
                    if (objectsInFramework.length == selectedElements.length){
                        SelectButtonImg.src = "Img/Icons/deselect.svg"
                        SelectButtonText.textContent = "Deselect All"
                    } else {
                        SelectButtonImg.src = "Img/Icons/select.svg"
                        SelectButtonText.textContent = "Select All"
                    }

                } // Se hace un click sobre una linea 
                else if (eventTarget.classList.contains('line')){
                    // Selección
                    // Si hago click en una sola linea pero no hay nada seleccionado previamente
                    // Cambio el color de la línea al de Selección
                    /* eventTarget.style.height = `${SelectionWidth}px`;
                    eventTarget.style.backgroundColor = ColorStrokeSelectionRectangle;
                    eventTarget.style.opacity = "1"; // Define la opacidad del trazo */
                    
                    eventTarget.classList.add('selection-line')
                    eventTarget.style.setProperty("--selection-width", `${SelectionWidth}px`);
                    eventTarget.style.setProperty("--selection-color", ColorStrokeSelectionRectangle);

                    FlagSelected = true; // Se seleccionó un elemnto
                    selectedLines.push(eventTarget)
                    
                }

            } else {
                // Deselecciono los elementos
                if (eventTarget.classList.contains('objeto')){
                    // si selecciono un objeto
                    if(selectedElements.includes(eventTarget)){
                        //si el objeto que cliqueo es el mismo no hago nada
                    } else{
                        // si el objeto que cliqeo no es el mismo 
                        // Deselecciono los elementos
                        Deselection()    
                    }
                } else {
                    // Deselecciono los elementos
                    Deselection()    

                }
            }
        } 
    }
})

// Permite Agregar los elementos dentro de la selección en las matrices de selección
frameworkBox.addEventListener('mousemove', function(event) {
    // Si se hizo un click del medio
    if(isClickMedio){
       map.dragging.enable();         
    }

    // Si se hizo un click derecho
    if(isClickDerecho){
        map.dragging.disable()
        if (FlagDragging == true && FlagDraggingSelection == false) {
            // Tomo el elemento svg
            //svg = document.getElementById('SVGframework');
            // Tomos los limites del framework y la posición del mouse respecto a este
            rectFramework = frameworkBox.getBoundingClientRect();
            var dragEndX = event.clientX - rectFramework.left ;
            var dragEndY = event.clientY - rectFramework.top ;

            // Dibujo el rectangulo de selección
            //drawSelectionRectangle(svg, dragStartX, dragStartY, dragEndX, dragEndY);
            drawSelectionRectangle(framework, dragStartX, dragStartY, dragEndX, dragEndY);

            // -------------- Objetos ----------------------
            // Verifico los objetos que estan en el interior de la selección
            //objectsInFramework = svg.parentNode.getElementsByClassName("objeto");
            objectsInFramework = frameworkBox.getElementsByClassName("objeto");
            
            for (let i = 0; i < objectsInFramework.length; i++) {
                let position = objectsInFramework[i].getBoundingClientRect();
                x = position.left - rectFramework.left; 
                y = position.top - rectFramework.top ; 
                width = position.width;
                height = position.height;
                // Chequeo si el elemento está dentro del cuadrado de selección
                isInside = checkObjectInside(x, y, height, width, dragStartX, dragStartY, dragEndX, dragEndY)

                if (isInside){
                    // Si está dentro de la seleeción
                    // Verifico si ya se seleccionó está dentro de la matriz de elementos seleccionados
                    if (selectedElements.includes(objectsInFramework[i])){

                    } else {
                        // Si no está incluida en la matriz de selección lo incluyo
                        selectedElements.push(objectsInFramework[i])
                        objectsInFramework[i].style.border = SelectionWidth + "px solid " + SelectionColor;
                    }
                } else {
                    // Si se seleccionó anteriormente pero ahora no está en su interior lo tengo que sacar de la matriz de selección
                    if (selectedElements.includes(objectsInFramework[i])){
                        // Indice donde se ubica el elemento
                        const indice = selectedElements.indexOf(objectsInFramework[i])
                        // Quito el elemento
                        selectedElements.splice(indice, 1); 
                        // Cambio el color del elemento al color normal
                        objectsInFramework[i].style.border = WidthNode + "px solid " + ColorNode;
                    }
                }
            }

            // Si todos los elementos fueron seleccionados coloco el boton de selección como deseleccionar
            if (objectsInFramework.length == selectedElements.length && selectedElements.length != 0){
                SelectButtonImg.src = "Img/Icons/deselect.svg"
                SelectButtonText.textContent = "Deselect All"
            } else {
                SelectButtonImg.src = "Img/Icons/select.svg"
                SelectButtonText.textContent = "Select All"
            }


            // Ordeno selectedElements de manera que las cargas estén primero (Ya que sino los nodos asociados a las cargas no se borran)
            // Ordena los elementos en selectedElements
/*             selectedElements.sort(function(a, b) {
                let typeA = a.getAttribute("type");
                let typeB = b.getAttribute("type");
               
                // Si el type es "Load" o Source, debe aparecer antes
                if ( (typeA === "Load" && typeB !== "Load") || (typeA === 'S' && typeB !== "S") ) {
                    return -1; // a antes que b
                } else if ( (typeA !== "Load" && typeA !== "S") && (typeB === "Load" || typeB === "Load" )) {
                    return 1; // b antes que a
                } else {
                    return 0; // no cambiar el orden si ambos son iguales
                }
            }); */

            // Ordena los elementos en selectedElements
            selectedElements.sort(function(a, b) {
                let typeA = a.getAttribute("type");
                let typeB = b.getAttribute("type");

                // Compara las prioridades de los tipos
                let priorityA = getPriority(typeA);
                let priorityB = getPriority(typeB);

                // Ordena según la prioridad
                return priorityA - priorityB;
            });



            // -------------- Lineas ----------------------
            // Verifico las lineas que estan en el interior de la selección 
            //lineas = svg.querySelectorAll('line');
            lineas = frameworkBox.getElementsByClassName('line');
            for (let i = 0; i < lineas.length; i++) {
                x1 = lineas[i].getAttribute('x1'); 
                x2 = lineas[i].getAttribute('x2'); 
                y1 = lineas[i].getAttribute('y1'); 
                y2 = lineas[i].getAttribute('y2'); 
                // Chequeo si la línea está dentro del cuadrado de selección
                isInside = checkLineInside(x1, y1, x2, y2, dragStartX, dragStartY, dragEndX, dragEndY)
                if (isInside){
                    // Si está dentro de la seleeción
                    // Vericifo si la linea ya fue seleccionada - Está adentro de la matriz de lineas seleccionadas
                    if (selectedLines.includes(lineas[i])){

                    } else {
                        // Si no está incluida en la matriz de selección incluyo la linea
                        selectedLines.push(lineas[i])
                        //lineas[i].style.height = `${SelectionWidth}px`;
                        //lineas[i].style.backgroundColor = ColorStrokeSelectionRectangle;
                        //lineas[i].style.opacity = "1"; // Define la opacidad del trazo
                        lineas[i].classList.add('selection-line')
                        lineas[i].style.setProperty("--selection-width", `${SelectionWidth}px`);
                        lineas[i].style.setProperty("--selection-color", ColorStrokeSelectionRectangle);
                    }
                } else {
                    // Si se seleccionó anteriormente pero ahora no está en su interior
                    if (selectedLines.includes(lineas[i])){
                        // Indice donde se ubica el elemento
                        const indice = selectedLines.indexOf(lineas[i])
                        // Quito la linea de la matriz de selección
                        selectedLines.splice(indice, 1); 
                        // Cambio el color de la línea al color normal
                        lineas[i].style.height = `${WidthLine}px`;
                        lineas[i].style.backgroundColor = ColorLine;
                        lineas[i].style.opacity = "1"; // Define la opacidad del trazo
                    }
                }
            } 

            selectedLinesAnterior = selectedLines; // Elementos seleccionados en el click anterior
            selectedElementsAnterior = selectedElements; // Elementos seleccionados en el click anterior

            // Verificamos si hay elementos seleccionados
            if (selectedLines != null && selectedElements != null){
                FlagSelected = true;
            } else {
                FlagSelected = false;
            }
            
        }
    }
});

// Asigna prioridad a cada tipo
function getPriority(type) {
    if (type === "Load") return 1;
    if (type === "S") return 2;
    return 3; // El resto de tipos tiene menor prioridad
}

// Permite quitar el rectangulo de selección del svg al levantar el mouse
frameworkBox.addEventListener('mouseup', function(event) {
    if(FlagDraggingSelection == false){
        FlagDragging = false; // Coloco la bandera a false (Se terminó el Dragging)
        SelectionRectangle = null; 
        //Childrens = svg.childNodes;
        Childrens = frameworkBox.childNodes;
        for (let i = 0; i < Childrens.length; i++) {
            if (Childrens[i].id == "rectanguloSeleccion"){
                Childrens[i].remove();
            }
        }
    }

    // Vuelvo a poner las banderas de los eventos del click en false
    isClickIzquierdo = false;
    isClickMedio = false;
    isClickDerecho = false; 
    

});

// Permite crear el rectángulo de selección y añadirlo al svg
function drawSelectionRectangle(framework, startX, startY, endX, endY) {
    // Crear un nuevo elemento framework "rect"
    if (SelectionRectangle == null){
        //SelectionRectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        SelectionRectangle = document.createElement('div');
        // Agregar el rectángulo al elemento Framework
        framework.appendChild(SelectionRectangle);
      
    }
    var x = Math.min(startX, endX);
    var y = Math.min(startY, endY);
    var width = Math.abs(endX - startX);
    var height = Math.abs(endY - startY);

    SelectionRectangle.style.position = "absolute";
    SelectionRectangle.style.left = parseFloat(x) + "px";
    SelectionRectangle.style.top = parseFloat(y) + "px";
    SelectionRectangle.style.width = parseFloat(width) + "px";
    SelectionRectangle.style.height = parseFloat(height) + "px";

    SelectionRectangle.style.backgroundColor =  ColorSelectionRectangle;
    SelectionRectangle.style.borderWidth =  WidthSelectionRectangle + "px";
    SelectionRectangle.style.opacity = OpacitySelectionRectangle;
    SelectionRectangle.style.border = `2px solid ${ColorStrokeSelectionRectangle}`; //String(ColorStrokeSelectionRectangle); 
    
    SelectionRectangle.id = "rectanguloSeleccion";
    
    framework.style.zIndex = 1;

  }
  

  // Función que verifica si un Objeto está dentro de la selección
  function checkObjectInside(x, y, width, height, dragStartX, dragStartY, dragEndX, dragEndY) {
    // Selección Basada en el centro del objeto
    const xLeft = x - width/2;
    const yBottom = y - height/2;
    const xRight = x + width/2;
    const yTop =  y + height/2;
    const xLB = Math.min(dragStartX, dragEndX)
    const xUB = Math.max(dragStartX, dragEndX)
    const yLB = Math.min(dragStartY, dragEndY)
    const yUB = Math.max(dragStartY, dragEndY)

    // Considerando solo el centro
    //return x > Math.min(dragStartX, dragEndX) && x < Math.max(dragStartX, dragEndX) && y > Math.min(dragStartY, dragEndY) && y < Math.max(dragStartY, dragEndY);
    
    // Considerando los limites de la caja que encierra al objeto
    if ( xLeft >  xLB &&  xLeft < xUB &&
         xRight >  xLB &&  xRight < xUB &&
         yBottom >  yLB &&  yBottom < yUB &&
         yTop >  yLB &&  yTop < yUB  ){
            return true;
         } else {
            return false;
         }
    // Considerando la diagonal

}

// Función que verifica si un Objeto está dentro de la selección
function checkLineInside(x1, y1, x2, y2, dragStartX, dragStartY, dragEndX, dragEndY) {
    // Selección Basada en los extremos de la linea
    if (x1 >  Math.min(dragStartX, dragEndX) &&  x1 < Math.max(dragStartX, dragEndX) &&
    x2 >  Math.min(dragStartX, dragEndX) &&  x2 < Math.max(dragStartX, dragEndX) &&
    y1 >  Math.min(dragStartY, dragEndY) &&  y1 < Math.max(dragStartY, dragEndY) &&
    y2 >  Math.min(dragStartY, dragEndY) &&  y2 < Math.max(dragStartY, dragEndY) ){
        return true;
    } else {
       return false;
    }
   
}
    


  