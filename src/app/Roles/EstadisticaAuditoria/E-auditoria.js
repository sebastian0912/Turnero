import { urlBack } from "../../model/base.js";
import { aviso, avisoConfirmado, avisoConfirmacion } from "../../Avisos/avisos.js";

const titulo = document.querySelector('#username');
const perfil = document.querySelector('#perfil');
const perfilLocal = localStorage.getItem("perfil");
const usernameLocal = localStorage.getItem("username");

titulo.innerHTML = usernameLocal;
perfil.innerHTML = perfilLocal;
const correo = localStorage.getItem("correo_electronico");

const over = document.querySelector('#overlay');
const loader = document.querySelector('#loader');

if (["GERENCIA", "COORDINADOR", "JEFE-DE-AREA"].includes(perfilLocal) || correo === "tuafiliacion@tsservicios.co") {
    ausentismos.style.display = "block";
    formasDePago.style.display = "block";
}

async function auditoria() {
    const body = localStorage.getItem('key');
    const { jwt } = JSON.parse(body);
    const headers = { 'Authorization': jwt };
    const url = `${urlBack.url}/auditoria/tu_alianza_responsable/`;

    try {
        const response = await fetch(url, { method: 'GET', headers });
        if (!response.ok) throw new Error('Error en la petición GET');
        return await response.json();
    } catch (error) {
        console.error('Error en la petición HTTP GET:', error);
        throw error;
    }
}

async function cargarYMostrarDatos() {
    let datos;
    try {
        datos = await auditoria();
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        return;
    }

    const gruposDefinidos = {
        "Hoja de Vida": ["codigo_hoja_de_vida", "foto_hoja_de_vida", "nombre_y_cedula_hoja_de_vida", "correo_electronico_hoja_de_vida", "direccion_hoja_de_vida", "referencia_hoja_de_vida", "firma_carnet_hoja_de_vida"],
        "Ficha Técnica": ["foto", "infolaboral_FT", "firma_trabajador", "huella", "referencia", "firma_carnet_FT", "firma_loker_FT", "fecha_de_ingreso_FT", "empleador_FT"],
        "Documento de identidad o Cédula": ["ampliada_al_150", "huellaCedula", "sello", "legible"],
        "Antecedentes(inferior a 15 días)": ["procuraduria_vigente", "fecha_procuraduria", "contraloria_vigente", "fecha_contraloria", "ofac_lista_clinton", "fecha_ofac", "policivos_vigente", "fecha_policivos", "medidas_correstivas", "fecha_medidas_correstivas"],
        "Adres": ["adres", "fecha_adres"],
        "Sisben": ["sisben", "fecha_sisben"],
        "Elite": ["formatoElite", "cargoElite"],
        "Contrato": ["nombres_trabajador_contrato", "no_cedula_contrato", "direccion", "correo_electronico", "fecha_de_ingreso_contrato", "salario_contrato", "empresa_usuaria", "cargo_contrato", "descripcion_temporada", "firma_trabajador_contrato", "firma_testigos", "sello_temporal"],
        "Entrega de Documentos": ["autorizacion_dscto_casino", "forma_de_pago", "autorizacion_funerario", "huellas_docs", "firma_cedula_docs", "fecha_de_recibido_docs"],
        "Entrevista de Ingreso": ["entrevista_ingreso"],
        "Arl": ["centro_de_costo_arl", "clase_de_riesgo", "cedula_arl", "nombre_trabajador_arl", "fecha_de_ingreso_arl"],
        "Exámenes": ["temporal", "fecha_no_mayor_a_15_dias", "nombres_trabajador_examenes", "cargo", "cedula_examenes", "apto", "salud_ocupacional", "colinesterasa", "planilla_colinesterasa", "otros"],
        "Afp": ["certificado_afp", "ruaf", "nombre_trabajador_ruaf", "cedula_ruaf", "fecha_cerRuaf15menor", "historia"],
        "Eps": ["fecha_radicado_eps", "nombre_y_cedula_eps", "salario_eps"],
        "Caja": ["fecha_radicado_caja", "nombre_y_cedula_caja", "salario_caja"],
        "Seguridad": ["nombre_y_cedula_seguridad", "fecha_radicado_seguridad"],
        "Otro si Clausulas adicionales JDA": ["firma_clausulas_add", "sello_temporal_clausulas_add"],
        "Adición Contrato (otro si)": ["firma_add_contrato", "sello_temporal_add_contrato"],
        "Autorización Tratamiento de Datos JDA": ["autorizaciontratamientosDatosJDA"],
        "Carta de Descuento Flor": ["cartadescuentoflor"],
        "Formato de timbre en hora de ingreso y salida": ["formato_timbre"],
        "Carta autorización correo electrónico": ["cartaaurotiracioncorreo"]
    };

    const agrupadosPorResponsable = datos.reduce((acc, dato) => {
        const responsable = dato.responsable || "Desconocido";
        if (!acc[responsable]) acc[responsable] = { total0: 0, total1: 0, edits: 0 };

        Object.entries(dato).forEach(([key, value]) => {
            if (value === "0") acc[responsable].total0++;
            if (value === "1") acc[responsable].total1++;
        });

        if (Array.isArray(dato.ultimas_actualizaciones)) {
            dato.ultimas_actualizaciones.forEach(act => {
                if (act.estado === "EDITADO") acc[responsable].edits++;
            });
        } else if (dato.ultimas_actualizaciones && dato.ultimas_actualizaciones.estado === "EDITADO") {
            acc[responsable].edits++;
        }

        return acc;
    }, {});

    const agrupadosPorGrupo = Object.keys(gruposDefinidos).reduce((acc, grupo) => {
        acc[grupo] = { total0: 0, total1: 0 };
        datos.forEach(dato => {
            gruposDefinidos[grupo].forEach(campo => {
                if (dato[campo] === "0") acc[grupo].total0++;
                if (dato[campo] === "1") acc[grupo].total1++;
            });
        });
        return acc;
    }, {});

    const agrupadosPorGrupoYResponsable = datos.reduce((acc, dato) => {
        const responsable = dato.responsable || "Desconocido";
        if (!acc[responsable]) acc[responsable] = {};

        Object.keys(gruposDefinidos).forEach(grupo => {
            if (!acc[responsable][grupo]) acc[responsable][grupo] = { total0: 0, total1: 0 };

            gruposDefinidos[grupo].forEach(campo => {
                if (dato[campo] === "0") acc[responsable][grupo].total0++;
                if (dato[campo] === "1") acc[responsable][grupo].total1++;
            });
        });

        return acc;
    }, {});

    // Generar checkboxes para cada responsable y grupo
    const checkboxesContainer = document.getElementById('checkboxes-container');
    const checkboxesContainerEdits = document.getElementById('checkboxes-container-edits');
    const checkboxesContainerGroups = document.getElementById('checkboxes-container-groups');
    checkboxesContainer.innerHTML = '';
    checkboxesContainerEdits.innerHTML = '';
    checkboxesContainerGroups.innerHTML = '';

    Object.keys(agrupadosPorResponsable).forEach(responsable => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = responsable;
        checkbox.value = responsable;
        checkbox.checked = true;

        const label = document.createElement('label');
        label.htmlFor = responsable;
        label.appendChild(document.createTextNode(responsable));

        const div = document.createElement('div');
        div.appendChild(checkbox);
        div.appendChild(label);
        checkboxesContainer.appendChild(div);

        const editCheckbox = checkbox.cloneNode(true);
        const editLabel = label.cloneNode(true);
        const editDiv = document.createElement('div');
        editDiv.appendChild(editCheckbox);
        editDiv.appendChild(editLabel);
        checkboxesContainerEdits.appendChild(editDiv);

        const responsableCheckbox = checkbox.cloneNode(true);
        const responsableLabel = label.cloneNode(true);
        const responsableDiv = document.createElement('div');
        responsableDiv.appendChild(responsableCheckbox);
        responsableDiv.appendChild(responsableLabel);
    });

    Object.keys(agrupadosPorGrupo).forEach(grupo => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = grupo;
        checkbox.value = grupo;
        checkbox.checked = true;

        const label = document.createElement('label');
        label.htmlFor = grupo;
        label.appendChild(document.createTextNode(grupo));

        const div = document.createElement('div');
        div.appendChild(checkbox);
        div.appendChild(label);
        checkboxesContainerGroups.appendChild(div);
    });

    const initialLabels = Object.keys(agrupadosPorResponsable);
    const initialTotal0Data = initialLabels.map(label => agrupadosPorResponsable[label].total0);
    const initialTotal1Data = initialLabels.map(label => agrupadosPorResponsable[label].total1);
    const initialEditsData = initialLabels.map(label => agrupadosPorResponsable[label].edits);

    const groupLabels = Object.keys(agrupadosPorGrupo);
    const groupTotal0Data = groupLabels.map(label => agrupadosPorGrupo[label].total0);
    const groupTotal1Data = groupLabels.map(label => agrupadosPorGrupo[label].total1);

    const ctxBar = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: initialLabels,
            datasets: [
                {
                    label: '0s',
                    data: initialTotal0Data,
                    backgroundColor: '#FF6384',
                    borderColor: '#FF6384',
                    borderWidth: 1
                },
                {
                    label: '1s',
                    data: initialTotal1Data,
                    backgroundColor: '#36A2EB',
                    borderColor: '#36A2EB',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const ctxPie = document.getElementById('pieChart').getContext('2d');
    new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['0s', '1s'],
            datasets: [{
                data: [initialTotal0Data.reduce((a, b) => a + b, 0), initialTotal1Data.reduce((a, b) => a + b, 0)],
                backgroundColor: ['#FF6384', '#36A2EB']
            }]
        }
    });

    const ctxEditBar = document.getElementById('editBarChart').getContext('2d');
    const editBarChart = new Chart(ctxEditBar, {
        type: 'bar',
        data: {
            labels: initialLabels,
            datasets: [
                {
                    label: 'Ediciones',
                    data: initialEditsData,
                    backgroundColor: '#FFA500',
                    borderColor: '#FFA500',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const ctxGroupBar = document.getElementById('groupBarChart').getContext('2d');
    const groupBarChart = new Chart(ctxGroupBar, {
        type: 'bar',
        data: {
            labels: groupLabels,
            datasets: [
                {
                    label: '0s',
                    data: groupTotal0Data,
                    backgroundColor: '#FF6384',
                    borderColor: '#FF6384',
                    borderWidth: 1
                },
                {
                    label: '1s',
                    data: groupTotal1Data,
                    backgroundColor: '#36A2EB',
                    borderColor: '#36A2EB',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    /*
    const ctxResponsableGroupBar = document.getElementById('responsableGroupBarChart').getContext('2d');
    const responsableGroupBarChart = new Chart(ctxResponsableGroupBar, {
        type: 'bar',
        data: {
            labels: initialLabels,
            datasets: groupLabels.flatMap((grupo, index) => ([
                {
                    label: `${grupo} - 0s`,
                    data: initialLabels.map(label => agrupadosPorGrupoYResponsable[label] ? agrupadosPorGrupoYResponsable[label][grupo].total0 : 0),
                    backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
                    borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                    borderWidth: 1
                },
                {
                    label: `${grupo} - 1s`,
                    data: initialLabels.map(label => agrupadosPorGrupoYResponsable[label] ? agrupadosPorGrupoYResponsable[label][grupo].total1 : 0),
                    backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.3)`,
                    borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                    borderWidth: 1
                }
            ]))
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });*/


    document.getElementById('updateChartButton').addEventListener('click', debounce(() => {
        const selectedResponsables = Array.from(document.querySelectorAll('#checkboxes-container input:checked')).map(input => input.value);
        const filteredLabels = selectedResponsables;
        const filteredTotal0Data = filteredLabels.map(label => agrupadosPorResponsable[label].total0);
        const filteredTotal1Data = filteredLabels.map(label => agrupadosPorResponsable[label].total1);

        barChart.data.labels = filteredLabels;
        barChart.data.datasets[0].data = filteredTotal0Data;
        barChart.data.datasets[1].data = filteredTotal1Data;
        barChart.update();
    }, 300));

    document.getElementById('updateEditChartButton').addEventListener('click', debounce(() => {
        const selectedResponsables = Array.from(document.querySelectorAll('#checkboxes-container-edits input:checked')).map(input => input.value);
        const filteredLabels = selectedResponsables;
        const filteredEditsData = filteredLabels.map(label => agrupadosPorResponsable[label].edits);

        editBarChart.data.labels = filteredLabels;
        editBarChart.data.datasets[0].data = filteredEditsData;
        editBarChart.update();
    }, 300));

    document.getElementById('updateGroupChartButton').addEventListener('click', debounce(() => {
        const selectedGrupos = Array.from(document.querySelectorAll('#checkboxes-container-groups input:checked')).map(input => input.value);
        const filteredLabels = selectedGrupos;
        const filteredTotal0Data = filteredLabels.map(label => agrupadosPorGrupo[label].total0);
        const filteredTotal1Data = filteredLabels.map(label => agrupadosPorGrupo[label].total1);

        groupBarChart.data.labels = filteredLabels;
        groupBarChart.data.datasets[0].data = filteredTotal0Data;
        groupBarChart.data.datasets[1].data = filteredTotal1Data;
        groupBarChart.update();
    }, 300));

    /*
    document.getElementById('updateResponsableGroupChartButton').addEventListener('click', debounce(() => {
        const selectedResponsables = Array.from(document.querySelectorAll('#checkboxes-container-responsables input:checked')).map(input => input.value);
        const filteredLabels = selectedResponsables;

        responsableGroupBarChart.data.labels = filteredLabels;
        responsableGroupBarChart.data.datasets.forEach((dataset, index) => {
            const [grupo, tipo] = dataset.label.split(' - ');
            dataset.data = filteredLabels.map(label => agrupadosPorGrupoYResponsable[label] ? agrupadosPorGrupoYResponsable[label][grupo][tipo === '0s' ? 'total0' : 'total1'] : 0);
        });
        responsableGroupBarChart.update();
    }, 300));*/
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

cargarYMostrarDatos();
