
import { aviso } from "../../Avisos/avisos.js";
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

function crearTurno(numerT, tipoDoc, cedula, tipoT, comentario, nombredelapersona, celular  ){
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
                    comentario: "",
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
                console.error('Error:', error);
            });

    } catch (error) {
        console.error('Error en la petición HTTP POST');
        console.error(error);
    }
}

let turnos = {
    S: 0, // Selección
    C: 0, // Contratación
    A: 0, // Afiliaciones
    T: 0, // Tesorería
    SST: 0, // SST
    G: 0,  // Gerencia
    RH: 0, // Recursos Humanos
    CO: 0, // Coordinador

};

boton.addEventListener('click', async ()  => {
    let cedula = document.querySelector('#cedula').value;
    let nombre = document.querySelector('#nombre').value;
    let tipo = document.querySelector('#tipo').value;
    let numeroCeluar = document.querySelector('#numeroCelular').value;
    let tipoDoc = document.querySelector('#tipoDoc').value;

    

    let turnoAux ;
    if (cedula == "" || nombre == "" || tipo == "" || numeroCeluar == "") {
        aviso("warning", "Por favor llene todos los campos");
    }

    if (tipo == "SELECCION") {
        turnos.S++;
        turnoAux = "S" + turnos.S ;
    }
    if (tipo == "CONTRATACION") {
        turnos.C++
        turnoAux = "C" + turnos.C ;
    }
    if (tipo == "AFILIACIONES") {
        turnos.A++
        turnoAux = "A" + turnos.A ;
    }
    if (tipo == "TESORERIA") {
        turnos.T++
        turnoAux = "T" + turnos.T ;
    }
    if (tipo == "SST") {
        turnos.SST++
        turnoAux = "SST" + turnos.SST ;
    }
    if (tipo == "GERENCIA") {
        turnos.G++
        turnoAux = "G" + turnos.G ;
    }
    if (tipo == "RECURSOS-HUMANOS") {
        turnos.RH++
        turnoAux = "RH" + turnos.RH ;
    }
    if (tipo == "COORDINADOR") {
        turnos.CO++
        turnoAux = "CO" + turnos.CO ;
    }

    await crearTurno(turnoAux, tipoDoc, cedula, tipo, "", nombre, numeroCeluar);

    // su turno es 
    aviso("Su turno es: " + turnoAux, "success");



    
});