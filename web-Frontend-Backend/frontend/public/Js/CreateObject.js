function CrearObjeto(e, dataNode = null) {
    // Se comienza la creación del Nodo
    FlagCreateNode = true; 


    if(FlagShowSolution == false){
        // Si estoy mostrando la solucion (estoy en la seccion show solution)
        // Limpio el frontend y vuelvo a seccion de edición
        ShowSolution(event, true)
        cleanFlechas()
      }
      
    // Activo la animacion del mouse
    startLoad()

    
    // Tomo los límites del Framework
    rectFramework = frameworkBox.getBoundingClientRect();
    
    //Creo el Objeto
    selected = document.createElement("div");
    frameworkBox.appendChild(selected);

    if (dataNode==null) {
        Nnodos++ // Esta variable se utiliza para el nombre
        selected.id = idKey++ // id Es un key único para cada objeto (aunque se borren los elementos)
    } else {
    /*     Nnodos = parseInt(dataNode.idNodo)
        //
        selected.id = Nnodos// id Es un key único para cada objeto (aunque se borren los elementos) */
        selected.id = parseInt(dataNode.idNodo)
        Nnodos++
    }
    if(dataNode == null){
        // Si no se envía un nodo para cargar 
        if (e.type === "click") {
            Type = objetoClick.id;
        } else if(e.type === "drop"){
            Type = e.dataTransfer.getData("type")
        } else {
            console.log("error");
        }
    } else {
        // Se envía un nodo para cargar 
        Type = TypeFunction(dataNode) 
    }

    CreateObject(Type)(e, dataNode)

    // Finalizo la animacion del mouse
    endLoad(MouseAnimation)
/* 
    // Incorporo información de acuerdo al tipo de objeto agregado
    if (Type === "I1"){
    // Si el objeto arrastrado es un nodo lo creo
        CrearNodo(e, dataNode)
    } else if(Type === "I2") {
    // Si el objeto arrastrardo es un generación tipo 1 la creo
        CrearG1(e, dataNode)
    } else if(Type === "I3") {
    // Si el objeto arrastrardo es un generación tipo 2 la creo
        CrearG2(e, dataNode)
    } else if(Type === "I4") {
    // Si el objeto arrastrardo es un generación tipo 3 la creo
        CrearG3(e, dataNode)   
    } else if(Type === "I5") {
        // Si el objeto arrastrardo es un almacenador 
        CrearStorage(e, dataNode)   
    } else if(Type === "I6") {
    // Si el objeto arrastrardo es una carga
        CrearLoad(e, dataNode)   
    } else if(Type === "I7") {
        // Si el objeto arrastrardo es una grid 
        CrearSource(e, dataNode)   
    } else {

    }
 */

}


// Funcion que permite crear objetos según el tipo (e, dataNode) son parametros utilizados para crear desde el backend
const CreateObject = (Type) => {
    const functions = {
      'I1': (e, dataNode) => CrearNodo(e, dataNode),
      'I2': (e, dataNode) => CrearG1(e, dataNode),
      'I3': (e, dataNode) => CrearG2(e, dataNode),
      'I4': (e, dataNode) => CrearG3(e, dataNode),
      'I5': (e, dataNode) => CrearStorage(e, dataNode),
      'I6': (e, dataNode) => CrearLoad(e, dataNode),
      'I7': (e, dataNode) => CrearSource(e, dataNode),
    };
  
    return functions[Type] || ((e, dataNode) => { console.log("Tipo no válido"); });
  };






