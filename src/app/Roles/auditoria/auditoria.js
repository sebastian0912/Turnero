import { urlBack } from "../../model/base.js";
import { aviso, avisoConfirmado, avisoConfirmacion } from "../../Avisos/avisos.js";

// Capturar el h1 del titulo y perfil
const titulo = document.querySelector('#username');
const perfil = document.querySelector('#perfil');

// Capturar el PERFIL y el USERNAME del local storage
const perfilLocal = localStorage.getItem("perfil");
const usernameLocal = localStorage.getItem("username");

let input = document.getElementById('archivoInput');

// Muestra en la parte superior el nombre y el perfil
titulo.innerHTML = usernameLocal;
perfil.innerHTML = perfilLocal;
const correo = localStorage.getItem("correo_electronico");

const over = document.querySelector('#overlay');
const loader = document.querySelector('#loader');

// Control de visualización basado en el perfil
if (perfilLocal == "GERENCIA" || correo == "tuafiliacion@tsservicios.co" || perfilLocal == "COORDINADOR") {
    ausentismos.style.display = "block";
}

if (perfilLocal == "GERENCIA" || perfilLocal == "COORDINADOR" || perfilLocal == "JEFE-DE-AREA") {
    formasDePago.style.display = "block";
}

const descargar2 = document.querySelector('#descargar');

// Función de auditoría
async function auditoria(cedula) {
    const body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = `${urlBack.url}/auditoria/tu_alianza_responsable/${usernameLocal}`;

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
        throw error;
    }
}


async function cargarYMostrarDatos() {
    const datos = await auditoria();
    console.log(datos);

    const tabla = document.querySelector('#tabla');
    tabla.innerHTML = ''; // Limpiar la tabla antes de insertar nuevos datos

    datos.forEach((dato) => {
        const fila = document.createElement('tr');

        // Función para reemplazar valores null por 'x'
        const verificarDato = (valor) => valor === null ? 'x' : valor;

        fila.innerHTML = `
            <td>
                <i class="fas fa-edit editar-btn"></i>
            </td>
            <td data-field="tipo">${verificarDato(dato.tipo)}</td>
            <td data-field="cedula">${verificarDato(dato.cedula)}</td>
            <td class="editable" data-field="apellidos_y_nombres">${verificarDato(dato.apellidos_y_nombres)}</td>
            <td class="editable" data-field="fecha_de_ingreso">${verificarDato(dato.fecha_de_ingreso)}</td>
            <td class="editable" data-field="centro_de_costo">${verificarDato(dato.centro_de_costo)}</td>
            <td class="editable" data-field="codigo_contratacion">${verificarDato(dato.codigo_contratacion)}</td>
            <td class="editable" data-field="contratos_si">${verificarDato(dato.contratos_si)}</td>
            <td class="editable" data-field="contratos_no">${verificarDato(dato.contratos_no)}</td>
            <td class="editable" data-field="numero_de_contrato">${verificarDato(dato.numero_de_contrato)}</td>
            <td class="editable" data-field="foto">${verificarDato(dato.foto)}</td>
            <td class="editable" data-field="fecha_de_ingreso_FT">${verificarDato(dato.fecha_de_ingreso_FT)}</td>
            <td class="editable" data-field="infolaboral_FT">${verificarDato(dato.infolaboral_FT)}</td>
            <td class="editable" data-field="firma_trabajador">${verificarDato(dato.firma_trabajador)}</td>
            <td class="editable" data-field="huella">${verificarDato(dato.huella)}</td>
            <td class="editable" data-field="referencia">${verificarDato(dato.referencia)}</td>
            <td class="editable" data-field="firma_carnet_FT">${verificarDato(dato.firma_carnet_FT)}</td>
            <td class="editable" data-field="firma_loker_FT">${verificarDato(dato.firma_loker_FT)}</td>
            <td class="editable" data-field="fecha_de_ingreso_FT">${verificarDato(dato.fecha_de_ingreso_FT)}</td>
            <td class="editable" data-field="empleador_FT">${verificarDato(dato.empleador_FT)}</td>
            <td class="editable" data-field="ampliada_al_150">${verificarDato(dato.ampliada_al_150)}</td>
            <td class="editable" data-field="huellaCedula">${verificarDato(dato.huellaCedula)}</td>
            <td class="editable" data-field="sello">${verificarDato(dato.sello)}</td>
            <td class="editable" data-field="legible">${verificarDato(dato.legible)}</td>
            <td class="editable" data-field="procuraduria_vigente">${verificarDato(dato.procuraduria_vigente)}</td>
            <td class="editable" data-field="fecha_procuraduria">${verificarDato(dato.fecha_procuraduria)}</td>
            <td class="editable" data-field="contraloria_vigente">${verificarDato(dato.contraloria_vigente)}</td>
            <td class="editable" data-field="fecha_contraloria">${verificarDato(dato.fecha_contraloria)}</td>
            <td class="editable" data-field="ofac_lista_clinton">${verificarDato(dato.ofac_lista_clinton)}</td>
            <td class="editable" data-field="fecha_ofac">${verificarDato(dato.fecha_ofac)}</td>
            <td class="editable" data-field="policivos_vigente">${verificarDato(dato.policivos_vigente)}</td>
            <td class="editable" data-field="fecha_policivos">${verificarDato(dato.fecha_policivos)}</td>
            <td class="editable" data-field="medidas_correstivas">${verificarDato(dato.medidas_correstivas)}</td>
            <td class="editable" data-field="fecha_medidas_correstivas">${verificarDato(dato.fecha_medidas_correstivas)}</td>
            <td class="editable" data-field="adres">${verificarDato(dato.adres)}</td>
            <td class="editable" data-field="fecha_adres">${verificarDato(dato.fecha_adres)}</td>
            <td class="editable" data-field="sisben">${verificarDato(dato.sisben)}</td>
            <td class="editable" data-field="fecha_sisben">${verificarDato(dato.fecha_sisben)}</td>
            <td class="editable" data-field="formatoElite">${verificarDato(dato.formatoElite)}</td>
            <td class="editable" data-field="cargoElite">${verificarDato(dato.cargoElite)}</td>
            <td class="editable" data-field="nombres_trabajador_contrato">${verificarDato(dato.nombres_trabajador_contrato)}</td>
            <td class="editable" data-field="no_cedula_contrato">${verificarDato(dato.no_cedula_contrato)}</td>
            <td class="editable" data-field="direccion">${verificarDato(dato.direccion)}</td>
            <td class="editable" data-field="correo_electronico">${verificarDato(dato.correo_electronico)}</td>
            <td class="editable" data-field="fecha_de_ingreso_contrato">${verificarDato(dato.fecha_de_ingreso_contrato)}</td>
            <td class="editable" data-field="salario_contrato">${verificarDato(dato.salario_contrato)}</td>
            <td class="editable" data-field="empresa_usuaria">${verificarDato(dato.empresa_usuaria)}</td>
            <td class="editable" data-field="cargo_contrato">${verificarDato(dato.cargo_contrato)}</td>
            <td class="editable" data-field="descripcion_temporada">${verificarDato(dato.descripcion_temporada)}</td>
            <td class="editable" data-field="firma_trabajador_contrato">${verificarDato(dato.firma_trabajador_contrato)}</td>
            <td class="editable" data-field="firma_testigos">${verificarDato(dato.firma_testigos)}</td>
            <td class="editable" data-field="sello_temporal">${verificarDato(dato.sello_temporal)}</td>
            <td class="editable" data-field="autorizacion_dscto_casino">${verificarDato(dato.autorizacion_dscto_casino)}</td>
            <td class="editable" data-field="forma_de_pago">${verificarDato(dato.forma_de_pago)}</td>
            <td class="editable" data-field="autorizacion_funerario">${verificarDato(dato.autorizacion_funerario)}</td>
            <td class="editable" data-field="huellas_docs">${verificarDato(dato.huellas_docs)}</td>
            <td class="editable" data-field="fecha_de_recibido_docs">${verificarDato(dato.fecha_de_recibido_docs)}</td>
            <td class="editable" data-field="centro_de_costo_arl">${verificarDato(dato.centro_de_costo_arl)}</td>
            <td class="editable" data-field="clase_de_riesgo">${verificarDato(dato.clase_de_riesgo)}</td>
            <td class="editable" data-field="cedula_arl">${verificarDato(dato.cedula_arl)}</td>
            <td class="editable" data-field="nombre_trabajador_arl">${verificarDato(dato.nombre_trabajador_arl)}</td>
            <td class="editable" data-field="fecha_de_ingreso_arl">${verificarDato(dato.fecha_de_ingreso_arl)}</td>
            <td class="editable" data-field="entrevista_ingreso">${verificarDato(dato.entrevista_ingreso)}</td>
            <td class="editable" data-field="temporal">${verificarDato(dato.temporal)}</td>
            <td class="editable" data-field="fecha_no_mayor_a_15_dias">${verificarDato(dato.fecha_no_mayor_a_15_dias)}</td>
            <td class="editable" data-field="nombres_trabajador_examenes">${verificarDato(dato.nombres_trabajador_examenes)}</td>
            <td class="editable" data-field="cargo">${verificarDato(dato.cargo)}</td>
            <td class="editable" data-field="apto">${verificarDato(dato.apto)}</td>
            <td class="editable" data-field="salud_ocupacional">${verificarDato(dato.salud_ocupacional)}</td>
            <td class="editable" data-field="colinesterasa">${verificarDato(dato.colinesterasa)}</td>
            <td class="editable" data-field="planilla_colinesterasa">${verificarDato(dato.planilla_colinesterasa)}</td>
            <td class="editable" data-field="otros">${verificarDato(dato.otros)}</td>
            <td class="editable" data-field="certificado_afp">${verificarDato(dato.certificado_afp)}</td>
            <td class="editable" data-field="ruaf">${verificarDato(dato.ruaf)}</td>
            <td class="editable" data-field="nombre_trabajador_ruaf">${verificarDato(dato.nombre_trabajador_ruaf)}</td>
            <td class="editable" data-field="cedula_ruaf">${verificarDato(dato.cedula_ruaf)}</td>
            <td class="editable" data-field="fecha_cerRuaf15menor">${verificarDato(dato.fecha_cerRuaf15menor)}</td>
            <td class="editable" data-field="historia">${verificarDato(dato.historia)}</td>
            <td class="editable" data-field="fecha_radicado_eps">${verificarDato(dato.fecha_radicado_eps)}</td>
            <td class="editable" data-field="nombre_y_cedula_eps">${verificarDato(dato.nombre_y_cedula_eps)}</td>
            <td class="editable" data-field="salario_eps">${verificarDato(dato.salario_eps)}</td>
            <td class="editable" data-field="fecha_radicado_caja">${verificarDato(dato.fecha_radicado_caja)}</td>
            <td class="editable" data-field="nombre_y_cedula_caja">${verificarDato(dato.nombre_y_cedula_caja)}</td>
            <td class="editable" data-field="salario_caja">${verificarDato(dato.salario_caja)}</td>
            <td class="editable" data-field="nombre_y_cedula_seguridad">${verificarDato(dato.nombre_y_cedula_seguridad)}</td>
            <td class="editable" data-field="fecha_radicado_seguridad">${verificarDato(dato.fecha_radicado_seguridad)}</td>
            <td class="editable" data-field="codigo_hoja_de_vida">${verificarDato(dato.codigo_hoja_de_vida)}</td>
            <td class="editable" data-field="foto_hoja_de_vida">${verificarDato(dato.foto_hoja_de_vida)}</td>
            <td class="editable" data-field="nombre_y_cedula_hoja_de_vida">${verificarDato(dato.nombre_y_cedula_hoja_de_vida)}</td>
            <td class="editable" data-field="correo_electronico_hoja_de_vida">${verificarDato(dato.correo_electronico_hoja_de_vida)}</td>
            <td class="editable" data-field="direccion_hoja_de_vida">${verificarDato(dato.direccion_hoja_de_vida)}</td>
            <td class="editable" data-field="referencia_hoja_de_vida">${verificarDato(dato.referencia_hoja_de_vida)}</td>
            <td class="editable" data-field="firma_carnet_hoja_de_vida">${verificarDato(dato.firma_carnet_hoja_de_vida)}</td>
            <td class="editable" data-field="firma_clausulas_add">${verificarDato(dato.firma_clausulas_add)}</td>
            <td class="editable" data-field="sello_temporal_clausulas_add">${verificarDato(dato.sello_temporal_clausulas_add)}</td>
            <td class="editable" data-field="firma_add_contrato">${verificarDato(dato.firma_add_contrato)}</td>
            <td class="editable" data-field="sello_temporal_add_contrato">${verificarDato(dato.sello_temporal_add_contrato)}</td>
            <td class="editable" data-field="autorizaciontratamientosDatosJDA">${verificarDato(dato.autorizaciontratamientosDatosJDA)}</td>
            <td class="editable" data-field="cartadescuentoflor">${verificarDato(dato.cartadescuentoflor)}</td>
            <td class="editable" data-field="formato_timbre">${verificarDato(dato.formato_timbre)}</td>
            <td class="editable" data-field="cartaaurotiracioncorreo">${verificarDato(dato.cartaaurotiracioncorreo)}</td>
        `;

        // Agregar la fila a la tabla
        tabla.appendChild(fila);

        // Añadir el event listener para el botón de edición/guardado
        const editBtn = fila.querySelector('.editar-btn');
        editBtn.addEventListener('click', async () => {
            if (editBtn.classList.contains('fa-edit')) {
                // Cambiar a modo edición
                const editableCells = fila.querySelectorAll('.editable');
                editableCells.forEach(cell => {
                    const originalText = cell.textContent;
                    cell.innerHTML = `<input type="text" value="${originalText}" />`;
                });
                editBtn.classList.remove('fa-edit');
                editBtn.classList.add('fa-save');
            } else if (editBtn.classList.contains('fa-save')) {
                // Guardar cambios
                const updatedData = { id: dato.id, tipo: dato.tipo, cedula: dato.cedula, updated_fields: {} };
                const editableCells = fila.querySelectorAll('.editable');
                editableCells.forEach(cell => {
                    const input = cell.querySelector('input');
                    if (input) {
                        const newValue = input.value;
                        cell.textContent = newValue;
                        // Guardar los datos actualizados en el objeto updatedData
                        const field = cell.getAttribute('data-field');
                        updatedData.updated_fields[field] = newValue;
                    }
                });
                editBtn.classList.remove('fa-save');
                editBtn.classList.add('fa-edit');
                // Enviar los datos actualizados al servidor
                const urlcompleta = `${urlBack.url}/auditoria/tu_alianza_update/`;
                try {
                    const response = await fetch(urlcompleta, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedData),
                    });
                    const result = await response.json();
                    if (result.status === 'success') {
                        console.log('Datos actualizados con éxito');
                    } else {
                        console.error('Error al actualizar los datos:', result.message);
                    }
                } catch (error) {
                    console.error('Error al enviar la petición de actualización:', error);
                }
            }
        });
    });
}

// Cargar y mostrar datos al inicio
cargarYMostrarDatos();


// Escuchador de eventos para la carga de archivo
if (input) {
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
                guardarDatos(modifiedRows);
            };
            reader.readAsArrayBuffer(file);
        }
    });
}

// Función para guardar datos
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

        const urlcompleta = `${urlBack.url}/auditoria/tu_alianza/`;
        try {
            const response = await fetch(urlcompleta, {
                method: 'POST',
                body: JSON.stringify(bodyData),
                headers: headers,
            });

            if (response.ok) {
                over.style.display = "none";
                loader.style.display = "none";
                document.getElementById('successSound').play();
                const avisoConfirmadoResult = await avisoConfirmado("Datos guardados correctamente", "success");
                if (avisoConfirmadoResult) {
                    cargarYMostrarDatos();
                }
            } else {
                over.style.display = "none";
                loader.style.display = "none";
                document.getElementById('errorSound').play();
                aviso("Error al guardar los datos", "error");
                console.error('Error en la petición POST');
                console.error(response.statusText);
            }
        } catch (error) {
            over.style.display = "none";
            loader.style.display = "none";
            document.getElementById('errorSound').play();
            aviso("Error al guardar los datos", "error");
            console.error('Error en la petición HTTP POST');
            console.error(error);
        }
    }

    over.style.display = "none";
    loader.style.display = "none";
}
