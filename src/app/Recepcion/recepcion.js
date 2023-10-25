
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

ver.addEventListener('click', () => {
    // Abre un archivo HTML local en una nueva ventana
    const rutaArchivo = './visualizar/turnosV.html';
    const nuevaVentana = window.open(rutaArchivo);
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

// Función para obtener los códigos de la base de datos
async function obtenerCodigos() {

    const aux = await datosTTurnos();
    let arrayCodigos = [];
    console.log(aux);



    console.log(aux.turno);

    if (aux.message == "error no hay turnos") {
        return;
    }

    aux.turno.forEach((c) => {
        if (c.oficinaemisiradelturno_id == sede) {
            arrayCodigos.push(c);
        }
    });


    console.log(arrayCodigos);

    // ordenar por hora de creado
    arrayCodigos.sort(function (a, b) {
        if (a.horadecreado > b.horadecreado) {
            return 1;
        }
        if (a.horadecreado < b.horadecreado) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    const tabla = document.querySelector('#tablaTurnos');
    // si el turno es creado el mismo dia
    tabla.innerHTML = "";

    // Mostar contenido en una tabla
    arrayCodigos.forEach((c) => {
        // si horadeIniciodeAtencion  en formato hh:mm:ss han pasado mas de 3 horas mostrar en rojo solamente 
        const hora = c.horadecreado;
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

        let asusentimos = "No";



        if (diaTurnoCreado.getDate() == diaActual.getDate()) {
            if (c.fechadeIniciodeAtencion != null) {
                asusentimos = "Si";
            }

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
    });
}


setInterval(obtenerCodigos, 2000); // 1000 milisegundos = 1 segundo

