async function CrearG1(e, dataNode = null){    

  NG1 = dataNode == null ? parseInt(NG1) + 1 : dataNode.nombre

  selected.className = "objeto";
  var imagen = document.createElement('img');
  selected.setAttribute("NodeName", NG1);
  selected.setAttribute("type", "DG1");
  selected.setAttribute("fi_g", 0.95);
  selected.setAttribute("PgUB", 1e3);
  selected.setAttribute("PgLB", 0);
  selected.setAttribute("QgUB", 1e3);
  selected.setAttribute("QgLB", 0);
  imagen.src = '/Img/svg/solarEnergyColor.svg';  

  // Creo el popup
  selected.setAttribute("ondblclick", "openPopupGenerations(event)");

  // Asigno que el elemento sea draggable
  DraggableFunction()

  selected.style.border = WidthNode + "px solid " + ColorNode;
  selected.style.position = "absolute";
  selected.style.backgroundColor = "transparent";
  selected.style.background = backgroundColorObject;
  selected.style.width = "auto"; // O ajusta según sea necesario
  selected.style.height = "auto"; // O ajusta según sea necesario
  selected.style.transform = `scale(${zoomScaleNew})`;
  selected.style.cursor = 'grab'; 
  /* selected.textContent = "G1 -  " + NodeName; 
  selected.style.fontSize = '8px'; */ 

  if(dataNode == null){
    // Si no se crea desde el backend se crea el nodo con el click del mouse
    x = e.clientX - rectFramework.left - 0.5 *selected.offsetWidth
    y = e.clientY - rectFramework.top - 0.5 * selected.offsetHeight
    angulo = 0; // Angulo de rotacion Inicial 
    xPinL = String(originalLeft) + "%"; // Posisicon relativa del pin en x
    yPinT = String(originalTop) + "%"; // Posisicon relativa del pin en y
  } else{
    // Si se está cargando desde el backend tomo los valores de lat y lng
    lat = dataNode.lat
    lng = dataNode.lng
    var latLng = [lat, lng]; 
    var point = map.latLngToContainerPoint(latLng);
    x=point.x - 0.5 *selected.offsetWidth
    y=point.y - 0.5 *selected.offsetHeight
    angulo = dataNode.anguloPin // Angulo de rotacion Inicial 
    PinIniLat = dataNode.PinIniLat
    PinIniLng = dataNode.PinIniLng
    xPinL = dataNode.xPinL; // Posisicon relativa del pin en x
    yPinT = dataNode.yPinT; // Posisicon relativa del pin en y
  }

  // Crear un nuevo elemento y asignarle un identificador único

  selected.style.left = x + "px";
  selected.style.top = y + "px";

  // Creo el Div para el nombre
  divInterior = document.createElement("div");
  divInterior.textContent = "G1 -  " + NG1; 
  divInterior.style.userSelect = "none";
  divInterior.style.draggable = false;	
  divInterior.style.position = "relative";
  divInterior.style.top = parseFloat(selected.offsetWidth) + 5 + 'px';
  divInterior.style.fontSize = '12px';

  // Posicion en el mapa
  // Convertir las coordenadas de cliente a coordenadas del contenedor
  var point = map.containerPointToLatLng([x + 0.5 * selected.offsetWidth, y + 0.5 * selected.offsetHeight]);
  selected.setAttribute("cordX", point.lat);
  selected.setAttribute("cordY", point.lng);



  // Mostrar un popup en la posición clickeada
  /* 		
  L.popup()
  .setLatLng(point)
  .setContent("Latitud: " + point.lat.toFixed(4) + "<br>Longitud: " + point.lng.toFixed(4))
  .openOn(map); */
      
  // agergo sombra al objeto
  //selected.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";

  // Creamos los pines de entrada y salida
  
  let contenedorObjeto = document.createElement("div");
  contenedorObjeto.className = "ContenedorObjeto";
  selected.appendChild(contenedorObjeto);

  let pinE = document.createElement("div");
  pinE.className = "pin";
  pinE.classList.add('pin');
  pinE.style.zIndex = "1";
 /*  pinE.style.bottom = "-20%"; */
  pinE.style.top = String(originalTop) + "%";
  pinE.style.left = String(originalLeft) + "%";
  pinE.id = "P" + i;
  // Funcion para iniciar la conexións
  pinE.setAttribute("NLineInPin", 0);

  selected.setAttribute("xPinL", xPinL)
  selected.setAttribute("yPinT", yPinT)
  selected.setAttribute("angle", angulo)

  // Función y variable que permite limitar el numero de conexiones 
  pinE.setAttribute("AvailablePin", true);
  pinE.setAttribute("onmouseover", "AvailablePin(event)");
  
  contenedorObjeto.appendChild(pinE);
  contenedorObjeto.appendChild(imagen);       
  selected.appendChild(divInterior);
  
  // Roto los elementos internos en sentido contario para que queden derecho
  let angulo2 = -angulo; // Incrementamos el ángulo en 90 grados cada vez que se llama a la función  
  childrens =  selected.children[0]
  childrens.style.transform = "rotate(" + angulo + "deg)";
  childrens.children[1].style.transform = "rotate(" + angulo2 + "deg)";

  // Se finaliza la creación de Nodos
  FlagCreateNode = false; 
  // Envío los datos al backend
  /* const urlNode = 'http://127.0.0.1:8000/DGridDesign/v1.0.0/Nodo/' */
  var dataNode = {
    idred: idredValue,
    idNodo: selected.id, 
    nombre: NG1,
    idtiponodo:  "2",
    idsubtiponodo:  "B",
    x: x, // Posición x 
    y: y, // Posición y
    lat: point.lat, // Latitud
    lng: point.lng, // Longitud
    //Pinlat: point.lat, // Latitud - Pin - No se usan (Ver) 
    //Pinlng: point.lng, // Longitud - Pin - No se usan (Ver)
    xPinL: xPinL, // Latitud - Pin 
    yPinT: yPinT, // Longitud - Pin 
    anguloPin: angulo, // Angulo de Rotacion
    p: dataNode == null ? String([]) : dataNode.p, // potencia activa
    q: dataNode == null ? String([]) : dataNode.q, // potencia reactiva
    fi: dataNode == null ? String([1]): dataNode.fi, // angulo de generacion
    pLB: dataNode == null ? String(String(Array(parseFloat(P)).fill(0))) : dataNode.pLB, // limite inferior de la potencia activa
    qLB: dataNode == null ? String(String(Array(parseFloat(P)).fill(0))) : dataNode.qLB, // limite inferior de la potencia reactiva
    pUB: dataNode == null ? String(String(Array(parseFloat(P)).fill(PUBg))) : dataNode.pUB, // limite superior de la potencia activa
    qUB: dataNode == null ? String(String(Array(parseFloat(P)).fill(QUBg))) : dataNode.qUB, // limite superior de la potencia reactiva
    zOper: dataNode == null ? String(Array(parseFloat(P)).fill(-1)) : dataNode.zOper, // Operacion del nodo 
    /* V: dataNode == null ? String([]) : dataNode.V, // Voltaje */
    VLB: dataNode == null ? String([]) : dataNode.VLB, // limite inferior sobre el Voltaje
    VUB: dataNode == null ? String([]) : dataNode.VUB, // limite superior sobre el Voltaje
/*       p: dataNode == null ? String(Array(parseFloat(P)).fill(0)) : dataNode.p, // potencia activa
    q: dataNode == null ? String(Array(parseFloat(P)).fill(0)) : dataNode.q, // potencia reactiva
    fi: dataNode == null ? String(Array(parseFloat(P)).fill(0)): dataNode.fi, // angulo de generacion
    pLB: dataNode == null ? String(Array(parseFloat(P)).fill(0)) : dataNode.pLB, // limite inferior de la potencia activa
    qLB: dataNode == null ? String(Array(parseFloat(P)).fill(0)) : dataNode.qLB, // limite inferior de la potencia reactiva
    pUB: dataNode == null ? String(Array(parseFloat(P)).fill(0)) : dataNode.pUB, // limite superior de la potencia activa
    qUB: dataNode == null ? String(Array(parseFloat(P)).fill(0)) : dataNode.qUB, // limite superior de la potencia reactiva
    zOper: dataNode == null ? String(Array(parseFloat(P)).fill(1)) : dataNode.zOper, // Operacion del nodo */
    grid: dataNode == null ? false : dataNode.grid // Si tiene un source conectado
 }
  /* axios.post(urlNode, dataNode) */
  await CrearNodoBackend(dataNode)   
  
  // Cambio los Parametros del Problema
  var dataCambiarParametros = {
    idredOriginal: idredValue, // Id de la red
    // Nuevos Valores
    NG1New:  NG1, // Numeros de Generaciones de tipo 1
    NnodosNew:  Nnodos, // Numeros de nodos
    idKeyNew: idKey, // Id de itenficacion
  }
  await CambiarParametrosBackend(dataCambiarParametros)


  
}