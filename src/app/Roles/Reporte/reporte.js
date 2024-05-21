import { urlBack } from "../../model/base.js";
import { aviso, avisoConfirmado } from "../../Avisos/avisos.js";

const uid = localStorage.getItem("idUsuario");

// Capturar el h1 del titulo y perfil
const titulo = document.querySelector('#username');
const perfil = document.querySelector('#perfil');
// Capturar el PERFIL y el USERNAME del local storage
const perfilLocal = localStorage.getItem("perfil");
const usernameLocal = localStorage.getItem("username");
const sede = localStorage.getItem("sede");

//Muestra en la parte superior el nombre y el perfil
titulo.innerHTML = usernameLocal;
perfil.innerHTML = perfilLocal;

if (perfilLocal == "GERENCIA" ) {
    estadisticas.style.display = "block";
    vacantes.style.display = "block";
    publicidad.style.display = "block";
    ausentismos.style.display = "block";
}

if (perfilLocal == "GERENCIA"  || perfilLocal == "COORDINADOR" || perfilLocal == "JEFE-DE-AREA" ) {
    formasDePago.style.display = "block";
}

document.addEventListener('DOMContentLoaded', function() {
    const contratosHoy = document.getElementById('contratosHoy');
    const contratosDetalles = document.getElementById('contratosDetalles');
    const enviar = document.getElementById('enviar');

    // Variables para almacenar los archivos en base64
    let archivoCedulasEscaneadasBase64 = '';
    let archivoInduccionSSOBase64 = '';
    let archivoTrasladosBase64 = '';
    let archivoCruceDiarioBase64 = '';

    contratosHoy.addEventListener('change', function() {
        if (contratosHoy.value === 'si') {
            contratosDetalles.style.display = 'block';
            enviar.style.display = 'block';
        } else {
            enviar.style.display = 'block';
            contratosDetalles.style.display = 'none';
        }
    });

    const checkboxInputs = ['cedulasEscaneadas', 'cruceDiario', 'induccionSSO', 'traslados'];
    checkboxInputs.forEach(id => {
        const checkbox = document.getElementById(id);
        const fileInput = document.getElementById(`archivo${capitalizeFirstLetter(id)}`);
        checkbox.addEventListener('change', function() {
            if (checkbox && fileInput) {
                if (checkbox.checked) {
                    fileInput.style.display = 'block';
                } else {
                    fileInput.style.display = 'none';
                    fileInput.value = ''; // Clear file input if hidden
                }
            }
        });

        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const base64String = e.target.result.split(',')[1]; // Obtener solo la parte base64
                    if (id === 'cedulasEscaneadas') {
                        archivoCedulasEscaneadasBase64 = base64String;
                    } else if (id === 'induccionSSO') {
                        archivoInduccionSSOBase64 = base64String;
                    } else if (id === 'traslados') {
                        archivoTrasladosBase64 = base64String;
                    } else if (id === 'cruceDiario') {
                        archivoCruceDiarioBase64 = base64String;
                    }
                };
                reader.readAsDataURL(file); // Leer el archivo como Data URL para obtener base64
            }
        });
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    enviar.addEventListener('click', function() {
        // Validar que los campos estén llenos
        const sedeSeleccionada = document.getElementById('sede').value;
        const nota = document.getElementById('notas').value;

        // Variables para validación de archivos
        const cedulasCheckbox = document.getElementById('cedulasEscaneadas').checked;
        const cruceCheckbox = document.getElementById('cruceDiario').checked;
        const induccionCheckbox = document.getElementById('induccionSSO').checked;
        const trasladosCheckbox = document.getElementById('traslados').checked;

        // Mensajes de error
        const errores = [];

        if (!sedeSeleccionada || sedeSeleccionada === "..") {
            errores.push('Debe seleccionar una sede.');
        }
        if (cedulasCheckbox && !archivoCedulasEscaneadasBase64) {
            errores.push('Debe subir el archivo de Cédulas Escaneadas.');
        }
        if (cruceCheckbox && !archivoCruceDiarioBase64) {
            errores.push('Debe subir el archivo de Cruce Diario.');
        }
        if (induccionCheckbox && !archivoInduccionSSOBase64) {
            errores.push('Debe subir el archivo de Inducción SSO.');
        }
        if (trasladosCheckbox && !archivoTrasladosBase64) {
            errores.push('Debe subir el archivo de Traslados.');
        }

        // Mostrar errores y evitar envío si hay errores
        if (errores.length > 0) {
            aviso(errores.join('\n'), 'error');
            return;
        }

        // Preparar datos para enviar al backend
        const nombre = usernameLocal; // O captura desde un campo de entrada si es diferente

        var body = localStorage.getItem('key');
        const obj = JSON.parse(body);
        const jwtToken = obj.jwt;

        const emailData = {
            nombre: nombre,
            sede: sedeSeleccionada,
            cedulas: archivoCedulasEscaneadasBase64,
            cruce: archivoCruceDiarioBase64,
            traslados: archivoTrasladosBase64,
            sst: archivoInduccionSSOBase64,
            nota: nota,
            jwt: jwtToken
        };
        console.log(emailData);

        const urlcompleta = urlBack.url + '/reportes/cargarReporte';

        fetch(urlcompleta, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'success') {
                aviso('Datos enviados exitosamente.', 'success');
            } else {
                aviso('Error al enviar los datos.', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            aviso('Error al enviar los datos.', 'error');
        });
    });
});
