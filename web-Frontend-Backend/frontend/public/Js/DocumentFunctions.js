// Permite obtener la cantidad de pixeles que se scrolleó
// Escuchar cambios en el tamaño del div padre
frameworkBox.addEventListener('scroll', function() {

/* 
    newDivScroll = document.createElement("div");
    frameworkBox.appendChild(newDivScroll); */

    //newDivScroll.style.left =  1.25*parseFloat(frameworkBox.scrollLeft) + "px";

   // Obtengo el scroll horizontal y vertical que se realizó
    const scrollHorizontal = frameworkBox.scrollLeft;
    const scrollVertical = frameworkBox.scrollTop;
    // Calculo la diferencia obtenida con las posiciones del scroll anterior
    const dScrollHorizontal = scrollHorizontal - scrollHorizontalAnterior;
    const dScrollVertical = scrollVertical - scrollVerticalAnterior; 

    // Obtengo el acumulado
    sumScrollX = sumScrollX +  dScrollHorizontal;
    sumScrollY = sumScrollY + dScrollVertical;
    
    // Actualizo la posción del scroll anterior
    scrollHorizontalAnterior = scrollHorizontal;
    scrollVerticalAnterior = scrollVertical;

}); 

/* frameworkBox.addEventListener('mousemove', mouseDownHandlerEnd); */

// Evento para el botón de busqueda
Search.addEventListener('mouseover', function(event){
        SearchPositionText.style.visibility = "visible";
        SearchPositionText.classList.remove("oculto");
        SearchPositionText.classList.add("expandido");
    }
)

Search.addEventListener('mouseout', function(event){
        SearchPositionText.style.visibility = "hidden";
        SearchPositionText.classList.add("oculto");
        SearchPositionText.classList.remove("expandido");
    }
)

// Evento para los botones de Layers del mapa
ContenedorLayerMap.addEventListener('mouseover', function(event){
    // Si el mapa está activado
    if(FlagMapOne){
        LayerMap1.style.visibility = "visible";
        LayerMap1.classList.remove("oculto");
        LayerMap1.classList.add("visible");

        LayerMap2.style.visibility = "visible";
        LayerMap2.classList.remove("oculto");
        LayerMap2.classList.add("visible");

        LayerMap3.style.visibility = "visible";
        LayerMap3.classList.remove("oculto");
        LayerMap3.classList.add("visible");

        LayerMap4.style.visibility = "visible";
        LayerMap4.classList.remove("oculto");
        LayerMap4.classList.add("visible");
    }
}
)

/* document.addEventListener("click",function(event){
    console.log(event.target)    
}
) */

ContenedorLayerMap.addEventListener('mouseout', function(event){
    LayerMap1.style.visibility = "hidden";
    LayerMap1.classList.add("oculto");
    LayerMap1.classList.remove("visible");

    LayerMap2.style.visibility = "hidden";
    LayerMap2.classList.add("oculto");
    LayerMap2.classList.remove("visible");

    LayerMap3.style.visibility = "hidden";
    LayerMap3.classList.add("oculto");
    LayerMap3.classList.remove("visible");

    LayerMap4.style.visibility = "hidden";
    LayerMap4.classList.add("oculto");
    LayerMap4.classList.remove("visible");
}
)

function CloseAll(){
    /* Deselection() */
    // Minimizo los popUps
    closePopupNode();
    closePopupLine();
    closePopupLoad();
    closePopupGenerations();
    closePopupParametros();
    closePopupGrid();
    // Paro la creación de los nodos y lineas
    StopCreation()

    // Apreto escape
    Esc()
}


pinLineI = document.getElementsByClassName("pinLineIni");
pinLineE = document.getElementsByClassName("pinLineEnd");
contenedorLineI = document.getElementsByClassName("contenedorLineIni");
contenedorLineE = document.getElementsByClassName("contenedorLineEnd");


function TypeFunction(dataNodeDB) {
    // Mapa de valores
    const map = {
        1: "I1",
        2: "I2",
        3: "I3",
        4: "I4",
        5: "I5",
        6: "I6",
        7: "I7",
    };

    // Devolver el valor correspondiente o undefined si no existe en el mapa
    return map[dataNodeDB.idtiponodo];
}

async function disabled_Buttons() {
    // Obtener todos los elementos con la clase "btn-user-active"
    var botonesActivos = document.querySelectorAll(".btn-user-active");
        // Iterar sobre la lista de elementos
        botonesActivos.forEach(async boton => {
            // Eliminar la clase "btn-user-active"
            boton.classList.remove("btn-user-active");
            // Agregar la clase "btn-user-disable"
            boton.classList.add("btn-user-disable");
    });
}


function active_Buttons() {
    // Obtener todos los elementos con la clase "btn-user-active"
    const botonesActivos = document.querySelectorAll(".btn-user-disable");
        // Iterar sobre la lista de elementos
        botonesActivos.forEach(boton => {
        // Eliminar la clase "btn-user-disable"
        boton.classList.add("btn-user-active");
        // Agregar la clase "btn-user-active"
        boton.classList.remove("btn-user-disable");
       
    });
}




/* // Inicializar la posición del cursor al centro de la ventana
const cursor = document.getElementById('cursor');
cursor.style.left = lastValidX + 'px';
cursor.style.top = lastValidY + 'px'; */



/* frameworkBox.addEventListener('click', function(event){
    console.log(event.target)
    pinLineIni = document.getElementsByClassName("pinLineIni");
    console.log(pinLineIni)
}) */


/* // Permite dejar un margen entre el ultimo elemento y la zona visible del framework
frameworkBox.addEventListener('scroll', function(event) {
    // Verificar si las barras de scroll están visibles
    var barrasVisibles = frameworkBox.scrollHeight > frameworkBox.clientHeight || frameworkBox.scrollWidth > frameworkBox.clientWidth;
    rectFramework = frameworkBox.getBoundingClientRect();
    objectsInFramework = document.getElementById("framework").getElementsByClassName("objeto");
    console.log("objectsInFramework", objectsInFramework)
    console.log("objectsInFrameworklength", objectsInFramework.length)
    for (let i = 0; i < objectsInFramework.length; i++) {
        console.log(objectsInFramework[i])
        let rectobjectsInFramework= objectsInFramework[i].getBoundingClientRect();

        if ( parseFloat(objectsInFramework[i].style.left) + parseFloat(rectobjectsInFramework.width) + (rectFramework.left) > maxLeft){
            maxLeft = parseFloat(objectsInFramework[i].style.left) + parseFloat(rectobjectsInFramework.width) + parseFloat(rectFramework.left);
        } 
        console.log(objectsInFramework[i].style.top)
        console.log(parseFloat(rectFramework.top))
        if(parseFloat(objectsInFramework[i].style.top) + parseFloat(rectobjectsInFramework.height) + (rectFramework.top)  > maxTop){
            maxTop =  parseFloat(objectsInFramework[i].style.top) + parseFloat(rectobjectsInFramework.height) + (rectFramework.top); 
        }
    }

    if (maxLeft > parseFloat(rectFramework.width) && maxTop > parseFloat(rectFramework.height)) {
        frameworkBox.firstElementChild.style.width = parseFloat(maxLeft)+  5 + "px" ;// maxLeft + 25 + "px";
        frameworkBox.firstElementChild.style.height = parseFloat(maxTop) + 5 + "px" ;//maxTop + 25 + "px"; 
    } else {
        frameworkBox.firstElementChild.style.width = "100%" ;// maxLeft + 25 + "px";
        frameworkBox.firstElementChild.style.height ="100%" ;//maxTop + 25 + "px"; 
    }
  });
 */




/* if( parseFloat(objetoSeleccionado.style.left )  > maxLeft){
    let maxLeft =  parseFloat(objetoSeleccionado.style.left) 
}



console.log("=============================")
console.log("maxLeft", maxLeft)
console.log("maxTop", maxTop)




/* 

// Función para manejar el evento de arrastre
frameworkBox.addEventListener('mousemove', function(e) {
    if (isDragging) {
        var deltaY = e.clientY - lastY;
        lastY = e.clientY;

        // Obtener la altura actual del contenedor y el objeto
        var contenedorHeight = frameworkBox.height;

        // Calcular la nueva altura del contenedor
        var newContenedorHeight = contenedorHeight * 2;

        // Establecer la nueva altura del contenedor
        frameworkBox.style.height = newContenedorHeight + 'px';
    }
}); */
/* 
function generarColoresRGBA(P, opacidad) {
    const colores = [];
    for (let i = 0; i < P; i++) {
        // Genera componentes RGB aleatorios
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        // Crea la cadena de color RGBA
        const colorRGBA = `rgba(${red}, ${green}, ${blue}, ${opacidad})`;
        colores.push(colorRGBA);
    }
    return colores;
}
 */



/* Generación de colores */
function generarColoresAzulVioletaRGBA(NumberOfColors, opacidad) {
    const colores = [];
    const mitad = Math.floor(NumberOfColors / 2);

    for (let i = 0; i < NumberOfColors; i++) {
        let hue;

        if (i < mitad) {
            hue = 100 + (60 * i / mitad);
        } else {
            /* hue = 240 + (60 * (i - mitad) / (NumberOfColors - mitad)); */
            hue =  348.18 + (60 * (i - mitad) / (NumberOfColors - mitad)); 
        }

        const saturacion = 70;
        const luminosidad = 60;

        // Convertir HSL a RGB
        const rgb = hslToRgb(hue, saturacion, luminosidad);

        // Crear la cadena de color RGBA
        const colorRGBA = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacidad})`;
        colores.push(colorRGBA);
    }
    return colores;
}

// Función para convertir HSL a RGB
function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;

    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));

    return {
        r: Math.round(255 * f(0)),
        g: Math.round(255 * f(8)),
        b: Math.round(255 * f(4))
    };
}



function generarColoresVariadosRGB(P, opacidad, rangoVariacion) {
    const colores = [];
    const mitad = Math.floor(P / 2);
  
    const color1Base = { r: 54, g: 162, b: 235 }; // RGB(54, 162, 235)
    const color2Base = { r: 255, g: 99, b: 132 }; // RGB(255, 99, 132)
  
    for (let i = 0; i < P; i++) {
      let rgb;
  
      if (i < mitad) {
        rgb = generarColorVariado(color1Base, rangoVariacion);
      } else {
        rgb = generarColorVariado(color2Base, rangoVariacion);
      }
  
      const colorRGBA = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacidad})`;
      colores.push(colorRGBA);
    }
    return colores;
  }
  
  function generarColorVariado(colorBase, rango) {
    const r = Math.min(255, Math.max(0, colorBase.r + Math.floor(Math.random() * 2 * rango - rango)));
    const g = Math.min(255, Math.max(0, colorBase.g + Math.floor(Math.random() * 2 * rango - rango)));
    const b = Math.min(255, Math.max(0, colorBase.b + Math.floor(Math.random() * 2 * rango - rango)));
    return { r, g, b };
  }
  /* 
  // Ejemplos de uso:
  const P1 = 8;
  const opacidad1 = 0.55;
  const rangoVariacion1 = 30; // Ajusta el rango de variación
  const coloresGenerados1 = generarColoresVariadosRGB(P1, opacidad1, rangoVariacion1);
  console.log(coloresGenerados1);
  
  const P2 = 10;
  const opacidad2 = 0.8;
  const rangoVariacion2 = 50; // Ajusta el rango de variación
  const coloresGenerados2 = generarColoresVariadosRGB(P2, opacidad2, rangoVariacion2);
  console.log(coloresGenerados2); */



  function generarColores(NumberOfColors, colorBase1, colorBase2, opacidadBase = 1) {
    if (NumberOfColors % 2 !== 0) {
      throw new Error("NP debe ser un número par");
    }
  
    const mitad = NumberOfColors / 2;
    const colores = [];
  
    for (let i = 0; i < mitad; i++) {
      colores.push(generarTonalidad(colorBase1, i, mitad, opacidadBase));
    }
  
    for (let i = 0; i < mitad; i++) {
      colores.push(generarTonalidad(colorBase2, i, mitad, opacidadBase));
    }
  
    return colores;
  }
  
  function generarTonalidad(colorBase, indice, total, opacidad) {
    const factor = indice / total;
    const r = Math.round(colorBase.r + (255 - colorBase.r) * factor);
    const g = Math.round(colorBase.g + (255 - colorBase.g) * factor);
    const b = Math.round(colorBase.b + (255 - colorBase.b) * factor);
    return `rgba(${r}, ${g}, ${b}, ${opacidad})`;
  }
  