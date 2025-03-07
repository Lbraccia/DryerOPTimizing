function Prueba(e){

  dataFiltrarNode = {
    idred: idredValue,
    idNodo: 2, // Nodo al que se le quiere ver las conexiones
    //tipos_nodos: '2&3&4&5',//'1&7' // Para filtrar el tipo de nodo conectado
    tipo_line: 'A' // Para filtrar el tipo de linea
  }
  FiltrarNodosCoenctadosBackend(dataFiltrarNode).then(dataNodeDB => {
      NodosConecatadosAlNodo = dataNodeDB.message
      console.log(NodosConecatadosAlNodo)
  })

/*     
  dataFiltrarLinea = {
    idred: idredValue, 
    nodo: 7,
  }
  FiltrarLineaBackend(dataFiltrarLinea).then(dataLineasDB => {
      lineasConectadasAlNodoSource = dataLineasDB.message
      console.log(lineasConectadasAlNodoSource)
  })
 */

/*     // Obtengo el dato
    dataFiltrarRed = {
        idred: idredValue,
    }

    
    // Obtengo los nodos del backend relacionados con la red idred
    FiltrarNodeBackend(dataFiltrarRed)
    .then(dataNodeDB => {
      const nodos = dataNodeDB.message
      nodos.forEach(nodoData => {
        // Creo lo elementos
        console.log(nodoData)

      });     
    })
    .catch(error => {
      console.error('Error:', error);
    }); */


/*     dataFiltrarLine = {
      idred: idredValue,
    }

    // Obtengo las lineas del backend relacionados con la red idred
    FiltrarLineaBackend(dataFiltrarLine)
    .then(dataLineDB => {
      const lines = dataLineDB.message
      // console.log(lines) 
      lines.forEach(lineData => {
        // console.log(lineData) 
        console.log(lineData.nombre) 
      });     
    })
    .catch(error => {
      console.error('Error:', error);
    });  */


  
/*  
    dataFiltrarRed = {
      idusuario: iduser,
    }
    console.log("dataFiltrarRed", dataFiltrarRed)
    // Obtengo las redes del backend relacionados con el usuario
    FiltrarRedBackend(dataFiltrarRed)
    .then(dataRedDB => {
      const redes = dataRedDB.message
      redes.forEach(redData => {
        console.log(redData)
      });     
    })
    .catch(error => {
      console.error('Error:', error);
    }); 
 */

/*   
  // Creo una red en el Backend
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const currentTime = new Date().toISOString().split('T')[1].split('.')[0]; // HH:MM:SS
  dataCrearRed = {
    nombre: "Ejemplo 1",
    idusuario: iduser,
    fecha: currentDate,
    hora: currentTime
  }       
  // Obtengo las redes del backend relacionados con el usuario
  CrearRedBackend(dataCrearRed)
 */
/* 
   // Elimino una red en el Backend
   dataDeleteRed = {
     idusuario: iduser,
   }       
   // Obtengo las redes del backend relacionados con el usuario
   DeleteRedBackend(dataDeleteRed) 

 */

/* 
  // Cambio valores de una red en el Backend
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const currentTime = new Date().toISOString().split('T')[1].split('.')[0]; // HH:MM:SS
  dataCrearRed = {
    iUsuarioOriginal: 1, // Id del usuario
    NombreOriginal: "Ejemplo 1", // Id del usuario
    // Nuevos Valores
    nombreNew: "IEEE-33", //#IEEE-33
    idusuarioNew: 1,
    fechaNew: currentDate,
    horaNew: currentTime
  }       
  // Obtengo las redes del backend relacionados con el usuario
  CambiarRedBackend(dataCrearRed)
  */

}