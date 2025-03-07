async function DGridRun(){

    this.flagSolver = "";
    //$("body").css("cursor", "progress");
    this.SpinnerResult=false;
    // Vuelvo a poner la flag de obtención de solucion en false
    flag_SolutionGet = false;


    if(FlagShowSolution == false){
      // Si estoy mostrando la solucion (estoy en la seccion show solution)
      // Limpio el frontend y vuelvo a seccion de edición
      ShowSolution(event, true)
      cleanFlechas()
    }
    
    // Activo la animacion del mouse
    startLoad()

    // Actualizo los parámetros del problema
    objectsInFramework = document.getElementById("framework").getElementsByClassName("objeto");
    LinesInFramework = document.getElementById("framework").getElementsByClassName("line");
    // Convertir HTMLCollection a array
    objectsInFrameworkArray = Array.from(objectsInFramework);
    // Obtengo los nodos
    var objectsNodos = filtrarPorTipo(objectsInFrameworkArray, 'Node');
    N = objectsNodos.length
    // Obtengo las DG1
    var objectsDG1 = filtrarPorTipo(objectsInFrameworkArray, 'DG1');
    NG1 = objectsDG1.length
    // Obtengo las DG2
    var objectsDG2 = filtrarPorTipo(objectsInFrameworkArray, 'DG2');
    NG2 = objectsDG2.length
    // Obtengo las DG3
    var objectsDG3 = filtrarPorTipo(objectsInFrameworkArray, 'DG3');
    NG3 = objectsDG3.length
    // Obtengo las fuentes
    var objectsS = filtrarPorTipo(objectsInFrameworkArray, 'S');
    S = objectsS.length
    // Obtengo las cargas
    var objectsLoad = filtrarPorTipo(objectsInFrameworkArray, 'Load');
    NLoad = objectsLoad.length
    // Obtengo los storage
    var objectsStorage = filtrarPorTipo(objectsInFrameworkArray, 'Storage');
    NStorage = objectsLoad.length

    // Cambio los Parametros del Problema
    var dataCambiarParametros = {
      idredOriginal: idredValue, // Id de la red
      // Nuevos Valores
      PNew: P, 
      NnodosNew:  objectsInFramework.length, // Numero totales de Objetos
      NLineNew:  LinesInFramework.length, // Numero totales de Objetos
      NNew: N, // Numeros de nodos
      NG1New:  NG1, // Numeros de Generaciones de tipo 1
      NG2New:  NG2, // Numeros de Generaciones de tipo 2
      NG3New:  NG3, // Numeros de Generaciones de tipo 3
      SNew:  S, // Numeros de fuentes
      NLoadNew:  NLoad, // Numeros de Cargas
      NStorageNew:  NStorage, // Numeros de storage
    }
    CambiarParametrosBackend(dataCambiarParametros)


    // Verifico los nodos y las lineas
    DataIsOk = true;

    if(DataIsOk){
      const urlNodo = `http://127.0.0.1:8000/DGridDesign/v1.0.0/Solutions/DGDesign/`
      // Datos que deseas enviar en la solicitud POST
      const postData = {
          idUser: iduser, 
          idred: idredValue,
        };
      axios.post(urlNodo, postData)
      .then(response => {
        /* console.log('Respuesta del servidor:', response.data); */
        solution = response.data
        //$("body").css("cursor", "");
        // Finalizo la animacion del mouse
        endLoad(MouseAnimation)
        // Permite mostrar la solucion una vez finalizada la optimizacion
        ShowSolution(event)

      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
        // Finalizo la animacion del mouse
        endLoad(MouseAnimation)
      });
    } else {
      console.error('Inconsistent data:');
      // Finalizo la animacion del mouse
      endLoad(MouseAnimation)
    }

}
  
// Para fitrar segun tipo 
// Filtrar los elementos según el atributo 'tipo'
function filtrarPorTipo(objetosArray, tipo) {
  return objetosArray.filter(function(objeto) {
      return objeto.getAttribute('Type') === tipo;
  });
}
