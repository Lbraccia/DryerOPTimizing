async function Load(e){
    if(FlagLoad == false){

      // Activo la animacion del mouse
      startLoad()

      if(FlagShowSolution == false){ 
        // Si estoy mostrando la solucion (estoy en la seccion show solution)
        // Limpio el frontend y vuelvo a seccion de edición
        await ShowSolution(event, true)
        cleanFlechas()
/*         let lineasFrontend = frameworkBox.getElementsByClassName('linea linea-flechas');
        lineasFrontend.forEach(lineas => lineas.classList.remove('linea-flechas')) */
      } 

      // Agregar un popup para que me permita seleccionar los casos relacionados con el usuario 
      // Obtengo el dato
      dataFiltrarRed = {
          idred: idredValue,
      }
      // Obtengo los nodos del backend relacionados con la red idred
      await FiltrarParametrosBackend(dataFiltrarRed)
      .then(dataParameterDB => {
        Parameter = dataParameterDB.message[0]
        Layer = Parameter.Layer
        P = Parameter.P
        PLBg = Parameter.PLBg
        QLBg = Parameter.QLBg
        PUBg = Parameter.PUBg
        QUBg = Parameter.QUBg
        VLBg = Parameter.VLBg
        VUBg = Parameter.VUBg
        ILBg = Parameter.ILBg
        IUBg = Parameter.IUBg  

        idKey = Parameter.idKey

      if(Layer != null){
        if(Layer == 'Regular'){
          SelectMapRegular()
        } else if (Layer == 'Satelital'){
          SelectMapSatelital()
        } else if (Layer == 'Relieve'){
          SelectMapRelieve()
        } else if (Layer == 'None'){
          SelectMapEmpty()
        }
      } else {
        SelectMapEmpty()
        let Layer = 'None'
      }
    

      })
      .catch(error => {
        console.error('Error:', error);
      });

      // reincio Nnodos
      Nnodos = 1

      dataFiltrarRed = {
          idred: idredValue,
      }
      // Obtengo los nodos del backend relacionados con la red idred
      await FiltrarNodeBackend(dataFiltrarRed)
      .then(dataNodeDB => {
        const nodos = dataNodeDB.message
        nodos.forEach(nodoData => {
          // Creo lo elementos
          /* console.log(nodoData) */
          CrearObjeto(e, nodoData) 
        });     
      })
      .catch(error => {
        console.error('Error:', error);
      });
      
      startLoad()
      // Obtengo las lineas del backend relacionados con la red idred
      await FiltrarLineaBackend(dataFiltrarRed)
      .then(async dataLineDB => {
        // Activo la animacion del mouse
        const lines = dataLineDB.message
        await lines.forEach(async lineData =>  {
          /* console.log(lineData) */
          await DrawLineFromBackend(lineData)
          // Creo lo elementos
          //CrearObjeto(e, nodoData) 
          // Finalizo la animacion del mouse
          endLoad(MouseAnimation)
         
        });     
      })
      .catch(error => {
        console.error('Error:', error);
      });

      endLoad(MouseAnimation)
      
      // Fijo que se ha cargado la red (para no cargar dos veces)
      FlagLoad = true;
    
    }
}
