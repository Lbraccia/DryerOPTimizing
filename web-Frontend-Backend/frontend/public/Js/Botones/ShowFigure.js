function ShowFigure(event) {
    popupFigure =  document.getElementById("popupFigure");
    let popupOpen = document.getElementsByClassName('popupClass');

    // Crea un array para almacenar los elementos que no tienen display 'none'
    // Itera sobre los elementos
    for (var i = 0; i < popupOpen.length; i++) {
        // Obtén el estilo actual del elemento
        var style = window.getComputedStyle(popupOpen[i]);
        // Verifica si el display no es 'none'
        if (style.display !== 'none') {
            // Agrega el elemento al array de elementos visibles
            visiblePopUp = popupOpen[i];
            break
        }
    }

    if(FlagPopUpFigure == false){
        FlagPopUpFigure = true;
        popupFigure.style.display = 'block';     
    } else {
        FlagPopUpFigure = false;
        popupFigure.style.display = 'none';
    }
    var rectframeworkBox = frameworkBox.getBoundingClientRect();
    
    rectvisiblePopUp = visiblePopUp.getBoundingClientRect();
    rectpopupFigure = popupFigure.getBoundingClientRect();
    
    let PopUpLeft = parseFloat(rectvisiblePopUp.left) + 275
    let popUpHeight =  parseFloat(rectvisiblePopUp.top) 

    if(PopUpLeft + parseFloat(rectpopupFigure.width) + 250 > rectframeworkBox.right)
    {
        PopUpLeft = parseFloat(rectvisiblePopUp.left) - parseFloat(rectpopupFigure.width) - 250
    } 
    
    popupFigure.style.left = PopUpLeft + "px";
    popupFigure.style.top = popUpHeight + "px";

}

function closePopupFigure() {
    // Ocultar el pop-up
    document.getElementById('popupFigure').style.display = 'none';
    FlagPopUpFigure = false;
}



// Manejo de las figuras para los p y q de las cargas y las generaciones 
function handleInputChangeLoad(event) {
  
    //Aquí va el código que quieres ejecutar con los nuevos valores
    //Puedes acceder al valor con this.value o event.target.value
     const pdInputs = document.querySelectorAll('.pd');
     const qdInputs = document.querySelectorAll('.qd');

     let pd = [];
     let qd = [];
     pdInputs.forEach(input => pd.push(input.value));
     qdInputs.forEach(input => qd.push(input.value));

     //actualizarLoad(event)
     /* await ShowFigureLoad(event, pd, qd)  */
     const select_barra_element = document.getElementById("periodoSelect");
     
     actualizarGraficoLoad(parseInt(select_barra_element.value), pd, qd)
  }


  function actualizarGraficoLoad(periodoSeleccionado, pd, qd) {
     let myChart;
     const num_periodos = pd.length;
     const labels = Array.from({ length: num_periodos }, (_, i) => i + 1);
     const backgroundColorsP = pd.map((_, index) => index === periodoSeleccionado ? 'rgba(54, 162, 235, 0.7)' : 'rgba(128, 128, 128, 0.3)');
     const borderColorsP = pd.map((_, index) => index === periodoSeleccionado ? 'rgba(54, 162, 235, 1)' : 'rgba(128, 128, 128, 1)');
     const backgroundColorsQ = qd.map((_, index) => index === periodoSeleccionado ? 'rgba(255, 99, 132, 0.7)' : 'rgba(128, 128, 128, 0.3)');
     const borderColorsQ = qd.map((_, index) => index === periodoSeleccionado ? 'rgba(255, 99, 132, 1)' : 'rgba(128, 128, 128, 1)');

     if (myChart) {
         myChart.destroy();
     }

     // Crear el canvas dinámicamente
     const canvas = document.createElement('canvas');

     Figure.innerHTML = ''; // Limpiar el contenido del botón (eliminar la imagen)
     Figure.appendChild(canvas); // Añadir el canvas al botón
     const ctx = canvas.getContext('2d');

     const scale = window.devicePixelRatio; // Obtiene el factor de escala del dispositivo (generalmente 1 o 2)
     canvas.width = Figure.offsetWidth * scale; // Ancho escalado
     canvas.height = Figure.offsetHeight * scale; // Alto escalado
     ctx.scale(scale, scale); // Escala el contexto

     myChart = new Chart(ctx, {
         // ... (resto de la configuración del gráfico es igual)
         type: 'bar',
         data: {
             labels: labels,
             datasets: [{
                 label: 'P: Active Power',
                 data: pd,
                 backgroundColor: backgroundColorsP,
                 borderColor: borderColorsP,
                 borderWidth: 1,
                 barPercentage: 0.8,
                 categoryPercentage: 0.4
             }, {
                 label: 'Q: Reactive Power',
                 data: qd,
                 backgroundColor: backgroundColorsQ,
                 borderColor: borderColorsQ,
                 borderWidth: 1,
                 barPercentage: 0.8,
                 categoryPercentage: 0.4
             }]
         },
         options: {
             scales: {
                 x: {
                     stacked: false,
                      title: {
                         display: true,
                         text: 'Period',
                     }
                 },
                 y: {
                     beginAtZero: true,
                     title: {
                         display: true,
                         text: 'Power [kW]',
                     }
                 }
             },
             plugins: {
                 legend: {
                     display: true,
                     position: 'top',
                     labels: {
                        // Tratando de corregir el error sobre los labels al seleccionar otro periodo
                        /* generateLabels: function(chart) {
                            console.log("ENtro")
                            const data = chart.data;
                            console.log(data.datasets.length)
                            if (data.datasets.length) {
                                return data.datasets.map(function(dataset, i) {
                                    return {
                                        text: dataset.label,
                                        fillStyle: i === 0 ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)', // Colores fijos para los legends
                                        strokeStyle: i === 0 ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)',
                                        lineWidth: 1,
                                        hidden: !chart.isDatasetVisible(i),
                                        index: i
                                    };
                                });
                            }
                            return []; 
                        }*/
                    }
                 }
             },
             
             onClick: (event, elements) => {  // <-- Manejador de clicks
                if (elements.length > 0) {
                    const clickedIndex = elements[0].index;
                    selectElement = document.getElementById('periodoSelect');
                    selectElement.value = clickedIndex; // Actualiza el select
                    actualizarGraficoLoad(clickedIndex, pd, qd); // Re-renderiza el gráfico con la barra seleccionada
                }
            }
         }
     });
 }




 function actualizarGraficoVoltage(periodoSeleccionado, V) {
    let myChart;
    const num_periodos = V.length;
    const labels = Array.from({ length: num_periodos }, (_, i) => i + 1);
    const backgroundColorsV = V.map((_, index) => index === periodoSeleccionado ? 'rgba(54, 162, 235, 0.7)' : 'rgba(128, 128, 128, 0.3)');
    const borderColorsV = V.map((_, index) => index === periodoSeleccionado ? 'rgba(54, 162, 235, 1)' : 'rgba(128, 128, 128, 1)');

    if (myChart) {
        myChart.destroy();
    }

    // Crear el canvas dinámicamente
    const canvas = document.createElement('canvas');

    Figure.innerHTML = ''; // Limpiar el contenido del botón (eliminar la imagen)
    Figure.appendChild(canvas); // Añadir el canvas al botón
    const ctx = canvas.getContext('2d');

    const scale = window.devicePixelRatio; // Obtiene el factor de escala del dispositivo (generalmente 1 o 2)
    canvas.width = Figure.offsetWidth * scale; // Ancho escalado
    canvas.height = Figure.offsetHeight * scale; // Alto escalado
    ctx.scale(scale, scale); // Escala el contexto

    myChart = new Chart(ctx, {
        // ... (resto de la configuración del gráfico es igual)
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'V: Voltage',
                data: V,
                backgroundColor: backgroundColorsV,
                borderColor: borderColorsV,
                borderWidth: 1,
                barPercentage: 0.8,
                categoryPercentage: 0.4
            }]
        },
        options: {
            scales: {
                x: {
                    stacked: false,
                     title: {
                        display: true,
                        text: 'Period',
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Voltage [kV]',
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            
            onClick: (event, elements) => {  // <-- Manejador de clicks
               if (elements.length > 0) {
                   const clickedIndex = elements[0].index;
                   selectElement = document.getElementById('periodoSelect');
                   selectElement.value = clickedIndex; // Actualiza el select
                   actualizarGraficoVoltage(clickedIndex, V); // Re-renderiza el gráfico con la barra seleccionada
               }
           }
        }
    });
}
  