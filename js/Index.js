/** ========================================================
 * 
 * Java script para pagina index.html
 * CoderHouse Comisión 86620 - año 2025
 * @author Carlos A. santa Cruz
 *
 * @description Entrega02. JS desde index.html - Proyecto de Home banking
 *  
 * Funciones ejecutadas desde la página index.html
 * 
 *  Funciones JavaScript implementadas:
 * @funcion inicio() se ejecuta al cargar la página index.html
 *      - Se inicializan las variables de sessionStorage y se verifica si hay una sesión activa
 *  @function ValidarUnUsuario() se inicia cuando se hace click en el botón "Continuar" 
 *      del formulario de identificación donde se pide el nombre de usuario y password    
 *  @function VerificoUsuarioPassword verifica que sean correctos el usuario y password
 *      - Se ingresa a esta función desde ValidarUnUsuario()
 *        Si son correctos vamos a la pagina hbServicios.html
 *        y si son incorrectos se da un mensaje de error y queda en la pagina
 * 
 * ======================================================== **/

// ejecucion inicial al cargar la pagina 
// estas variables las defino afuera de las funciones para que sean globales
// y se las pueda usar en cualquier parte del programa

    let TbUsuarioPw = [];      // array de usuarios y password válidos
    let UsuarioActivo;         // variable para guardar el nombre de usuario válido
    let RecordarUsuario;       // variable para recordar el nombre de usuario válido
    
    // nombres dados a las variables de sessionStorage
    let clTbUsuarioPw = "TbUsuarioPw";  
    let clUsuarioActivo = "UsuarioActivo"; 
    let clRecordarUsuario = "RecordarUsuario";
// ========================================================

Inicio();

// ========================================================


function Inicio() {
    // ======================================================== 
    //
    // Se ejecuta al cargar la página index.html
    // 
    // ======================================================== 
    // Miramos si hay una session válida activa, para lo cual unas variables de sessionStorage
    // deben tener un valor no deben estar vacías

    // ***
    // Trabajamos la tabla de usuarios y password válidos
    // Verifico si la variable de sessionStorage "TbUsuarioPw" existe y tiene un valor
    const TbUsuarioPwJSON = sessionStorage.getItem(clTbUsuarioPw);

    if (TbUsuarioPwJSON) {   // ¿tiene algo adentro ?
        // Si existe, convierto la cadena JSON de nuevo a un array JavaScript
        TbUsuarioPw = JSON.parse(TbUsuarioPwJSON);  // Ahora es un array normal
    } else {
        // Si no existe, la creo y le asigno un valor por defecto
        // Cargo la tabla de usuarios y password válidos. 
        // En la realidad debería hacerlo desde una base de datos
        TbUsuarioPw[0] = ["usuario1", "password1"];
        TbUsuarioPw[1] = ["usuario2", "password2"];
        TbUsuarioPw[2] = ["usuario3", "password3"];
        TbUsuarioPw[3] = ["usuario4", "password4"];
        TbUsuarioPw[4] = ["u1", "p1"];
        // Convierto el array a una cadena JSON antes de guardarlo
        // y lo guardo en una variable de sessionStorage
        sessionStorage.setItem(clTbUsuarioPw, JSON.stringify(TbUsuarioPw));
    } // Fin del if

    // ***
    // Trabajamos con las variables clRecordarUsuario y clUsuarioActivo
    // Verifico si existen y tienen un valor
    RecordarUsuario = sessionStorage.getItem(clRecordarUsuario);
    UsuarioActivo = sessionStorage.getItem(clUsuarioActivo);

    const nombreUsuarioInput = document.getElementById("idNombreUsuario");  // Input de nombre de usuario
    const claveInput = document.getElementById("idClave");  // Input de clave de usuario

    if (RecordarUsuario && UsuarioActivo) {         // ¿dice que reecordar si y tiene un usuario válido?
        nombreUsuarioInput.value = UsuarioActivo;   // Asignar el valor al input de nombre de usuario
        claveInput.value = "";                      // No debe quedar la password en el casillero
        // ***
        // coloco el nombre del usuario bajo el titulo a la derecha
        let usuarioIdentificado = document.getElementById("idUsuarioIdentificado");
        usuarioIdentificado.innerHTML = UsuarioActivo;

    } else {
        nombreUsuarioInput.value = "";  // Borra lo que haya en el input de nombre de usuario
        claveInput.value = "";          // y de la password en el casillero
        UsuarioActivo = "";             // Borra lo que haya en la variable
    }
    // ***
} // Fin de la función Inicio
// ========================================================


function ValidarUnUsuario() {
    /** ======================================================== 
    *
    * @function ValidarUnUsuario
    * @description Validación de usuario y password
    * 
    * Ingresamos aquí desde la página index.html como respuesta al evento click
    * en el boton submit que dice "Continuar" del formulario de identificación
    * 
    * Se pide el nombre de usuario y password y
    * si son correctos se va a la pagina de los servicios
    *
    * ======================================================== **/

    if (ControlarUsuarioPassword()) {     // voy a controlar el usuario y password
        // si el usuario y password son correctos
        // Borro el mensaje de error al usuario y 
        // Hago visible los botones de ingresar a los servicios
        HabilitarServicios(true);

        return true; // todo ok

    } else {  // si algo no está bien
        event.preventDefault(); // Evita que el formulario se envíe

        // Muestro el mensaje de error al usuario
        // si hubiera algo mas, se hace allí
        HabilitarServicios(false);

        return false; // algo está mal

    } // Fin del if

} // Fin de la función ValidarUnUsuario
// ========================================================

function ControlarUsuarioPassword() {
    /** ======================================================== 
     * @function ControlarUsuarioPassword
     * @description Controlo de nombre de usuario y password
     * @returns {boolean} true si el usuario y password son correctos, false si no lo son
     *
     * Se ingresa a esta función desde ValidarUnUsuario() 
     * La tabla TbUsuarioPw = [] (usuarios y password válidos) se carga en la función Inicio()
     *
     * ======================================================== **/
    // rescato los valores ingresados por el usuario en el formulario
    // y los guardo en las variables nombreUsuario y clave
    const nombreUsuario = document.getElementById("idNombreUsuario").value;
    const clave = document.getElementById("idClave").value;

    // La tabla TbUsuarioPw = [] (usuarios y password válidos) se cargan en Inicio, una sola vez 
    // recorro la tabla de usuarios y password válidos
    for (let i = 0; i < TbUsuarioPw.length; i++) {
        if (nombreUsuario === TbUsuarioPw[i][0] && clave === TbUsuarioPw[i][1]) {
            // Si el usuario y password son correctos, guardo el usuario en sessionStorage
            sessionStorage.setItem(clUsuarioActivo, nombreUsuario); // Guardar el usuario activo
            sessionStorage.setItem(clRecordarUsuario, true); // Guardar la opción de recordar usuario
            return true;    // usuario y password correctos
        }
    }
    return false;

} // Fin de la función ControlarUsuarioPassword
// ======================================================== 


function HabilitarServicios(siHabilitar) {
    // ========================================================
    //
    //  Se usa desde la funcion ValidarUnUsuario() para habilitar o deshabilitar
    //  funciones dependiendo si se identificó bien o no el usuario
    //
    // ========================================================

    let msgError = document.getElementById("idError");

    if (siHabilitar) {
        msgError.style.display = "none"; // Ocultar el mensaje de error al usuario

    } else {
        msgError.style.display = "block"; // Mostrar el msgError
    }
} // Fin de la función HabilitarServicios
// ========================================================
