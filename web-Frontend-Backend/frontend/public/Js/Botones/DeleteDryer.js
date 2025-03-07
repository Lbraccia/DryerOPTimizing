async function DeleteRed(){
    console.log("FlagLoad: ", FlagLoad)
    if(FlagLoad){
        if (confirm("Estas Seguro que Quieres Eliminar la Red?")) {  
            /* // Si no hay elementos seleccionados Elimino todos los Nodos
            // Incluyo todos los elementos en la variable de elementos Seleccionados
            if( objectsInFramework.length != 0){
                for (let i = 0; i < objectsInFramework.length; i++) {
                    selectedElements.push(objectsInFramework[i]);
                }
                // Borro del Frontend los elementos
                DeleteNode(selectedElements)
            } */
           DeleteFrontend()

        }
    }

    dataDeleteRed = {
        idUser: iduser,
        idred: idredValue
    }
    await DeleteRedBackend(dataDeleteRed)

    // Vuelvo abrir el popUp para cargar una red o crear una nueva
    SelectRed(event)
    
    //Se elimino la red cargada
    FlagLoad = false;   
 }
 