async function openPopupParameters(event) {
    //Verifico si la tecla ctrl está presionada
    if (event.ctrlKey) {
    }
    else{
        FlagPopUpParamtros = true; 
        var popupParametro = document.getElementById('popupParameters');

        /* var Pvalue = 1; */
        var PInput = null
        var NameInput = null

        // Obtengo los valores desde el backend
        dataFiltrarRed = {
            idUser: iduser,
            idred: idredValue
        }
        await FiltrarRedBackend(dataFiltrarRed).then(dataRedDB => {
            NombreredValue = dataRedDB.message[0].nombre
        })

        // Obtengo los valores desde el backend
        dataFiltrarParameters = {
            idred: idredValue,
        }
        await FiltrarParametrosBackend(dataFiltrarParameters).then(dataParametrosDB => {
            Paramters = dataParametrosDB.message[0]

            Pvalue = parseFloat(Paramters.P)
            PInput = document.getElementById('Pinput');

            VLBgvalue = parseFloat(Paramters.VLBg)
            VLBgInput = document.getElementById('VLBginput');

            VUBgvalue = parseFloat(Paramters.VUBg)
            VUBgInput = document.getElementById('VUBginput');

            ILBgvalue = parseFloat(Paramters.ILBg)
            ILBgInput = document.getElementById('ILBginput');

            IUBgvalue = parseFloat(Paramters.IUBg)
            IUBgInput = document.getElementById('IUBginput');

            PLBgvalue = parseFloat(Paramters.PLBg)
            PLBgInput = document.getElementById('PLBginput');

            PUBgvalue = parseFloat(Paramters.PUBg)
            PUBgInput = document.getElementById('PUBginput');


            QLBgvalue = parseFloat(Paramters.QLBg)
            QLBgInput = document.getElementById('QLBginput');

            QUBgvalue = parseFloat(Paramters.QUBg)
            QUBgInput = document.getElementById('QUBginput');
            
            Namevalue = NombreredValue;
            NameInput = document.getElementById('Name');  
                     
            Nvalue = parseFloat(Paramters.Nnodos) 
            Ninput = document.getElementById('Ninput');

            Busvalue = parseFloat(Paramters.N)
            Businput = document.getElementById('Businput');

            NG1value = parseFloat(Paramters.NG1)
            NG1input = document.getElementById('NG1input');

            NG2value = parseFloat(Paramters.NG2)
            NG2input = document.getElementById('NG2input');

            NG3value = parseFloat(Paramters.NG3)
            NG3input = document.getElementById('NG3input');

            NSvalue = parseFloat(Paramters.S)
            NSinput = document.getElementById('NSinput');

            NStoragevalue = parseFloat(Paramters.NStorage)
            NStorageinput = document.getElementById('NStorageinput');

            NLoadvalue = parseFloat(Paramters.NLoad)
            NLoadinput = document.getElementById('NLoadinput');

            NLinesvalue = parseFloat(Paramters.NLine)
            NLinesinput = document.getElementById('NLinesinput');

            // Mostrar el pop-up
            popupParametro.style.display = 'flex';
            popupParametro.style.justifyContent = 'center';
            popupParametro.style.flexDirection = 'column';

            // Defino la Posición del Popup
            popupParametro.style.minWidth = "250px"
            popupParametro.style.minHeight = "275px"

            
            popupParametro.style.left = 100 + "px";
            popupParametro.style.top = 100 + "px";
            PInput.value = Pvalue;
            VLBgInput.value = VLBgvalue;
            VUBgInput.value = VUBgvalue;
            ILBgInput.value = ILBgvalue;
            IUBgInput.value = IUBgvalue;
            PLBgInput.value = PLBgvalue;
            PUBgInput.value = PUBgvalue;
            QLBgInput.value = QLBgvalue;
            QUBgInput.value = QUBgvalue;
            NameInput.value = Namevalue;
            Ninput.value = Nvalue - 1;
            Businput.value = Busvalue;
            NG1input.value = NG1value;
            NG2input.value = NG2value;
            NG3input.value = NG3value;
            NSinput.value = NSvalue;
            NStorageinput.value = NStoragevalue;
            NLoadinput.value = NLoadvalue;
            NLinesinput.value = NLinesvalue;
        })

    }
}

function closePopupParametros() {
    // Ocultar el pop-up
    document.getElementById('popupParameters').style.display = 'none';
    FlagPopUpParamtros = false;     
}

async function actualizarParametros(event) {
    if(popupParameters.style.display== "flex"){
        // Si el PopUp fue ejecutado
        
        // Cambio el nombre 
        const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const currentTime = new Date().toISOString().split('T')[1].split('.')[0]; // HH:MM:SS
        var Name = document.getElementById('Name').value;

        var dataChangeRed = {
            iUsuarioOriginal: iduser,
            idOriginal: idredValue,
            //NombreOriginal: Namevalue,
            // Nuevos Valores
            nombreNew: Name,
            fechaNew: currentDate,
            horaNew: currentTime
        }
        CambiarRedBackend(dataChangeRed); 
        NombreredValue = Name; 
        // Cambio los parámetros

        P = document.getElementById('Pinput').value;

        VLBg = document.getElementById('VLBginput').value;
        VUBg = document.getElementById('VUBginput').value;
        ILBg = document.getElementById('ILBginput').value;
        IUBg = document.getElementById('IUBginput').value;
        PLBg = document.getElementById('PLBginput').value;
        PUBg = document.getElementById('PUBginput').value;
        QLBg = document.getElementById('QLBginput').value;
        QUBg = document.getElementById('QUBginput').value;

        flagValoresValidos = validarValores() 
        if(flagValoresValidos){
            var dataChangeParametros = {
                idredOriginal: idredValue,
                // Nuevos Valores
                PNew: parseFloat(P),
                VLBgNew: parseFloat(VLBg),
                VUBgNew: parseFloat(VUBg),
                ILBgNew: parseFloat(ILBg),
                IUBgNew: parseFloat(IUBg),
                PLBgNew: parseFloat(PLBg),
                PUBgNew: parseFloat(PUBg),
                QLBgNew: parseFloat(QLBg),
                QUBgNew: parseFloat(QUBg),
            }
            CambiarParametrosBackend(dataChangeParametros)
        }
        // Cerrar el pop-up
        closePopupParametros();
    }
}


function validarValores() {
    const VLBg = parseFloat(document.getElementById('VLBginput').value);
    const VUBg = parseFloat(document.getElementById('VUBginput').value);
    const ILBg = parseFloat(document.getElementById('ILBginput').value);
    const IUBg = parseFloat(document.getElementById('IUBginput').value);
  
    const errorV = VLBg > VUBg ? 'Incorrect input: Lower Bound Voltage exceeds Upper Bound Voltage.' : '';
    const errorI = ILBg > IUBg ? 'Incorrect input: Lower Bound Current exceeds Upper Bound Current.' : '';
  
    const mensajeError = errorV || errorI;
  
    if (mensajeError) {
      alert(mensajeError);
      return false; // Opcional: para evitar que se procese el formulario si hay errores
    }
    return true; // Opcional: indica que la validación fue exitosa
  }