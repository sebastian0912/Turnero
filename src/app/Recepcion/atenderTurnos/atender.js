
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
const sede = localStorage.getItem("sede");


let graficas = document.getElementById("estadisticas");

if (perfilLocal == "GERENCIA" ) {
    graficas.style.display = "block";    
}

function RecibirTurno (turno, comentario) {

    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtToken = obj.jwt;
    console.log(jwtToken);

    const urlcompleta = urlBack.url + '/Turnos/AtenderTurno/' + turno;
    try {
        fetch(urlcompleta, {
            method: 'POST',
            body:
                JSON.stringify({
                    comentario: comentario,
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

boton.addEventListener('click', async () => {
    let turno = document.getElementById("turno").value;
    let comentario = document.getElementById("comentario").value;

    RecibirTurno(turno, comentario);

    aviso("Turno recibido", "success")

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

    aux.turno.forEach((c) => {
        if (c.oficinaemisiradelturno_id == sede) {
            arrayCodigos.push(c);
        }
    });


    console.log(arrayCodigos);

    const tabla = document.querySelector('#tablaTurnos');
    // si el turno es creado el mismo dia
    tabla.innerHTML = "";
    console.log("a");
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
        // restar dos horas


        if (diaTurnoCreado.getDate() === diaActual.getDate()) {
            if (c.fechadecreado != null) {
                if (c.fechadeIniciodeAtencion != null) {
                    asusentimos = "Si";
                }
                // Convierte las cadenas de hora en objetos Date
                const horaDeCreadoDate = new Date(`2023-10-23T${c.horadecreado}`);
                const horaDeInicioDeAtencionDate = new Date(`2023-10-23T${c.horadeIniciodeAtencion}`);

                // Calcula la diferencia en milisegundos
                const diferenciaEnMilisegundos = horaDeInicioDeAtencionDate - horaDeCreadoDate ;

                // Convierte la diferencia en horas, minutos y segundos
                const horas = Math.floor(diferenciaEnMilisegundos / 3600000);
                const minutos = Math.floor((diferenciaEnMilisegundos % 3600000) / 60000);
                const segundos = Math.floor((diferenciaEnMilisegundos % 60000) / 1000);

                // Formatea la diferencia en "hh:mm:ss"
                
                let diferenciaFormateada = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

                if (diferenciaFormateada == "NaN:NaN:NaN"){
                    diferenciaFormateada = "00:00:00";
                }

                // Agrega la fila a la tabla
                tabla.innerHTML += `
                    <tr>
                        <td>${c.numerodedocumento}</td>
                        <td>${c.numeroderturno}</td>
                        <td>${c.nombredelapersona}</td>
                        <td>${c.horadecreado}</td>
                        <td>${c.numerodecontacto}</td>
                        <td>${asusentimos}</td>
                        <td>${diferenciaFormateada}</td>
                    </tr>
                `;
            }
        }


    });
}

setInterval(obtenerCodigos, 1000); // 1000 milisegundos = 1 segundo