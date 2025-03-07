// Eventos controlados con el Ctrl
document.addEventListener('keydown', function(event) {
	// Verificamos si la tecla presionada es Ctrl
	if (event.shiftKey) {

		// cierro todas las ventanas menos la de parámetros o la de carga de redes
		if(FlagPopUpLoadRed || FlagPopUpParamtros){
			
		} else {
			Esc()
	    }

		FlagShift = true; 

		// Deseleccionar elmentos seleccionados
		if (FlagSelected == true ){
			// Deselecciono elementos y lineas
			selectedElements.forEach(element => {
				element.style.border = WidthNode + "px solid " + ColorNode;
			});

			selectedLines.forEach(element => {
				element.style.height = `${WidthLine}px`;
				element.style.backgroundColor = ColorLine;
				element.style.opacity = "1"; // Define la opacidad del trazo
			});
	
			FlagSelected = false; // Se seleccionó un elemnto
			selectedElements = [];
			selectedElementsAnterior = [];
			selectedLines = [];
			selectedLinesAnterior = [];
		}

		// Para mostrar los pines al apretar shift
		let pinEs= document.querySelectorAll('.pin');
		
		pinEs.forEach(pinE => {
			// Para todos los pines salvo para los Nodos
			if(pinE.parentNode.parentNode.getAttribute("type") != "Node"){
				pinE.style.display = "flex";// Por ejemplo, cambiar el color de fondo del div
			}  else {
				pinE.style.zIndex = 100;
				pinE.style.cursor= "crosshair";
				pinE.style.backgroundColor = '';
			}
        });

		let LineBoxes= document.querySelectorAll('.LineBox');
		LineBoxes.forEach(LineBox => {
            LineBox.style.display = "flex";
        });

		// Impido que los elementos sean draggleables
		objectsInFramework = document.getElementById("framework").getElementsByClassName("objeto");
		for (let i = 0; i < objectsInFramework.length; i++) {
			objectsInFramework[i].draggable = false	
		}

		pinLineIni = document.getElementsByClassName("pinLineIni");
		for (let i = 0; i < pinLineIni.length; i++) {
			pinLineIni[i].style.visibility= "visible";
		}

		pinLineEnd = document.getElementsByClassName("pinLineEnd");
		for (let i = 0; i < pinLineEnd.length; i++) {
			pinLineEnd[i].style.visibility= "visible";
		}

	} 
});

document.addEventListener('keyup', function(event) {
	if (event.key === "Shift") {
		// Para ocultar los pines al soltar el cltr
		FlagShift = false; 
		let pinEs= document.querySelectorAll('.pin');
		pinEs.forEach(pinE => {
			// Para todos los pines salvo para los Nodos
			if(pinE.parentNode.parentNode.getAttribute("type") != "Node"){
				pinE.style.display = "none";// Por ejemplo, cambiar el color de fondo del div
			} else {
				pinE.style.backgroundColor = ColorNode;
				pinE.style.zIndex = -5;
				pinE.style.cursor= "grab";
			}
		});

		let LineBoxes= document.querySelectorAll('.LineBox');
		LineBoxes.forEach(LineBox => {
			LineBox.style.display = "none";
		});

		// Permito que los elementos sean draggleables
		objectsInFramework = document.getElementById("framework").getElementsByClassName("objeto");
		for (let i = 0; i < objectsInFramework.length; i++) {
			objectsInFramework[i].draggable = true	
		}

		pinLineIni = document.getElementsByClassName("pinLineIni");
		for (let i = 0; i < pinLineIni.length; i++) {
			pinLineIni[i].style.visibility= "hidden";
		}

		pinLineEnd = document.getElementsByClassName("pinLineEnd");
		for (let i = 0; i < pinLineEnd.length; i++) {
			pinLineEnd[i].style.visibility= "hidden";
		}

		contenedorLineIni = document.getElementsByClassName("contenedorLineIni");
		for (let i = 0; i < contenedorLineIni.length; i++) {
			contenedorLineIni[i].style.visibility= "hidden";
		}

		contenedorLineEnd = document.getElementsByClassName("contenedorLineEnd");
		for (let i = 0; i < contenedorLineEnd.length; i++) {
			contenedorLineEnd[i].style.visibility= "hidden";
		}

		button1Ini = document.getElementsByClassName("button1Ini");
		for (let i = 0; i < button1Ini.length; i++) {
			button1Ini[i].style.visibility= "hidden";
		}
		
		button2Ini = document.getElementsByClassName("button2Ini");
		for (let i = 0; i < button2Ini.length; i++) {
			button2Ini[i].style.visibility= "hidden";
		}

		button1End = document.getElementsByClassName("button1End");
		for (let i = 0; i < button1End.length; i++) {
			button1End[i].style.visibility= "hidden";
		}
		
		button2End = document.getElementsByClassName("button2End");
		for (let i = 0; i < button2End.length; i++) {
			button2End[i].style.visibility= "hidden";
		}
		

	}
});
