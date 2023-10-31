
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
                aviso("warning", "Por favor vuelva a pedir un turno");
                console.error('Error:', error);
            });

    } catch (error) {
        console.error('Error en la petición HTTP POST');
        console.error(error);
    }
}

// Recupera la cadena JSON desde localStorage
const turnosJSON = localStorage.getItem('turnos');

boton.addEventListener('click', async () => {
    let cedula = document.querySelector('#cedula').value;
    let nombre = document.querySelector('#nombre').value;
    let tipo = document.querySelector('#tipo').value;
    let numeroCeluar = document.querySelector('#numeroCelular').value;
    let tipoDoc = document.querySelector('#tipoDoc').value;
    let whatsapp = document.querySelector('#whatsapp').value;

    if (cedula == "" || nombre == "" || tipo == "" || numeroCeluar == "") {
        aviso("warning", "Por favor llene todos los campos");
        return;
    }

    let turnos = await datosTTurnos();
    let auxTurnos = turnos.turno;
    console.log(auxTurnos);
    let turnoAux = [];

    console.log(auxTurnos);
    // Obtener todos los turnos existentes
    if (auxTurnos && auxTurnos.length > 0) {
        auxTurnos.forEach(element => {
            turnoAux.push(element.numeroderturno);
        });
    } else {
        console.log("No hay turnos disponibles.");
        // Aquí puedes manejar la situación en la que no hay turnos disponibles, si es necesario.
    }
    

    // Función para encontrar el último número asociado a un tipo de turno
    function encontrarUltimoNumero(tipo) {
        const numeros = turnoAux
            .filter(turno => turno.startsWith(tipo))
            .map(turno => parseInt(turno.slice(tipo.length)));

        return Math.max(...numeros, 0);
    }

    let inicial;

    if (tipo == "SELECCION") {
        inicial = "S" + (encontrarUltimoNumero("S") + 1);
    }
    if (tipo == "CONTRATACION") {
        inicial = "C" + (encontrarUltimoNumero("C") + 1);
    }
    if (tipo == "AFILIACIONES") {
        inicial = "A" + (encontrarUltimoNumero("A") + 1);
    }
    if (tipo == "TESORERIA") {
        inicial = "T" + (encontrarUltimoNumero("T") + 1);
    }
    if (tipo == "RECURSOS-HUMANOS") {
        inicial = "RH" + (encontrarUltimoNumero("RH") + 1);
    }
    if (tipo == "GERENCIA") {
        inicial = "G" + (encontrarUltimoNumero("G") + 1);
    }
    if (tipo == "SST") {
        inicial = "SST" + (encontrarUltimoNumero("SST") + 1);
    }
    if (tipo == "COORDINADOR") {
        inicial = "CO" + (encontrarUltimoNumero("CO") + 1);
    }

    crearTurno(inicial, tipoDoc, cedula, tipo, "", nombre, numeroCeluar, whatsapp);

    let avisoTurno = await avisoConfirmado("Su turno es: " + inicial, "success");

    if (avisoTurno == true) {
        location.reload();
    }

});