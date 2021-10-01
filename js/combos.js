//Objeto JSON ----------------------------------------------------
const combosDB = {
    "superCombo" : {
        "ingredientes" : [
            "3 piezas de pollo", "Ensalada", "Papa frita", "Bebida grande"
        ],
        "precio" : "7.25"
    },
    "comboPersonal" : {
        "ingredientes" : [
            "2 piezas de pollo", "Papa frita", "Bebida mediana"
        ],
        "precio" : "5.75"
    },
    "comboInfantil" : {
        "ingredientes" : [
            "1 pieza de pollo", "Papa frita", "Bebida pequeña"
        ],
        "precio" : "3.50"
    }
}
//Objeto JSON ----------------------------------------------------

window.onload = Inicio;

var comboanterior;
function Inicio(){
    //Variable para la caja de comentarios
    var comentario = document.getElementById("comentarios");

    //constante para obener el JSON
    const request = new XMLHttpRequest();
    
    //pedimos abrir el JSON con los menus
    /*request.open('GET', '/js/combosDB.json');
    //El tipo de datos que  vamos a obtener
    request.responseType = 'json';
    request.send();
    //función en la cual nos vamos a guiar cuando se termine de leer el JSON
    request.onload =  function() {
        const menu = request.response;
        escogerMenu(menu);
    }*/
    escogerMenu(combosDB);


    request.open('GET', '../db/productos.json');
    //El tipo de datos que  vamos a obtener
    request.responseType = 'json';
    request.send();
    //función en la cual nos vamos a guiar cuando se termine de leer el JSON
    request.onload =  function() {
        const productos = request.response;
        escogerProducto(productos);
    }

    //PARTE: CAJA DE SUGERENCIAS   ------------------------------------------

    comentario.addEventListener("click", function() {
        hiddenComentarios();
    });

    comentario.onclick = hiddenComentarios;
    
    document.onkeydown = function(e){
        e = e || event;
        if ( e.ctrlKey && e.keyCode == 'E'.charCodeAt(0) ) {
           hiddenComentarios();
            return false;
        }
        if( e.ctrlKey && e.keyCode == 'S'.charCodeAt(0) ) {
            hiddenTxt();
            return false;
        }
    };

    //PARTE: CAJA DE SUGERENCIAS   ------------------------------------------
   
    //PARTE DE MENU
    
}
function   escogerProducto(productos){
    var inputFinal = document.getElementById('txtFinal');
    var menucart = document.getElementById('demas');
    document.getElementsByName('otros').forEach(e=>{
        e.addEventListener('click', function(){
            var cuentaactual = parseFloat(inputFinal.value)
            var div = document.createElement('div')
            div.className = "comida"
            var nombre = document.createElement('div')
            var a ;
         
            var precio = parseFloat(productos[e.id]['precio']);
            nombre.innerHTML += `<p class='name'>${productos[e.id]['nombre']} </p>`
          
            div.appendChild(nombre);
            var cantidad = document.createElement('input')
            cantidad.type = 'number'
            cantidad.value  ="1"
            div.appendChild(cantidad)
            menucart.appendChild(div);

            inputFinal.value = cuentaactual+precio
            comboanterior = e.id;
        })
    })
}
function escogerMenu(menu){
    var inputFinal = document.getElementById('txtFinal');
    var menucart = document.getElementById('menu');
    document.getElementsByName('combos').forEach(e=>{
        e.addEventListener('click', function(){
            var cuentaactual = parseFloat(inputFinal.value)
            if(comboanterior!=undefined){
                var menos =  parseFloat( menu[comboanterior]['precio']);
                total = cuentaactual-menos
                inputFinal.value = total;
            }
            menucart.innerHTML = "";
            var div = document.createElement('div')
            div.className = "comida"
            var nombre = document.createElement('div')
            var a ;
         
            var precio = parseFloat(menu[e.id]['precio']);
            switch(e.id){
                case "comboInfantil":
                    a = "Combo Infantil"
                break;
                case "comboPersonal":
                    a = "Combo Personal"

                break;
                case "superCombo":
                    a = "Super Combo"
                break;
            }
            nombre.innerHTML += `<p class='name'>${a} </p>`
          
            div.appendChild(nombre);
           var menuIn = menu[e.id]['ingredientes']
            for(var index = 0 ; index <= 4; index++){
                if(menuIn[index] == undefined){

                }else{
                    div.innerHTML += `<p>${menuIn[index]}</p>`

                }
            }
 
            menucart.appendChild(div);

            inputFinal.value = cuentaactual+precio
            comboanterior = e.id;
        })
    })
}

//FUNCIONES: CAJA DE SUGERENCIAS  --------------------------------------------
function hiddenComentarios() {
    var sugerencia = document.getElementById("txtSugerencia");
    var comentario = document.getElementById("comentarios");

    if( comentario.className != "hidden" ){
        comentario.className = "hidden";
        sugerencia.className = "txtSugerencia";
    }
}

function hiddenTxt() {
    var sugerencia = document.getElementById("txtSugerencia");
    var comentario = document.getElementById("comentarioSee");
    var mensaje = document.getElementById("mensaje");

    if( sugerencia.value == "" ){
        alert("Escriba algo por favor, apreciado cliente.");
    }else{
        mensaje.innerText = sugerencia.value;

        comentario.className = "comentarios";
        sugerencia.className = "hidden";
    }
}
//FUNCIONES: CAJA DE SUGERENCIAS  --------------------------------------------

//FUNCIONES DEL MENU


function escogerMenu(menu){
    var inputFinal = document.getElementById('txtFinal');
    var menucart = document.getElementById('menu');
    document.getElementsByName('combos').forEach(e=>{
        e.addEventListener('click', function(){
            //menucart.innerHTML = "";
            var div = document.createElement('div')
            div.className = "comida"
            var nombre = document.createElement('div')
            var a ;
            var precio = menu[e.id]['precio'][0];
            switch(e.id){
                case "comboInfantil":
                    a = "Combo Infantil"
                break;
                case "comboPersonal":
                    a = "Combo Personal"

                break;
                case "superCombo":
                    a = "Super Combo"
                break;
            }
            nombre.innerHTML += `<p class='name'>${a} </p>`
          
            div.appendChild(nombre);
           var menuIn = menu[e.id]['ingredientes']
            for(var index = 0 ; index <= 4; index++){
                if(menuIn[index] == undefined){

                }else{
                    div.innerHTML += `<p>${menuIn[index]}</p>`

                }
            }
            var cuentaactual = inputFinal.value;
            console.log(cuentaactual);
            console.log(precio);
            var cuenta = parseFloat(cuentaactual)+parseFloat(precio).toFixed(2)
            inputFinal.value = cuenta;
            menucart.appendChild(div);



        })
    })
}
