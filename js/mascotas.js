//Agarro todos los botones e imágenes del álbum
const botones = document.querySelectorAll('.botones button');
const imagenes = document.querySelectorAll('.imagenes img');

const cambiarBotonActivo = (e) => {
    //Saco clase activa de todos los botones
    botones.forEach(boton => {
        boton.classList.remove('btn-clickeado');
    });

    //Agrego clase activa al botón clickeado
    e.target.classList.add('btn-clickeado');
}

const filtrarImagenes = (e) => {

    //Ejecuto función de botón activo
    cambiarBotonActivo(e);

    //Recorro todas las imágenes
    imagenes.forEach(imagen => {

        //Expando todas las imágenes
        imagen.classList.remove('img-comprimida');
        imagen.classList.add('img-expandida');

        //Obtengo 'data' del atributo de <img>
        const tipoImagen = parseInt(imagen.dataset.img);

        //Obtengo 'data' del botón clickeado
        const tipoBoton = parseInt(e.target.dataset.btn);

        //Evalúo si el tipo de botón e imagen no coinciden
        if (tipoImagen !== tipoBoton) {

            //Oculto la imagen
            imagen.classList.remove('img-expandida');
            imagen.classList.add('img-comprimida');
        }
    });
}

//Evento de click para el botón 'all'
botones[0].addEventListener('click', (e) => {

    cambiarBotonActivo(e);
    //Recorro todas las imágenes
    imagenes.forEach(imagen => {
        //Expando todas las imágenes
        imagen.classList.remove('img-comprimida');
        imagen.classList.add('img-expandida');
    });
});

//Evento de click para todos los botones
for (let i = 1; i < botones.length; i++) {
    botones[i].addEventListener('click', filtrarImagenes);
}


