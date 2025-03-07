// Eventos controlados con el Ctrl
document.addEventListener('keydown', function(event) {
	// Verificamos si la tecla presionada es Ctrl
	if (event.ctrlKey) {
		FlagCtrl = true; 

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

		// Para mostrar los pines al apretar ctrl
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

	} 
});

document.addEventListener('keyup', function(event) {
	if (event.key === "Control") {
		// Para ocultar los pines al soltar el cltr
		FlagCtrl = false; 
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
		
	}
});
