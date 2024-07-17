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

if (perfilLocal == "GERENCIA" || correo == "tuafiliacion@tsservicios.co" || perfilLocal == "COORDINADOR") {
    ausentismos.style.display = "block";
}

if (perfilLocal == "GERENCIA" || perfilLocal == "COORDINADOR" || perfilLocal == "JEFE-DE-AREA") {
    formasDePago.style.display = "block";
}

async function auditoria(cedula) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = urlBack.url + '/auditoria/tu_alianza_responsable/';

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
    let datos = await auditoria();
    console.log(datos);

    // Agrupar datos por responsable
    const agrupadosPorResponsable = datos.reduce((acc, dato) => {
        const responsable = dato.responsable || "Desconocido"; // Manejar casos donde el responsable es null o undefined
        if (!acc[responsable]) {
            acc[responsable] = { total0: 0, total1: 0 };
        }

        Object.keys(dato).forEach(key => {
            if (dato[key] === "0") acc[responsable].total0++;
            if (dato[key] === "1") acc[responsable].total1++;
        });

        return acc;
    }, {});

    // Generar checkboxes para cada responsable
    const checkboxesContainer = document.getElementById('checkboxes-container');
    checkboxesContainer.innerHTML = '';
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
    });

    // Preparar datos para el gráfico inicial
    const initialLabels = Object.keys(agrupadosPorResponsable);
    const initialTotal0Data = initialLabels.map(label => agrupadosPorResponsable[label].total0);
    const initialTotal1Data = initialLabels.map(label => agrupadosPorResponsable[label].total1);

    // Crear gráfico de barras
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

    // Calcular total de 0s y 1s para gráfico circular
    const total0 = initialTotal0Data.reduce((a, b) => a + b, 0);
    const total1 = initialTotal1Data.reduce((a, b) => a + b, 0);

    // Crear gráfico circular
    const ctxPie = document.getElementById('pieChart').getContext('2d');
    new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['0s', '1s'],
            datasets: [{
                data: [total0, total1],
                backgroundColor: ['#FF6384', '#36A2EB']
            }]
        }
    });

    // Actualizar gráfico de barras según selección de checkboxes
    document.getElementById('updateChartButton').addEventListener('click', () => {
        const selectedResponsables = Array.from(document.querySelectorAll('#checkboxes-container input:checked'))
            .map(input => input.value);

        const filteredLabels = selectedResponsables;
        const filteredTotal0Data = filteredLabels.map(label => agrupadosPorResponsable[label].total0);
        const filteredTotal1Data = filteredLabels.map(label => agrupadosPorResponsable[label].total1);

        barChart.data.labels = filteredLabels;
        barChart.data.datasets[0].data = filteredTotal0Data;
        barChart.data.datasets[1].data = filteredTotal1Data;
        barChart.update();
    });
}

cargarYMostrarDatos();
