/**
 * 
 * Java script para pagina hbCambioDeDivisas.html
 * CoderHouse Comisión 86620 - año 2025
 * @author Carlos A. santa Cruz 
 *
 * @description Entrega02. JS desde hbCambiodeDivisas.html -  Proyecto de Home banking
 * 
 * Función sistema de Compra y Venta de Monedas
 * 
 * Este script permite realizar operaciones de compra y venta de 
 * monedas extranjeras (Dólar y Euro) utilizando Pesos Argentinos (AR$).
 * 
 * Proceso:
 * . Verifica si hay un usuario activo, si no lo hay redirige a index.html
 * . Obtiene las tasas de cambio desde elementos HTML
 * . Permite al usuario seleccionar la moneda con la que desea operar
 * . Permite elegir entre comprar o vender dicha moneda
 * . Solicita la cantidad a operar
 * . Calcula e informa el monto final en Pesos Argentinos
 * 
 **/

// estas variables las defino afuera de las funciones para que sean globales
// y se las pueda usar en cualquier parte del programa

let clUsuarioActivo = "UsuarioActivo"; // nombres dados a la variable de sessionStorage
let UsuarioActivo = "";         // variable para guardar el nombre de usuario válido
let tasasMonedas = {}; // variable para guardar las tasas de cambio de monedas
let mensajeFinal = ""; // variable para guardar el mensaje final
/**
* 
* Ejecutar inicio cuando se carga la página
*
*/
inicio();


// Función principal que inicia el sistema de compra/venta de divisas
function inicio() {
    // Verificar si hay un usuario activo
    verificaUsuarioActivo();  // si NO hay, regresa a inicio.html

    // Obtener las tasas de cambio desde los elementos HTML
    // Los valores de monedas ya vienen definidos en el HTML 
    tasasMonedas = obtenerTasasCambio();  // Llama a la función para iniciar el sistema de monedas

} // fin de la función inicio()

/**
 * @function CalcularCambioDivisas  viene desde el formulario de cambio de divisas
 * 1. lee los valores ingresados por el usuario
 * 2. valida los mismos y en caso de valor incorrecto, avisa el error
 * 3. calcula el resultado final de la operación y muestra el resultado al usuario
 */
function CalcularCambioDivisas() {
    // Borramos mensajes anteriores 
    mensajeFinal = ""; // Reinicio el mensaje final para evitar que se acumulen mensajes de errores anteriores

    // Llama a la función para leer los valores del formulario
    // y calcular el resultado de la operación
    let TodoBien = LeerValoresDelFormulario();

    if (!TodoBien) {
        // Si TodoBien es falso, significa que hubo un error en la operación
        mensajeFinal = mensajeFinal + "Operación fallida.";
    }

    // Mostrar mensaje final al usuario
    // ==========================================================

    let msgError = document.getElementById("idError");
    msgError.innerHTML = mensajeFinal; // Coloco el mensaje que se generó antes
    msgError.style.display = "block"; // Mostrar el msgError

    // no sale nunca de aqui, porque el formulario no se envía
    // y no se redirige a otra página
    // salvo que el usuario haga click en la funcion de salida
    event.preventDefault(); // Evita que el formulario se envíe

} // fin de la función CalcularCambioDivisas()
// =========================================================

function LeerValoresDelFormulario() {
    // 1.  solicitar la moneda con la que se desea operar
    const monedaElegida = solicitarMoneda();

    // Verificar si el usuario ingresó una moneda válida
    // caso contrario, no continuamos con el proceso
    if (!monedaElegida) return null;

    // 2. Solicitar el tipo de operación (comprar o vender)
    const tipoOperacion = solicitarTipoOperacion();

    // Verificar si el usuario ingresó una operación válida
    // de no ser así, no continuamos con el proceso
    if (!tipoOperacion) return null;

    // 3. Solicitar la cantidad que el usuario desea comprar o vender
    const cantidad = solicitarCantidad();

    // Verificar si el usuario ingres+o un importe válido
    // de no ser así, no continuamos con el proceso
    if (!cantidad) return null;

    // 4. Calcular el resultado final de la operación
    return (calcularResultado(monedaElegida, tipoOperacion, cantidad, tasasMonedas));
}

// =========================================================
//
// Verificar si hay un usuario activo
//
// =========================================================
function verificaUsuarioActivo() {
    // ======================================================== 
    //
    // Miramos si hay una session válida activa, para lo cual la variable de sessionStorage
    // deben tener un valor, no deben estar vacías
    // rescato el nombre del usuario activo es esta sessionStorage
    // 
    // ======================================================== 

    // ***
    UsuarioActivo = sessionStorage.getItem(clUsuarioActivo);  // definido al principio
    if (UsuarioActivo) {   // ¿tiene algo adentro ?
        // Si existe, lo muestro en la parte superior de la pagina debajo del titulo
        TratarUsuarioActivo(); // muestro el nombre del usuario activo
    }
    else {
        // Si no existe, lo redirijo a la página de identificación
        window.location.href = "../index.html"; // redirijo a la pagina de index.html
    }

} // fin de la función verificaUsuarioActivo()

// ***
function TratarUsuarioActivo() {
    // ======================================================== 
    //
    // Coloca el nombre del usuario activo en la parte superior 
    // de la pagina debajo del titulo
    // 
    // ======================================================== 

    // ***
    let usuarioIdentificado = document.getElementById("idUsuarioIdentificado");
    usuarioIdentificado.innerHTML = UsuarioActivo; // coloco el nombre del usuario bajo el titulo
} // fin de la función TratarUsuarioActivo()
// =========================================================


/**
 * 1. Obtiene las tasas de cambio desde los elementos HTML
 * @returns {Object} Objeto con las tasas de compra y venta para Dólar y Euro
 *
 * Sintaxis de objetos: 
 * La sintaxis { clave1: valor1, clave2: valor2, ... } se utiliza para crear objetos literales.
 * clave1, clave2, etc., son los nombres de las propiedades.
 * valor1, valor2, etc., son los valores asignados a esas propiedades.
 * En la función obtenerTasasCambio(), 
 *      creamos un objeto que tiene dos propiedades: dolar y euro. 
 *      Cada una de estas propiedades es, a su vez, otro objeto 
 *      con las propiedades compra y venta.
 **/
function obtenerTasasCambio() {
    return {
        dolar: {
            compra: parseFloat(document.getElementById("idCompraDolar").innerText),
            venta: parseFloat(document.getElementById("idVentaDolar").innerText)
        },
        euro: {
            compra: parseFloat(document.getElementById("idCompraEuro").innerText),
            venta: parseFloat(document.getElementById("idVentaEuro").innerText)
        }
    };
}

/**
 * 
 * Lee del formulario de Cambio de Divisas
 * y devuelve el valor de la moneda elegida por el usuario
 * @function solicitarMoneda : miramos con que moneda decide operar
 * @returns {string|null} La moneda elegida ('dolar' o 'euro') o null si no elige
 * 
 */
function solicitarMoneda() {

    const monedaRadioButtons = document.querySelectorAll('input[name="fMonedaElegida"]');
    for (const unRadioButton of monedaRadioButtons) {
        if (unRadioButton.checked) {
            return unRadioButton.value;
        }
    }

    // Mensaje de error
    mensajeFinal = mensajeFinal + "Debe seleccionar una moneda para operar.<br>";
    return null; // Devuelve null si no hay ninguna opción seleccionada

}  // fin de la función solicitarMoneda()
// =========================================================

/**
 * Lee del formulario de Cambio de Divisas
 * y devuelve el valor de la operación elegida por el usuario
 * @function solicitarTipoOperacion : miramos que operación decide realizar
 * @returns {string|null} El tipo de operación ('comprar' o 'vender') o null si no elige
 */
function solicitarTipoOperacion() {

    const operacionRadioButtons = document.querySelectorAll('input[name="fOperacionElegida"]');
    for (const unRadioButton of operacionRadioButtons) {
        if (unRadioButton.checked) {
            return unRadioButton.value;
        }
    }

    // Mensaje de error
    mensajeFinal = mensajeFinal + "Debe seleccionar una operacion para operar.<br>";
    return null; // Devuelve null si no hay ninguna opción seleccionada

}  // fin de la función solicitarTipoOperacion()
// =========================================================

/**
 * 
 * Solicita al usuario la cantidad de moneda para la operación
 * @returns {number|null} La cantidad de moneda o null si es invalido
 * 
 */
function solicitarCantidad() {
    // Leo el valor ingresado por el usuario en el formulario
    const importeInput = document.getElementById('fImporteOperacion');
    if (importeInput) {
        const importe = importeInput.value.trim(); // Elimino espacios en blanco al principio y al final
        // y voy a Verificar si es numérico
        if (esNumerico(importe)) {
            return importe; // Devuelve el valor ingresado por el usuario
        }
    }

    // Mensaje de error
    mensajeFinal = mensajeFinal + "El valor ingresado no es numérico.<br>";
    return null; // Devuelve null si el valor no es numérico 
} // fin de la función solicitarCantidad()
// =========================================================

// Función para validar si un valor es numérico
function esNumerico(valor) {
    return /^\d+(\.\d+)?$/.test(valor);
}

/**
 * 
 * Calcula e informa el resultado final de la operación
 * @param {string} moneda - La moneda elegida ('dolar' o 'euro')
 * @param {string} operacion - El tipo de operación ('comprar' o 'vender')
 * @param {number} cantidad - La cantidad de moneda para la operación
 * @param {Object} tasas - Objeto con las tasas de cambio
 * 
 */
function calcularResultado(moneda, operacion, cantidad, tasas) {
    let montoTotal = 0;
    let tasa = 0;
    let monedaNombre = "";

    // Determinar la moneda y su nombre para la presentación
    switch (moneda) {
        case "dolar":
            monedaNombre = "Dólares";
            tasa = operacion === "compra" ? tasas.dolar.venta : tasas.dolar.compra;
            break;
        case "euro":
            monedaNombre = "Euros";
            tasa = operacion === "compra" ? tasas.euro.venta : tasas.euro.compra;
            break;
    }

    // Calcula el monto total en pesos argentinos
    montoTotal = cantidad * tasa;

    // Preparar mensaje según tipo de operación
    if (operacion === "comprar") {

        mensajeFinal = mensajeFinal + `Para comprar ${cantidad} ${monedaNombre},<br> deberá depositar AR$ ${montoTotal.toFixed(2)}`;
    } else { // vender
        mensajeFinal = mensajeFinal + `Por vender ${cantidad} ${monedaNombre},<br> recibirá AR$ ${montoTotal.toFixed(2)}`;
    }

    return true; // Indica que la operación fue exitosa

}
