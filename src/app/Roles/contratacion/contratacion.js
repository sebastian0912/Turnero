
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

document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', function() {
        if (this.files.length > 0) {
            // Cambiar el color del botón asociado
            this.nextElementSibling.style.backgroundColor = '#3dbc02';
        }
    });
});


function convertirImagenABase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            // Extraer solo la parte Base64 de la cadena
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}


function obtenerValoresTextos() {
    const valores = {};
    const inputsTexto = document.querySelectorAll('input[type="text"], input[type="number"], input[type="date"]');
    inputsTexto.forEach(input => {
        valores[input.id] = input.value;
    });
    return valores;
}

async function obtenerValoresArchivos() {
    const valores = {};
    const inputsArchivo = document.querySelectorAll('input[type="file"]');
    for (let input of inputsArchivo) {
        if (input.files.length > 0) {
            const archivo = input.files[0];
            valores[input.id] = await convertirImagenABase64(archivo);
        }
    }
    return valores;
}


async function recopilarInformacion() {
    const valoresTexto = obtenerValoresTextos();
    const valoresArchivo = await obtenerValoresArchivos();
    return {...valoresTexto, ...valoresArchivo};
}


document.getElementById('botonC').addEventListener('click', async () => {
    const informacion = await recopilarInformacion();
    // Imprimir cada campo individualmente
    for (const [clave, valor] of Object.entries(informacion)) {
        console.log(`${clave}: ${valor}`);
    }

    
});
