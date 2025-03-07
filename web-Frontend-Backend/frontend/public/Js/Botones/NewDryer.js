async function NewRed(e){

  // Activo la animacion del mouse
  startLoad()

  // Si está abierto el PopUp para cargar la Red lo cierro
  if(FlagPopUpLoadRed){
    closePopupLoadRed()
  }


  // Crear un objeto Date para obtener la fecha y hora actuales
  //const ahora = new Date();
  // Formatear la fecha y hora
  //const fecha = ahora.toISOString().split('T')[0]; // Obtener solo la fecha (AAAA-MM-DD) - Los estoy creando en el backend
  //const hora = ahora.toISOString().split('T')[1].split('.')[0]; // Obtener solo la hora (HH:mm:ss) - Los estoy creando en el backend
  
  msg = '¿Estás seguro de que quieres crear una nueva red? Se borraran todos los datos actuales'
  DeleteFrontend()
  // Crear el objeto final
  var dataCreateRed = {
    nombre: 'Name',
    //fecha: fecha,
    //hora: hora,
    status: 'Load',
    idUser: iduser,
  }; 
  await CrearRedBackend(dataCreateRed)
  var dataUser = {
    idUser: iduser,
  }
  // Obtengo el id de la ultima red creada
  await lastCreatedRedBackend(dataUser).then(response => {
    data = response
  })
    // Obtengo el id y el nombre de la misma
  idredValue = data.id
  nombre = data.nombre
  console.log(idredValue)


  // Coloco los valores iniciales (Capaz se podrían generar en un script aparte)
  P=1
  Nnodos = 0 // Numero totales de objetos en el framework
  idKey = 1 // Reincio el id para los objetos
  N = 0 //  los Nodos en el framework
  NG1 = 0 // Generación tipo 1
  NG2 = 0 // Generación tipo 2
  NG3 = 0 // Generación tipo 3
  NStorage = 0 // Storage
  NLoad = 0 // Cargas
  S = 0 // Fuentes
  NLine = 0 // Line
  Nnodos = 1 // Numero totales de nodos
  Layer= 'None'
  centerLat=  parseFloat(-32.951617101004) // Lat del centro del mapa
  centerLng=  parseFloat(-60.641379362805) // Lng del centro del mapa
  zoom= 18.0
  zoomScale= 1
  ColorLine= '#4285f4' // Color de la linea
  WidthLine= 3 // ancho de la linea
  ColorNode= '#4285f4' // color de la linea
  WidthNode= 0 // ancho de la linea
  pinColor= '#4285f4' // color de los pines
  NS= 100 // Number of Discretization Point for Voltage Linearization
  NQP= 350 // Number of Discretization Point for P and Q Linearization
  kw_W= 1 // Cambio de unidad de kW a W
  Omhs_Komhs= 0.001 //Cambio de unidad de kW a W
  Vnom= '[12.66]' // Voltaje nominal (kW)
  ke= 168 // US$/kW-year
  kI= 1000 //US$/kW-year (Inversion Cost)
  VUBg = 20
  VLBg = 0
  maxVLB = '[0]'
  minVUB = '[5]'
  IUBg = 500
  ILBg = -500
  PUBg = 100
  PLBg = -100
  QUBg = 100
  QLBg = -100




  // Creo los Parametros para la nueva red

  var dataCrearParametros = {
    idred: idredValue, // Id de la red
    // Nuevos Valores
    P: P,
    N: N, 
    idKey: idKey, 
    NG1: NG1,
    NG2: NG2,
    NG3: NG3,
    S: S,
    NLoad: NLoad,
    NStorage: NStorage,
    NLine: NLine,
    Nnodos: Nnodos,
    Layer: Layer, // Capa del mapa
    centerLat:  centerLat, // Lat del centro del mapa
    centerLng:  centerLng, // Lng del centro del mapa
    zoom: zoom,
    zoomScale: zoomScale,
    ColorLine: ColorLine, // Color de la linea
    WidthLine: WidthLine,  // ancho de la linea
    ColorNode: ColorNode, // color de la linea
    WidthNode: WidthNode, // ancho de la linea
    pinColor: pinColor, // color de los pines
    NS: NS, // Number of Discretization Point for Voltage Linearization
    NQP: NQP, // Number of Discretization Point for P and Q Linearization
    kw_W: kw_W, // Cambio de unidad de kW a W
    Omhs_Komhs: Omhs_Komhs, //Cambio de unidad de kW a W
    Vnom: Vnom, // Voltaje nominal (kW)
    ke: ke, // US$/kW-year
    kI: kI, //US$/kW-year (Inversion Cost)
    VUBg: VUBg, // Limite superior global para el voltaje (para todos los nodos y periodos)
    VLBg: VLBg, // Limite inferior global para el voltaje (para todos los nodos y periodos)
    maxVLB: maxVLB, // Máximo Limite inferior global para el voltaje en cada periodo
    minVUB: minVUB, // Mínimo Limite superior global para el voltaje en cada periodo
    IUBg:IUBg, // Limite superior global para las corrientes (para todos las lineas y periodos)
    ILBg:ILBg, // Limite inferior global para las corrientes (para todos las lineas y periodos)
    PUBg:PUBg, // Limite superior global para las Potencias Activas 
    PLBg:PLBg, // Limite inferior global para las Potencias Activas 
    QUBg:QUBg, // Limite superior global para las Potencias Reactivas 
    QLBg:QLBg // Limite inferior global para las Potencias Reactivas 
  }
  
  await CrearParametrosBackend(dataCrearParametros).then(responseCreateParamters => {
    console.log("dataCrearParametros", dataCrearParametros)
    // Abro el Pop up para la nueva red creada
    openPopupParameters(e)
    endLoad(MouseAnimation)
  })
  // Se cargo una red
  FlagLoad = true; 
}