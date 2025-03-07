let container = document.getElementById("container");
let frameworkBox = document.getElementById("framework");
let menuBox = document.getElementById("menu");
let menuBoxGlobal = document.getElementById("menuGlobal");
let menuBoxFramework = document.getElementById("menuFramework");
let objectsInFramework = document.getElementById("framework").getElementsByClassName("objeto");
let menuItems = document.getElementById("menu").getElementsByClassName("objeto");
let popupNode = document.getElementById('popupNode');
let popupGenerations = document.getElementById('popupGenerations');
let popupLoad = document.getElementById('popupLoad');
let popupLine = document.getElementById('popupLine');
let popupParameters = document.getElementById('popupParameters');
let popupStructure = document.getElementById('popupStructure');
let popupLoadRed =  document.getElementById("popupLoadRed");
let popupFigure =  document.getElementById("popupFigure");
let RedsforUserForm =  document.getElementById("RedsforUserForm")
let popupOpen = document.getElementById('popupClass');
let lineas = frameworkBox.getElementsByClassName('line');
let Mensajes = document.getElementById('Mensajes');
let Mapa = document.getElementById('map');
let LockMap = document.getElementById('LockMap');
let LockMapImage = document.getElementById('LockMapImage');
let Search = document.getElementById('Search');
let MapButtonImage = document.getElementById('MapButtonImage');
let GPSButton = document.getElementById('GPSButton');
let ContenedorLayerMap = document.getElementById('ContenedorLayerMap');
let LayerMap = document.getElementById('LayerMap');
let LayerMap1 = document.getElementById('LayerMap1');
let LayerMap2 = document.getElementById('LayerMap2');
let LayerMap3 = document.getElementById('LayerMap3');
let LayerMap4 = document.getElementById('LayerMap4');
let SelectButtonImg = document.getElementById('SelectButtonImg');
let ShowButtonImage = document.getElementById('ShowButtonImage');
let PlayStopAnimationImage = document.getElementById('PlayStopAnimation');
let divButtonsShowSoltuion = document.getElementById('divButtonsShowSoltuion');
let backButton = document.getElementById('backButton');
let divP = document.getElementById('divP');
let forwardButton = document.getElementById('forwardButton');
let SignInButtonImage = document.getElementById('SignInButtonImage');
let SelectButtonText = document.getElementById('SelectButtonText');
let pinLineIni = document.getElementsByClassName("pinLineIni");
let pinLineEnd = document.getElementsByClassName("pinLineEnd");
let contenedorLineIni = document.getElementsByClassName("contenedorLineIni");
let contenedorLineEnd = document.getElementsByClassName("contenedorLineEnd");
let MouseAnimation = document.getElementById('MouseAnimation');
let GeneraTablesFigures = document.getElementById('GeneraTablesFigures');
let BotonesGeneralSolution = document.getElementById('BotonesGeneralSolution');
let GeneralVoltageNodeSolutionFigure =  document.getElementById("GeneralVoltageNodeSolutionFigure");
let selectTipoGrafico = document.getElementById('tipoGrafico');
let ObjectiveValueDiv = document.getElementById("ObjectiveValue");
let PowerLossesDiv = document.getElementById("PowerLosses");
let OptimizationTimeDiv = document.getElementById("OptimizationTime");
let StatusDiv = document.getElementById("Status");
let NodeDataDiv = document.getElementById("NodeData"); // Div para la tabla de los nodos
let LineDataDiv = document.getElementById("LineData"); // Div para la tabla de las lineas
let PeriodoSelectPopupNodoTable = document.getElementById("PeriodoSelectPopupNodoTable"); 
let range = document.querySelector(".slider-track");


let columnSlider = document.getElementById('column-slider');
let columnInput = document.getElementById('column-input');
let rowSlider = document.getElementById('row-slider');
let rowInput = document.getElementById('row-input');
let containerSecadora = document.getElementById('grid-container');


//let sizeScrollArea = frameworkBox.getElementById('sizeScrollArea');
let idKey = 1; // Identificación de elementos
let Nnodos = objectsInFramework.length + 1; // Numero de objeto Totales
let N = 0 // Numero de Nodos
let NG1 = 0 // Numero de Generación tipo 1
let NG2 = 0 // Numero de Generación tipo 2
let NG3 = 0 // Numero de Generación tipo 3
let NStorage = 0 // Numero de Storage
let NLoad = 0 // Numero de Cargas
let S = 0 // Fuentes
let NLine = 0 // Numero de Lineas
let NodeName = null // Nombre de los nodos 
let LineName = null // Nombre de las Lineas
let Bus = [] // Matriz para guardar los Nodos (Ver si conviene tenerlos en el Backend o el Frontend)
let Line = [] // Matriz para guardar las características de la linea (Ver si conviene tenerlos en el Backend o el Frontend)

// Soluciones de la Optimizacion
let solution = {} // Archivo de soluciones
let V = [] // Voltage
let Vp = {} // Voltage x period
let P_ = [] // Active and Reactive Power 
let P_p = {} // Active and Reactive Power x period
let Q_ = [] // Active and Reactive Power 
let Q_p = {} // Active and Reactive Power x period
let VLB = [] // Limite inferior sobre el voltaje de un Nodo
let VUB = [] // Limite superior sobre el voltaje de un Nodo
let ILB = [] // Limite inferior sobre la corriente en la Linea
let IUB = [] // Limite inferior sobre la corriente en la Linea
PList = [] // Potencia Activa en la linea - Variables para crear las tablas
QList = {} // Potencia Reactiva en la linea - Variables para crear las tablas
PsList = {} // Potencia Activa de la fuente - Variables para crear las tablas
QsList = {} // Potencia Reactiva de la fuente - Variables para crear las tablas
PdgList = {} // Potencia Activa de las generaciones - Variables para crear las tablas
QdgList = {} // Potencia Reactiva de las generaciones - Variables para crear las tablas

let VLBg = 0 // Limite inferior global para el voltaje
let VUBg = 0 // Limite superior global para el voltaje
let ILBg = 0 // Limite inferior global para la corriente
let IUBg = 0 // Limite superior global para la corriente
let PLBg = 0 // Limite inferior global para la Potencia Activa
let PUBg = 0 // Limite superior global para la Potencia Activa
let QLBg = 0 // Limite inferior global para la Potencia Reactiva
let QUBg = 0 // Limite superior global para la Potencia Reactiva
let valorInicialVnom = 0; // Valores Iniciales del Vnom en el popup de los Nodos
let valorInicialVLB = 0; // Valores Iniciales del VLB en el popup de los Nodos
let valorInicialVUB = 0; // Valores Iniciales del VUB en el popup de los Nodos

let Obj = [] // Fuincional Objetivo
let time = [] // Tiempo de la optimizacion
let PowerLosses = [] // Perdidas de Potencia
let labels_name_Voltage = [] // labels para los voltages
let labels_name_Power = [] // labels para las potencias

/* 
let NodeDG = [] // Matriz para guardar los nodos donde puede haber generacion
let DGType = [] // Matriz para guardar el tipo de fuente de generación en cada nodo donde hay DG */
let i = [] // Variable para el manejo del Popup
let iL = [] // Variable para el manejo del PopupLine
var Layer = 'None'; // Regular, Satelital, Relieve, None
var zoomReference = 18 // Zoom Inicial del mapa
let minZoomValue = 16.5; // Minimo valor aceptable del zoom
let maxZoomValue = 19; // Minimo valor aceptable del zoom
let zoomSnapValue = 0.25 // valor del snap
let zoomDeltaValue = 0.5 // valor del snap
var zoomScaleNew = null; // Escala del mapa
var originalLeft = 35; // Porcentaje original de left
var originalTop = 90; // Porcentaje original de top
var edgeMargin = 15; // px minimos donde debe estar el mouse para mover el mapa
var maxStep = 0.001; // Mínimo desplazamiento en grados del mapa para controlar el cambio de centro por el mouse
var step = 0.001; // Step para mover el centro del mapa con el mouse
let centerValue = [-32.9433500713274, -60.63591089759037]; // Rosario
// creo el mapa
var map = L.map('map', {
    center: centerValue,
    zoom: zoomReference,       // Nivel de zoom inicial
    minZoom: minZoomValue,    // Nivel de zoom mínimo permitido (igual al nivel inicial)
    maxZoom: maxZoomValue,              // Nivel de zoom máximo permitido
    zoomSnap: zoomSnapValue,
    zoomDelta: zoomDeltaValue,
});

// Variables para dibujar las lineas
let NewLine = null; // Nueva linea
//let lineDIVrect = null; // Rectangulo de Conexion de la linea
let pinIni = null; // pin de inicio de la linea
let pinEnd = null; // pin de fin de la linea
let pinIdIni = null; // pin de inicio de la linea
let pinIdEnd = null; // pin de fin de la linea
let FlagDrawingLine = false; // Flag que indica si se empieza a dibujar
var startXTemp = null; // posiciones iniciales de x e y (Temporales)
var startYTemp = null; // posiciones iniciales de x e y (Temporales)
let FlagAvailablePin = true; // Bandera que permite definir si el pin se puede utilizar para dibujar una linea
let FlagShowSolution = true; // Permite determinar si se está en la ventana donde se muestra la solucion (true) o en la de edicion (false)
let flagChangePvalue = false; // Permite ver si se cambia el periodo o no (sirve para la animacion del boton)
let FlagPlayStopAnimation = true; // Permite determinar si se paró o no la animacion
let Flag_termination_status = false; // Indica si el problema se resolvió correctamente
let flagSolutionData = false; // Indica si las tablas deben mostrar los parámetros o las soluciones
let flag_SolutionGet = false; // Indica si ya se leyó al menos una vez la solución obtenida

// Variables para mover las lineas
let selectedElement = null; // Establece si se selecciona al incio o el fin de la linea
let selectedPoint = null; // Punto donde se selecciona 
let selectedLine = null; // Establece la linea seleccionada
let newNode = null; // Nodo nuevo creado
let offset = null; // Cual es el offset de seleccion 
let FlagIsMoving = false; // Indica si la linea se está moviendo
let rectpinNew = null; // Dimensiones del pin nuevo creado

//Variables para crear nodos
let FlagCreateNode = false; // Flag que indica si se empieza a crear un nodo
let objetoClick = null; 
// Propiedades de CSS
//  Objetos Normales
let ColorLine = '#4285f4' // color de la linea
let WidthLine = 3 // ancho de la linea
let ColorNode = '#4285f4' // color de la linea
let WidthNode = 0//2.75 // ancho de la linea
let pinColor = "#4285f4" // color de los pines
let backgroundColorObject = "" // color para el background de los objetos

//  Selección
let SelectionColorAll = "blue" // Color para la selección de todos los objetos
let SelectedPinColor = SelectionColorAll // color de los pines conectados
let SelectionColor = SelectionColorAll // color para seleccionar objetos
let SelectionWidth = 3.5 // ancho de la linea para seleccionar objetos
let ColorSelectionRectangle = "lightblue"; // Color para la selección del rectángulo 
let WidthSelectionRectangle = 3; // Color para el rectángulo de selección
let ColorStrokeSelectionRectangle = SelectionColorAll; // Color de la linea de la selección del rectangulo
let OpacitySelectionRectangle = 0.25; // Color de la linea del rectangulo de Selección
let SetfontFamily = 'Roboto, sans-serif'; // Permite definir la topografia

// Variables para borrar, Copiar y eliminar
let objetoSeleccionado = null;  // Objeto seleccionado
let objetoSeleccionadoAnterior = null; // Objeto seleccionado en el click anterior
let divAEliminar = null; // El nodo que se va a eliminar
let LineaSeleccionada = null; // Linea seleccionada
let LineaSeleccionadaAnterior = null; // Linea seleccionada en el click anterior
let LineaAEliminar = null; // La linea que se va a eliminar
let FlagSelected = false; // Flag que indica si se seleccionó algún objeto
let FlagSelectedLine = false; // Flag que indica si se seleccionó alguna linea
let BusFiltrados = null; // Array Auxiliar para filtrar los nodos cuando se eliminan nodos
let LineasFiltradas = null; // Array Auxiliar para filtrar las lineas cuando se eliminan nodos
let IdMenuItems = [] // Id de los item en el menu

// Variables para la selección multiple
let mouseX = null; // posición X del mouse 
let mouseY = null; // posición Y del mouse 
let dragStartX = null; // posición X del inicio del dragging 
let dragStartY = null; // posición Y del inicio del dragging 
let dragEndX = null; // posición X del fin del dragging 
let dragEndY = null; // posición Y del fin del dragging 
let FlagDragging = false; // Variables para la selección
let isInside = false; // Variable que permite ver si un elemento está dentro del area de selección
let selectedElements = []; // Objetos seleccionados (array de objetoSeleccionado - selectedElements = [objetoSeleccionado1, objetoSeleccionado2, ...])
let selectedLines = []; // Lineas seleccionadas (array de LineaSeleccionada - selectedLines = [LineaSeleccionada1, LineaSeleccionada2, ...])\
let SelectionRectangle = null; // Rectangulo de selección
let isClickIzquierdo = false; // Indica si se aptró el click Izquierdo
let isClickMedio = false; // Indica si se aptró el click del medio
let isClickDerecho = false; // Indica si se aptró el click Derecho

// Variables para mover multiples elementos
let selectedElementsDragging = []; 
let dxRef = [];
let dyRef = [];
let objetoSeleccionadoClick = null; 

// Variables de scroll
/* let scrollHorizontalAnterior = 0;
let scrollVerticalAnterior = 0;
let sumScrollX = 0;
let sumScrollY = 0; */
let maxLeft = 0; 
let maxTop = 0; 

// Banderas
let FlagCtrl = false; // Variable para ver cuando el ctrl está apretado
let FlagShift = false; // Variable para ver cuando el shift está apretado
let FlagAlt = false; // Variable para ver cuando el alt está apretado
let FlagDraggingSelection = false; // Indica si se estan arrastrando elementos seleccionados
let FlagPopUpNode = false; // Indica si el Popup de el nodo está activo
let FlagPopUpLoad = false; // Indica si el Popup de las cargas está activo
let FlagPopUpGenerations = false; // Indica si el Popup de las generaciones está activo
let FlagPopUpLine = false; // Indica si el Popup de las lineas está activo
let FlagPopUpParamtros = false; // Indica si el Popup de los parametros está activo
let FlagPopUpLoadRed = false;  // Indica si el Popup de la seleccion de la Red para la carga está activo
let FlagPopUpGrid = false // Indica si el Popup de las grid está activo
let FlagPopUpFigure = false // Indica si el Popup de las figuras está activo
let FlagPopUpTables = false // Indica si el Popup de las tablas de solucion está activo
let FlagMapOne = true; // Inidca si se activo el cambio de la posición del mapa
let FlagOpenLock = false; // Indica si el candado está abierto o cerrado
let FlagLoad = false; // Indica si se ha cargado la red
let flagShowPopupStructure = false; // Permite controlar las tablas de las estructuras


let flagTableFigure = false; // Permite intercambiar en mostrar las tablas y las figuras en el popup de reporte de solucion (Popup Tables) 

// Variables para rotar
let angulo = 0;
// Variables para función de nueva linea
let FlagNewLineFunction = false;
let FlagCopy = false;
let FlagSignIn = false; // Indica si el usuario se a logueado

// Variables que faltan crear (Se crean con el User)
let idredValue = 0
//NombreredValue = ''
let P = 1 // Numero de Periodos Totales
let Pvalue = 1 // Periodo considerado para mostrar la solucion (1,2...P)
let User = 'Lbraccia'
let UserEmail = 'lbraccia@gmail.com'
let Password = 'aaaa'
let iduser = 1 // id del usuario - Tengo que obtenerlo del backend
var Namevalue = ""; // Nombre de la red

// Tablas
let table_solution = []
let table_solution_loads = []
/* let loads = [] */


