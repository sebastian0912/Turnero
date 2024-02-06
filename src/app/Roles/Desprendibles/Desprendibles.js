import { urlBack } from "../../model/base.js";
import { aviso, avisoConfirmado, avisoConfirmacion } from "../../Avisos/avisos.js";
// Capturar el h1 del titulo y perfil
const titulo = document.querySelector('#username');
const perfil = document.querySelector('#perfil');
// Capturar el PERFIL y el USERNAME del local storage
const perfilLocal = localStorage.getItem("perfil");
const usernameLocal = localStorage.getItem("username");

let input = document.getElementById('archivoInput');

//Muestra en la parte superior el nombre y el perfil
titulo.innerHTML = usernameLocal;
perfil.innerHTML = perfilLocal;

const over = document.querySelector('#overlay');
const loader = document.querySelector('#loader');

if (perfilLocal == "GERENCIA") {
    estadisticas.style.display = "block";
    vacantes.style.display = "block";
    publicidad.style.display = "block";
    //seleccion.style.display = "block";
    //contratacion.style.display = "block";
    ausentismos.style.display = "block";
}

if (usernameLocal == "HEIDY TORRES" || usernameLocal == "MAYRA HUAMANI" || perfilLocal == "COORDINADOR" || perfilLocal == "JEFE-DE-AREA" ) {
    formasDePago.style.display = "block";
}

const correo = localStorage.getItem("correo_electronico");
console.log(correo)

const descargar2 = document.querySelector('#descargar');

if (correo == "nominacentral4@gmail.com") {
    descargar2.style.display = "block"
    cargarA.style.display = "block"
}



async function FormasdePago(cedula) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = urlBack.url + '/Desprendibles/traerDesprendibles/' + cedula;

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

async function FormasdePagoTodo() {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = urlBack.url + '/FormasdePago/traerformasDePago';

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

const boton = document.querySelector('#boton');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function cargarYMostrarDatos(cedulaEm) {

    const tabla = document.querySelector('#tabla');
    if (!cedulaEm) {
        aviso("Por favor ingrese una cédula", "warning");
        return;
    }

    let datosExtraidos = await FormasdePago(cedulaEm);

    if (datosExtraidos.message == "No se encontró el número de cédula") {
        aviso("No se encontró el número de cédula en las formas de pago", "warning");
        tabla.innerHTML = '';
        return;
    }
    
    tabla.innerHTML = '';    

    datosExtraidos.desprendibles.forEach(p => {
        
            tabla.insertAdjacentHTML('beforeend', `
            <tr>
                <td>${p.no}</td>
                <td>${p.cedula}</td>
                <td>${p.nombre}</td>
                <td>${p.ingreso}</td>
                <td>${p.retiro}</td>
                <td>${p.finca}</td>
                <td>${p.telefono}</td>
                <td>${p.concepto}</td>
                <td><a href="${p.desprendibles}" target="_blank">${p.desprendibles}</a></td>
                <td><a href="${p.certificaciones}" target="_blank">${p.certificaciones}</a></td>
                <td><a href="${p.cartas_retiro}" target="_blank">${p.cartas_retiro}</a></td>
                <td>${p.carta_cesantias}</td>
                <td><a href="${p.entrevista_retiro}" target="_blank">${p.entrevista_retiro}</a></td>

                <td>${p.correo}</td>
                <td>${p.confirmacion_envio}</td>


            </tr>
        `);           

    });
}


boton.addEventListener('click', async () => {
    let cedulaEm = document.getElementById("cedula").value;
    cedulaEm = cedulaEm.replace(/\s/g, '').replace(/\./g, '');

    cargarYMostrarDatos(cedulaEm);
});

const claves = ["No", "Cedula", "Nombre", "Ingreso", "Retiro", "Finca", "Telefono", "CONCEPTO", "Desprendibles", "Certificaciones", "Cartas_Retiro", "Carta_Cesantias", "Entrevista_Retiro", "Correo", "Confirmacion_Envio"];

if (input) {
    // Agrega un escuchador de eventos al input para detectar cambios
    input.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const arrayBuffer = event.target.result;
                const data = new Uint8Array(arrayBuffer);
                const workbook = XLSX.read(data, { type: 'array', cellDates: true, cellNF: false, cellText: false });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Convertir la hoja de trabajo en un arreglo de arreglos
                const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, dateNF: "dd/mm/yyyy" });

                // Procesar cada fila y asignar los valores a las claves correspondientes
                const modifiedRows = rows.slice(1).map((row) => {
                    let modifiedRow = {};
                    claves.forEach((key, index) => {
                        const cell = row[index];
                        // Verificar si la celda está vacía y asignar 'vacia' en ese caso
                        modifiedRow[key] = cell !== undefined && cell !== null && cell !== "" ? cell : '-';
                    });
                    return modifiedRow;
                });

                console.log(modifiedRows);
                loader.style.display = "block";
                over.style.display = "block";
                // Aquí puedes hacer algo con modifiedRows, como almacenarlo o procesarlo
                guardarDatos(modifiedRows);
            };
            reader.readAsArrayBuffer(file);
        }
    });
}

async function guardarDatos(datosFinales) {
    const batchSize = 10000; // Número máximo de registros por lote

    const chunks = [];
    for (let i = 0; i < datosFinales.length; i += batchSize) {
        chunks.push(datosFinales.slice(i, i + batchSize));
    }

    const body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    for (const chunk of chunks) {
        const bodyData = {
            jwt: jwtKey,
            mensaje: "muchos",
            datos: chunk
        };

        const headers = {
            'Authorization': jwtKey
        };

        const urlcompleta = urlBack.url + '/Desprendibles/crear_desprendibles';
        try {
            const response = await fetch(urlcompleta, {
                method: 'POST',
                body: JSON.stringify(bodyData),
            });

            if (response.ok) {
                document.getElementById('successSound').play();
                // Procesar la respuesta si es necesario
            } else {
                document.getElementById('errorSound').play();
                aviso("Error al guardar los datos", "error");
                console.error('Error en la petición POST');
                console.error(response.statusText);
            }
        } catch (error) {
            document.getElementById('errorSound').play();
            aviso("Error al guardar los datos", "error");
            console.error('Error en la petición HTTP POST');
            console.error(error);
        }
    }

    over.style.display = "none";
    loader.style.display = "none";
}


const descargardoc = document.querySelector('#descargardoc');

function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}


const descargar = document.querySelector('#descargar');

descargar.addEventListener('click', async () => {
    // descargar archivo de excel que esta en la carpeta assets de la raiz

    const url = '../../assets/Archivos/PlantillaDesprendibles.xlsx';
    const element = document.createElement('a');

    element.href = url;

    element.download = 'PlantillaDesprendibles.xlsx';
    element.style.display = 'none';
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);   
});







