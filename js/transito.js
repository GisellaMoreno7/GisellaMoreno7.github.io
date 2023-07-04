// Modifico transiciones de las mascotas en tránsito/adopción
const imagenes = document.querySelectorAll('.imagen');

for (let [i, imagenSeleccionada] of imagenes.entries()) {
    imagenSeleccionada.addEventListener('click', function focus() {
        sacarFocus();
        imagenSeleccionada.classList.toggle('activa');
    });
}

// Remuevo la clase "activa" cuando se hace clic en otra imagen
function sacarFocus() {
    imagenes.forEach(imagen => imagen.classList.remove('activa'));
}

// Agarro todas las imágenes
const imagenesContenedor = document.querySelector('.imagenes');

// Duración de cada mascota
const duracion = 6;

// Temporizador para cambiar las imágenes
let indexImgActual = 0;
let temporizador = setInterval(cambiarImagen, duracion * 1000);

// Función para cambiar la imagen activa
function cambiarImagen() {
    // Saco la clase "activa" de la imagen actual
    imagenes[indexImgActual].classList.remove('activa');

    indexImgActual++;

    // Verifico si se alcanzó el final de la colección de mascotas
    if (indexImgActual === imagenes.length) {
        indexImgActual = 0;
    }

    // Agrego la clase "activa" a la nueva mascota
    imagenes[indexImgActual].classList.add('activa');
}

//Paro el temporizador al hacer clic en una imagen
imagenesContenedor.addEventListener('click', function () {
    clearInterval(temporizador);
});

//Cambiar la mascota automáticamente cuando la página se termina de cargar
window.addEventListener('load', function () {
    cambiarImagen();
});

