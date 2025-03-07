
document.addEventListener('DOMContentLoaded', function() {
    var stylesheet = document.styleSheets[0];
    // Color del pin
    // Encontrar la regla de estilo correspondiente a la clase ".miClase"
    var rules = stylesheet.cssRules || stylesheet.rules;
    var rule;
    for (var i = 0; i < rules.length; i++) {
        if (rules[i].selectorText === '.pin') {
            rule = rules[i];
            break;
        }
    }

    updateGrid();



/* 
    // Verificar si se encontró la regla de estilo
    if (rule) {
        // Cambiar el color de fondo de la clase
        rule.style.backgroundColor = pinColor;
        //rule.setProperty('background-color', pinColor, 'important');
    } else {
        console.error('No se encontró la regla de estilo para .miClase');
    }
 */

/* 
    // Cargo la red (Debería crear un pag para logear el usuario)
    dataFiltrarRed = {
        idUser: iduser,
    }

    // Obtengo las redes del backend relacionados con el usuario
    FiltrarRedBackend(dataFiltrarRed)
    .then(dataRedDB => {
    const redes = dataRedDB.message
    redes.forEach(redData => {
        idredValue = redData.id
        NombreredValue = redData.nombre
    });     
    })
    .catch(error => {
    console.error('Error:', error);
    }); 

 */
    // Esto lo tengo que borrar
/*     AddRed(event)
 */


});

