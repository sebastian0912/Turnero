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
const correo = localStorage.getItem("correo_electronico");

const over = document.querySelector('#overlay');
const loader = document.querySelector('#loader');

if (perfilLocal == "GERENCIA" || correo == "tuafiliacion@tsservicios.co" || perfilLocal == "COORDINADOR") {
    //estadisticas.style.display = "block";
    //vacantes.style.display = "block";
    //publicidad.style.display = "block";
    //seleccion.style.display = "block";
    //contratacion.style.display = "block";
    ausentismos.style.display = "block";
    //arl.style.display = "block";
    //reporte.style.display = "block";
}

if (perfilLocal == "GERENCIA" || perfilLocal == "COORDINADOR" || perfilLocal == "JEFE-DE-AREA") {
    formasDePago.style.display = "block";
}


const descargar2 = document.querySelector('#descargar');


async function auditoria(cedula) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = urlBack.url + '/auditoria/tu_alianza_responsable/' + usernameLocal;

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
async function cargarYMostrarDatos() {
    let datos = await auditoria();
    console.log(datos);

    const tabla = document.querySelector('#tabla');

    // Limpiar la tabla antes de insertar nuevos datos
    tabla.innerHTML = '';

    datos.forEach((dato) => {
        const fila = document.createElement('tr');

        // Función para reemplazar valores null por 'x'
        const verificarDato = (valor) => valor === null ? 'x' : valor;

        fila.innerHTML = `
            <td>${verificarDato(dato.contratos_si)}</td>
            <td>${verificarDato(dato.contratos_no)}</td>
            <td>${verificarDato(dato.numero_de_contrato)}</td>
            
            <td>${verificarDato(dato.foto)}</td>
            <td>${verificarDato(dato.fecha_de_ingreso_FT)}</td>
            <td>${verificarDato(dato.infolaboral_FT)}</td>
            <td>${verificarDato(dato.firma_trabajador)}</td>
            <td>${verificarDato(dato.huella)}</td>
            <td>${verificarDato(dato.referencia)}</td>
            <td>${verificarDato(dato.firma_carnet_FT)}</td>
            <td>${verificarDato(dato.firma_loker_FT)}</td>
            <td>${verificarDato(dato.fecha_de_ingreso_FT)}</td>
            <td>${verificarDato(dato.empleador_FT)}</td>
            
            <td>${verificarDato(dato.ampliada_al_150)}</td>
            <td>${verificarDato(dato.huellaCedula)}</td>
            <td>${verificarDato(dato.sello)}</td>
            <td>${verificarDato(dato.legible)}</td>

            <td>${verificarDato(dato.procuraduria_vigente)}</td>
            <td>${verificarDato(dato.fecha_procuraduria)}</td>
            <td>${verificarDato(dato.contraloria_vigente)}</td>
            <td>${verificarDato(dato.fecha_contraloria)}</td>
            <td>${verificarDato(dato.ofac_lista_clinton)}</td>
            <td>${verificarDato(dato.fecha_ofac)}</td>
            <td>${verificarDato(dato.policivos_vigente)}</td>
            <td>${verificarDato(dato.fecha_policivos)}</td>
            <td>${verificarDato(dato.medidas_correstivas)}</td>
            <td>${verificarDato(dato.fecha_medidas_correstivas)}</td>
            
            <td>${verificarDato(dato.adres)}</td>
            <td>${verificarDato(dato.fecha_adres)}</td>

            <td>${verificarDato(dato.sisben)}</td>
            <td>${verificarDato(dato.fecha_sisben)}</td>

            <td>${verificarDato(dato.formatoElite)}</td>
            <td>${verificarDato(dato.cargoElite)}</td>
            
            <td>${verificarDato(dato.nombres_trabajador_contrato)}</td>
            <td>${verificarDato(dato.no_cedula_contrato)}</td>
            <td>${verificarDato(dato.direccion)}</td>
            <td>${verificarDato(dato.correo_electronico)}</td>
            <td>${verificarDato(dato.fecha_de_ingreso_contrato)}</td>
            <td>${verificarDato(dato.salario_contrato)}</td>
            <td>${verificarDato(dato.empresa_usuaria)}</td>
            <td>${verificarDato(dato.cargo_contrato)}</td>
            <td>${verificarDato(dato.descripcion_temporada)}</td>
            <td>${verificarDato(dato.firma_trabajador_contrato)}</td>
            <td>${verificarDato(dato.firma_testigos)}</td>
            <td>${verificarDato(dato.sello_temporal)}</td>

            <td>${verificarDato(dato.autorizacion_dscto_casino)}</td>
            <td>${verificarDato(dato.forma_de_pago)}</td>
            <td>${verificarDato(dato.autorizacion_funerario)}</td>
            <td>${verificarDato(dato.huellas_docs)}</td>
            <td>${verificarDato(dato.fecha_de_recibido_docs)}</td>

            <td>${verificarDato(dato.centro_de_costo_arl)}</td>
            <td>${verificarDato(dato.clase_de_riesgo)}</td>
            <td>${verificarDato(dato.cedula_arl)}</td>
            <td>${verificarDato(dato.nombre_trabajador_arl)}</td>
            <td>${verificarDato(dato.fecha_de_ingreso_arl)}</td>

            <td>${verificarDato(dato.entrevista_ingreso)}</td>

            <td>${verificarDato(dato.temporal)}</td>
            <td>${verificarDato(dato.fecha_no_mayor_a_15_dias)}</td>
            <td>${verificarDato(dato.nombres_trabajador_examenes)}</td>
            <td>${verificarDato(dato.cargo)}</td>
            <td>${verificarDato(dato.apto)}</td>
            <td>${verificarDato(dato.salud_ocupacional)}</td>
            <td>${verificarDato(dato.colinesterasa)}</td>
            <td>${verificarDato(dato.planilla_colinesterasa)}</td>
            <td>${verificarDato(dato.otros)}</td>

            <td>${verificarDato(dato.certificado_afp)}</td>
            <td>${verificarDato(dato.ruaf)}</td>
            <td>${verificarDato(dato.nombre_trabajador_ruaf)}</td>
            <td>${verificarDato(dato.cedula_ruaf)}</td>
            <td>${verificarDato(dato.fecha_cerRuaf15menor)}</td>
            <td>${verificarDato(dato.historia)}</td>

            <td>${verificarDato(dato.fecha_radicado_eps)}</td>
            <td>${verificarDato(dato.nombre_y_cedula_eps)}</td>
            <td>${verificarDato(dato.salario_eps)}</td>

            <td>${verificarDato(dato.fecha_radicado_caja)}</td>
            <td>${verificarDato(dato.nombre_y_cedula_caja)}</td>
            <td>${verificarDato(dato.salario_caja)}</td>

            <td>${verificarDato(dato.nombre_y_cedula_seguridad)}</td>
            <td>${verificarDato(dato.fecha_radicado_seguridad)}</td>
            
            <td>${verificarDato(dato.codigo_hoja_de_vida)}</td>
            <td>${verificarDato(dato.foto_hoja_de_vida)}</td>
            <td>${verificarDato(dato.nombre_y_cedula_hoja_de_vida)}</td>
            <td>${verificarDato(dato.correo_electronico_hoja_de_vida)}</td>
            <td>${verificarDato(dato.direccion_hoja_de_vida)}</td>
            <td>${verificarDato(dato.referencia_hoja_de_vida)}</td>
            <td>${verificarDato(dato.firma_carnet_hoja_de_vida)}</td>

            <td>${verificarDato(dato.firma_clausulas_add)}</td>
            <td>${verificarDato(dato.sello_temporal_clausulas_add)}</td>

            <td>${verificarDato(dato.firma_add_contrato)}</td>
            <td>${verificarDato(dato.sello_temporal_add_contrato)}</td>
            
            <td>${verificarDato(dato.autorizaciontratamientosDatosJDA)}</td>
            <td>${verificarDato(dato.cartadescuentoflor)}</td>
            <td>${verificarDato(dato.formato_timbre)}</td>
            <td>${verificarDato(dato.cartaaurotiracioncorreo)}</td>
        `;

        // Agregar la fila a la tabla
        tabla.appendChild(fila);
    });
}

cargarYMostrarDatos();



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

                // Procesar cada fila a partir de la tercera fila
                const modifiedRows = rows.slice(2).map((row, rowIndex) => {
                    let modifiedRow = {};
                    row.forEach((cell, cellIndex) => {
                        // Verificar si la celda está vacía y asignar '-' en ese caso
                        modifiedRow[`${cellIndex + 1}`] = cell !== undefined && cell !== null && cell !== "" ? cell : '-';
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
            datos: chunk,
            responsable: usernameLocal
        };

        const headers = {
            'Authorization': jwtKey
        };

        const urlcompleta = urlBack.url + '/auditoria/tu_alianza/';
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







