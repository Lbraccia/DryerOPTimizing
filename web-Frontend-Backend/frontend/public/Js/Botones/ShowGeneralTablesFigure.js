async function ShowGeneralTablesFigure(event) {
    // Esta funcion permite mostrar las Tablas y Figuras de los parámeotro y las soluciones 

    IDbotonApretado = event.target.id

    BotonesGeneralSolution = document.getElementById('BotonesGeneralSolution');
    let botonesHijos = BotonesGeneralSolution.children;
    // Recorro los botones
    for (let i = 0; i < botonesHijos.length; i++) {
        //Si el id del boton coincide con el id del boton que se apreta
        if(  botonesHijos[i].id ==  IDbotonApretado)
        {   
            // Se agrega la clase activa y se quita la desactiva
            botonesHijos[i].classList.add('GS-Active');
            botonesHijos[i].classList.remove('GS-Desactive');
        }
        else {
            // Sino Se agrega la clase desactiva y se quita la activa
            botonesHijos[i].classList.add('GS-Desactive');
            botonesHijos[i].classList.remove('GS-Active');
        }
    }

    let nombredivVisible = IDbotonApretado.replace(/^Show/, "");

    // Le quito la palabra Show (ya que los nombre de los bontones son ShowNombreDelID)
    GeneraTablesFigures = document.getElementById('GeneraTablesFigures');
    let divhijos = GeneraTablesFigures.children;

    // Recorro los div para mostrarlos
    for (let i = 0; i < divhijos.length; i++) {
        //Si el id del boton coincide con el id del div se muestra
        if(  divhijos[i].id ==  nombredivVisible)
        {
            divhijos[i].style.display = 'block';
            divhijos[i].style.height = 650 + 'px';
        }
        else {
            divhijos[i].style.display =  'none';
            divhijos[i].style.height = 0 + 'px';
        }
    }

    GeneraTablesFigures = document.getElementById('GeneraTablesFigures');

}


// Grafica para las p y q de las cargas, grid y generaciones en los diferentes períodos
async function ShowFigureGeneralPowerNodo(event) {
    const selectedValue = 0; // Selecciono el primer período
    const tipo = 'bar'
    div = "GeneralPQNodeSolution"
    div_Figure = "GeneralPQNodeSolutionFigure"
    text_Value = 'Power [kW]'
    div_selection = "periodoSelectGeneralFigure_Power"
    labels_1 = 'Active Power'
    labels_2 = 'Reactive Power'
    labels_name = labels_name_Power
    stackedValue = true;

    const selecttipoGrafico_Power = document.getElementById('tipoGrafico_Power');
    selecttipoGrafico_Power.value = tipo
    // Genero el grafico de las potencias

    actualizarGeneralGrafico(div, div_Figure, div_selection, selectedValue, tipo, stackedValue, labels_name, labels_1, labels_2, text_Value, P_p, Q_p);
}


// Grafica para los Voltajes en los diferentes períodos
async function ShowFigureGeneralVoltageNodo(event) {
    const selectedValue = 0; // Selecciono el primer período
    const tipo = 'line'
    div = "GeneralVoltageNodeSolution"
    div_Figure = "GeneralVoltageNodeSolutionFigure"
    text_Value = 'Voltage [-]'
    div_selection = "periodoSelectGeneralFigure_Voltage"
    labels_1 = 'Nodes'
    labels_2 = '', 
    labels_name = labels_name_Voltage
    stackedValue = true;

    const selecttipoGrafico_Voltage = document.getElementById('tipoGrafico_Voltage');
    selecttipoGrafico_Voltage.value = tipo

    // Genero el grafico de los Voltajes
    actualizarGeneralGrafico(div, div_Figure, div_selection, selectedValue, tipo, stackedValue, labels_name, labels_1, labels_2, text_Value,  Vp);
}



// Crear las Tablas de los Nodos y las Lineas para cada periodo
async function ShowFigureGeneralTable(event, flagSolutionData) {
    // la variable flagSolutionData indica si la tabla de lineas y nodos se muestra desde el menu lateral (flagSolutionData = false) para mostrar la data del problema)
    // o desde el menu interior (flagSolutionData = true) que permite mostrar las soluciones del problema 
    const selectedValue = 0; // Selecciono el primer período
    actualizarGeneralTable(selectedValue, flagSolutionData);
}

// Permite actualizar las tablas
async function actualizarGeneralTable(periodoSeleccionado, flagSolutionDataValue){
    
    flagSolutionData = flagSolutionDataValue   
    // Cargamos la tabla de los Nodos
    await loadNodosTable(periodoSeleccionado, flagSolutionData) 
    // Cargamos la tabla de las Cargas
    await loadLoadTable(periodoSeleccionado, flagSolutionData) 
    // Cargamos la tabla de las Lineas
    await loadLineTable(periodoSeleccionado, flagSolutionDataValue)

    /*
    Esta parte del código permite mostrar parte de la data de las tablas.
    Esto es porque si se llama del botón del menú debemos mostrar solo los datos del problema
    y si se muestra del botón que está en el entorno de solución debemos mostrar los datos y las soluciones obtenidas
    */
    // Logica para mostrar la data o la data y la solucion (de acuerdo desde donde se llamó la tabla)
    // Coloco activo las tablas y desactivo las figuras
    var botonVoltage = document.getElementById('ShowGeneralVoltageNodeSolution');
    var botonPower= document.getElementById('ShowGeneralPQNodeSolution');
    var TableDataSolutionTitle= document.getElementById('TableDataSolutionTitle');
    if(flagSolutionData){
        CostTable.style.visibility = 'visible'
/*      
        // habilito el boton de Voltage
        botonVoltage.classList.add('GeneralSolutiontn-btn:hover');
        // habilito el boton de Voltage
        botonPower.classList.add('GeneralSolutiontn-btn:hover'); */

        // deshabilito el boton de Voltage
        botonVoltage.classList.remove('no-hover');
        // deshabilito el boton de Power
        botonPower.classList.remove('no-hover');
        TableDataSolutionTitle.textContent = "Solution Report: "
    } else {
        CostTable.style.visibility = 'hidden'
        const table = document.getElementById('NodeData');
        // deshabilito el boton de Voltage
        botonVoltage.classList.add('no-hover');
        // deshabilito el boton de Power
        botonPower.classList.add('no-hover');
        TableDataSolutionTitle.textContent = "Data: "
    }

    // habilito el boton de Voltage
    botonVoltage.disabled = !flagSolutionData;
    
    // habilito el boton de Power
    
    botonPower.disabled = !flagSolutionData;
        
}


function ShowHiddenColumn(table, columnsToHide, flagSolutionData){
    columnsToHide.forEach(columnIndex => {
        const rows = table.querySelectorAll('tr');
        rows.forEach((row, rowIndex) => {
            if (rowIndex !== 0) { // Ignorar la primera fila (rowIndex 0)
                const cell = row.cells[columnIndex - 1]; // Restamos 1 porque los índices de las celdas empiezan desde 0
                if (cell) {
                    if (flagSolutionData && columnIndex-1 != 0){
                        // Si accedo a la tabla desde la solución muestro todas las columnas menos la primera que tiene el id del Nodo
                        cell.style.display = '';
                    } else {
                        // Si accedo a la tabla desde el boton de datos no muestro las columnas que se obtienen de la solucion (Pg, Qg, Ps, Qs) y solo muestro las cargas (PL, QL)
                        cell.style.display = 'none';
                    }
                }
            }   
        });
      });
}


let myChart;
// Permite actualizar las graficas 
function actualizarGeneralGrafico(div, div_Figure, div_selection, periodoSeleccionado, tipo, stackedValue, labels_name, labels_1, labels_2 = null, text_Value, Values1, Values2 = null) {

    const data1 = Values1[periodoSeleccionado]; // Obtener los datos del período seleccionado
    const data2 = Values2 !== null ? Values2[periodoSeleccionado] : null
    
    // Determine bar colors based on data presence
    const backgroundColors = [
        data1 !== null ? 'rgba(54, 162, 235, 0.55)' : null,
        data2 !== null ? 'rgba(255, 99, 132, 0.55)' : null,
    ];
    const borderColors = [
        data1 !== null ? 'rgba(54, 162, 235, 0.55)' : null,
        data2 !== null ? 'rgba(255, 99, 132, 0.55)' : null,
    ];

    if (myChart) {
        myChart.destroy();
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const scale = window.devicePixelRatio;
    canvas.style.backgroundColor = 'white'
    
    const num_periodos = Object.keys(Values1).length; // Obtener el número de períodos
    const labelsOptions = Object.keys(Values1); // Usar las claves como labels
    GeneralNodeSolution =  document.getElementById(div);
    const selectElement = document.getElementById(div_selection);
    selectElement.innerHTML = ''

    for (let i = 0; i < num_periodos; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = parseInt(labelsOptions[i])+1; // Mostrar la clave como texto en el select
        
        if (i === periodoSeleccionado) {
            option.selected = true;
        }
        selectElement.appendChild(option);
    }

    // Para mostrar todos los periodos juntos
    const option = document.createElement('option');
    option.value = num_periodos+1;
    option.text = 'all'; // Mostrar la clave como texto en el select
    selectElement.appendChild(option);

    canvas.width = GeneralNodeSolution.offsetWidth * scale ;
    canvas.height = GeneralNodeSolution.offsetHeight * scale * 0.8;
    ctx.scale(scale, scale);

    div_stackedOrUnstacked = Array.from(document.getElementsByClassName('div_stackedOrUnstacked'))

    // Habilito el stack de los datos si solo la grafica es tipo bar
    if(tipo == 'bar' && periodoSeleccionado == num_periodos+1){
        div_stackedOrUnstacked.forEach(div_element =>{
            div_element.style.visibility = 'visible';
        })
       
    } else{
        div_stackedOrUnstacked.forEach(div_element =>{
            div_element.style.visibility = 'hidden';
        })
    }
    
    GeneralNodeSolutionFigure =  document.getElementById(div_Figure);
    GeneralNodeSolutionFigure.innerHTML = '';
    GeneralNodeSolutionFigure.appendChild(canvas);

    //const num_periodos = data.length;
    //const labels_name = Array.from({ length: data1.length }, (_, i) => i + 1);
    
    myChart = new Chart(ctx, {
        type: tipo,
        data: {
            labels: labels_name,
            datasets: [
              {
                label: labels_1,
                data: data1,
                backgroundColor: backgroundColors[0],
                borderColor: borderColors[0],
                borderWidth: 1
              },
              ...(data2
                ? [{ // Add second dataset if Values2 is provided
                  label: labels_2, // Customize label
                  data: data2,
                  backgroundColor: backgroundColors[1],
                  borderColor: borderColors[1],
                  borderWidth: 1
                }]
                : []) // Empty array if Values2 is null
            ]
          },

        options: {
            scales: {
                x: {
                    stacked: false,
                     title: {
                        display: true,
                        text: 'Nodes',
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: text_Value,
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },      
            
/*             onClick: (event, elements) => {  // <-- Manejador de clicks
               // Podría generar que cuando apriete un click sobre una barra muestre el elemnto
               
           } */
        }
    });       
}


// let myChart;
// Permite actualizar las graficas 
function actualizarGrafico_allPeriod(div, div_Figure, div_selection, periodoSeleccionado, tipo, stackedValue, labels_name, labels_1, labels_2 = null, text_Value, Values1, Values2 = null) {
    // Se podría mejorar este codigo uniendo las graficas y generando los datos por fuera (mejora de un futuro)
    //const backgroundColors = ['rgba(54, 162, 235, 0.7)', 'rgba(255, 99, 132, 0.7)']; // Colores para las dos barras
    //const borderColors = ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'];
    if (myChart) {
        myChart.destroy();
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const scale = window.devicePixelRatio;
    canvas.style.backgroundColor = 'white'
    
    const num_periodos = Object.keys(Values1).length; // Obtener el número de períodos

    var colorBase1 = { r: 54, g: 162, b: 235 }; // Color base azul
    var colorBase2 = { r: 255, g: 99, b: 132 }; // Color base magenta
    backgroundColors =  generarColores(2*num_periodos,colorBase1, colorBase2,  0.55)

    const labelsOptions = Object.keys(Values1); // Usar las claves como labels
    GeneralNodeSolution =  document.getElementById(div);
    const selectElement = document.getElementById(div_selection);
    selectElement.innerHTML = ''

    datasetsValue = []
    for (let i = 0; i < num_periodos; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = parseInt(labelsOptions[i])+1; // Mostrar la clave como texto en el select
        option.selected = false;
        selectElement.appendChild(option);

    }

    // Para mostrar todos los periodos juntos
    const option = document.createElement('option');
    option.value = num_periodos+1;
    option.text = 'all'; // Mostrar la clave como texto en el select
    selectElement.appendChild(option);
    option.selected = true;

    div_stackedOrUnstacked = Array.from(document.getElementsByClassName('div_stackedOrUnstacked'))

    // Habilito el stack de los datos si solo la grafica es tipo bar
    if(tipo == 'bar' && periodoSeleccionado == num_periodos+1){
        div_stackedOrUnstacked.forEach(div_element =>{
            div_element.style.visibility = 'visible';
        })
       
    } else{
        div_stackedOrUnstacked.forEach(div_element =>{
            div_element.style.visibility = 'hidden';
        })
    }

    // Creo los datos para la grafica
    datasetsValue = []
    for (let i = 0; i < num_periodos; i++) {
        if (tipo !== 'pie' && tipo !== 'doughnut' && stackedValue==1) {
            element_1 = {
                label: `P - Period ${i + 1}`,
                backgroundColor: backgroundColors[i],
                data: Values1[i],
                stack: 'P',
            };
        } else {
            element_1 = {
                label: `P - Period ${i + 1}`,
                backgroundColor: backgroundColors[i],
                data: Values1[i],
            };
        }
        datasetsValue.push(element_1);
    }

    if(Values2 !== null){
        for (let i = 0; i < num_periodos; i++) {
            if (tipo !== 'pie' && tipo !== 'doughnut' && stackedValue==1) {
                element_2 = {
                    label: `Q - Period ${i + 1}`,
                    backgroundColor: backgroundColors[i + num_periodos],
                    data: Values2[i],
                    stack: 'Q',
                };
            } else {
                element_2 = {
                    label: `Q - Period ${i + 1}`,
                    backgroundColor: backgroundColors[i + num_periodos],
                    data: Values2[i],
                };
            }
            datasetsValue.push(element_2);
        }
    }



    canvas.width = GeneralNodeSolution.offsetWidth * scale ;
    canvas.height = GeneralNodeSolution.offsetHeight * scale * 0.8;
    ctx.scale(scale, scale);
    
    GeneralNodeSolutionFigure =  document.getElementById(div_Figure);
    GeneralNodeSolutionFigure.innerHTML = '';
    GeneralNodeSolutionFigure.appendChild(canvas);

    //const num_periodos = data.length;
    //const labels_name = Array.from({ length: data1.length }, (_, i) => i + 1);
    myChart = new Chart(ctx, {
        type: tipo,
        data: {
            labels: labels_name,
            datasets: datasetsValue, 
          },

        options: {
                scales: {
                    /* xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true
                    }] */
                },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },      
            
        }
    });       
}



selectTipoGrafico = document.getElementById('tipoGrafico_Voltage');
selectElement = document.getElementById('periodoSelectGeneralFigure_Voltage');
stackedOrUnstacked_Voltage = document.getElementById('stackedOrUnstacked_Voltage');

selectElement.addEventListener("change", (event) => {
    selectTipoGrafico = document.getElementById('tipoGrafico_Voltage');
    selectedValue = parseInt(event.target.value)
    stackedValue = parseInt(stackedOrUnstacked_Voltage.value)
 
    tipo = selectTipoGrafico.value
    div = "GeneralVoltageNodeSolution"
    div_Figure = "GeneralVoltageNodeSolutionFigure"
    text_Value = 'Voltage [-]'
    div_selection = "periodoSelectGeneralFigure_Voltage"
    labels_1 = 'Nodes'
    labels_2 = '', 
    labels_name = labels_name_Voltage

    const select = event.target; // Obtén el elemento select
    const isLastOption = select.selectedIndex === select.options.length - 1;

    if (isLastOption) {
        //Si se seleccionó la opcion all (la ultima opcion).
        // Grafico todos los periodos juntos
        actualizarGrafico_allPeriod(div, div_Figure, div_selection, selectedValue, tipo, stackedValue, labels_name, labels_1, labels_2, text_Value,  Vp);
    } else {
        actualizarGeneralGrafico(div, div_Figure, div_selection, selectedValue, tipo, stackedValue, labels_name, labels_1, labels_2, text_Value,  Vp);
    }

})

// Event listener para el select
selectTipoGrafico.addEventListener('change', (event) => {
    selectElement = document.getElementById('periodoSelectGeneralFigure_Voltage');
    selectedValue = parseInt(selectElement.value)
    tipo = event.target.value;
    stackedValue = parseInt(stackedOrUnstacked_Voltage.value)
    div = "GeneralVoltageNodeSolution"
    div_Figure = "GeneralVoltageNodeSolutionFigure"
    text_Value = 'Voltage [-]'
    div_selection = "periodoSelectGeneralFigure_Voltage"
    labels_1 = 'Nodes'
    labels_2 = '', 
    labels_name = labels_name_Voltage


    const select = selectElement; // Obtén el elemento select
    const isLastOption = select.selectedIndex === select.options.length - 1;

    if (isLastOption) {
        //Si se seleccionó la opcion all (la ultima opcion).
        // Grafico todos los periodos juntos
        actualizarGrafico_allPeriod(div, div_Figure, div_selection, selectedValue, tipo, stackedValue, labels_name, labels_1, labels_2, text_Value,  Vp);
    } else {
        actualizarGeneralGrafico(div, div_Figure, div_selection, selectedValue, tipo, stackedValue,  labels_name, labels_1, labels_2, text_Value,  Vp);
    }

   /*  actualizarGeneralGrafico(div, div_Figure, div_selection, selectedValue, tipo, labels_name, labels_1, labels_2, text_Value,  Vp); */
});



stackedOrUnstacked_Voltage.addEventListener("change", (event) => {
    selectTipoGrafico = document.getElementById('tipoGrafico_Voltage');
    selectElement = document.getElementById('periodoSelectGeneralFigure_Voltage');
    selectedValue = parseInt(selectElement.value)
    stackedValue =  parseInt(event.target.value)
 
    tipo = selectTipoGrafico.value
    div = "GeneralVoltageNodeSolution"
    div_Figure = "GeneralVoltageNodeSolutionFigure"
    text_Value = 'Voltage [-]'
    div_selection = "periodoSelectGeneralFigure_Voltage"
    labels_1 = 'Nodes'
    labels_2 = '', 
    labels_name = labels_name_Voltage

    const select = selectElement; // Obtén el elemento select
    const isLastOption = select.selectedIndex === select.options.length - 1;

    if (isLastOption) {
        //Si se seleccionó la opcion all (la ultima opcion).
        // Grafico todos los periodos juntos
        actualizarGrafico_allPeriod(div, div_Figure, div_selection, selectedValue, tipo, stackedValue, labels_name, labels_1, labels_2, text_Value,  Vp);
    } else {
        actualizarGeneralGrafico(div, div_Figure, div_selection, selectedValue, tipo, stackedValue, labels_name, labels_1, labels_2, text_Value,  Vp);
    }

})

selectTipoGrafico = document.getElementById('tipoGrafico_Power');
selectElement = document.getElementById('periodoSelectGeneralFigure_Power');
stackedOrUnstacked_Power = document.getElementById('stackedOrUnstacked_Power');

selectElement.addEventListener("change", (event) => {
    selectTipoGrafico = document.getElementById('tipoGrafico_Power');
    selectedValue = parseInt(event.target.value)
    tipo = selectTipoGrafico.value
    stackedValue = parseInt(stackedOrUnstacked_Power.value)
    div = "GeneralPQNodeSolution"
    div_Figure = "GeneralPQNodeSolutionFigure"
    text_Value = 'Power [kW]'
    div_selection = "periodoSelectGeneralFigure_Power"
    labels_1 = 'Active Power'
    labels_2 = 'Reactive Power'
    labels_name = labels_name_Power
    

    const select = event.target; // Obtén el elemento select
    const isLastOption = select.selectedIndex === select.options.length - 1;

    if (isLastOption) {
        //Si se seleccionó la opcion all (la ultima opcion).
        // Grafico todos los periodos juntos
        actualizarGrafico_allPeriod(div, div_Figure, div_selection, selectedValue, tipo, stackedValue, labels_name, labels_1, labels_2, text_Value, P_p, Q_p);
    } else {
        actualizarGeneralGrafico(div, div_Figure, div_selection, selectedValue, tipo, stackedValue, labels_name, labels_1, labels_2, text_Value, P_p, Q_p);
    }

})

// Event listener para el select
selectTipoGrafico.addEventListener('change', (event) => {
    selectElement = document.getElementById('periodoSelectGeneralFigure_Power');    
    selectedValue = parseInt(selectElement.value)
    tipo = event.target.value;
    stackedValue = parseInt(stackedOrUnstacked_Power.value)
    div = "GeneralPQNodeSolution"
    div_Figure = "GeneralPQNodeSolutionFigure"
    text_Value = 'Power [kW]'
    div_selection = "periodoSelectGeneralFigure_Power"
    labels_1 = 'Active Power'
    labels_2 = 'Reactive Power'
    labels_name = labels_name_Power

    const select = selectElement; // Obtén el elemento select
    const isLastOption = select.selectedIndex === select.options.length - 1;

    if (isLastOption) {
        //Si se seleccionó la opcion all (la ultima opcion).
        // Grafico todos los periodos juntos
        actualizarGrafico_allPeriod(div, div_Figure, div_selection, selectedValue, tipo, stackedValue, labels_name, labels_1, labels_2, text_Value, P_p, Q_p);
    } else {
        actualizarGeneralGrafico(div, div_Figure, div_selection, selectedValue, tipo, stackedValue, labels_name, labels_1, labels_2, text_Value, P_p, Q_p);
    }

    /* actualizarGeneralGrafico(div, div_Figure, div_selection, selectedValue, tipo, labels_name, labels_1, labels_2, text_Value, P_p, Q_p); */
});


stackedOrUnstacked_Power.addEventListener("change", (event) => {
    selectTipoGrafico = document.getElementById('tipoGrafico_Power');
    selectElement = document.getElementById('periodoSelectGeneralFigure_Power');
    selectedValue = parseInt(selectElement.value)
    stackedValue =  parseInt(event.target.value)
    tipo = selectTipoGrafico.value
    div = "GeneralPQNodeSolution"
    div_Figure = "GeneralPQNodeSolutionFigure"
    text_Value = 'Power [kW]'
    div_selection = "periodoSelectGeneralFigure_Power"
    labels_1 = 'Active Power'
    labels_2 = 'Reactive Power'
    labels_name = labels_name_Power

    const select = selectElement; // Obtén el elemento select
    const isLastOption = select.selectedIndex === select.options.length - 1;

    if (isLastOption) {
        //Si se seleccionó la opcion all (la ultima opcion).
        // Grafico todos los periodos juntos
        actualizarGrafico_allPeriod(div, div_Figure, div_selection, selectedValue, tipo, stackedValue, labels_name, labels_1, labels_2, text_Value, P_p, Q_p);
    } else {
        actualizarGeneralGrafico(div, div_Figure, div_selection, selectedValue, tipo, stackedValue, labels_name, labels_1, labels_2, text_Value, P_p, Q_p);
    }

})


periodoSelectGeneralTable = document.getElementById('periodoSelectGeneralTable');

periodoSelectGeneralTable.addEventListener('change', async (event) => {
    selectedValue = parseInt(event.target.value)
    await actualizarGeneralTable(selectedValue, flagSolutionData);
});



function ShowNodeTable(){
    document.getElementById('NodeInfoButton').classList.add('btn-active')
    document.getElementById('LoadInfoButton').classList.remove('btn-active')
    document.getElementById('LineInfoButton').classList.remove('btn-active')
    // Muestra la Tabla de los Nodos
    NodeDataDiv.classList.add("Table-Active");
    NodeDataDiv.classList.remove("Table-Desactive");
    LineDataDiv.classList.remove("Table-Active");
    LineDataDiv.classList.add("Table-Desactive");
    LoadDataDiv.classList.remove("Table-Active");
    LoadDataDiv.classList.add("Table-Desactive");
}

function ShowLineTable(){
    document.getElementById('NodeInfoButton').classList.remove('btn-active')
    document.getElementById('LoadInfoButton').classList.remove('btn-active')
    document.getElementById('LineInfoButton').classList.add('btn-active')
    // Muestra la Tabla de las lineas
    LineDataDiv.classList.add("Table-Active");
    LineDataDiv.classList.remove("Table-Desactive");
    NodeDataDiv.classList.remove("Table-Active");
    NodeDataDiv.classList.add("Table-Desactive");
    LoadDataDiv.classList.remove("Table-Active");
    LoadDataDiv.classList.add("Table-Desactive");
}

function ShowLoadTable(){
    document.getElementById('NodeInfoButton').classList.remove('btn-active')
    document.getElementById('LoadInfoButton').classList.add('btn-active')
    document.getElementById('LineInfoButton').classList.remove('btn-active')
    // Muestra la Tabla de las lineas
    LoadDataDiv.classList.add("Table-Active");
    LoadDataDiv.classList.remove("Table-Desactive");
    LineDataDiv.classList.remove("Table-Active");
    LineDataDiv.classList.add("Table-Desactive");
    NodeDataDiv.classList.remove("Table-Active");
    NodeDataDiv.classList.add("Table-Desactive");
}

// Funciones para cargar las tablas de los Nodos, Lineas y Cargas


async function loadNodosTable(periodoSeleccionado, flagSolutionData) {

    // Obtengo los valores desde el backend
    dataFiltrarRed = {
        idUser: iduser,
        idred: idredValue
    }
    await FiltrarRedBackend(dataFiltrarRed).then(dataRedDB => {
        NombreredValue = dataRedDB.message[0].nombre
    })

    // Obtengo el valor de Vnominal
    let Vnominal = 0
    dataFiltrarParameters = {
        idred: idredValue,
    }
    await FiltrarParametrosBackend(dataFiltrarParameters).then(dataParametrosDB => {
        Paramters = dataParametrosDB.message[0]
        Vnominal = JSON.parse(Paramters.Vnom)
    })

    // Obtengo los valores desde el backend
    dataFiltrarParameters = {
        idred: idredValue,
    }
    V = [] // Voltage
    Vp = {} // Voltage x period
    labels_name_Voltage = [] // labels para los voltajes
    // Filtro los bus (Deberia filtrar las grid tambien)
    dataFiltrarNode = {
        idred: idredValue,
        //idNodo: Nodeid
        tipo: '1'
    }
    await FiltrarNodeBackend(dataFiltrarNode).then(nodeDB => {
        const node = nodeDB.message
        // Tengp que filtrar solos los nodos que son bus o grid
        node.forEach(nodeData => {   
            Vdata = JSON.parse(nodeData.V)
            V.push(Vdata)
            const numSeries = V.length;
            labels_name_str = "Node - " + nodeData.nombre
            labels_name_Voltage.push(labels_name_str)

            for (let p = 0; p < P; p++) {
                Vp[p] = [];
                for (let s = 0; s < numSeries; s++) {
                    Vp[p].push(V[s][p]);
                }
            }
        });   
    }); 

/*  # Ver por que vuelvo a calcular
    tabla_nodos = await procesarNodosSolution(Vp, Vnominal).then(resultados => {
        return resultados
    }); */

    NodeDataDiv = document.getElementById("NodeData");
    if (NodeDataDiv && NodeDataDiv.rows.length > 1) {
        for (let i = NodeDataDiv.rows.length - 1; i > 1; i--) {
            NodeDataDiv.deleteRow(i);
        }
    }

    tabla_nodos['table_solution'][periodoSeleccionado].forEach(fila => {
    const nuevaFila = NodeDataDiv.insertRow();
        fila.forEach((celda, indice) => {
            const nuevaCelda = nuevaFila.insertCell();
            nuevaCelda.textContent = celda;
        }); 
    }); 

    // Mostramos o ocultamos las columnas de la tabla Nodo 
    var table = document.getElementById('NodeData');
    var columnsToHide = [1, 3, 4, 5, 6, 7, 8]; // Índices de las columnas a ocultar (¡empieza desde 1!)
    // ocutlo columnas 
    ShowHiddenColumn(table, columnsToHide, flagSolutionData)
    
}


async function loadLoadTable(periodoSeleccionado, flagSolutionDataValue) {
    LoadDataDiv = document.getElementById("LoadData");

    if (LoadDataDiv && LoadDataDiv.rows.length > 1) {
        for (let i = LoadDataDiv.rows.length - 1; i > 1; i--) {
            LoadDataDiv.deleteRow(i);
        }
    }
    let rowValue = 0
    tabla_loads['table_solution_loads'][periodoSeleccionado].forEach(fila => {
        const nuevaFila = LoadDataDiv.insertRow();
            fila.forEach((celda, indice) => {
                const nuevaCelda = nuevaFila.insertCell();
                nuevaCelda.textContent = celda;
                if (indice === 4 || indice === 5) {
                    EventosEdicionCarga(nuevaCelda, flagSolutionDataValue, fila[1], indice)
                    nuevaCelda.setAttribute('indexRow', rowValue)
                    nuevaCelda.setAttribute('indexColumn', indice)
                    if(indice == 4){
                        nuevaCelda.classList.add('PLvalues')
                    } else {
                        nuevaCelda.classList.add('QLvalues')
                    }

                    nuevaCelda.contentEditable = 'true';
                };
            }); 
            rowValue = rowValue + 1
    }); 
    // Mostramos o ocultamos las columnas de la tabla Load 
    var table = document.getElementById('LoadData');
    var columnsToHide = [2, 3]; //Índices de las columnas a ocultar (¡empieza desde 1!)
    // ocutlo columnas 
    ShowHiddenColumn(table, columnsToHide, false)
}

async function loadLineTable(periodoSeleccionado, flagSolutionDataValue) {
    
    // Obtengo las lineas del backend
    dataFiltrarLinea = {
        idred: idredValue, 
        idsubtipo: "A"
    }
    await FiltrarLineaBackend(dataFiltrarLinea).then(dataLineasDB => {
        lineasBackend = dataLineasDB.message
    })

    LineDataDiv = document.getElementById("LineData");

    if (LineDataDiv && LineDataDiv.rows.length > 1) {
        for (let i = LineDataDiv.rows.length - 1; i > 1; i--) {
            LineDataDiv.deleteRow(i);
        }
    }

    // Obtener el cuerpo de la tabla (<tbody>)
    const tbody = LineDataDiv.querySelector("tbody");
    
    rowValue = 0
    lineasBackend.forEach(linea => {
        // Crear una nueva fila (<tr>)
        const nuevaFila = tbody.insertRow();

        const celdaLineaID = nuevaFila.insertCell();
        celdaLineaID.textContent = linea.nombre;  

        const celdaSource = nuevaFila.insertCell();
        celdaSource.textContent = linea.source_nombre;  

        const celdaReceptor = nuevaFila.insertCell();
        celdaReceptor.textContent = linea.receptor_nombre;  

        var celdaR = nuevaFila.insertCell();
        celdaR.textContent = Number(linea.r).toFixed(3);  
        celdaR.setAttribute('indexRow', rowValue)
        celdaR.setAttribute('indexColumn', 0)
        celdaR.classList.add('Rvalues')
        celdaR.contentEditable = 'true'; 
        //EventosEdicion(celdaR);        
        
        var celdaX = nuevaFila.insertCell();
        celdaX.textContent = Number(linea.x).toFixed(3); 
        celdaX.setAttribute('indexRow', rowValue)
        celdaX.setAttribute('indexColumn', 1)
        celdaX.classList.add('Xvalues')
        celdaX.contentEditable = 'true'; 
        
        const celdaZ = nuevaFila.insertCell();
        celdaZ.textContent = Number(linea.z).toFixed(3); 

        EventosEdicionLinea(celdaR, celdaZ, flagSolutionDataValue, linea.nombre, celdaX, 'R');
        EventosEdicionLinea(celdaX, celdaZ, flagSolutionDataValue, linea.nombre, celdaR, 'X');

        const celdaI = nuevaFila.insertCell();
        Iarray = JSON.parse(linea.I)
        celdaI.textContent = Number(Iarray[periodoSeleccionado]).toFixed(3); 

        const celdaP = nuevaFila.insertCell();
        Parray = JSON.parse(linea.P)
        celdaP.textContent = Number(Parray[periodoSeleccionado]).toFixed(3); 
        /* celdaP.contentEditable = 'true'; */

        const celdaQ = nuevaFila.insertCell();
        Qarray = JSON.parse(linea.Q)
        celdaQ.textContent = Number(Qarray[periodoSeleccionado]).toFixed(3); 
        /* celdaQ.contentEditable = 'true'; */
        rowValue = rowValue + 1
    });

    // Mostramos o ocultamos las columnas de la tabla Linea 
    var table = document.getElementById('LineData');
    var columnsToHide = [1,7,8,9]; //Índices de las columnas a ocultar (¡empieza desde 1!)
    // ocutlo columnas 
    ShowHiddenColumn(table, columnsToHide, flagSolutionData)
}


// Función para editar la tabla de las cargas
async function EventosEdicionCarga(nuevaCelda, flagSolutionDataValue, Nodoid, indice) {
    nuevaCelda.addEventListener('click', () => {
        // Si accedimos a la tabla desde los datos podemos editar las Cargas
        if (!flagSolutionDataValue) {
            const valorInicial = nuevaCelda.textContent;
            
            // Hacer la celda editable
            nuevaCelda.contentEditable = 'true';
            nuevaCelda.focus();

            // Guardar los cambios al perder el foco de la celda
            nuevaCelda.addEventListener('blur', async () => {
                startLoad()
                const nuevoValor = nuevaCelda.textContent;

                if (nuevoValor !== valorInicial) {
                    const selectElement = document.getElementById('periodoSelectGeneralTable');
                    const periodoSeleccionado = selectElement.value;
                    await guardarCambiosLoad(nuevaCelda, { value: nuevoValor }, valorInicial, Nodoid, indice, periodoSeleccionado);
                }
            }); // Asegurar que el evento blur solo se ejecute una vez

            // Guardar los cambios al presionar Enter
            nuevaCelda.addEventListener('keydown', async (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault(); // Evitar el comportamiento predeterminado de Enter
                    nuevaCelda.blur(); // Simular el evento blur
                }
            }); // Asegurar que el evento keydown solo se ejecute una vez

            // Evitar que el doble clic se propague y abra otra vez la edición
            nuevaCelda.addEventListener('click', (event) => {
                event.stopPropagation();
            });

            // Manejar el evento paste
            nuevaCelda.addEventListener('paste', async (event) => {
                startLoad()
                event.preventDefault();
                const pastedData = (event.clipboardData || window.clipboardData).getData('text');
                await procesarDatosLoadPegados(event, pastedData)
                endLoad()
            });
        }
    });
}

// Función para guardar los cambios realizados en la tabla de las cargas
async function guardarCambiosLoad(nuevaCelda, input, valorInicial, Nodoid, indice, periodoSeleccionado) {
    nuevaCelda.textContent = Number(input.value).toFixed(3);
    
    if (input.value !== valorInicial) {
        dataFiltrarNode = {
            idred: idredValue,
            idNodo: Nodoid,
        }
        
        const SelectednodoDB = await FiltrarNodeBackend(dataFiltrarNode);
        const Selectednodo = SelectednodoDB.message[0];
        var pInitial = JSON.parse(Selectednodo.p)
        var qInitial = JSON.parse(Selectednodo.q)

        // Cambiar los valores del Nodo en el Backend    
        if(indice === 4){
            // Si se cambio el PL
            var pNewValue = pInitial
            pNewValue[periodoSeleccionado] = input.value
            var dataChangeNode = {
                idredOriginal: idredValue,
                idNodoOriginal: Nodoid,
                // Nuevos Valores
                pNew: String(pNewValue),
            }
        }
        else if(indice === 5){
            // Si se cambio el QL
            var qNewValue = qInitial
            qNewValue[periodoSeleccionado] = input.value
            var dataChangeNode = {
                idredOriginal: idredValue,
                idNodoOriginal: Nodoid,
                // Nuevos Valores
                qNew: String(qNewValue),
            }
        }
        // El problema es que para un nodo pueden estar conectadas varias cargas
        await CambiarNodoBackend(dataChangeNode).then( endLoad())        
        /* await openPopupTables(event, false) */
        await loadNodosTable(periodoSeleccionado, flagSolutionData).then( endLoad())
    }
}

// Función para editar la tabla de las Lineas
function EventosEdicionLinea(nuevaCelda, celdaZ, flagSolutionDataValue, lineaNombre, celda_R_X, indice) {
    nuevaCelda.addEventListener('click', () => {
        // Si accedimos a la tabla desde los datos podemos editar las Cargas
        if (!flagSolutionDataValue) {
            const valorInicial = nuevaCelda.textContent;

            // Hacer la celda editable
            nuevaCelda.contentEditable = 'true';
            nuevaCelda.focus();

            // Guardar los cambios al perder el foco de la celda
            nuevaCelda.addEventListener('blur', async () => {
                const nuevoValor = nuevaCelda.textContent;

                if (nuevoValor !== valorInicial) {
                    await guardarCambiosLinea(nuevaCelda, { value: nuevoValor }, celda_R_X, celdaZ, valorInicial, indice, lineaNombre);
                }
            }, { once: true }); // Asegurar que el evento blur solo se ejecute una vez

            // Guardar los cambios al presionar Enter
            nuevaCelda.addEventListener('keydown', async (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault(); // Evitar el comportamiento predeterminado de Enter
                    nuevaCelda.blur(); // Simular el evento blur
                }
            }); // Asegurar que el evento keydown solo se ejecute una vez

            // Evitar que el doble clic se propague y abra otra vez la edición
            nuevaCelda.addEventListener('click', (event) => {
                event.stopPropagation();
            });

            // Manejar el evento paste
            nuevaCelda.addEventListener('paste', (event) => {
                event.preventDefault();
                const pastedData = (event.clipboardData || window.clipboardData).getData('text');
                procesarDatosLineasPegados(event, pastedData);
            });
        }
    });
}



// Función para guardar los cambios realizados en la tabla de las Lineas
async function guardarCambiosLinea(nuevaCelda, input, celda_R_X, celdaZ, valorInicial, indice, lineaNombre) {
    if (input.value !== valorInicial) {
        nuevaCelda.textContent =  Number( input.value).toFixed(3);
        valor_R_X = parseFloat(celda_R_X.textContent) // Este es el valor del otro elemento que no se está cambiando (si se cambia R es X y si se cambia X es R)
        // Aquí puedes guardar los cambios en tu estructura de datos tabla_nodos
        if(indice === 'R'){
            // Si se cambio la resistencia (R)
            var dataChangeLine = {
                idredOriginal: idredValue,
                nombreOriginal: lineaNombre,
                // Nuevos Valores
                rNew: parseFloat(input.value), // String(r),
                zNew: parseFloat(Math.sqrt(Math.pow(input.value,2) + parseFloat(Math.sqrt(Math.pow(valor_R_X,2))) )), // String(Math.sqrt(Math.pow(r,2) + Math.pow(x,2))),
            }
        } else if(indice === 'X'){
            // Si se cambio la impedancia (X)
            var dataChangeLine = {
                idredOriginal: idredValue,
                nombreOriginal: lineaNombre,
                // Nuevos Valores
                xNew: parseFloat(input.value), // String(r),
                zNew: parseFloat(Math.sqrt(Math.pow(input.value,2) + Math.pow(valor_R_X,2))) , // String(Math.sqrt(Math.pow(r,2) + Math.pow(x,2))),
            }
        }
        celdaZ.textContent = Number( Math.sqrt(Math.pow(input.value,2) + Math.pow(valor_R_X,2)) ).toFixed(3); 
        await CambiarLineaBackend(dataChangeLine) 


    }
}

// Función para copiar y pegar en la tablas de las lineas
async function procesarDatosLineasPegados(event, pastedData, lineaNombre) {
    const filas = pastedData.split('\n');
    const valores = filas[0].split('\t'); // Asumimos que los datos están separados por tabulaciones

    event.preventDefault();

    startCell = event.target 
    startRow = parseFloat(startCell.getAttribute('indexRow'))
    startColumn = parseFloat(startCell.getAttribute('indexColumn'))

    const rowvectors = pastedData.split('\n');
    const firstColumn = []
    const SecondColumn = []
    
    rowvectors.forEach((element, index) => {
        firstElement = element.split('\t')[0]
        SecondElement = element.split('\t')[1]
        if(firstElement !== ""){
            if(firstElement){
                firstColumn.push(firstElement)
            }
        }
        if(SecondElement !== ""){
            if(SecondElement){
                SecondColumn.push(SecondElement)
            }
        }
    });

    for (let i = 0; i < firstColumn.length; i++) {
        const table = document.querySelectorAll("#LineData")
        var targetCell = document.querySelector(`#LineData tr:nth-child(${startRow + i + 3}) td:nth-child(${startColumn + 4})`);
        var celdaZ = document.querySelector(`#LineData tr:nth-child(${startRow + i + 3}) td:nth-child(${6})`);
        var celdaLineaID = document.querySelector(`#LineData tr:nth-child(${startRow + i + 3}) td:nth-child(${1})`);
        var indice = [];
        var celda_R_X = [];
        var valorInicial = 0;

        if(targetCell && firstColumn.length != 0){
            lineaNombre = celdaLineaID.textContent;  
            if( targetCell.getAttribute('contenteditable')){
                valorInicial =  targetCell.textContent
                targetCell.textContent = Number(firstColumn[i]).toFixed(3);
                if(startColumn == 0){
                    // Estoy Pegando sobre la columna de R
                    indice = 'R'
                    // Tomo el valor de X (permanece constante)
                    celda_R_X = document.querySelector(`#LineData tr:nth-child(${startRow + i + 3}) td:nth-child(${startColumn + 5})`); // Celda de X 
                } else if(startColumn == 1){
                    // Estoy Pegando sobre la columna de X
                    indice = 'X'
                    // Tomo el valor de R (permanece constante)
                    celda_R_X = document.querySelector(`#LineData tr:nth-child(${startRow + i + 3}) td:nth-child(${startColumn + 4})`); // Celda de R
                }     
                
                await guardarCambiosLinea(targetCell, { value: Number(firstColumn[i]).toFixed(3) }, celda_R_X, celdaZ, valorInicial, indice, lineaNombre);
            }
        }

        var targetCell2 = document.querySelector(`#LineData tr:nth-child(${startRow + i + 3}) td:nth-child(${startColumn + 5})`);
        if(targetCell2 && SecondColumn.length != 0){
            lineaNombre = celdaLineaID.textContent; 
            if(targetCell2.getAttribute('contenteditable')){
                valorInicial =  targetCell2.textContent
                targetCell2.textContent = Number(SecondColumn[i]).toFixed(3);
                if(startColumn == 0){
                    // Estoy Pegando sobre la columna de R (el segundo elemento va solbre la columna X) - Es decir el paste empieza sobre la columna R
                    indice = 'X'
                    // Tomo el valor de X (permanece constante)
                    celda_R_X = document.querySelector(`#LineData tr:nth-child(${startRow + i + 3}) td:nth-child(${startColumn + 4})`); // Celda de R
                    await guardarCambiosLinea(targetCell2, { value: Number(SecondColumn[i]).toFixed(3) }, celda_R_X, celdaZ, valorInicial, indice, lineaNombre);
                } else if(startColumn == 1){
                    // No existe segundo elemento ya que estoy pegando sobre la columna de X
                }
              
            }
        }
    }
}




// Función para copiar y pegar en la tablas de las Cargas
async function procesarDatosLoadPegados(event, pastedData) {
    const filas = pastedData.split('\n');
    const valores = filas[0].split('\t'); // Asumimos que los datos están separados por tabulaciones

    event.preventDefault();

    startCell = event.target 
    startRow = parseFloat(startCell.getAttribute('indexRow'))
    startColumn = parseFloat(startCell.getAttribute('indexColumn'))

    const rowvectors = pastedData.split('\n');
    const firstColumn = []
    const SecondColumn = []
    
    rowvectors.forEach((element, index) => {
        firstElement = element.split('\t')[0]
        SecondElement = element.split('\t')[1]
        if(firstElement !== ""){
            if(firstElement){
                firstColumn.push(firstElement)
            }
        }
        if(SecondElement !== ""){
            if(SecondElement){
                SecondColumn.push(SecondElement)
            }
        }
    });

    const selectElement = document.getElementById('periodoSelectGeneralTable');
    const periodoSeleccionado = selectElement.value;

  for (let i = 0; i < firstColumn.length; i++) {
        const table = document.querySelectorAll("#LoadData")
        var targetCell = document.querySelector(`#LoadData tr:nth-child(${startRow + i + 3}) td:nth-child(${startColumn + 1})`);
        var celdaNodeID = document.querySelector(`#LoadData tr:nth-child(${startRow + i + 3}) td:nth-child(${2})`);
        const selectElement = document.getElementById('periodoSelectGeneralTable');
        const periodoSeleccionado = selectElement.value;
        
        var indice = []; // Indice permite ver si estamos en la columna de PL o QL (indice = 4 columna de PL - indice = 5 columna de QL)
        var valorInicial = 0;

        if(targetCell && firstColumn.length != 0){
            Nodoid  = celdaNodeID.textContent;  
            if( targetCell.getAttribute('contenteditable')){
                valorInicial =  targetCell.textContent
                nuevoValor =  firstColumn[i]
                targetCell.textContent = Number(firstColumn[i]).toFixed(3);
                indice = parseInt(targetCell.getAttribute('indexcolumn'))
                // Actualizo la tabla de las cargas
                table_solution_loads[periodoSeleccionado][i][indice] = Number(nuevoValor).toFixed(3);
                // Actualizo los valores en el Backend
                await guardarCambiosLoad(targetCell, { value: nuevoValor }, valorInicial, Nodoid, indice, periodoSeleccionado);
            }
        }

        var targetCell2 = document.querySelector(`#LoadData tr:nth-child(${startRow + i + 3}) td:nth-child(${startColumn + 2})`);
        if(targetCell2 && SecondColumn.length != 0){
            NodeID  = celdaNodeID.textContent;  
            if(targetCell2.getAttribute('contenteditable')){
                valorInicial =  targetCell2.textContent
                nuevoValor =  Number(SecondColumn[i]).toFixed(3)
                targetCell2.textContent = Number(SecondColumn[i]).toFixed(3);
                indice = parseInt(targetCell2.getAttribute('indexcolumn'))
                // Actualizo la tabla de las cargas
                table_solution_loads[periodoSeleccionado][i][indice] = Number(nuevoValor).toFixed(3);
                // Actualizo los valores en el Backend
                await guardarCambiosLoad(targetCell2, { value: nuevoValor }, valorInicial, Nodoid, indice, periodoSeleccionado);              
            }
        }
    }  
}
