async function initMap() {

  // Crear el mapa centrado en Nueva York
  /* map.setView([40.7128, -74.0060], zoomReference); */
 /*  rosario -32.9515008 -60.6404608 */
  zoomScale = map.getZoomScale(map.getZoom(), zoomReference)*1;
  zoomScaleNew = map.getZoomScale(map.getZoom(), zoomReference)*1;

  // Cargo la red (Debería crear un pag para logear el usuario)
  dataFiltrarRed = {
    idUser: iduser,
  }
  // Obtengo las redes del backend relacionados con el usuario
  await FiltrarRedBackend(dataFiltrarRed)
  .then(dataRedDB => {
  const redes = dataRedDB.message
  redes.forEach(redData => {
    /* console.log(redData) */
      idredValue = redData.id
      //idredValue = 1 // Permite seleccionar unas de las redes asociadas al usuario
      NombreredValue = redData.nombre
      
      /* console.log("idredValue", idredValue) */
      // Obtengo los parámetros (el layer podría gurdarlo en el modelo soluciones y cargarlo al momento de cargar una solucion)
      let dataFiltrarParametros = {
        idred: idredValue,
      }
      FiltrarParametrosBackend(dataFiltrarParametros)
      .then(dataParametroDB => {
        /* console.log("dataParametroDB.message", dataParametroDB.message)  */
        const Parametro = dataParametroDB.message
        Parametro.forEach(ParametroData => {
          /* console.log("ParametroData.centerLat", ParametroData.centerLat) 
          console.log("ParametroData.centerLng", ParametroData.centerLng)  */
          centerValue = [ParametroData.centerLat, ParametroData.centerLng]
          /* zoomReference =  ParametroData.zoom */
          map.setView(centerValue, zoomReference);
          Layer = ParametroData.Layer;
              
          map.dragging.disable(); 
          // Añadir capa de OpenStreetMap
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            zoom: zoomReference,       // Nivel de zoom inicial
            minZoom: minZoomValue,    // Nivel de zoom mínimo permitido (igual al nivel inicial)
            maxZoom: maxZoomValue,              // Nivel de zoom máximo permitido
            zoomSnap: zoomSnapValue,
            zoomDelta: zoomDeltaValue,
            wheelPxPerZoomLevel: 150 // Ajuste la sensibilidad del scroll

          }).addTo(map);

          // Agregar una capa base de OpenStreetMap
          var mapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: minZoomValue,    // Nivel de zoom mínimo permitido (igual al nivel inicial)
            maxZoom: maxZoomValue,              // Nivel de zoom máximo permitido
            zoomSnap: zoomSnapValue,
            zoomDelta: zoomDeltaValue,
          }).addTo(map);

          // Se hace visible el mapa
          FlagMapOne = true;
          Mapa.style.visibility =  "visible";
          Mapa.style.zIndex = 1;

        /* 
        +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'

            .on('markgeocode', function(e) {
              var bbox = e.geocode.bbox;
              var poly = L.polygon([
                bbox.getSouthEast(),
                bbox.getNorthEast(),
                bbox.getNorthWest(),
                bbox.getSouthWest()
              ]).addTo(map);

              map.fitBounds(poly.getBounds());
            })
            .addTo(map);
            */

          LayerMap1.style.border = "2px solid #4285f4";
          LayerMap2.style.border = "1px solid gainsboro";
          LayerMap3.style.border = "1px solid gainsboro";
          LayerMap4.style.border = "1px solid gainsboro";
        /* 
        // Añadir un marcador en Nueva York
          L.marker([40.7128, -74.0060]).addTo(map)
            .bindPopup("Hola desde Nueva York!")
            .openPopup() */;


        /*     // Añade un evento para manejar el clic en el mapa
            map.on('click', function(e) {
              var lat = e.latlng.lat; // Latitud
              var lng = e.latlng.lng; // Longitud

              console.log('Coordenadas:', lat, lng);

              // Puedes mostrar las coordenadas en un popup, en la consola o en otro lugar
              L.popup()
                .setLatLng(e.latlng)
                .setContent("Latitud: " + lat.toFixed(4) + "<br>Longitud: " + lng.toFixed(4))
                .openOn(map);
            });
        */

          // Establezco el layer inicial 
          LayerDefinition(Layer)()

/*           if(Layer != null){
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
          } */
        
        });  
    })
    .catch(error => {
      console.error('Error:', error);
    });    
  });    
  })
  .catch(error => {
  console.error('Error:', error);
  }); 
}

const LayerDefinition = (Layer) =>{
  Layer = Layer || 'None';
  return({
  'Regular':  SelectMapRegular,
  'Satelital': SelectMapSatelital,
  'Relieve': SelectMapRelieve,
  'None': SelectMapEmpty,
  }[Layer] ?? SelectMapEmpty)
}


function ShowLayers(){

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

// Seleccionar el Mapa Regular
function SelectMapRegular(){
  // Agregar una capa base de OpenStreetMap
  var mapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom: minZoomValue,    // Nivel de zoom mínimo permitido (igual al nivel inicial)
        maxZoom: maxZoomValue,              // Nivel de zoom máximo permitido
        zoomSnap: zoomSnapValue,
        zoomDelta: zoomDeltaValue,
  }).addTo(map);

  LayerMap1.style.border = "2px solid #4285f4";
  LayerMap2.style.border = "1px solid gainsboro";
  LayerMap3.style.border = "1px solid gainsboro";
  LayerMap4.style.border = "1px solid gainsboro";

  // Cambio el calor de los nodos (Quito el Color)
  objectsInFramework = document.getElementById("framework").getElementsByClassName("objeto");
  backgroundColorObject="";
  
  for (let i = 0; i < objectsInFramework.length; i++) {
    objectsInFramework[i].style.background = backgroundColorObject;
  }

  Mapa = document.getElementById('map');
  Mapa.style.opacity = 0.65;

  let Layer = 'Regular'
  var dataCambiarParametros = {
    idredOriginal: idredValue, // Id de la red
    // Nuevos Valores
    LayerNew:  Layer, // Layer del mapa
  }
  CambiarParametrosBackend(dataCambiarParametros)
  
}

// Seleccionar el Mapa Satelital
function SelectMapSatelital(){
  // Agregar una capa de imagen satelital
  var satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
      minZoom: minZoomValue,    // Nivel de zoom mínimo permitido (igual al nivel inicial)
      maxZoom: maxZoomValue,              // Nivel de zoom máximo permitido
      zoomSnap: zoomSnapValue,
      zoomDelta: zoomDeltaValue,
  }).addTo(map);

  LayerMap1.style.border = "1px solid gainsboro";
  LayerMap2.style.border = "2px solid #4285f4";
  LayerMap3.style.border = "1px solid gainsboro";
  LayerMap4.style.border = "1px solid gainsboro";

  // Cambio el calor de los nodos (Para resaltar)
  objectsInFramework = document.getElementById("framework").getElementsByClassName("objeto");
  //backgroundColorObject="darkblue";
  backgroundColorObject="";

  for (let i = 0; i < objectsInFramework.length; i++) {
    objectsInFramework[i].style.background = backgroundColorObject;
  }

  Mapa = document.getElementById('map');
  Mapa.style.opacity = 0.35;

  let Layer = 'Satelital'
  var dataCambiarParametros = {
    idredOriginal: idredValue, // Id de la red
    // Nuevos Valores
    LayerNew:  Layer, // Layer del mapa
  }
  CambiarParametrosBackend(dataCambiarParametros)
}

// Seleccionar el Mapa del Relieve
function SelectMapRelieve(){
  // Opcionalmente, puedes agregar una capa de relieve
  var reliefLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
      minZoom: minZoomValue,    // Nivel de zoom mínimo permitido (igual al nivel inicial)
      maxZoom: maxZoomValue,              // Nivel de zoom máximo permitido
      zoomSnap: zoomSnapValue,
      zoomDelta: zoomDeltaValue,
  }).addTo(map);
  

  LayerMap1.style.border = "1px solid gainsboro";
  LayerMap2.style.border = "1px solid gainsboro";
  LayerMap3.style.border = "2px solid #4285f4";
  LayerMap4.style.border = "1px solid gainsboro";

  // Cambio el calor de los nodos (Quito el Color)
  objectsInFramework = document.getElementById("framework").getElementsByClassName("objeto");
  backgroundColorObject="";

  for (let i = 0; i < objectsInFramework.length; i++) {
    objectsInFramework[i].style.background = backgroundColorObject;
  }

  Mapa = document.getElementById('map');
  Mapa.style.opacity = 0.65;
  
  let Layer = 'Relieve'
  var dataCambiarParametros = {
    idredOriginal: idredValue, // Id de la red
    // Nuevos Valores
    LayerNew:  Layer, // Layer del mapa
  }
  CambiarParametrosBackend(dataCambiarParametros)
}


// Seleccionar el Mapa del Relieve
function SelectMapEmpty(){
  // Opcionalmente, puedes agregar una capa vacía
  map.eachLayer(function(layer) {
    map.removeLayer(layer)
  });
  // Cargo una capa vacía
  var emptyLayer = L.tileLayer('', {
      attribution: 'Capa En Blanco',
      minZoom: minZoomValue,    // Nivel de zoom mínimo permitido (igual al nivel inicial)
      maxZoom: maxZoomValue,              // Nivel de zoom máximo permitido
      zoomSnap: zoomSnapValue,
      zoomDelta: zoomDeltaValue,
  }).addTo(map);

  LayerMap1.style.border = "1px solid gainsboro";
  LayerMap2.style.border = "1px solid gainsboro";
  LayerMap3.style.border = "1px solid gainsboro";
  LayerMap4.style.border = "2px solid #4285f4";

  // Cambio el calor de los nodos (Quito el Color)
  objectsInFramework = document.getElementById("framework").getElementsByClassName("objeto");
  backgroundColorObject="";

  for (let i = 0; i < objectsInFramework.length; i++) {
    objectsInFramework[i].style.background = backgroundColorObject;
  }

  Mapa = document.getElementById('map');
  Mapa.style.opacity = 0.65;

  let Layer = 'None'
  var dataCambiarParametros = {
    idredOriginal: idredValue, // Id de la red
    // Nuevos Valores
    LayerNew:  Layer, // Layer del mapa
  }
  CambiarParametrosBackend(dataCambiarParametros)

}

// Obtener Posición   
function obtenerPosicion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
/*         console.log("lat", lat)
        console.log("lng", lng) */
         map.setView([lat, lng], 12),
        alert(`Ubicación del usuario:\nLatitud: ${lat}\nLongitud: ${lng}`);
      },
      function (error) {
        // Manejar errores
        if (error.code === error.PERMISSION_DENIED) {
          alert("Permiso denegado para obtener la ubicación.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          alert("Ubicación no disponible.");
        } else if (error.code === error.TIMEOUT) {
          alert("Tiempo de espera agotado para obtener la ubicación.");
        } else {
          alert("Error desconocido al obtener la ubicación.");
        }
      }
    );
  } else {
    alert("La geolocalización no es compatible con este navegador.");
  }
}

// Buscador de Posición
function SearchLocation(){
  
}

map.on('dragstart', function(event){
  Mapa = document.getElementById('map');
  Mapa.style.cursor = 'grab'; 
  // Actualizo las posiciones de las lineas
  UpdateNodePosition()
  // Actualizo las posiciones de las lineas
  UpdateLinePosition()
})

 // Evento de arrastre
 map.on('drag', function(event) {
  Mapa = document.getElementById('map');
  Mapa.style.cursor = 'grabbing'; 
  // Actualizo las posiciones de las lineas
  UpdateNodePosition()
  // Actualizo las posiciones de las lineas
  UpdateLinePosition()

});

// Evento de arrastre
map.on('dragend', function(event) {
  Mapa = document.getElementById('map');
  Mapa.style.cursor = 'default'; 
  objectsInFramework = document.getElementById("framework").getElementsByClassName("objeto");
  // Envio el centro del mapa al backend
  var center = map.getCenter();
  var zoom = map.getZoom();
  var dataCambiarParametros = {
    idredOriginal: idredValue, // Id de la red
    // Nuevos Valores
    centerLatNew:  parseFloat(center.lat).toFixed(12), // Lat del centro del mapa
    centerLngNew:  parseFloat(center.lng).toFixed(12), // Lng del centro del mapa
    zoomNew: zoom,
    zoomScaleNew: zoomScaleNew, 
  }
  centerValue = [parseFloat(center.lat).toFixed(12), parseFloat(center.lng).toFixed(12)]
  CambiarParametrosBackend(dataCambiarParametros)
});

map.on('zoomend', updateDivPositionsAndSizes);
map.on('moveend', updateDivPositionsAndSizes);

function UpdateNodePosition() {
      // Mantengo la posición de los objetos
      objectsInFramework = document.getElementById("framework").getElementsByClassName("objeto");
      for (let i = 0; i < objectsInFramework.length; i++) {
        var lat = parseFloat(objectsInFramework[i].getAttribute("cordX"));
        var lng = parseFloat(objectsInFramework[i].getAttribute("cordY"));
        var latLng = [lat, lng]; 
        var point = map.latLngToContainerPoint(latLng);

        objectsInFramework[i].style.left = (point.x - objectsInFramework[i].offsetWidth / 2) + 'px';
        objectsInFramework[i].style.top = (point.y - objectsInFramework[i].offsetHeight / 2) + 'px';
      }

}

function UpdateLinePosition() {
  // Obtengo el dato
  lineas = frameworkBox.getElementsByClassName('line');
  for (let i = 0; i < lineas.length; i++) {
    
    source = lineas[i].getAttribute("Source")
    receptor = lineas[i].getAttribute("Receptor")

    // Obtengo la Lat y Lng de las líneas
    StartLat = lineas[i].getAttribute('StartLat');
    StartLng = lineas[i].getAttribute('StartLng');
    EndLat = lineas[i].getAttribute('EndLat');
    EndLng = lineas[i].getAttribute('EndLng');
    // Si se está dibujando una linea

    // obtengo las nuevas posiciones
    StartlatLng = [StartLat, StartLng]
    var Startpoint = map.latLngToContainerPoint(StartlatLng);
    EndlatLng = [EndLat, EndLng]

    var Endpoint = map.latLngToContainerPoint(EndlatLng);
    // Actualizo las posiciones
    startX = Startpoint.x
    startY = Startpoint.y
    endX = Endpoint.x
    endY = Endpoint.y
    
    length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    angle = (Math.atan2(endY - startY, endX - startX) - 2 * Math.PI ) ;

    lineas[i].style.left = startX + "px";
    lineas[i].style.top = startY + "px";
    lineas[i].style.width = `${length}px`;
    lineas[i].style.height = WidthLine + "px"; // Grosor de la línea
    lineas[i].style.transformOrigin= 'top left';
    lineas[i].style.transform = `rotate(${angle}rad)`;

    // Actualizo las lineas
    lineas[i].setAttribute('x1', startX);
    lineas[i].setAttribute('y1',  startY);
    lineas[i].setAttribute('x2', endX);
    lineas[i].setAttribute('y2',  endY);
    lineas[i].setAttribute('startX', startX);
    lineas[i].setAttribute('startY',  startY);
    lineas[i].setAttribute('StartLat', StartLat);
    lineas[i].setAttribute('StartLng', StartLng);
    lineas[i].setAttribute('EndLat', EndLat);
    lineas[i].setAttribute('EndLng', EndLng);
    lineas[i].setAttribute('x1Original', startX);
    lineas[i].setAttribute('y1Original',  startY);
  }
}


function updateDivPositionsAndSizes(){
  
  // No se está dibujando una linea
  // Ajusta el tamaño de los divs basado en el nivel de zoom
  var zoomScale = map.getZoomScale(map.getZoom(), zoomReference);  // Escala relativa al zoom inicial (zoomReference)
  objectsInFramework = document.getElementById("framework").getElementsByClassName("objeto");
  for (let i = 0; i < objectsInFramework.length; i++) {
    if (objectsInFramework[i].getAttribute("type") == "S"){
      // Para los Source hay que rotarlos
      var angle = parseFloat(objectsInFramework[i].getAttribute("angle"));
      objectsInFramework[i].style.transform = "rotate(" + angle + "deg)"+ `scale(${zoomScale})`;
    } else {
      objectsInFramework[i].style.transform = `scale(${zoomScale})`;  
    }
      
  } 
  UpdateNodePosition()
  UpdateLinePosition()

  zoomScaleNew = map.getZoomScale(map.getZoom(), zoomReference)*1;

}

map.on('zoom', zoomini);

function zoomini(event) {
  UpdateLinePosition()
}

// Permite mover el mapa cuando el mouse se acerca a los limites del mapa

function adjustMapCenter(event) {
  if (event.shiftKey) {
      var mapContainer = document.getElementById('map');
      
      var rect = mapContainer.getBoundingClientRect();
      var mouseX = event.clientX - rect.left; // Coordenada X del mouse relativa al contenedor
      var mouseY = event.clientY - rect.top; // Coordenada Y del mouse relativa al contenedor

      var center = map.getCenter();
      var lat = center.lat;
      var lng = center.lng;

      if (mouseX < edgeMargin) {
        map.dragging.enable(); 	
        lng -= Math.min(maxStep, step*zoomScale); // Mover hacia la izquierda
      } else if (mouseX > rect.width - edgeMargin) {
        map.dragging.enable(); 	
        lng += Math.min(maxStep, step*zoomScale); // Mover hacia la derecha
      } else{
        map.dragging.disable(); 	
      }

      if (mouseY < edgeMargin) {
        map.dragging.enable(); 	
        lat += Math.min(maxStep, step*zoomScale); // Mover hacia arriba
      } else if (mouseY > rect.height - edgeMargin) {
        map.dragging.enable(); 	
        lat -= Math.min(maxStep, step*zoomScale); // Mover hacia abajo
        map.dragging.disable(); 	
      }

      map.setView([lat, lng], map.getZoom());
  }
}



// Agrego el evento para mover el mapa cuando el mouse se aproxima a los bordes
document.getElementById('map').addEventListener('mousemove', adjustMapCenter);