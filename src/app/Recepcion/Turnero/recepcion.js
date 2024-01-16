
import { aviso, avisoConfirmado } from "../../Avisos/avisos.js";
import { urlBack } from "../../model/base.js";

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


ver.addEventListener('click', () => {
    // Abre un archivo HTML local en una nueva ventana
    const rutaArchivo = '../visualizar/turnosV.html';
    const nuevaVentana = window.open(rutaArchivo, 'NombreVentana', 'opciones');
});

async function datosTTurnos() {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = urlBack.url + '/Turnos/verturnos';

    try {
        const response = await fetch(urlcompleta, {
            method: 'GET',
            headers: headers,
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error('Error en la petición GET');
        }
    } catch (error) {
        console.error('Error en la petición HTTP GET');
        console.error(error);
        throw error; // Propaga el error para que se pueda manejar fuera de la función
    }
}


function crearTurno(numerT, tipoDoc, cedula, tipoT, comentario, nombredelapersona, celular, whatsapp) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtToken = obj.jwt;
    console.log(jwtToken);

    const urlcompleta = urlBack.url + '/Turnos/crearTurnos';
    try {
        fetch(urlcompleta, {
            method: 'POST',
            body:
                JSON.stringify({
                    numerodeturno: numerT,
                    tipodedocumento: tipoDoc,
                    numerodedocumento: cedula,
                    tipodeturno: tipoT,
                    whatsapp: whatsapp,
                    comentario: comentario,
                    oficinaemisiradelturno: sede,
                    nombredelapersona: nombredelapersona,
                    numerodecontacto: celular,
                    jwt: jwtToken
                })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();// aca metes los datos uqe llegan del servidor si necesitas un dato en especifico me dices
                    //muchas veces mando un mensaje de sucess o algo asi para saber que todo salio bien o mal
                } else {
                    throw new Error('Error en la petición POST');
                }
            })
            .then(responseData => {
                console.log('Respuesta:', responseData);
            })
            .catch(error => {
                aviso("Por favor vuelva a pedir un turno", "error");
                console.error('Error:', error);
            });

    } catch (error) {
        console.error('Error en la petición HTTP POST');
        console.error(error);
    }
}

// Recupera la cadena JSON desde localStorage
const turnosJSON = localStorage.getItem('turnos');

const TIPOS_DE_TURNO = {
    "SELECCION": "S",
    "CONTRATACION": "C",
    "AFILIACIONES": "A",
    "TESORERIA": "T",
    "RECURSOS-HUMANOS": "RH",
    "GERENCIA": "G",
    "SST": "SST",
    "COORDINADOR": "CO"
};

function obtenerValorDelElemento(selector) {
    return document.querySelector(selector).value.trim();
}

function mostrarAviso(tipo, mensaje) {
    // Reemplaza esta función con tu lógica para mostrar avisos
    console.log(`${tipo}: ${mensaje}`);
}

async function obtenerTurnos() {
    try {
        let turnos = await datosTTurnos();
        return turnos.turno || [];
    } catch (error) {
        console.error("Error al obtener los turnos:", error);
        mostrarAviso("error", "Error al cargar los turnos.");
        return [];
    }
}

function obtenerFechaActual() {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
}

function encontrarUltimoNumero(tipo, auxTurnos) {
    const fechaActual = obtenerFechaActual();
    const numeros = auxTurnos
        .filter(turno => turno.numeroderturno.startsWith(tipo) && turno.fechadecreado === fechaActual)
        .map(turno => parseInt(turno.numeroderturno.slice(tipo.length)) || 0);

    return numeros.length > 0 ? Math.max(...numeros) : 0;
}

boton.addEventListener('click', async () => {
    
    let cedula = obtenerValorDelElemento('#cedula');
    let nombre = obtenerValorDelElemento('#nombre');
    let tipo = obtenerValorDelElemento('#tipo');
    let numeroCeluar = obtenerValorDelElemento('#numeroCelular');
    let tipoDoc = obtenerValorDelElemento('#tipoDoc');
    let whatsapp = obtenerValorDelElemento('#whatsapp');

    if (!cedula || !nombre || !tipo || !numeroCeluar || !tipoDoc || !whatsapp) {
        aviso ("Por favor ingrese todos los datos", "error");
        return;
    }

    let auxTurnos = await obtenerTurnos();
    // filtrar por sede
    auxTurnos = auxTurnos.filter(turno => turno.oficinaemisiradelturno_id === sede);

    console.log(auxTurnos);

    let prefijo = TIPOS_DE_TURNO[tipo];
    let numeroTurno = encontrarUltimoNumero(prefijo, auxTurnos) + 1;
    let inicial = prefijo + numeroTurno;

    try {
        await crearTurno(inicial, tipoDoc, cedula, tipo, "", nombre, numeroCeluar, whatsapp);
        let avisoTurno = await avisoConfirmado("Su turno es: " + inicial, "success");
        if (avisoTurno) {
            location.reload();
        }
    } catch (error) {
        console.error("Error al crear el turno:", error);
        aviso ("Por favor vuelva a pedir un turno", "error");
    }

});
