//------------------------------------- VALIDACION FORMULARIO DE DONACIONES -------------------------------------//
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input'); //Obtengo array de todos los inputs

//Expresiones regulares para controlar inputs
const expresiones = {
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,20}$/, //Solo letras, límite 20. Acepta tildes.
    apellido: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,20}$/, //Solo letras, límite 20. Acepta tildes.
    correo: /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z\.]+$/, //Nombre alfanumérico, se aceptan "-", "_" y "." antes del @.
    dni: /^\d{8}$/, //DNI entre 10.000.000 y 99.999.999
    telefono: /^\d{7,14}$/, //Solo admite números, mínimo 7, máximo 14
    donacion: /^.+$/ //Admite cualquier caracter excepto salto de línea
}

//Valido los inputs individualmente
const validarFormulario = (e) => {
    //Navego por cada input
    switch (e.target.name) {
        case 'nombre':
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case 'apellido':
            validarCampo(expresiones.apellido, e.target, 'apellido');
            break;
        case 'dni':
            validarCampo(expresiones.dni, e.target, 'dni');
            break;
        case 'correo':
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case 'telefono':
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
        case 'donacion':
            validarCampo(expresiones.donacion, e.target, 'donacion');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo_incorrecto');
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo_correcto');
        //Elimino icono de incorrecto y lo reemplazo por uno correcto
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-solid', 'fa-paw');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-solid', 'fa-paw');
        document.querySelector(`#grupo_${campo} .formulario_input_error`).classList.remove('formulario_input_error_activo');
    } else {
        //Le agrego una clase en caso de que el input sea incorrecto
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo_incorrecto');
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo_correcto');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-solid', 'fa-paw');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-solid', 'fa-paw');
        document.querySelector(`#grupo_${campo} .formulario_input_error`).classList.add('formulario_input_error_activo');
    }
}

//Por cada vez que se deja de escribir en un input, ejecutar lo sigueinte
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

const validacion = () => {

    //Variables para obtener valor de los inputs
    var nombreForm = document.getElementById('nombre').value;
    var apellidoForm = document.getElementById('apellido').value;
    var dniForm = document.getElementById('dni').value;
    var correoForm = document.getElementById('correo').value;
    var telefonoForm = document.getElementById('telefono').value;
    var donacionForm = document.getElementById('donacion').value;

    //Variables para almacenar valor de expresiones regulares
    var nombreExp = expresiones.nombre;
    var apellidoExp = expresiones.apellido;
    var dniExp = expresiones.dni;
    var correoExp = expresiones.correo;
    var telefonoExp = expresiones.telefono;
    var donacionExp = expresiones.donacion;

    if (nombreExp.test(nombreForm) && apellidoExp.test(apellidoForm) && dniExp.test(dniForm) && correoExp.test(correoForm) && telefonoExp.test(telefonoForm) && donacionExp.test(donacionForm)) {

        //Reseteo el formulario y mando mensaje de éxito
        formulario.reset();
        document.getElementById('formulario_mensaje_exito').classList.add('formulario_mensaje_exito_activo');
        document.getElementById('formulario_mensaje').classList.remove('formulario_mensaje_activo');

        //Elimino el mensaje de que el formulario fue enviado después de 5 segundos
        setTimeout(() => {
            document.getElementById('formulario_mensaje_exito').classList.remove('formulario_mensaje_exito_activo');
        }, 5000);

        //Quito los íconos "check" de todos los inputs
        document.querySelectorAll('.formulario_grupo_correcto').forEach((icono) => {
            icono.classList.remove('formulario_grupo_correcto');
        });
    } else {
        document.getElementById('formulario_mensaje').classList.add('formulario_mensaje_activo');

        //Quito mensaje de error pasados los 5 segundos
        setTimeout(() => {
            document.getElementById('formulario_mensaje').classList.remove('formulario_mensaje_activo');
        }, 5000);
    }
}