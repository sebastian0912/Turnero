
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
    seleccion.style.display = "block";
    contratacion.style.display = "block";
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
    const inputsTexto = document.querySelectorAll('input[type="text"], input[type="number"], input[type="date"]', 'input[type="file"]');
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

    const respuesta = await enviarDatos(informacion);
    console.log(respuesta);

    
});

async function enviarDatos(informacion) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Content-Type': 'application',
    };

    const urlCompleta = urlBack.url + '/contratacion/CrearContratacionCandidato';
    
    try {
        const response = await fetch(urlCompleta, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                numerodeceduladepersona : informacion.cedulaB,
                persona_que_hace_contratacion: usernameLocal,
                // aleatorio
                codigo_contrato:  Math.floor(Math.random() * 1000000000),
                sitio_contratacion: informacion.sitioContratacion,
                persona_contrata: usernameLocal,
                eps : informacion.eps,
                eps_a_trasladar: informacion.epsTrasladar,
                afp : informacion.afp,
                afc : informacion.afc,
                verificacion_procuraduria: informacion.verificacionProcuraduria,
                verificacion_contraloria: informacion.verificacionContraloria,
                ofac_lista_clinton: informacion.ofac,
                policivos: informacion.policivos,
                adress : informacion.adress,
                sisben : informacion.sisben,
                fondo_pension : informacion.fondoPension,
                semanas_cotizadas : informacion.semanasCotizadas,
                forma_pago : informacion.formaPago,
                numero_pagos : informacion.numeroPagos,
                validacion_numero_cuenta : informacion.validacionNumeroCuenta,
                seguro_funerario: informacion.seguroFunerario,
                centro_de_costos: informacion.Ccostos,
                subcentro : informacion.subcentro,
                grupo : informacion.grupo,
                categoria : informacion.categoria,
                operacion : informacion.operacion,
                sublabor : informacion.sublabor,
                salario_contratacion : informacion.salario,
                auxilio_transporte : informacion.auxilioTransporte,
                ruta : informacion.ruta,
                valor_transporte : informacion.valorTransporte,
                horas_extras : informacion.horasExtras,
                porcentaje_arl : informacion.porcentajeArl,
                
                referencia_parentesco1 : informacion.parentescoReferencia1,
                tiempo_conoce1 : informacion.conoceReferencia1,
                como_refiere1 : informacion.refiereReferencia1,
                referencia_parentesco2 : informacion.parentescoReferencia2,
                tiempo_conoce2 : informacion.conoceReferencia2,
                como_refiere2 : informacion.refiereReferencia2,
                referenciaron_laboral : informacion.referenciaronLaboral,
                validacion_fecha_expedicion : informacion.validacionFechaExpedicion,
                validacion_fecha_nacimiento : informacion.validacionFechaNacimiento,
                primerapellido : informacion.primerApellido,
                segundoapellido : informacion.segundoApellido,
                primernombre : informacion.primerNombre,
                segundonombre : informacion.segundoNombre,

                jwt : jwtKey
            }),
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;

        } else {
            // Maneja otros posibles errores HTTP
            throw new Error('Error en la petición POST');
        }
    }
    catch (error) {
        console.error('Error en la petición HTTP POST:', error);
        // Considera mostrar el error al usuario de una forma que sea parte de tu UI
        throw error;
    }
}

buscarCedula.addEventListener('click', async () => {
    const cedula = document.getElementById('cedulaB').value;
    const datos = await buscarCedulaSeleccion(cedula);
    if (datos === "No se encontró el proceso de contratación para la cédula proporcionada") {
        aviso('No se encontró el proceso de contratación para la cédula proporcionada', 'error');
    } else {
        console.log(datos);
    }
});


async function buscarCedulaSeleccion(cedula) {
    // guardar cedula en el localstogare
    localStorage.setItem("cedulaSeleccion", cedula);

    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlCompleta = urlBack.url + '/contratacion/traerDatosContratacion/' + cedula;

    try {
        const response = await fetch(urlCompleta, {
            method: 'GET',
            headers: headers,
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;

        } else if (response.status === 404) {
            const errorData = await response.json(); // Intenta leer el cuerpo de la respuesta
            console.log(errorData.message);
            return errorData.message;
        }
        else {
            // Maneja otros posibles errores HTTP
            throw new Error('Error en la petición GET');
        }
    } catch (error) {
        console.error('Error en la petición HTTP GET:', error);
        // Considera mostrar el error al usuario de una forma que sea parte de tu UI
        throw error;
    }
}
