
import { aviso } from "../../Avisos/avisos.js";
import { urlBack } from "../../model/base.js";

const uid = localStorage.getItem("idUsuario");

// Capturar el h1 del titulo y perfil
const titulo = document.querySelector('#username');
const perfil = document.querySelector('#perfil');
// Capturar el PERFIL y el USERNAME del local storage
const perfilLocal = localStorage.getItem("perfil");
const usernameLocal = localStorage.getItem("username");

//Muestra en la parte superior el nombre y el perfil
titulo.innerHTML = usernameLocal;
perfil.innerHTML = perfilLocal;


if (perfilLocal == "GERENCIA" ) {
    estadisticas.style.display = "block";
    vacantes.style.display = "block";
    publicidad.style.display = "block";
    //seleccion.style.display = "block";
    //contratacion.style.display = "block";
    ausentismos.style.display = "block";
}

if (perfilLocal == "GERENCIA"  || perfilLocal == "COORDINADOR" || perfilLocal == "JEFE-DE-AREA" ) {
    formasDePago.style.display = "block";
}



function toggleSeccion(id) {
    var seccion = document.getElementById(id);
    if (seccion.style.display === 'none') {
        seccion.style.display = 'block';
    } else {
        seccion.style.display = 'none';
    }
}
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona todos los títulos de sección
    var titulos = document.querySelectorAll('.tituloSeccion');

    // Asigna un event listener a cada título
    titulos.forEach(function(titulo) {
        titulo.addEventListener('click', function() {
            // Encuentra el próximo elemento hermano (la sección que sigue al título) y alterna su visibilidad
            var seccion = this.nextElementSibling;
            if (seccion.style.display === 'none' || seccion.style.display === '') {
                seccion.style.display = 'block';
            } else {
                seccion.style.display = 'none';
            }
        });
    });
});
