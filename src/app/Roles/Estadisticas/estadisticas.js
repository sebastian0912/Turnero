
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
    //seleccion.style.display = "block";
    //contratacion.style.display = "block";
    ausentismos.style.display = "block";
}
if (usernameLocal == "HEIDY TORRES"){
    formasDePago.style.display = "block";
}

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

async function datosUsuarios() {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = urlBack.url + '/usuarios/usuarios';

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

function nombre (datos, cedula) {
    let nombre = "";
    datos.forEach((usuario) => {
        if (usuario.numero_de_documento == cedula) {
            nombre = usuario.primer_nombre + " " + usuario.primer_apellido;
        }
    });
    return nombre;
}


boton.addEventListener('click', async () => {
    let datos2 = await datosUsuarios();

    const datosTurnos = await datosTTurnos();

    if (!datosTurnos || datosTurnos.length === 0) {
        aviso("No se han encontrado datos de turnos", "warning");
        return;
    }

    let excelData = [['Número de Documento', 'Tipo de Documento', 'Tipo de Turno ID', 'Oficina de Emisión del Turno ID', 'Fecha de Creación', 'Hora de Creación',  'Hora de Finalización de Atención', 'COMENTARIO', 'Nombre de la Persona', 'Número de Contacto',  'Número de Turno',  'Quien lo Atiende ID']];

    // ordenar por fecha fechadecreado y horadecreado
    datosTurnos.turno.sort((a, b) => {
        if (a.fechadecreado < b.fechadecreado) {
            return -1;
        }
        if (a.fechadecreado > b.fechadecreado) {
            return 1;
        }
        if (a.horadecreado < b.horadecreado) {
            return -1;
        }
        if (a.horadecreado > b.horadecreado) {
            return 1;
        }
        return 0;
    }
    );

    datosTurnos.turno.forEach((turno) => {
        let nombrePersona = nombre(datos2, turno.quienloatiende_id);
        console.log(nombrePersona);
        excelData.push([
            turno.numerodedocumento || "",
            turno.tipodedocumento || "",
            turno.tipodeturno_id || "",
            turno.oficinaemisiradelturno_id || "",

            turno.fechadecreado || "",
            turno.horadecreado || "",

            turno.horadeIniciodeAtencion || "",
            turno.comentario || "",

            turno.nombredelapersona || "",
            turno.numerodecontacto || "",
            turno.numeroderturno || "",
            nombrePersona || "",
        ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos Turnos');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const element = document.createElement('a');
    element.href = url;
    element.download = 'datosTurnos.xlsx';
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
    URL.revokeObjectURL(url);
});


function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}






