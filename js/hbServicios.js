/**
 * 
 * Java script para pagina hbServicios.html
 * CoderHouse Comisión 86620 - año 2025
 * @author Carlos A. santa Cruz
 *
 * @description Entrega02. JS desde hbServicios.html -  Proyecto de Home banking
 * 
 * Funciones habilitada desde el index.html cuando se ingresó un usuario válido
 * 
 *  Bajo el título, a la derecha, coloca el nombre del usuario 
 * que está realizando la operación
 * 
 **/

// estas variables las defino afuera de las funciones para que sean globales
// y se las pueda usar en cualquier parte del programa

let clUsuarioActivo = "UsuarioActivo"; // nombres dados a la variable de sessionStorage
let UsuarioActivo;         // variable para guardar el nombre de usuario válido

// ======================================================== 
//
// Se ejecuta al cargar la página hbServicios.html
// 
// ======================================================== 
Inicio();

// =========================================================
function Inicio() {
    // Miramos si hay una session válida activa, para lo cual la variable de sessionStorage
    // deben tener un valor, no deben estar vacías

    // ======================================================== 
    //
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
} // fin de la función Inicio()


// =========================================================
function TratarUsuarioActivo() {
    // ======================================================== 
    //
    // Coloca el nombre del usuario activo en la parte superior 
    // de la pagina debajo del titulo
    // 
    // ======================================================== 

    // ***
    let usuarioIdentificado = document.getElementById("idUsuarioIdentificado");
    usuarioIdentificado.innerHTML = UsuarioActivo; // coloco el nombre del usuario en el span
} // fin de la función TratarUsuarioActivo()
// =========================================================
