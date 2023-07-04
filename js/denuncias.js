const formularioDenuncias = document.getElementById('formulario_denuncias');
const inputsDenuncias = document.querySelectorAll('#formulario_denuncias textarea');

const expresion = {
    descHechos: /^.{50,250}$/ //Mínimo 50 caracteres, máximo 250
}

//Validar los inputs individualmente para el formulario de denuncias
const validarFormularioDenuncias = (e) => {
    switch (e.target.name) {
        case 'ubicacion':
            validarCampo(e.target, 'ubicacion');
            break;
        case 'involucrados':
            validarCampo(e.target, 'involucrados');
            break;
        case 'descHechos':
            validarCampo(e.target, 'descHechos');
            break;
    }
}

//Por cada vez que se deja de escribir en un input, ejecutar lo siguiente
inputsDenuncias.forEach((input) => {
    input.addEventListener('keyup', validarFormularioDenuncias);
    input.addEventListener('blur', validarFormularioDenuncias);
});

const validarCampo = (input, campo) => {
    var descHechos = document.getElementById('descHechos').value;
    var contenido = descHechos.length;

    if (campo == 'ubicacion' && input.value !== '' || campo == 'involucrados' && input.value !== '') {
        campoValido(campo);
    } else if (campo == 'descHechos') {
        if (contenido >= 50 && contenido <= 250) {
            campoValido(campo);
        } else {
            campoInvalido(campo);
        }
    }
    else {
        campoInvalido(campo);
    }
}

const campoValido = (campo) => {
    //Al ser válido, se elimina cualquier color de incorrecto
    document.getElementById(`grupo_${campo}`).classList.remove('denuncias_grupo_incorrecto');
    document.getElementById(`grupo_${campo}`).classList.add('denuncias_grupo_correcto');
    //Elimino icono de incorrecto y lo reemplazo por uno correcto
    document.querySelector(`#grupo_${campo} .denuncias_input_error`).classList.remove('denuncias_input_error_activo');
}

const campoInvalido = (campo) => {
    //Le agrego una clase en caso de que el input sea incorrecto y recalco que el campo es incorrecto
    document.getElementById(`grupo_${campo}`).classList.add('denuncias_grupo_incorrecto');
    document.getElementById(`grupo_${campo}`).classList.remove('denuncias_grupo_correcto');
    document.querySelector(`#grupo_${campo} .denuncias_input_error`).classList.add('denuncias_input_error_activo');
}

const validacionDenuncias = () => {
    //Variables para obtener valor de los inputs
    var ubicacionForm = document.getElementById('ubicacion').value;
    var involucradosForm = document.getElementById('involucrados').value;
    var descHechosForm = document.getElementById('descHechos').value;

    //Variable con expresion regular
    var descHechosExp = expresion.descHechos;

    if (ubicacionForm !== '' && involucradosForm !== '' && descHechosExp.test(descHechosForm)) {
        //Reseteo el formulario y mando mensaje de éxito
        formularioDenuncias.reset();
        document.getElementById('denuncias_mensaje_exito').classList.add('denuncias_mensaje_exito_activo');
        document.getElementById('denuncias_mensaje').classList.remove('denuncias_mensaje_activo');

        //Elimino el mensaje de que el formulario fue enviado después de 5 segundos
        setTimeout(() => {
            document.getElementById('denuncias_mensaje_exito').classList.remove('denuncias_mensaje_exito_activo');
        }, 5000);

        //Quito los íconos "check" de todos los inputs
        document.querySelectorAll('.denuncias_grupo_correcto').forEach((icono) => {
            icono.classList.remove('denuncias_grupo_correcto');
        });
    } else {
        document.getElementById('denuncias_mensaje').classList.add('denuncias_mensaje_activo');
        //Quito mensaje de error pasados los 5 segundos
        setTimeout(() => {
            document.getElementById('denuncias_mensaje').classList.remove('denuncias_mensaje_activo');
        }, 5000);
    }
}

