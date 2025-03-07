function mouseDownHandler(e) {
    if(FlagDrawingLine == false && e.shiftKey && FlagIsMoving == false){
        // Si no se está dibujando o moviendo una línea y si se aprieta el botón shift
        const mousePosition = getMousePosition(e);
        lineas = frameworkBox.getElementsByClassName('line');
        
        for (let i = 0; i < lineas.length; i++) {
            
            const lineStart = {x: parseFloat(lineas[i].getAttribute('x1')), y: parseFloat(lineas[i].getAttribute('y1')) };
            const lineEnd = {x: parseFloat(lineas[i].getAttribute('x2')), y: parseFloat(lineas[i].getAttribute('y2')) };
            const distToStart = distance(mousePosition, lineStart);
            const distToEnd = distance(mousePosition, lineEnd);

            
            classEvent = e.target.className
            // Si se hizo un click cerca del pin inicial o fina o en los botones iniciales o finales se mueve la linea
            if ( (distToStart < 15 &&  distToStart > 0) || classEvent == 'pinLineIni' ) {
                selectedElement = lineStart;
                selectedPoint = 'start';
                selectedLine = lineas[i];
                FlagIsMoving = true;
            } else if ( (distToEnd < 15 &&  distToStart > 0) || classEvent == 'pinLineEnd') {
                selectedElement = lineEnd;
                selectedPoint = 'end';
                selectedLine = lineas[i];
                FlagIsMoving = true;
            } else if(classEvent == 'button1Ini'){
                selectedElement = lineStart;
                selectedPoint = 'start';
                FlagIsMoving = true;
            } else if(classEvent == 'button1End'){
                selectedElement = lineEnd;
                selectedPoint = 'end';
                FlagIsMoving = true;
            }
 

        }

        offset = getMousePosition(e);

    } 
}


function mouseMoveHandler(e) {
    /* console.log("FlagDrawingLine", FlagDrawingLine) */
    if (FlagDrawingLine == false && selectedElement != null){
        // Si no se está dibujando
        /* console.log("selectedElement", selectedElement) */
        // Si se selecciono un elemento o una linea
        if (selectedElement && selectedLine) {
            e.preventDefault();
            const newPosition = getMousePosition(e);
            //const dx = newPosition.x - offset.x;
            //const dy = newPosition.y - offset.y;
            frameworkBox.style.cursor = "grabbing"
            selectedElement.x = newPosition.x;
            selectedElement.y = newPosition.y; 
            /* selectedElement.x += dx;
            selectedElement.y += dy; */
            
            if (selectedPoint === 'start') {
                endX = selectedLine.getAttribute('x2');
                endY= selectedLine.getAttribute('y2');

                let startXini = selectedLine.getAttribute('startX');
                let startYini = selectedLine.getAttribute('startY');

                diffX = selectedElement.x - endX;
                diffY = selectedElement.y - endY;

                startX = selectedElement.x - 10*Math.sign(diffX);
                startY = selectedElement.y - 10*Math.sign(diffY);

                // Actualizo los nuevos valores 
                // Calcular la nueva longitud y el nuevo ángulo 
                length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
                angle = (Math.atan2(endY - startY, endX - startX) - 2 * Math.PI ) ;

                // Creo la linea desde los puntos de inicio a los puntos finales
                
                selectedLine.style.left = parseFloat(startX)  + "px";
                selectedLine.style.top = parseFloat(startY)  + "px";
                selectedLine.style.width = `${length}px`;
                selectedLine.style.height = WidthLine + "px"; // Grosor de la línea
                selectedLine.style.transformOrigin= 'top left';

                selectedLine.style.transform = `rotate(${angle}rad)`;
                
                selectedLine.setAttribute('x1', selectedElement.x);
                selectedLine.setAttribute('y1', selectedElement.y);

            } else if (selectedPoint === 'end') {
                console.log(selectedLine)
                startX = selectedLine.getAttribute('x1');
                startY = selectedLine.getAttribute('y1');

                diffX = selectedElement.x - startX;
                diffY = selectedElement.y - startY;

                endX = selectedElement.x - 10*Math.sign(diffX);
                endY = selectedElement.y - 10*Math.sign(diffY);

                // Calcular la nueva longitud y el nuevo ángulo 
                var length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
                var angle = Math.atan2(endY - startY, endX - startX);
                
                // Creo la linea desde los puntos de inicio a los puntos finales
                selectedLine.style.width = `${length}px`;
                selectedLine.style.height = WidthLine + "px"; // Grosor de la línea
                selectedLine.style.transformOrigin= 'top left';
                selectedLine.style.transform = `rotate(${angle}rad)`;
                
                selectedLine.setAttribute('x2', endX);
                selectedLine.setAttribute('y2', endY);
            }

            offset = newPosition;
        }
    }
}


function mouseDownHandlerIni(e) {
    frameworkBox.addEventListener('mousedown', mouseDownHandler);
    frameworkBox.addEventListener('mousemove', mouseMoveHandler);
}

function mouseDownHandlerEnd(e) {
    if(!FlagIsMoving){
        frameworkBox.removeEventListener('mousedown', mouseDownHandler);
        frameworkBox.removeEventListener('mousemove', mouseMoveHandler);
    }
}



function PinChange(event) {

    //if (FlagDrawingLine==false){
        // se está moviendo una linea
        FlagIsMoving = true;
        Deselection()
        // Obtengo el nuevo pin 
        let pinNew = event.target; 

        // Las propiedades de la línea que se selecciona están en MoverLine.js
        frameworkBox = document.getElementById("framework");
        rectpinNew = pinNew.getBoundingClientRect();
        rectFramework = frameworkBox.getBoundingClientRect();
        // Modifico la conexión de acuerdo a si es la entrada o la salida
        if (selectedPoint === 'start') {
            // Si es la entrada
            startX = parseInt(rectpinNew.left) + (rectpinNew.width / 2)- rectFramework.left;
            startY = parseInt(rectpinNew.top) + (rectpinNew.height / 2) - rectFramework.top;
            newNode = pinNew.parentNode.parentNode.id;

            // Tomo la fuente y el receptor original de la linea
            source = selectedLine.getAttribute("Source");
            receptor = selectedLine.getAttribute("Receptor");
            // Verifico si existe una linea que conecta los nodos distinta a la linea actual (Frontend)
            flagExist = CheckExistenciaFrontend(Line, newNode, receptor, selectedLine) 
            if (newNode != receptor && flagExist == false){

                // Si el nuevo pin seleccionado es diferente a el mismo (no se puede conectar con el mismo nodo)

                // Elimino los colores de los pines que no tienen conexiones
                // Id del pin 
                pinIdIni = selectedLine.getAttribute("pinIdIni");
                LineName = selectedLine.getAttribute('LineName');
                // Quito una linea al pin y manejo el color de los pines (En el nodo original)
                HandlePinConection(frameworkBox, source, pinIdIni)

                // Actualizo los nuevos valores 
                // Calcular la nueva longitud y el nuevo ángulo 
                length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
                angle = (Math.atan2(endY - startY, endX - startX) - 2 * Math.PI ) ;
  
                // Calculo la longitud y latitud de los puntos iniciales y finales
                Startpoint = [startX, startY];
                var StartlatLng = map.containerPointToLatLng(Startpoint);
                
                // Creo la linea desde los puntos de inicio a los puntos finales
                selectedLine.style.left = parseFloat(startX)  + "px";
                selectedLine.style.top = parseFloat(startY)  + "px";
                selectedLine.style.width = `${length}px`;
                selectedLine.style.height = WidthLine + "px"; // Grosor de la línea
                selectedLine.style.transformOrigin= 'top left';

                selectedLine.style.transform = `rotate(${angle}rad)`;

                //selectedLine.style.left = parseFloat(startX) + "px";
                //selectedLine.style.top = parseFloat(startY) + "px";

                selectedLine.setAttribute('x1', startX);
                selectedLine.setAttribute('y1', startY);
                selectedLine.setAttribute("Source", newNode);
                selectedLine.setAttribute("pinIdIni", pinNew.id);
                selectedLine.setAttribute('x1Original', startX);
                selectedLine.setAttribute('y1Original', startY);
                selectedLine.setAttribute('StartLat', StartlatLng.lat);
                selectedLine.setAttribute('StartLng', StartlatLng.lng);
                
                pinNew.style.backgroundColor = SelectedPinColor;

                // Agrego una linea al nuevo pin
                NLineInPin = pinNew.getAttribute("NLineInPin") 
                NLineInPin ++;
                pinNew.setAttribute("NLineInPin", NLineInPin) 

                //Actualizo las lineas 
                //lineas = svg.querySelectorAll('line');
                lineas = frameworkBox.getElementsByClassName('line');

                // Modifico los de la clase Line
                // En el Frontend
                Line.forEach(eline =>{
                    if("L" + eline.NL == selectedLine.id){
                        eline.s = newNode 
                    }
                });

                var dataChangeLine = {
                    idredOriginal: idredValue,
                    nombreOriginal: LineName, 
                    startXNew: startX,
                    startYNew: startY,
                    pinIdIniNew: pinNew.id,
                    x1OriginalNew: startX,
                    y1OriginalNew: startY,
                    StartLatNew: StartlatLng.lat, 
                    StartLngNew: StartlatLng.lng,
                    sourceNew: newNode,
                }

                CambiarLineaBackend(dataChangeLine)
                
                // Elimino la selección y vuelvo a colocar la bandera FlagIsMoving como False
                selectedElement = null;
                selectedPoint = null;
                selectedLine = null;
                FlagIsMoving = false;
                frameworkBox.style.cursor = "";
            }

        } else if (selectedPoint === 'end') {

            // Si es la salida
            let endX = parseInt(rectpinNew.left) + (rectpinNew.width / 2)- rectFramework.left;
            let endY = parseInt(rectpinNew.top) + (rectpinNew.height / 2) - rectFramework.top;
            let newNode = pinNew.parentNode.parentNode.id;
            
            // Tomo la fuente y el receptor original de la linea
            source = selectedLine.getAttribute("Source");
            receptor = selectedLine.getAttribute("Receptor");
            LineName = selectedLine.getAttribute('LineName');

            flagExist = CheckExistenciaFrontend(Line, source, newNode, selectedLine) 

            if ( newNode != source && flagExist == false){
                // Si el nuevo pin seleccionado es diferente a el mimso (no se puede conectar con el mismo nodo)
                // Elimino los colores de los pines que no tienen conexiones
                // Id del pin 
                pinIdEnd = selectedLine.getAttribute("pinIdEnd");

                // Quito una linea al pin y manejo el color de los pines (En el nodo original)
                HandlePinConection(frameworkBox, receptor, pinIdEnd)

                // Actualizo los nuevos valores 
                // Calcular la nueva longitud y el nuevo ángulo 
                var length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
                var angle = Math.atan2(endY - startY, endX - startX);

                // Calculo la longitud y latitud de los puntos iniciales y finales
                Endpoint = [endX, endY];
                var EndlatLng = map.containerPointToLatLng(Endpoint);

                // Creo la linea desde los puntos de inicio a los puntos finales

                selectedLine.style.width = `${length}px`;
                selectedLine.style.height = WidthLine + "px"; // Grosor de la línea
                selectedLine.style.transform = `rotate(${angle}rad)`;
                selectedLine.style.transformOrigin= 'top left';
                selectedLine.setAttribute('x2', endX);
                selectedLine.setAttribute('y2', endY);
                selectedLine.setAttribute("Receptor", newNode);
                selectedLine.setAttribute("pinIdEnd", pinNew.id);
                selectedLine.setAttribute('x2Original', endX);
                selectedLine.setAttribute('y2Original', endY);
                selectedLine.setAttribute('EndLat', EndlatLng.lat);
                selectedLine.setAttribute('EndLng', EndlatLng.lng);

                pinNew.style.backgroundColor = SelectedPinColor;

                // Agrego una linea al nuevo pin
                NLineInPin = pinNew.getAttribute("NLineInPin") 
                NLineInPin ++;
                pinNew.setAttribute("NLineInPin", NLineInPin) 

                //Actualizo las lineas 
                //lineas = svg.querySelectorAll('line');
                lineas = frameworkBox.getElementsByClassName('line');
                // Modifico los de la clase Line    
                // En el Frontend
                Line.forEach(eline =>{
                    if("L" + eline.NL == selectedLine.id){
                        eline.r = newNode 
                    }
                });

                // En el Backend
                
                var dataChangeLine = {
                    idredOriginal: idredValue,
                    nombreOriginal: parseInt(LineName),
                    idredNew: idredValue,
                    endXNew: endX,
                    endYNew: endY,
                    pinIdEndNew: pinNew.id,
                    x2OriginalNew: endX,
                    y2OriginalNew: endY,
                    EndLatNew: EndlatLng.lat, 
                    EndLngNew: EndlatLng.lng,
                    receptorNew: newNode
                }

                CambiarLineaBackend(dataChangeLine)
    
                // Elimino la selección y vuelvo a colocar la bandera FlagIsMoving como False
                selectedElement = null;
                selectedPoint = null;
                selectedLine = null;
                FlagIsMoving = false;
                frameworkBox.style.cursor = "";

            }

                
        }

    mouseDownHandlerEnd(event)
    //}
    
}

function distance(point1, point2) {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
}


// Obtengo la posición del mouse
function getMousePosition(e) {
    const rect = frameworkBox.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

/* 
// Manejo de la forma del mouse cuando se esta cerca de mover una linea
document.addEventListener()
function MouseStyleHandler(){
    // Si no se está dibujando o moviendo una línea y si se aprieta el botón shift
    const mousePosition = getMousePosition(e);
    lineas = frameworkBox.getElementsByClassName('line');
    for (let i = 0; i < lineas.length; i++) {
        
        const lineStart = {x: parseFloat(lineas[i].getAttribute('x1')), y: parseFloat(lineas[i].getAttribute('y1')) };
        const lineEnd = {x: parseFloat(lineas[i].getAttribute('x2')), y: parseFloat(lineas[i].getAttribute('y2')) };
        const distToStart = distance(mousePosition, lineStart);
        const distToEnd = distance(mousePosition, lineEnd);

        if (distToStart < 20) {
            selectedElement = lineStart;
            selectedPoint = 'start';
            selectedLine = lineas[i];
            FlagIsMoving = true;
        } else if (distToEnd < 20) {
            selectedElement = lineEnd;
            selectedPoint = 'end';
            selectedLine = lineas[i];
            FlagIsMoving = true;
        }
    }
}

 */
// Agrego evento al svg
//svg.addEventListener('mousedown', mouseDownHandler);
//svg.addEventListener('mousemove', mouseMoveHandler);
//if (lineas != null){

//}
