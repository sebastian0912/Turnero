
import { aviso } from "../Avisos/avisos.js";
import { urlBack } from "../model/base.js";

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
            console.log(responseData);
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

/* Obtener codigos de la base de datos */
const aux = await datosTTurnos();
let arrayCodigos = [];

aux.turno.forEach((c) => {
    if (c.horadeIniciodeAtencion != null) {
        arrayCodigos.push(c);
    }
});
console.log(arrayCodigos);

// Mostar contenido en una tabla
arrayCodigos.forEach((c) => {
    // si horadeIniciodeAtencion  en formato hh:mm:ss han pasado mas de 3 horas mostrar en rojo solamente 
    const hora = c.horadeIniciodeAtencion;
    const horaActual = new Date();

    // separar hora por caracteres :
    const horaSeparada = hora.split(':');
    const horaActualSeparada = horaActual.toLocaleTimeString().split(':');

    // convertir a numeros
    const horaNumero = parseInt(horaSeparada[0]);
    const horaActualNumero = parseInt(horaActualSeparada[0]);

    // calcular diferencia
    const diferencia = horaActualNumero - horaNumero;

    // c.fechadecreado pasar de yyyy-mm-dd a dd/mm/yyyy

    let dia = c.fechadecreado.split('-');
    let diaTurnoCreado = new Date(dia[0], dia[1], dia[2]);

    let diaActual = new Date();   

    let asusentimos = "Asusentimo";

    const tabla = document.querySelector('#tablaTurnos');
    // si el turno es creado el mismo dia
    if (sede == c.oficinaemisiradelturno_id){
        if (diaTurnoCreado.getDate() == diaActual.getDate()) {
            if (diferencia > 3) {
                asusentimos = " ";
                tabla.innerHTML += `
                <tr>
                    <td>${c.numerodedocumento}</td>
                    <td>${c.numeroderturno}</td>
                    <td>${c.nombredelapersona}</td>
                    <td>${c.horadecreado}</td>
                    <td>${c.numerodecontacto}</td>
                    <td>${asusentimos}</td>
                </tr>
                `
            }
        }   
    }

});
