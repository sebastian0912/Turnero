import { urlBack } from "../../../model/base.js";
import { aviso } from "../../../Avisos/avisos.js";
// Capturar el h1 del titulo y perfil
const titulo = document.querySelector('#username');
const perfil = document.querySelector('#perfil');
// Capturar el PERFIL y el USERNAME del local storage
const perfilLocal = localStorage.getItem("perfil");
const usernameLocal = localStorage.getItem("username");

//Muestra en la parte superior el nombre y el perfil
titulo.innerHTML = usernameLocal;
perfil.innerHTML = perfilLocal;
let responseData

if (perfilLocal == "GERENCIA") {
    estadisticas.style.display = "block";
    vacantes.style.display = "block";
    publicidad.style.display = "block";
    seleccion.style.display = "block";
    contratacion.style.display = "block";
    ausentismos.style.display = "block";
}
if (usernameLocal == "HEIDY TORRES" || usernameLocal == "MAYRA HUAMANI" || perfilLocal == "COORDINADOR" || perfilLocal == "JEFE-DE-AREA" ) {
    formasDePago.style.display = "block";
}

function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}

async function obtenerDatosPublicaciones() {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = urlBack.url + '/Marketing/VertodosLosregistros';

    try {
        const response = await fetch(urlcompleta, {
            method: 'GET',
            headers: headers,
        });

        if (response.ok) {
            responseData = await response.json();
            console.log(responseData);
            return responseData;
        } else {
            throw new Error('Error en la petición GET');
        }
    } catch (error) {
        //aviso("No hay publicaciones", "warning");

        console.error('Error en la petición HTTP GET');
        console.error(error);
        throw error; // Propaga el error para que se pueda manejar fuera de la función
    }

}

boton.addEventListener('click', async () => {

    let fechaInicio = document.getElementById("fechaInicio").value;
    let fechaFin = document.getElementById("fechaFin").value;

    let datosPublicaciones = await obtenerDatosPublicaciones(); // Asumiendo que esta función obtiene tus datos

    if (!datosPublicaciones || datosPublicaciones.length === 0) {
        aviso("No se han encontrado datos de publicaciones", "warning");
        return;
    }

    // Filtrar los datos por las fechas seleccionadas
    let datosFiltrados = datosPublicaciones.marketing.filter(item => {
        let fechaPublicacion = new Date(item.fechadesubida);
        let inicio = new Date(fechaInicio);
        let fin = new Date(fechaFin);
        return fechaPublicacion >= inicio && fechaPublicacion <= fin;
    });

    let excelData = [
        ['ID', 'Nombre de la Publicación', 'Link de la Publicación', 'Número de Vistas', 'Número de Me Gusta', 'Número de Compartidos', 'Cantidad de Comentarios', 'Comentario Adicional', 'Estado de Publicación', 'Fecha de Subida', 'Quién Publicó el Reporte', 'Red Social']
    ];

    datosFiltrados.forEach((item) => {
        excelData.push([
            item.id || "",
            item.nombredelapublicacion || "",
            item.linkdelapublicacion || "",
            item.numerodevistaspublicacion || "",
            item.numerodemegusta || "",
            item.numerodecompartidos || "",
            item.cantidaddecomentarios || "",
            item.comentariAdicional || "",
            item.estadopublicacion || "",
            item.fechadesubida || "",
            item.quienpublicoelreporte || "",
            item.redsocial || ""
        ]);
    });

    // El resto del código para crear y descargar el Excel es igual
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos de Publicaciones');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const element = document.createElement('a');
    element.href = url;
    element.download = 'datosPublicaciones.xlsx';
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
    URL.revokeObjectURL(url);

});


