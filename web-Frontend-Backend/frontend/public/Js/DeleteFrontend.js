function DeleteFrontend() {
    let lineas = frameworkBox.getElementsByClassName('line');
    console.log(lineas)
    if( lineas.length != 0){
        // Iteramos en reversa para evitar problemas con los índices
        for (let i = lineas.length - 1; i >= 0; i--) {
            lineas[i].remove();
        }
    }

    objectsInFramework = document.getElementById("framework").getElementsByClassName("objeto");
    if( objectsInFramework.length != 0){
        for (let i = objectsInFramework.length - 1; i >= 0;i--) {
            objectsInFramework[i].remove()
           // selectedElements.push(objectsInFramework[i]);
        }    
    }
}