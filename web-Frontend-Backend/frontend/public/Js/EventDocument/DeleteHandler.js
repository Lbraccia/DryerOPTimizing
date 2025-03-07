// Eventos manejados por la tecla Delete
//Para Eliminar elementos seleccionados con la tecla Delete
document.addEventListener("keydown", function(event) {
    // Si no está abierto ningun popup
    if(!FlagPopUpGenerations && !FlagPopUpGrid && !FlagPopUpLine && !FlagPopUpNode && !FlagPopUpLoad && !FlagPopUpParamtros ){
        // Verificar si la tecla presionada es la tecla Suprimir (keyCode 46 o key "Delete")
        if (event.keyCode === 46 || event.key === "Delete") {
            // Si se terminó la selección
            if(FlagDragging == false){

                // Si hay lineas seleccionadas
                if(selectedLines.length != 0){
                    DeleteLine(selectedLines)
                }

                // Si hay Nodos seleccionados
                if(selectedElements.length != 0 ){
                    DeleteNode(selectedElements)
                }
                            
                // Deselecciono los elementos si hay seleccionados
                Deselection()
                
                // Minimizo los popUps
                closePopupNode();
                closePopupLine();
                closePopupLoad();
                closePopupGenerations();

                // Actualizo la matriz de las Lineas y los Bus
                
            }
        }
    }
});


async function DeleteNode(selectedElements){
    let lineas = frameworkBox.getElementsByClassName('line');
    await selectedElements.forEach(divAEliminar => {
        // Si hay un div seleccionado lo borro
        if (divAEliminar != null) {                
            // Elimino el elemento 
            // Del Backend
            var dataDeleteNode = {
                idred: idredValue,
                idNodo: parseInt(divAEliminar.id),
            }

            DeleteNodeBackend(dataDeleteNode)   
            dataDeleteNode = null;
            // Del frontend
            divAEliminar.remove()

            ArrayLinea = Object.values(lineas)

            // Recorro los indices a elimiar y borro las lineas
            ArrayLinea.forEach(linea => {
                source = linea.getAttribute("Source")
                receptor = linea.getAttribute("Receptor")
                // Obtengo el pin donde está conectado en el nodo receptor
                pinIdEnd = linea.getAttribute("pinIdEnd")
                // Obtengo el pin donde está conectado en el nodo receptor
                pinIdIni = linea.getAttribute("pinIdIni")
                if(source == divAEliminar.id){
                    // Si la linea está conectada al nodo que se mueve
                    // Cambio el color de los pines Al nodo receptor  
                    HandlePinConection(frameworkBox, receptor, pinIdEnd)
                    // Para tener la Line en el Frontend
                    for (let i = 0; i < Line.length; i++) {
                        if(divAEliminar.id == Line[i].s) {
                            Line.splice(i, 1);
                        }
                    }

                    linea.remove()
                } else if(receptor == divAEliminar.id) {
                    // Si la linea está conectada al nodo que se mueve
                    // Cambio el color de los pines del nodo fuente    
                    HandlePinConection(frameworkBox, source, pinIdIni)
                    // Para tener la Line en el Frontend
                    for (let i = 0; i < Line.length; i++) {
                        if(divAEliminar.id == Line[i].r) {
                            Line.splice(i, 1);
                        }
                    }
                    linea.remove()
                }})


            // Aquí puedes llamar a una función o realizar cualquier otra acción que desees
            // Desactivo la bandera de selección
            FlagSelected = false;
            objetoSeleccionado = null;
            divAEliminar = null; 
            BusFiltrados = null; 
            LineasFiltradas = null; 


        }
    });



    // Actualizo las lineas y los elementos en el framework
    objectsInFramework = document.getElementById("framework").getElementsByClassName("objeto");
    lineas = frameworkBox.getElementsByClassName('line');
    Nnodos = 0 // Numero totales de objetos en el framework
    N = 0 //  los Nodos en el framework
    NG1 = 0 // Vuelvo a contar las Generación tipo 1
    NG2 = 0 // Vuelvo a contar las Generación tipo 2
    NG3 = 0 // Vuelvo a contar las Generación tipo 3
    NStorage = 0 // Vuelvo a contar los Storage
    NLoad = 0 // Vuelvo a contar las Cargas
    S = 0 // Vuelvo a contar las Fuentes
    
    for (let i = 0; i < objectsInFramework.length; i++) {
        // Tomo el id del elemnto (Necesario para cambiar el nombre en el backend)
        NodeNumber = objectsInFramework[i].getAttribute("id");
/*         console.log("******************************")
        console.log("NodeNumber", NodeNumber) */
        // Cambio el nombre de cada elemento
        if (objectsInFramework[i].getAttribute("type") === "Node"){

            // Cambio los nombres 
            //En el Frontend
            N++
            
            NodeName = N
            objectsInFramework[i].setAttribute("NodeName",  NodeName); 
            objectsInFramework[i].childNodes[0].childNodes[1].textContent = "Node " + String(N);
                    
            //En el Backend
            var dataChangeNode = {
                idredOriginal: idredValue,
                idNodoOriginal: NodeNumber,
                nombreNew: NodeName,
            }
            await CambiarNodoBackend(dataChangeNode)
            
        } else if(objectsInFramework[i].getAttribute("type") === "DG1"){
            
            // Cambio los nombres 
            //En el Frontend
            NG1++  
            NodeName = NG1
            objectsInFramework[i].setAttribute("NodeName",  NodeName); 
            objectsInFramework[i].childNodes[1].textContent = "G1 - " + String(NG1);
                    
            //En el Backend
            var dataChangeNode = {
                idredOriginal: idredValue,
                idNodoOriginal: NodeNumber,
                nombreNew: NodeName,
            }
            await CambiarNodoBackend(dataChangeNode)


        } else if(objectsInFramework[i].getAttribute("type") === "DG2"){
                        
            // Cambio los nombres 
            //En el Frontend
            NG2++  
            NodeName = NG2
            objectsInFramework[i].setAttribute("NodeName",  NodeName); 
            objectsInFramework[i].childNodes[1].textContent = "G2 - " + String(NG2);
                    
            //En el Backend
            var dataChangeNode = {
                idredOriginal: idredValue,
                idNodoOriginal: NodeNumber,
                nombreNew: NodeName,
            }
            await CambiarNodoBackend(dataChangeNode)

        } else if(objectsInFramework[i].getAttribute("type") === "DG3"){
                        
            // Cambio los nombres 
            //En el Frontend
            NG3++  
            NodeName = NG3
            objectsInFramework[i].setAttribute("NodeName",  NodeName); 
            objectsInFramework[i].childNodes[1].textContent = "G3 - " + String(NG3);
                    
            //En el Backend
            var dataChangeNode = {
                idredOriginal: idredValue,
                idNodoOriginal: NodeNumber,
                nombreNew: NodeName,
            }
            await CambiarNodoBackend(dataChangeNode)

        }  else if(objectsInFramework[i].getAttribute("type") === "S"){
                        
            // Cambio los nombres 
            //En el Frontend
            S++  
            NodeName = S
            objectsInFramework[i].setAttribute("NodeName",  NodeName); 
            objectsInFramework[i].childNodes[1].textContent = "G - " + String(S);
                    
            //En el Backend
            var dataChangeNode = {
                idredOriginal: idredValue,
                idNodoOriginal: NodeNumber,
                nombreNew: NodeName,
            }
            await CambiarNodoBackend(dataChangeNode)

        } else if(objectsInFramework[i].getAttribute("type") === "Storage"){
            
            // Cambio los nombres 
            //En el Frontend
            NStorage++  
            NodeName = NStorage
            objectsInFramework[i].setAttribute("NodeName",  NodeName); 
            objectsInFramework[i].childNodes[1].textContent = "S - " + String(NStorage);
                    
            //En el Backend
            var dataChangeNode = {
                idredOriginal: idredValue,
                idNodoOriginal: NodeNumber,
                nombreNew: NodeName,
            }
            await CambiarNodoBackend(dataChangeNode)

        }  else if(objectsInFramework[i].getAttribute("type") === "Load"){
            
            // Cambio los nombres 
            //En el Frontend
            NLoad++
            NodeName = NLoad
            objectsInFramework[i].setAttribute("NodeName",  NodeName); 
            objectsInFramework[i].childNodes[1].textContent = "L - " + String(NLoad);
                    
            //En el Backend
            var dataChangeNode = {
                idredOriginal: idredValue,
                idNodoOriginal: NodeNumber,
                nombreNew: NodeName,
            }
            await CambiarNodoBackend(dataChangeNode)

        } else {

        }
    }

    for (let i = 0; i < lineas.length; i++) {
        //En el Frontend
        LineName = lineas[i].getAttribute("LineName");
        lineas[i].setAttribute("LineName", i+1)
        /* console.log("entro 1")
        console.log("LineName", LineName) */
        //En el Backend
        var dataChangeLine = {
            idredOriginal: idredValue,
            nombreOriginal: LineName,
            nombreNew: i+1
        }
        await CambiarLineaBackend(dataChangeLine)
    }
    NLine = lineas.length
    await ActualizarParametros()      


}


async function DeleteLine(selectedLines){
    FlagDeleteLine = false;
    // Si hay un div seleccionado lo borro
    await selectedLines.forEach(LineaAEliminar => {
        if (LineaAEliminar != null) {
            // Elimino la linea 
            // Del Frontend
            LineName = parseInt(LineaAEliminar.getAttribute("LineName"))
            /* console.log("LineName 1", LineName) */
            // Elimina la linea del Line (Frontend)
            for (let i = 0; i < Line.length; i++) {
                if(LineName == Line[i].NL) {
                    Line.splice(i, 1);
                }   
            }

            // Manejo los Pines de conexion de los elementos asociados a la linea eliminada
            // Tomo el Id del nodo fuente
            source = LineaAEliminar.getAttribute("Source")
            // Tomo el Id del nodo receptor
            receptor = LineaAEliminar.getAttribute("Receptor")
            // Obtengo el pin donde está conectado en el nodo receptor
            pinIdEnd = LineaAEliminar.getAttribute("pinIdEnd")
            // Obtengo el pin donde está conectado en el nodo receptor
            pinIdIni = LineaAEliminar.getAttribute("pinIdIni")
            HandlePinConection(frameworkBox, receptor, pinIdEnd)
            HandlePinConection(frameworkBox, source, pinIdIni)

            /* console.log("entro 2")
            console.log("LineName", LineName) */
            // Del Backend
            var dataDeleteLine = {
                idred: idredValue,
                nombre: LineName,
            }
            DeleteLineBackend(dataDeleteLine).then(() => {

                // Actualizo las lineas y los elementos en el framework
                lineas = frameworkBox.getElementsByClassName('line');

                NLine = 0
                //Cambio la numeración de las lineas y Los colores en los pines
                for (let i = 0; i < lineas.length; i++) {
                    // Tomo el Id del nodo fuente
                    source = lineas[i].getAttribute("Source")
                    // Tomo el Id del nodo receptor
                    receptor = lineas[i].getAttribute("Receptor")
                    // Obtengo el pin donde está conectado en el nodo receptor
                    pinIdEnd = lineas[i].getAttribute("pinIdEnd")
                    // Obtengo el pin donde está conectado en el nodo receptor
                    pinIdIni = lineas[i].getAttribute("pinIdIni")

                    // Cambio el color de los pines de los nodos  
                    HandlePinConection(frameworkBox, receptor, pinIdEnd)
                    HandlePinConection(frameworkBox, source, pinIdIni)

                    LineName = parseInt(lineas[i].getAttribute("LineName"));  
                    lineas[i].setAttribute("LineName", i+1);  

                    var dataChangeLine = {
                        idredOriginal: idredValue,
                        nombreOriginal: LineName,
                        nombreNew: i+1
                    }
                    /* console.log("dataChangeLine - Datos", dataChangeLine) */
                    CambiarLineaBackend(dataChangeLine)

                }

                NLine = lineas.length
                ActualizarParametros()        

            })

            LineaAEliminar.remove()
        }   
    });
    
    
    

}


// Actualizar parametros backend

async function ActualizarParametros() {
    Nnodos = N + NG1 + NG2 + NG3 + NLoad + NStorage + S + 1;
    // Cambio los Parametros del Problema
    var dataCambiarParametros = {
        idredOriginal: idredValue, // Id de la red
        // Nuevos Valores
        NNew: N, // Numeros de Bus
        NG1New: NG1, // Numeros de NG1
        NG2New: NG2, // Numeros de NG2
        NG3New: NG3, // Numeros de NG3
        SNew: S, // Numeros de Source
        NLoadNew: NLoad, // Numeros de Load
        NStorageNew: NStorage, // Numeros de Storage
        NLineNew:  NLine, // Numeros de lineas
        NnodosNew: Nnodos, // Numeros total de Nodos
    }
/*  console.log("CambiarParametrosBackend - Datos", dataCambiarParametros) */
    await CambiarParametrosBackend(dataCambiarParametros)
}


