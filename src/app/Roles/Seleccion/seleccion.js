
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


if (perfilLocal == "GERENCIA") {
    estadisticas.style.display = "block";
    vacantes.style.display = "block";
    publicidad.style.display = "block";
    seleccion.style.display = "block";
    contratacion.style.display = "block";
    ausentismos.style.display = "block";
}
if (usernameLocal == "HEIDY TORRES"){
    formasDePago.style.display = "block";
}


document.getElementById('mes').addEventListener('change', function() {
    var selectedMonth = this.value;
    var daysDropdown = document.getElementById('dia');
    daysDropdown.innerHTML = ''; // Borra las opciones anteriores

    var daysInMonth = new Date(2023, selectedMonth, 0).getDate(); // Obtiene el número de días en el mes

    for (var i = 1; i <= daysInMonth; i++) {
        var day = i.toString().padStart(2, '0'); // Agrega un 0 si es un solo dígito
        var option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        daysDropdown.appendChild(option);
    }
});