function DrawingLine(event) {
    if (FlagIsMoving){
        //IMPORTANTE: Tengo que desactivar que se pueda volver a agarrar la linea
        // Función para cambiar los pines de las lineas
        PinChange(event) // En MoverLine.js

    } else if (!FlagIsMoving && FlagShift) {
        // Dibujo la linea
        DrawLine(event)
        
    }
}



// Función para dibuar Lineas
function DrawLine(event){
    if (FlagDrawingLine == false && FlagShift) {
        frameworkBox.style.cursor = "";
        // se comienza a dibujar
        FlagDrawingLine = true;
        startXTemp = null;
        startYTemp = null;  
        pinIni = event.target; // pin de inicio

        // Cambio el color del nodo
        pinIni.style.backgroundColor = SelectedPinColor;

        // Agrego el evento para mover el mapa cuando el mouse se aproxima a los bordes
       /*  document.getElementById('map').addEventListener('mousemove', adjustMapCenter); */

        // Se toman el framework, el svg y las medidas del pin
        frameworkBox = document.getElementById("framework");       
        rectpinIni = pinIni.getBoundingClientRect();
        rectFramework = frameworkBox.getBoundingClientRect();
        
        // Calculo la posición del pin del nodo 
        startX = parseFloat(rectpinIni.left)  - rectFramework.left  + rectpinIni.width/2
        startY = parseFloat(rectpinIni.top) - rectFramework.top  + rectpinIni.height/2

        // Calculo la longitud y latitud de los puntos iniciales y finales
        Startpoint = [startX, startY];
        var StartlatLng = map.containerPointToLatLng(Startpoint);


        // Obtengo el dato del nodo
        source = pinIni.parentNode.parentNode.id
        // obtengo el dato del pin
        pinIdIni = pinIni.id

        // Agrego una linea al pin
        NLineInPin = pinIni.getAttribute("NLineInPin") 
        NLineInPin ++;
        pinIni.setAttribute("NLineInPin", NLineInPin) 

        //NewLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        NewLine = document.createElement('div');
        frameworkBox.appendChild(NewLine);

        NewLine.className = "line";
        //NewLine.setAttribute('stroke', ColorLine);
        //NewLine.setAttribute('stroke-width', WidthLine);
        NewLine.setAttribute("Source", source);
        NewLine.setAttribute("pinIdIni", pinIdIni);
        NewLine.setAttribute("Receptor", "null");
        NewLine.setAttribute("pinIdEnd", "null");
        NewLine.setAttribute("startX", startX);
        NewLine.setAttribute("StartLat", StartlatLng.lat);
        NewLine.setAttribute("StartLng", StartlatLng.lng);
        NewLine.setAttribute("startY", startY);
        NewLine.setAttribute("endX", null);
        NewLine.setAttribute("endY", null);
        NewLine.setAttribute("EndLat",  null);
        NewLine.setAttribute("EndLng",  null);
        NewLine.style.left = parseFloat(startX) + "px";
        NewLine.style.top = parseFloat(startY) + "px";
        NewLine.style.backgroundColor = ColorLine;
        NewLine.style.zIndex = 10;
        
        NewLine.style.position = "absolute";

        NewLine.style.height = WidthLine;
    
        //NewLine.style.transform = `rotate(${angle}rad)`;

        startXTepm = startX;
        startYTemp = startY;


        frameworkBox.addEventListener('mousemove', ShowLine);


    } else {
        // se finaliza el dibujo
        pinEnd = event.target; // pin de llegada
        // Se toman el framework, el svg y las medidas del pin
        frameworkBox = document.getElementById("framework");
        //svg = document.getElementById('SVGframework');
        
        var rectpinEnd = pinEnd.getBoundingClientRect();
        rectFramework = frameworkBox.getBoundingClientRect();

        // Obtengo el dato del nodo
        receptor = pinEnd.parentNode.parentNode.id
        source = NewLine.getAttribute("Source");
        // obtengo el dato del pin
        pinIdEnd = pinEnd.id

        // En el Frontend
        flagExist = CheckExistenciaFrontend(Line, source, receptor, null)
        /* console.log(flagExist) */
        // Llamar a la función y manejar el resultado
        // Cheqeuo la existencia de la linea
        // En el backend
        var dataChequeoLine = {
            idred: idredValue,
            nodo1: parseInt(source),
            nodo2: parseInt(receptor)
        }    
        flagExist = ChequeoConexionBackend(dataChequeoLine)
        // Impido la conexion entre mismo elementos (Para usar el del frontend tengo que mdificar y quitar el .then)
        flagExist.then(flag => { 
            if (receptor != source && flag[0] == false){
                // Agrego una linea al pin
                NLineInPin = pinEnd.getAttribute("NLineInPin") 
                NLineInPin ++;
                pinEnd.setAttribute("NLineInPin", NLineInPin) 

                // Calculo la posición del pin del nodo 
                endX = parseFloat(rectpinEnd.left) + (rectpinEnd.width  / 2)- rectFramework.left;
                endY = parseFloat(rectpinEnd.top) + (rectpinEnd.height  / 2) - rectFramework.top;
                
                startX = parseFloat(NewLine.getAttribute("startX"));
                startY = parseFloat(NewLine.getAttribute("startY"));

                // Calcular longitud y ángulo Finales
                var length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
                var angle = Math.atan2(endY - startY, endX - startX);

                // Creo la linea desde los puntos de inicio a los puntos finales
                NewLine.style.width = `${length}px`;
                NewLine.style.transform = `rotate(${angle}rad)`;
                NewLine.style.transformOrigin= 'top left';

                            
                NewLine.setAttribute('x1', startX);
                NewLine.setAttribute('y1', startY);
                NewLine.setAttribute('x2', endX);
                NewLine.setAttribute('y2', endY);
                NewLine.setAttribute('endX', endX);
                NewLine.setAttribute('endY', endY);
                NewLine.setAttribute("Receptor", receptor);
                NewLine.setAttribute("pinIdEnd", pinIdEnd);

                NewLine.setAttribute('x1Original', startX);
                NewLine.setAttribute('y1Original', startY);
                NewLine.setAttribute('x2Original', endX);
                NewLine.setAttribute('y2Original', endY);

                // Calculo la longitud y latitud de los puntos iniciales y finales
                Startpoint = [startX, startY];
                var StartlatLng = map.containerPointToLatLng(Startpoint);
                Endpoint = [endX, endY];
                var EndlatLng = map.containerPointToLatLng(Endpoint);

                NewLine.setAttribute('StartLat', StartlatLng.lat);
                NewLine.setAttribute('StartLng', StartlatLng.lng);
                NewLine.setAttribute('EndLat', EndlatLng.lat);
                NewLine.setAttribute('EndLng', EndlatLng.lng);

                // Coloco la latitud y lng de los pines en los objetos
                cordX = pinIni.parentNode.parentNode.getAttribute('cordX')

                pinIni.parentNode.parentNode.setAttribute('PinIniLat', StartlatLng.lat);
                pinIni.parentNode.parentNode.setAttribute('PinIniLng', StartlatLng.lng);

                pinEnd.parentNode.parentNode.setAttribute('PinEndLat', EndlatLng.lat);
                pinEnd.parentNode.parentNode.setAttribute('PinEndLng', EndlatLng.lng);

                // Agrego eventos a la línea
                NewLine.addEventListener('mousedown', mouseDownHandlerIni);
                //NewLine.addEventListener('mousemove', mouseDownHandlerEnd);

                //NewLine.addEventListener("mouseover", hoverLineIni);
                //NewLine.addEventListener("mouseout", hoverLineEnd); 
                NewLine.addEventListener("dblclick",  openPopupLine);

                // Establezco el color de la linea
                pinEnd.style.backgroundColor = SelectedPinColor;

                // Adeiero la nueva linea al svg
                //svg.appendChild(NewLine);
                frameworkBox.appendChild(NewLine);

                // Quito la previsualización de la linea
                frameworkBox.removeEventListener('mousemove', ShowLine);

                // Aumento el numero total de lineas
                NLine++; 

                // Agrego una instancia de la clase linea
                let LineaInterno = new Linea(NLine, source, receptor, 1, 1);
                Line.push(LineaInterno);

                // Identificación unica para cada linea
                NewLine.setAttribute('id', 'L' + NLine);
                NewLine.setAttribute("LineName", NLine);

                lineas = frameworkBox.getElementsByClassName('line');

                // Envío los datos al backend
                var dataLinea = {
                    idred: idredValue,
                    nombre: NLine,
                    idsubtipo: "", //Tipo de linea 
                    startX: startX, // potencia reactiva
                    startY: startY, // angulo de generacion
                    endX: endX, // limite inferior de la potencia activa
                    endY: endY, // limite inferior de la potencia reactiva
                    pinIdIni: pinIdIni, // limite superior de la potencia activa
                    pinIdEnd: pinIdEnd, // limite superior de la potencia reactiva
                    x1Original: startX,
                    y1Original: startY,
                    x2Original: endX,
                    y2Original: endY,
                    StartLat: StartlatLng.lat,
                    StartLng: StartlatLng.lng,
                    EndLat: EndlatLng.lat,
                    EndLng: EndlatLng.lng,
                    ILB: String(Array(parseFloat(P)).fill(ILBg)),
                    IUB: String(Array(parseFloat(P)).fill(IUBg)),
                    zOper: String(Array(parseFloat(P)).fill(-1)),
                    source: source,
                    receptor: receptor
                }

                CrearLineaBackend(dataLinea)

                // Cambio los Parametros del Problema
                var dataCambiarParametros = {
                    idredOriginal: idredValue, // Id de la red
                    // Nuevos Valores
                    NLineNew:  NLine, // Numeros de lineas
                }
                CambiarParametrosBackend(dataCambiarParametros)

                
                // Pine de extremo de las lineas
                // Inicio 
                let contenedorLineIni = document.createElement("div");
                contenedorLineIni.classList.add('contenedorLineIni');
                pinstartX = 20;
                pinstartY = -10;
                contenedorLineIni.style.position = "relative";
                contenedorLineIni.style.width = "55px";
                contenedorLineIni.style.height = "55px";
                //contenedorLineIni.style.backgroundColor= "green";
                //contenedorLineIni.style.opacity= 0;
                contenedorLineIni.style.pointerEvents= 'none';
                contenedorLineIni.style.visibility= "hidden";
                contenedorLineIni.style.zIndex = -2;

                if (Math.sign(Math.cos(angle)) == -1) {
                    contenedorLineIni.style.right = parseFloat(-10)  + "px";
                    contenedorLineIni.style.top = parseFloat(-45) + "px";
                    contenedorLineIni.style.transform = 'rotate(-180deg)'; // Rotar 45 grados en sentido horario
                } else {
                    contenedorLineIni.style.left = parseFloat(pinstartX) + "px";
                    contenedorLineIni.style.top = parseFloat(pinstartY) + "px";
                }

                let pinLineIni = document.createElement("div");
                pinLineIni.classList.add('pinLineIni');
                pinLineIni.style.position = "absolute";
                pinLineIni.style.visibility= "hidden";
                pinLineIni.style.left = parseFloat(pinstartX) + "px";
                pinLineIni.style.top = parseFloat(pinstartY) + "px";
                pinLineIni.style.width = "15px";
                pinLineIni.style.height = "20px";
                //pinLineIni.style.backgroundColor= "blue";
                //pinLineIni.style.opacity= 0;
                pinLineIni.addEventListener("mouseover", hoverContenedor);

                //pinLineIni.addEventListener('mousedown', mouseDownHandlerIni);
                //pinLineIni.addEventListener('click', mouseDownHandlerEnd);
                pinLineIni.style.zIndex = 1;

                let button1Ini = document.createElement("img");
                button1Ini.style.position = "absolute";
                button1Ini.classList.add('button1Ini');
                //button1Ini.style.left = parseFloat(5) + "px";
                button1Ini.style.bottom = 0 + "px";
                button1Ini.style.width = "20px";
                button1Ini.style.height = "20px";
                button1Ini.style.margin = "5px"
                //button1Ini.style.backgroundColor= "magenta";
                //button1Ini.style.pointerEvents= 'inherit';
                button1Ini.style.border = "#2ab1eaff";
                button1Ini.src = '/Img/Icons/disconnect.svg';  
                button1Ini.addEventListener('click', LineChangeButtonIntoLine);
                button1Ini.style.zIndex = -1;

                let button2Ini = document.createElement("img");
                button2Ini.style.position = "absolute";
                button2Ini.classList.add('button2Ini');
                button2Ini.style.left = parseFloat(20+5) + "px";
                button2Ini.style.bottom = 0 + "px";
                button2Ini.style.width = "20px";
                button2Ini.style.height = "20px";
                button2Ini.style.margin = "5px"
                button2Ini.style.border = "#2ab1eaff";
                //button2Ini.style.backgroundColor= "orange";
                //button2Ini.style.pointerEvents= 'inherit';
                button2Ini.src = '/Img/Icons/deleteLine.svg';  
                button2Ini.addEventListener('click', LineDeleteButtonIntoLine);
                button2Ini.style.zIndex = -2;
                // Incorporo los elementos a la linea y al contenedor
                NewLine.appendChild(contenedorLineIni);
                NewLine.appendChild(pinLineIni);
                contenedorLineIni.appendChild(button1Ini)
                contenedorLineIni.appendChild(button2Ini)

                // Fin
                let contenedorLineEnd = document.createElement("div");
                contenedorLineEnd.classList.add('contenedorLineEnd');
                pinstartX = 20;
                pinstartY = -10;
                contenedorLineEnd.style.position = "absolute";
                contenedorLineEnd.style.width = "55px";
                contenedorLineEnd.style.minWidth = "15px";
                contenedorLineEnd.style.height = "50px";
                //contenedorLineEnd.style.backgroundColor= "green";
                //contenedorLineEnd.style.opacity= 0;
                contenedorLineEnd.style.textAlign = "right";
                contenedorLineEnd.style.alignContent = "right";
                contenedorLineEnd.style.pointerEvents= 'none';
                contenedorLineEnd.style.visibility= "hidden";
                contenedorLineEnd.style.zIndex = -2;

                if (Math.sign(Math.cos(angle)) == -1) {
                    contenedorLineEnd.style.right = parseFloat(5)  + "px";
                    contenedorLineEnd.style.top = parseFloat(-40) + "px";
                    contenedorLineEnd.style.transform = 'rotate(-180deg)'; // Rotar 45 grados en sentido horario
                } else {
                    contenedorLineEnd.style.right = parseFloat(pinstartX) + "px";
                    contenedorLineEnd.style.top = parseFloat(pinstartY) + "px";
                }

                let pinLineEnd = document.createElement("div");
                pinLineEnd.classList.add('pinLineEnd'); 
                pinLineEnd.style.position = "absolute";
                pinLineEnd.style.right = parseFloat(pinstartX) + "px";
                pinLineEnd.style.top =  parseFloat(pinstartY) + "px";
                pinLineEnd.style.width = "15px";
                pinLineEnd.style.height = "20px";
                //pinLineEnd.style.backgroundColor= "red";
                //pinLineEnd.style.opacity= 1;
                pinLineEnd.style.zIndex = 1;
                pinLineEnd.style.visibility= "hidden";
                pinLineEnd.addEventListener("mouseover", hoverContenedor);
                //pinLineEnd.addEventListener('mousedown', mouseDownHandlerIni);
                //pinLineEnd.addEventListener('click', mouseDownHandlerEnd);

                let button1End = document.createElement("img");
                button1End.style.position = "absolute";
                button1End.classList.add('button1End');
                button1End.style.right = 0  + "px";
                button1End.style.bottom = 0 + "px";
                button1End.style.width = "20px";
                button1End.style.height = "20px";
                button1End.style.margin = "5px"
                //button1End.style.backgroundColor= "magenta";
                //button1End.style.pointerEvents= 'inherit';
                button1End.style.border = "#2ab1eaff";
                button1End.src = '/Img/Icons/disconnect.svg';  
                button1End.addEventListener('click', LineChangeButtonIntoLine);
                button1End.style.zIndex = -2;

                let button2End = document.createElement("img");
                button2End.style.position = "absolute";
                button2End.classList.add('button2End');
                button2End.style.right = pinstartX + 5 + "px";
                button2End.style.bottom = 0 + "px";
                button2End.style.width = "20px";
                button2End.style.height = "20px";
                button2End.style.margin = "5px";
                button2End.style.border = "#2ab1eaff";
                //button2End.style.backgroundColor= "orange";
                //button2End.style.pointerEvents= 'inherit';
                button2End.src = '/Img/Icons/deleteLine.svg';  
                button2End.addEventListener('click', LineDeleteButtonIntoLine);
                button2End.style.zIndex = -1;
                
                // Incorporo los elementos a la linea y al contenedor
                NewLine.appendChild(contenedorLineEnd);
                NewLine.appendChild(pinLineEnd);
                contenedorLineEnd.appendChild(button1End)
                contenedorLineEnd.appendChild(button2End)

                // Vuelvo las variables al valor nulo
                NewLine = null; // Linea Nueva Vacía
                pinIni = null; // pin de inicio de la linea
                pinEnd = null; // pin de fin de la linea
                FlagDrawingLine = false; // Flag que indica si se empieza a dibujar
                startXTemp = null;
                startYTemp = null;
                frameworkBox.style.cursor = ""
                // Remuevo el evento para mover el mapa cuando el mouse se aproxima a los bordes
                /* document.getElementById('map').removeEventListener('mousemove', adjustMapCenter); */

            }

        }
    )
    };
}




// Función para dibuar Lineas desde el Backend
async function DrawLineFromBackend(lineData){
    // Calculo la posición del pin del nodo 

    NewLine = document.createElement('div');
    frameworkBox.appendChild(NewLine);

    NewLine.className = "line";
    //NewLine.setAttribute('stroke', ColorLine);
    //NewLine.setAttribute('stroke-width', WidthLine);
    NewLine.setAttribute("Source", lineData.source_id);
    NewLine.setAttribute("pinIdIni", lineData.pinIdIni);
    NewLine.setAttribute("Receptor", lineData.receptor_id);
    NewLine.setAttribute("pinIdEnd", lineData.pinIdEnd);
    NewLine.setAttribute("startX", lineData.startX);
    NewLine.setAttribute("startY", lineData.startY);
    NewLine.setAttribute("endX", lineData.endX);
    NewLine.setAttribute("endY", lineData.endY);
    NewLine.setAttribute('x1', lineData.startX);
    NewLine.setAttribute('y1', lineData.startY);
    NewLine.setAttribute('x2', lineData.endX);
    NewLine.setAttribute('y2',  lineData.endY);
    NewLine.setAttribute('x1Original', lineData.startX);
    NewLine.setAttribute('y1Original', lineData.startY);
    NewLine.setAttribute('x2Original', lineData.endX);
    NewLine.setAttribute('y2Original', lineData.endY);
    NewLine.setAttribute('StartLat', lineData.StartLat);
    NewLine.setAttribute('StartLng', lineData.StartLng);
    NewLine.setAttribute('EndLat', lineData.EndLat);
    NewLine.setAttribute('EndLng', lineData.EndLng);

    // Se crean a partir de la latitud y longitud de los nodos
    StartLat = lineData.StartLat
    StartLng = lineData.StartLng
    var latLng = [StartLat, StartLng]; 
    var point = map.latLngToContainerPoint(latLng);
    startX = point.x 
    startY = point.y 

    EndLat = lineData.EndLat
    EndLng = lineData.EndLng
    var latLng = [EndLat, EndLng]; 
    var point = map.latLngToContainerPoint(latLng);
    endX = point.x 
    endY = point.y 

    // Calcular longitud y ángulo Finales
    var length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    var angle = Math.atan2(endY - startY, endX - startX);

/*     
    // Se crean a partir de los starX y starY
    NewLine.style.left = parseFloat(lineData.startX) + "px";
    NewLine.style.top = parseFloat(lineData.startY) + "px";
    NewLine.style.backgroundColor = ColorLine;
    NewLine.style.zIndex = 10;    
    NewLine.style.position = "absolute";

    // Calcular longitud y ángulo Finales
    var length = Math.sqrt((lineData.endX - lineData.startX) ** 2 + (lineData.endY - lineData.startY) ** 2);
    var angle = Math.atan2(lineData.endY - lineData.startY, lineData.endX - lineData.startX); */

    // Creo la linea desde los puntos de inicio a los puntos finales
    NewLine.style.left = parseFloat(startX) + "px";
    NewLine.style.top = parseFloat(startY) + "px";
    /* NewLine.style.left = lineData.startX + "px";
    NewLine.style.top = lineData.startY + "px"; */
    NewLine.style.backgroundColor = ColorLine;
    NewLine.style.zIndex = 10;    
    NewLine.style.position = "absolute";

    NewLine.style.width = `${length}px`;
    NewLine.style.height = WidthLine + "px"; // Grosor de la línea
    NewLine.style.transformOrigin= 'top left';
    NewLine.style.transform = `rotate(${angle}rad)`;

    // Agrego eventos a la línea
    NewLine.addEventListener('mousedown', mouseDownHandlerIni);
    //NewLine.addEventListener('click', mouseDownHandlerEnd);
    //NewLine.addEventListener("mouseover", hoverLineIni);
    //NewLine.addEventListener("mouseout", hoverLineEnd); 
    NewLine.addEventListener("dblclick",  openPopupLine);

    // Establezco el color de la linea
    //pinEnd.style.backgroundColor = SelectedPinColor;

    // Adeiero la nueva linea al svg
    //svg.appendChild(NewLine);
    frameworkBox.appendChild(NewLine);

    // Aumento el numero total de lineas
    NLine++; 

    // Agrego una instancia de la clase linea
    let LineaInterno = new Linea(NLine, lineData.source_nombre, lineData.receptor_nombre, 1, 1);
    Line.push(LineaInterno);

    // Identificación unica para cada linea
    NewLine.setAttribute('id', 'L' + NLine);
    NewLine.setAttribute("LineName", NLine);

    lineas = frameworkBox.getElementsByClassName('line');

    // Pine de extremo de las lineas
    // Inicio 
    let contenedorLineIni = document.createElement("div");
    contenedorLineIni.classList.add('contenedorLineIni');
    pinstartX = 20;
    pinstartY = -10;
    contenedorLineIni.style.position = "relative";
    contenedorLineIni.style.width = "55px";
    contenedorLineIni.style.height = "55px";
    //contenedorLineIni.style.backgroundColor= "green";
    //contenedorLineIni.style.opacity= 0;
    contenedorLineIni.style.pointerEvents= 'none';
    contenedorLineIni.style.visibility= "hidden";
    contenedorLineIni.style.zIndex = -2;

    if (Math.sign(Math.cos(angle)) == -1) {
        contenedorLineIni.style.right = parseFloat(-10)  + "px";
        contenedorLineIni.style.top = parseFloat(-45) + "px";
        contenedorLineIni.style.transform = 'rotate(-180deg)'; // Rotar 45 grados en sentido horario
    } else {
        contenedorLineIni.style.left = parseFloat(pinstartX) + "px";
        contenedorLineIni.style.top = parseFloat(pinstartY) + "px";
    }

    let pinLineIni = document.createElement("div");
    pinLineIni.classList.add('pinLineIni');
    pinLineIni.style.position = "absolute";
    pinLineIni.style.visibility= "hidden";
    pinLineIni.style.left = parseFloat(pinstartX) + "px";
    pinLineIni.style.top = parseFloat(pinstartY) + "px";
    pinLineIni.style.width = "15px";
    pinLineIni.style.height = "20px";
    //pinLineIni.style.backgroundColor= "blue";
    //pinLineIni.style.opacity= 0;
    pinLineIni.addEventListener("mouseover", hoverContenedor);

    //pinLineIni.addEventListener('mousedown', mouseDownHandlerIni);
    //pinLineIni.addEventListener('click', mouseDownHandlerEnd);
    pinLineIni.style.zIndex = 1;

    let button1Ini = document.createElement("img");
    button1Ini.style.position = "absolute";
    button1Ini.classList.add('button1Ini');
    //button1Ini.style.left = parseFloat(5) + "px";
    button1Ini.style.bottom = 0 + "px";
    button1Ini.style.width = "20px";
    button1Ini.style.height = "20px";
    button1Ini.style.margin = "5px"
    //button1Ini.style.backgroundColor= "magenta";
    //button1Ini.style.pointerEvents= 'inherit';
    button1Ini.style.border = "#2ab1eaff";
    button1Ini.src = '/Img/Icons/disconnect.svg';  
    button1Ini.addEventListener('click', LineChangeButtonIntoLine);
    button1Ini.style.zIndex = -1;

    let button2Ini = document.createElement("img");
    button2Ini.style.position = "absolute";
    button2Ini.classList.add('button2Ini');
    button2Ini.style.left = parseFloat(20+5) + "px";
    button2Ini.style.bottom = 0 + "px";
    button2Ini.style.width = "20px";
    button2Ini.style.height = "20px";
    button2Ini.style.margin = "5px"
    button2Ini.style.border = "#2ab1eaff";
    //button2Ini.style.backgroundColor= "orange";
    //button2Ini.style.pointerEvents= 'inherit';
    button2Ini.src = '/Img/Icons/deleteLine.svg';  
    button2Ini.addEventListener('click', LineDeleteButtonIntoLine);
    button2Ini.style.zIndex = -2;
    // Incorporo los elementos a la linea y al contenedor
    NewLine.appendChild(contenedorLineIni);
    NewLine.appendChild(pinLineIni);
    contenedorLineIni.appendChild(button1Ini)
    contenedorLineIni.appendChild(button2Ini)

    // Fin
    let contenedorLineEnd = document.createElement("div");
    contenedorLineEnd.classList.add('contenedorLineEnd');
    pinstartX = 20;
    pinstartY = -10;
    contenedorLineEnd.style.position = "absolute";
    contenedorLineEnd.style.width = "55px";
    contenedorLineEnd.style.minWidth = "15px";
    contenedorLineEnd.style.height = "50px";
    //contenedorLineEnd.style.backgroundColor= "green";
    //contenedorLineEnd.style.opacity= 0;
    contenedorLineEnd.style.textAlign = "right";
    contenedorLineEnd.style.alignContent = "right";
    contenedorLineEnd.style.pointerEvents= 'none';
    contenedorLineEnd.style.visibility= "hidden";
    contenedorLineEnd.style.zIndex = -2;

    if (Math.sign(Math.cos(angle)) == -1) {
        contenedorLineEnd.style.right = parseFloat(5)  + "px";
        contenedorLineEnd.style.top = parseFloat(-40) + "px";
        contenedorLineEnd.style.transform = 'rotate(-180deg)'; // Rotar 45 grados en sentido horario
    } else {
        contenedorLineEnd.style.right = parseFloat(pinstartX) + "px";
        contenedorLineEnd.style.top = parseFloat(pinstartY) + "px";
    }

    let pinLineEnd = document.createElement("div");
    pinLineEnd.classList.add('pinLineEnd'); 
    pinLineEnd.style.position = "absolute";
    pinLineEnd.style.right = parseFloat(pinstartX) + "px";
    pinLineEnd.style.top =  parseFloat(pinstartY) + "px";
    pinLineEnd.style.width = "15px";
    pinLineEnd.style.height = "20px";
    //pinLineEnd.style.backgroundColor= "red";
    //pinLineEnd.style.opacity= 1;
    pinLineEnd.style.zIndex = 1;
    pinLineEnd.style.visibility= "hidden";
    pinLineEnd.addEventListener("mouseover", hoverContenedor);
    //pinLineEnd.addEventListener('mousedown', mouseDownHandlerIni);
    //pinLineEnd.addEventListener('click', mouseDownHandlerEnd);

    let button1End = document.createElement("img");
    button1End.style.position = "absolute";
    button1End.classList.add('button1End');
    button1End.style.right = 0  + "px";
    button1End.style.bottom = 0 + "px";
    button1End.style.width = "20px";
    button1End.style.height = "20px";
    button1End.style.margin = "5px"
    //button1End.style.backgroundColor= "magenta";
    //button1End.style.pointerEvents= 'inherit';
    button1End.style.border = "#2ab1eaff";
    button1End.src = '/Img/Icons/disconnect.svg';  
    button1End.addEventListener('click', LineChangeButtonIntoLine);
    button1End.style.zIndex = -2;

    let button2End = document.createElement("img");
    button2End.style.position = "absolute";
    button2End.classList.add('button2End');
    button2End.style.right = pinstartX + 5 + "px";
    button2End.style.bottom = 0 + "px";
    button2End.style.width = "20px";
    button2End.style.height = "20px";
    button2End.style.margin = "5px";
    button2End.style.border = "#2ab1eaff";
    //button2End.style.backgroundColor= "orange";
    //button2End.style.pointerEvents= 'inherit';
    button2End.src = '/Img/Icons/deleteLine.svg';  
    button2End.addEventListener('click', LineDeleteButtonIntoLine);
    button2End.style.zIndex = -1;
    
    // Incorporo los elementos a la linea y al contenedor
    NewLine.appendChild(contenedorLineEnd);
    NewLine.appendChild(pinLineEnd);
    contenedorLineEnd.appendChild(button1End)
    contenedorLineEnd.appendChild(button2End)

    // Vuelvo las variables al valor nulo
    NewLine = null; // Linea Nueva Vacía
    //pinIni = null; // pin de inicio de la linea
    //pinEnd = null; // pin de fin de la linea
    //FlagDrawingLine = false; // Flag que indica si se empieza a dibujar

}

// Dibujando La linea
function ShowLine(event) {
    
    if (NewLine != null){
        // Tomo los limites del framework
        frameworkBox.style.cursor = "grabbing"
        rectpinIni = pinIni.getBoundingClientRect();
        frameworkBox = document.getElementById("framework");
        rectFramework = frameworkBox.getBoundingClientRect();

        StartLat = NewLine.getAttribute('StartLat');
        StartLng = NewLine.getAttribute('StartLng');
        
        var latLng = [StartLat, StartLng]; 
        var point = map.latLngToContainerPoint(latLng);
        startX =  point.x 
        startY =  point.y 
        
        // Obtengo los valores de inicio de la linea
/*         startX = parseFloat(NewLine.getAttribute("startX"));
        startY = parseFloat(NewLine.getAttribute("startY"));
 */
        // Obtengo la posición final de la linea respecto de la posición del mouse
        var endX = event.clientX  - rectFramework.left;
        var endY = event.clientY  - rectFramework.top;
        Endpoint = [endX, endY];
        var EndlatLng = map.containerPointToLatLng(Endpoint);
        NewLine.setAttribute('EndLat', EndlatLng.lat);
        NewLine.setAttribute('EndLng', EndlatLng.lng);

        // Calcular longitud y ángulo
        var length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2) - 5; // el 5 es para que la linea no coincida con el cursor y no me permita seleccionar un nod
        var angle = Math.atan2(endY - startY, endX - startX);

        // Creo la linea desde los puntos de inicio a los puntos finales
        NewLine.style.width = `${length}px`;
        NewLine.style.height = WidthLine + "px"; // Grosor de la línea
        NewLine.style.transform = `rotate(${angle}rad)`;
        NewLine.style.transformOrigin= 'top left';
        //NewLine.style.top = `${startX}px`;
        //NewLine.style.left = `${startY}px`;
        
        NewLine.setAttribute('x1', startX);
        NewLine.setAttribute('y1', startY);
        NewLine.setAttribute('x2', endX);
        NewLine.setAttribute('y2', endY);

    }
}


// Funcion para quitar una linea del pin de un nodos
function HandlePinConection(frameworkBox, node, pin) {
    frameworkBox.childNodes.forEach((child) => {
        if(child.id == node){
            // El nodo modificado
            child.childNodes.forEach((grandson) => {
                // el hijo del nodo es un contenedor de pines
                grandson.childNodes.forEach((Greatgrandson) => {
                    if(Greatgrandson.id == pin){
                        // El pin modificado
                        // Quito una linea en el pin modificado
                        NLineInPin = Greatgrandson.getAttribute("NLineInPin")
                        NLineInPin = NLineInPin - 1; 

                        if(NLineInPin == 0){
                            Greatgrandson.style.backgroundColor = "";
                        } else {
                            Greatgrandson.style.backgroundColor = SelectedPinColor;      
                        } 
                        Greatgrandson.setAttribute("NLineInPin", NLineInPin)
                    }
                });
            });
        }
    }); 
}

// Hover Linea  - Cambiar el color de la linea y el cursor 
function hoverLineIni(event) {
    LineSelected = event.target.parentNode;
    /* console.log(LineSelected) */
    LineSelected.style.opacity= 0.5;
}

function hoverLineEnd(event) {
    LineSelected = event.target.parentNode;
    LineSelected.style.opacity= 1;
}

function hoverContenedorHidden(event){
    Contenedor = event.target;
    Contenedor.style.visibility= "hidden";
    Contenedor.style.pointerEvents= 'none';
    Contenedor.style.zIndex= 0;
    childs = Contenedor.childNodes
    childs.forEach(child => {
        child.style.visibility= "hidden";
        child.style.zIndex= 0;
    });

}

function hoverContenedor(event){
    classNameEvent = event.target.className
    if (classNameEvent  == 'pinLineIni'){
        classObjective = 'contenedorLineIni'
    } else {
        classObjective = 'contenedorLineEnd'
    }
    LineSelected = event.target.parentNode;
    LineSelected.childNodes.forEach(child => {
        if(child.className == classObjective)
        Contenedor = child
    });
    //Contenedor = LineSelected.firstChild
    childs = Contenedor.childNodes
    childs.forEach(child => {
        child.style.visibility= "visible";
        child.style.opacity= 1;
        child.style.zIndex= 1;
    });
    Contenedor.style.visibility= "visible";
    Contenedor.style.zIndex= 1;
    Contenedor.style.pointerEvents= 'auto';
    Contenedor.addEventListener("mouseleave", hoverContenedorHidden); 
}


function LineDeleteButtonIntoLine(event){
    selectedLines.push(event.target.parentNode.parentNode);
    DeleteLine(selectedLines)
}

function LineChangeButtonIntoLine(event){
    // Hacer la funcion para mover lineas
    console.log("Entro")
    console.log("Target", event.target.parentNode.parentNode)
    selectedLine = event.target.parentNode.parentNode;
}

// Chequeo si la linea existe (En el Frontend)
function CheckExistenciaFrontend(Line, source, receptor, selectedLine) {
    if(selectedLine == null){
        // Si no se pasó la linea seleccionada
        flagExist = false
        Line.forEach(eline =>{
            if( eline.s == source && eline.r == receptor ){
                // Existe una linea de conexion entre estos dos nodos
                flagExist = true
            } else if(eline.r == source && eline.s == receptor){
                // Existe una linea de conexion entre estos dos nodos
                flagExist = true
            }else{
                //No existe una linea de conexion entre estos dos nodos
                //flagExist = false
            }
            return flagExist
        });
        return flagExist
    } else {
        // Si no se pasó la linea seleccionada
        flagExist = false
        Line.forEach(eline =>{
            if( eline.s == source && eline.r == receptor && eline.NL != selectedLine.id){
                // Existe una linea de conexion entre estos dos nodos y no es la seleccionada
                flagExist = true
                pinNew = null;
            } else if(eline.r == source && eline.s == receptor && eline.NL != selectedLine.id){
                // Existe una linea de conexion entre estos dos nodos y no es la seleccionada
                flagExist = true
                pinNew = null;
            }else{
                //No existe una linea de conexion entre estos dos nodos
                //flagExist = false
            }
            return flagExist
        });
        return flagExist
    }
    
}

// Función para impedir conexiones - Las generaciones y cargas solo pueden conectarse con un nodo
function StopConecction(pinIni, pinEnd){
    sourceParent = pinIni.parentNode.parentNode
    recipeParent = pinEnd.parentNode.parentNode
    sourceParentType = sourceParent.getAttribute("type")
    recipeParentType = recipeParent.getAttribute("type")

    if(sourceParentType == "Node" || recipeParentType == "Node" ){
        flagExist = false 
        return flagExist
    } else{
        flagExist = true
        return flagExist
    }



}