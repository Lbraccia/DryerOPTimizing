async function ShowSolution(event, FlagShowSolutionExternal = "", flagChangePvalueExternal = ""){
    // Verifico si hay una solucion cargada
    if(FlagLoad){
        // Obtengo los valores desde el backend
        dataFiltrarRed = {
            idUser: iduser,
            idred: idredValue
        }
        await FiltrarSolutionBackend(dataFiltrarRed).then(dataRedDB => {
            Flag_termination_status = dataRedDB.message[0]["flag_termination_status"]
        })
        // Verifico si hay una solución:
        if (Flag_termination_status){

            // FlagShowSolutionExternal: Es una variable que permite definir por afuera si se muestra o no la solución
            // FlagShowSolution: Es la variable que indica si se muestra o no la solucion (True: se muestra, False: no se muestra (edition section))

            FlagShowSolution = !FlagShowSolution;

            FlagShowSolution = FlagShowSolutionExternal !== "" ? FlagShowSolutionExternal : FlagShowSolution 

            //FlagShowSolution = false

            ShowButtonImage = document.getElementById('ShowButtonImage');
            // Cambio la imagen del boton
            ShowButtonImage.src = ShowSolutionButtonImageOnOff(FlagShowSolution).imageUrl;

            //Mensajes.style.visibility = "visible";
            showDivForSeconds(2, ShowSolutionButtonImageOnOff(FlagShowSolution).buttonText)
            
            Mensajes.style.backgroundColor = "white";
            Mensajes.children[1].style.backgroundColor = "#4285f4";


            divButtonsShowSoltuion = document.getElementById('divButtonsShowSoltuion');
            divButtonsShowSoltuion.style.visibility = ShowSolutionButtonImageOnOff(FlagShowSolution).visibility;

            backButton = document.getElementById('backButton');
            backButton.style.visibility = ShowSolutionButtonImageOnOff(FlagShowSolution).visibility;

            Pvalue = 1
            divP = document.getElementById('divP');
            divP.style.visibility = ShowSolutionButtonImageOnOff(FlagShowSolution).visibility;
            divP.value = Pvalue 

            forwardButton = document.getElementById('forwardButton');
            forwardButton.style.visibility = ShowSolutionButtonImageOnOff(FlagShowSolution).visibility;
            
            ButtonsShowSolution = document.getElementById('ShowSolution');
            ButtonsShowSolution.style.border = "2px solid #4285f4";

            ButtonsShowTableSolution = document.getElementById('ShowTableSolution');
            ButtonsShowTableSolution.style.border = "";

            flagChangePvalue = false; 
            
            if(!FlagShowSolution){
                await AnimationLines(Pvalue, flagChangePvalue)
            } else{
                // Limpio las animaciones de los nodos y las lineas
                cleanLines()
                cleanNodes()
            }    
            // Limpio las flechas
            ShowSolutionButtonImageOnOff(FlagShowSolution).animation
        } else {
            alert("You must solve the problem before")         
        }
    } /* else {
        alert("You must load or create a new problem")         
    } */
} 

//function ShowButtonImageOnOff(FlagShowSolution) {
//    return FlagShowSolution ? "Img/Icons/assignment_returned.svg" : "Img/Icons/assignment_return.svg";
//}


function AnimationDirecction(sentido) {
    // Permite definir la direccion de las flechas para la animación    
    return sentido ? 
    { flecha: '>', animacion: 'normal'}: 
    { flecha: '<', animacion: 'reverse'};
}

function ShowLineNodoONOFF(FlagShowLine) {
    return FlagShowLine ? 
        {visibility: 'visible'} :
        {visibility: 'hidden'};
}


function OpacityLineNodoONOFF(FlagOpacityLine) {
    return FlagOpacityLine ? 
        {opacity: 1} :
        {opacity: 0.25};
}

function ShowSolutionButtonImageOnOff(FlagShowSolution) {
    return FlagShowSolution ? 
        { imageUrl: "Img/Icons/assignment_returned_2.svg", visibility: 'hidden', buttonText:  " Editor Section ", flagWidthLine: true, 
        animation:cleanFlechas(), buttonHandle: deshabilitarBotones()} :
        { imageUrl: "Img/Icons/assignment_return_2.svg", visibility: 'visible', buttonText: " Solution Report ", flagWidthLine: false, 
         animation: false, buttonHandle: habilitarBotones()};
}

// Función para mostrar el div durante 3 segundos
function showDivForSeconds(seconds, Mensaje) {
    StopCreation()
    // Muestra el div
    Mensajes.style.visibility = "visible";
    //Mensajes.style.opacity = "1";
    Mensajes.children[0].innerText = Mensaje; 
    // Oculta el div después de los segundos indicados
    setTimeout(() => {
        //Mensajes.style.opacity = "0"; // Inicia el efecto de difuminado
        Mensajes.style.visibility = "hidden";
    }, seconds * 1000); // Convertir segundos a milisegundos
}

async function AnimationLines(Pvalue, flagChangePvalue) {
    // Limpio las flechas creadas previamente
    cleanFlechas()

    // Datos de la Red
    dataFiltrarLineaNodo = {
        idred: idredValue,
    } 
        
    
/* 
    // Transformo el htmlcolection en un array
    const ArrayNodosFrontend = Array.prototype.slice.call(nodosFrontend);
 // Busco el elemento en el array que coincide el source y el receptor con el elemento del backend
    for (let i = 0; i < nodosBackend.message.length; i++) {
        const nodoBackend = nodosBackend.message[i];

        let flagFind = true
        j = 0
        while (flagFind) {
    
        }
    }
 */
    // Obtengo los datos de las lineas de Backend
    lineasBackend = await FiltrarLineaBackend(dataFiltrarLineaNodo)

    // Obtengo las lineas del frontend
    let lineasFrontend = frameworkBox.getElementsByClassName('line');

    // Transformo el htmlcolection en un array
    const ArrayLineasFrontend = Array.prototype.slice.call(lineasFrontend);
     // Busco el elemento en el array que coincide el source y el receptor con el elemento del backend
    for (let i = 0; i < lineasBackend.message.length; i++) {
        const lineaBackend = lineasBackend.message[i];

        let flagFind = true
        j = 0
        while (flagFind) {
            if(ArrayLineasFrontend[j].getAttribute("source") == lineaBackend.source_id && ArrayLineasFrontend[j].getAttribute("receptor") == lineaBackend.receptor_id){
                
                // Veo si cambio el periodo o salgo del editor (Ver como se puede mejorar para quitar el if)
                // Este if viene de que cuando se cambia el periodo no tiene que desaprecer la clase linea-flechas
                if(flagChangePvalue){
                    // Si cambio el periodo no quito la clase linea-flechas
                    ArrayLineasFrontend[j].classList.add('linea-flechas');
                }
                else{   
                    // Si salgo al editor saco la clase linea-flecas
                    ArrayLineasFrontend[j].classList.toggle('linea-flechas');
                }

                WidthLineCalc = '50px';
                // Tendría que trabajar con lat y lng y pasarlo a posición (como hice con los nodos)
                var startX = parseFloat(ArrayLineasFrontend[j].getAttribute("startX"));
                var startY = parseFloat(ArrayLineasFrontend[j].getAttribute("startY"));
                var endX = parseFloat(ArrayLineasFrontend[j].getAttribute("endX"));
                var endY = parseFloat(ArrayLineasFrontend[j].getAttribute("endY"));

/*                 // Trabajando con Lat y Lng
                EndLat = lineas[i].getAttribute('EndLat');
                EndLng = lineas[i].getAttribute('EndLng'); 
                StartLat = lineas[i].getAttribute('StartLat');
                StartLng = lineas[i].getAttribute('StartLng'); 

                EndlatLng = [EndLat, EndLng]
                var Endpoint = map.latLngToContainerPoint(EndlatLng);
                endX = Endpoint.x
                endY = Endpoint.y
                
                StartlatLng = [StartLat, StartLng];
                var Startpoint = map.latLngToContainerPoint(StartlatLng);
                startX = Startpoint.x
                startY = Startpoint.y */

                // Calcular longitud y ángulo Finales
                var length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

                const arrowWidth = 6;
                const margin = 4;
                const numArrows = Math.floor((parseFloat(length) - 2 * parseFloat(margin)) / (parseFloat(arrowWidth) + parseFloat(margin)));
                
                // Convertir el texto a un array de JavaScript
                let sentido = JSON.parse(lineaBackend.sentido);
                let zLinep = JSON.parse(lineaBackend.zLinep)
                let zOper = JSON.parse(lineaBackend.zOper)
                /* console.log("lineaBackend Nombre: ", lineaBackend.nombre)
                console.log("sentido: ", lineaBackend.sentido)
                console.log("zOper: ", zOper) */

                const zLinepvalue = FlagShowSolution ? 1 : zLinep[Pvalue-1] ; // Veo si estoy mostrando la solucion o estoy en la edicion. 
                let zOpervalue = FlagShowSolution ? 1 : zOper[Pvalue-1] ;
                zOpervalue = zOpervalue === -1 ? 0 : zOpervalue;
                ArrayLineasFrontend[j].style.visibility = ShowLineNodoONOFF(zLinepvalue  || zOpervalue).visibility; 
                ArrayLineasFrontend[j].style.opacity =  OpacityLineNodoONOFF(zLinepvalue).opacity;               
               
                //ArrayLineasFrontend[j].style.visibility = ShowLineNodoONOFF(zLinepvalue).visibility
                
                if(zLinepvalue){
                    // Crear y agregar las flechas al DOM
                    for (let k = 0; k < numArrows; k++) {
                        const arrow = document.createElement('span');
                        arrow.style.left = `${(k+1) * (arrowWidth + margin)}px`;
                        arrow.classList.add('flecha');
                        //arrow.addEventListener("dblclick",  openPopupLine); Tendría que hacer un openPopup para las flechas que dirija al openPopup de las lineas con el NLine
                        arrow.textContent = AnimationDirecction(sentido[Pvalue - 1]).flecha; //'>'; // ▶ >
                        // Ajustar el retraso de la animación para un inicio escalonado
                        arrow.style.animationDelay = `${k * 0.2}s`;
                        lineas[i].appendChild(arrow);
                        arrow.style.animationDirection = AnimationDirecction(sentido[Pvalue - 1]).animacion;                        
                    }                    
                }

                /* if(ArrayLineasFrontend[j].getAttribute("linename") == "8"){
                    if(zLinepvalue){
                        console.log("sentido[Pvalue - 1]: ", sentido[Pvalue - 1])
                        console.log("AnimationDirecction(sentido[Pvalue - 1]).flecha: ", AnimationDirecction(sentido[Pvalue - 1]).flecha)
                        console.log("arrow.style.animationDirection = AnimationDirecction(sentido[Pvalue - 1]).animacion", AnimationDirecction(sentido[Pvalue - 1]).animacion)
                         
                        // Crear y agregar las flechas al DOM
                        for (let k = 0; k < numArrows; k++) {
                            const arrow = document.createElement('span');
                            arrow.style.left = `${(k+1) * (arrowWidth + margin)}px`;
                            arrow.classList.add('flecha');
                            //arrow.addEventListener("dblclick",  openPopupLine); Tendría que hacer un openPopup para las flechas que dirija al openPopup de las lineas con el NLine
                            
                            arrow.textContent = AnimationDirecction(sentido[Pvalue - 1]).flecha; //'>'; // ▶ >
                            // arrow.textContent = AnimationDirecction(1).flecha; 
                            // Ajustar el retraso de la animación para un inicio escalonado
                            arrow.style.animationDelay = `${k * 0.2}s`;
                            lineas[i].appendChild(arrow);
                            
                            // arrow.style.animationDirection = AnimationDirecction(1).animacion;
                        
                            arrow.style.animationDirection = AnimationDirecction(sentido[Pvalue - 1]).animacion;                        
                        }
                    }
                } */
                // Indico que se encontro el elemnto
                flagFind = false
                // Elimino el elemento del array (para que no se vuelva a buscar sobre el)
                ArrayLineasFrontend.splice(j, 1); 
                
                j = 0
            } else {
                j = j + 1
            }
        }
    }

    // Obtengo los datos de los nodos de Backend
    // Podría obtener solos los nodos que son generaciones (mejoraría la velocidad)
    nodosBackend = await FiltrarNodeBackend(dataFiltrarLineaNodo)

    // Obtengo los nodos del frontend
    // Podría obtener solos los nodos que son generaciones (mejoraría la velocidad)
    let nodosFrontend = frameworkBox.getElementsByClassName('objeto'); 

    for (let i = 0; i < nodosBackend.message.length; i++) {
        const nodo = nodosBackend.message[i];
        // Obtengo el nodo del frontend
        const nodoFronend = document.getElementById(nodo.idNodo)
        const zp = JSON.parse(nodo.zp)
        const zpvalue = FlagShowSolution ? 1 : zp[Pvalue-1] ; // Veo si estoy mostrando la solucion o estoy en la edicion. 
        nodoFronend.style.visibility = ShowLineNodoONOFF(zpvalue).visibility

        if(nodo.idtiponodo == 2 || nodo.idtiponodo == 3 || nodo.idtiponodo == 4){
            // Esta parte del codigo la deberíamos pasar al backend
            // Si el nodo es una generación y tiene valores cero para un período la coloco transparente
            const pgval = JSON.parse(nodo.p)
            const qgval = JSON.parse(nodo.q)

            if(pgval[Pvalue-1] == 0 &&  qgval[Pvalue-1] == 0){
                nodoFronend.style.opacity = 0.25;

                // Bajamos la opacidad de las lineas asociadas a esos nodos y eliminamos la animación
                // Filtramos las lineas asociada a ese nodo
                const lineasFiltradas = Array.from(lineas).filter(linea => {
                    if(parseInt(linea.getAttribute('receptor')) === parseInt(nodo.idNodo) || parseInt(linea.getAttribute('source')) === parseInt(nodo.idNodo)){
                        return linea
                    }
                    
                });
                lineasFiltradas[0].style.opacity =  0.25; 
                lineasFiltradas[0].style.pointerEvents = "none";
                const FlechaAsociadas = lineasFiltradas[0].querySelectorAll('.flecha');             
                FlechaAsociadas.forEach(flecha => {
                    flecha.remove();
                });
            }            
        }
    }
}

async function forwardPeriod() {
    
    Pvalue = Pvalue + 1
    if (Pvalue > P)  {
        Pvalue = 1
    }
    divP = document.getElementById('divP');
    divP.value = Pvalue

    cleanFlechas()
    cleanNodes()

    // Indico que cambio el P (para no sacar el estilo en las lineas)
    flagChangePvalue = true
    await AnimationLines(Pvalue, flagChangePvalue) 

    // Cambio el boton de animacion a encendido
    FlagPlayStopAnimation = true;
    PlayStopAnimationImage = document.getElementById('PlayStopAnimation');
    // Cambio la imagen del boton
    PlayStopAnimationImage.src = PlayStopAnimationImageOnOff(FlagPlayStopAnimation).imageUrl;
    
}


async function backwardPeriod() {
    
    Pvalue = Pvalue - 1
    if (Pvalue <= 0)  {
        Pvalue = P
    }
    divP = document.getElementById('divP');
    divP.value = Pvalue

    // Limpio las flechas creadas previamente
    cleanFlechas()
    cleanNodes()

    // Indico que cambio el P (para no sacar el estilo en las lineas)
    flagChangePvalue = true
    await AnimationLines(Pvalue, flagChangePvalue) 

    // Cambio el boton de animacion a encendido
    FlagPlayStopAnimation = true;
    PlayStopAnimationImage = document.getElementById('PlayStopAnimation');
    // Cambio la imagen del boton
    PlayStopAnimationImage.src = PlayStopAnimationImageOnOff(FlagPlayStopAnimation).imageUrl;

}

function cleanFlechas(){

    // Limpia las flechas creadas
    elementosConClaseFlecha = document.querySelectorAll('.flecha');
    elementosConClaseFlecha.forEach(flecha => flecha.remove())

    // Limpia las ckase linea-flechas de las lineas
    const lineasFrontend = document.querySelectorAll('.linea-flechas');
    lineasFrontend.forEach(elemento => {
        elemento.classList.remove('linea-flechas')
        elemento.style.opacity = 1;
    });
}


function cleanLines() {
    lineasFrontend = document.querySelectorAll('.line');
    lineasFrontend.forEach(elemento => {
        elemento.style.opacity = 1;
        elemento.style.visibility = 'visible';
        elemento.style.pointerEvents = "auto";
    });
}

function cleanNodes(){
     nodosFrontend = document.querySelectorAll('.objeto');
     nodosFrontend.forEach(elemento => {
        elemento.style.opacity = 1;
        elemento.style.visibility = 'visible';
    });
}



function habilitarBotones(params) {
        // Habilito todos los botones deshabilitado
    // Selecciona todos los botones con la clase 'deshabilitado'
    const botonesDeshabilitados = document.querySelectorAll('.deshabilitado');
        // Itera sobre la colección de botones
        botonesDeshabilitados.forEach(boton => {
        boton.classList.remove('deshabilitado');
        boton.classList.add('habilitado');
        boton.disabled = false; // O boton.removeAttribute('disabled');
    });

}

function deshabilitarBotones(params) {
        // Habilito todos los botones deshabilitado
    // Selecciona todos los botones con la clase 'deshabilitado'
    const botonesDeshabilitados = document.querySelectorAll('.habilitado');
        // Itera sobre la colección de botones
        botonesDeshabilitados.forEach(boton => {
        boton.classList.add('deshabilitado');
        boton.classList.remove('habilitado');
        boton.disabled = true; // O boton.removeAttribute('disabled');
    });

}