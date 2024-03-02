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

if (perfilLocal == "GERENCIA" ) {
    estadisticas.style.display = "block";
    vacantes.style.display = "block";
    publicidad.style.display = "block";
    //seleccion.style.display = "block";
    //contratacion.style.display = "block";
    ausentismos.style.display = "block";
}

if (perfilLocal == "GERENCIA"  || perfilLocal == "COORDINADOR" || perfilLocal == "JEFE-DE-AREA" ) {
    formasDePago.style.display = "block";
}

async function traerAusentimosCedual(cedula) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = urlBack.url + '/Ausentismos/traerAusentismos/' + cedula;

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

function modificarV(id, numero_pagos, primercorreoelectronico) {

    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtToken = obj.jwt;

    const urlcompleta = urlBack.url + '/Ausentismos/editarAusentismosCED_DAVI/' + id;
    try {
        fetch(urlcompleta, {
            method: 'POST',
            body:
                JSON.stringify({
                    numero_pagos: numero_pagos,
                    primercorreoelectronico: primercorreoelectronico,
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
                console.error('Error:', error);
            });

    } catch (error) {
        console.error('Error en la petición HTTP POST');
        console.error(error);
    }
}

async function eliminarformadepago(id) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtToken = obj.jwt;

    const urlcompleta = urlBack.url + '/Ausentismos/eliminarAusentismosREAL/' + id;
    try {
        fetch(urlcompleta, {
            method: 'DELETE',
            headers: {
                'Authorization': jwtToken
            },
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
                return
            })
            .catch(error => {
                console.error('Error:', error);
            });

    } catch (error) {
        console.error('Error en la petición HTTP POST');
        console.error(error);
    }
}

const boton = document.querySelector('#boton');


document.getElementById('tabla').addEventListener('click', async function (event) {
    if (event.target.classList.contains('delete-icon')) {
        // Obtener el ID almacenado en el atributo data-id
        const id = event.target.getAttribute('data-id');
        let aviso = await avisoConfirmacion();
        if (aviso) {
            await eliminarformadepago(id);
            let cedulaEm = document.getElementById("cedula").value;
            await sleep(100);
            cargarYMostrarDatos(cedulaEm);
        }
    }

    if (event.target.classList.contains('editar-icon')) {
        const tr = event.target.closest('tr');
        const id = event.target.getAttribute('data-id');

        // Convertir las celdas en campos de entrada
        const celdas = tr.querySelectorAll('td');
        const correo = celdas[2].innerText;
        const daviplata = celdas[3].innerText;

        // Establecer estilos para las celdas con campos de entrada
        celdas[2].innerHTML = `<input type='text' class='input-estetico' value='${correo}' />`;
        celdas[3].innerHTML = `<input type='text' class='input-estetico' value='${daviplata}' />`;

        // Cambiar el ícono de editar a un botón de guardar
        event.target.src = '../../assets/disquete.png';
        event.target.classList.remove('editar-icon');
        event.target.classList.add('guardar-icon');
        // Establecer tamaño de 20px de ancho y alto
        event.target.style.width = '20px'; // Establecer el ancho en 20px
        event.target.style.height = '20px'; // Establecer la altura en 20px

    } else if (event.target.classList.contains('guardar-icon')) {
        const tr = event.target.closest('tr');
        const id = event.target.getAttribute('data-id');
        const inputs = tr.querySelectorAll('input');

        // Obteniendo los valores actualizados de los inputs
        const correo = inputs[0].value;
        const daviplata = inputs[1].value;

        // Aquí llamas a la función modificarV con los valores actualizados
        modificarV(id, daviplata, correo);
        await sleep(700);

        cargarYMostrarDatos(id);
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function cargarYMostrarDatos(cedulaEm) {
    const tabla = document.querySelector('#tabla');
    if (!cedulaEm) {
        aviso("Por favor ingrese una cédula", "warning");
        return;
    }

    let datosExtraidos = await traerAusentimosCedual(cedulaEm);
    
    if (datosExtraidos.Ausentismos == "Error no se encontraron datos") {
        aviso("No se encontró a la persona verifica que este bien escrito", "error");
        tabla.innerHTML = '';
        return;
    }
    tabla.innerHTML = '';

    let Ausentismos = datosExtraidos.Ausentismos;
    let ausentismos2 = datosExtraidos.ProcesoContratacion
    let auxNumeropagos = ausentismos2[0].numero_pagos

    Ausentismos.forEach(p => {
        tabla.insertAdjacentHTML('afterbegin', `
            <tr>
                <td>${p.numerodeceduladepersona}</td>
                <td>${p.primer_nombre} ${p.segundo_nombre} ${p.primer_apellido} ${p.segundo_apellido}</td>
                <td>${p.primercorreoelectronico}</td>
                <td>${auxNumeropagos}</td>
                <td> <img src="../../assets/editar.png" class="editar-icon" data-id="${p.numerodeceduladepersona}" ></td>
                <td> <img src="../../assets/eliminar.png" class="delete-icon" data-id="${p.numerodeceduladepersona}"></td>
            </tr>
        `);
    });
}


boton.addEventListener('click', async () => {
    let cedulaEm = document.getElementById("cedula").value;
    cedulaEm = cedulaEm.replace(/\s/g, '').replace(/\./g, '');
    cargarYMostrarDatos(cedulaEm);
});


if (input) {
    input.addEventListener('change', async () => {
        const file = input.files[0];
        const reader = new FileReader();

        let datosFinales = [];

        reader.onload = (event) => {
            const fileContent = event.target.result;
            const workbook = XLSX.read(new Uint8Array(fileContent), { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];

            // Obtiene el rango de la hoja
            const range = XLSX.utils.decode_range(sheet['!ref']);

            for (let rowNum = 2; rowNum <= range.e.r; rowNum++) {
                let rowData = [];
                for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
                    // Obtiene la celda en la posición actual
                    const cellRef = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
                    const cell = sheet[cellRef];

                    // Agrega la celda al array, usando espacio en blanco si la celda está vacía
                    rowData.push(cell ? cell.v : " ");
                }
                datosFinales.push(rowData);
            }

            console.log('Datos cargados desde Excel:', datosFinales);

            guardarDatos(datosFinales);
        };

        reader.readAsArrayBuffer(file);
    });
}

async function guardarDatos(datosFinales) {

    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;


    const bodyData = {
        jwt: jwtKey,
        mensaje: "muchos",
        datos: datosFinales
    };

    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = urlBack.url + '/contratacion/subidadeusuariosarchivoexcel';
    try {
        fetch(urlcompleta, {
            method: 'POST',// para el resto de peticiónes HTTP le cambias a GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(bodyData),// Aquí va el body de tu petición tiene que ser asi en json para que el back lo pueda leer y procesar y hay algun problema me dices

        })
            .then(async response => {
                if (response.ok) {
                    document.getElementById('successSound').play();
                    over.style.display = "none";
                    loader.style.display = "none";
                    let aviso = await avisoConfirmado("Datos guardados correctamente", "success");
                    //muchas veces mando un mensaje de sucess o algo asi para saber que todo salio bien o mal                    
                    if (aviso) {
                        location.reload();
                    }
                    return response.json();
                } else {
                    document.getElementById('errorSound').play();
                    aviso("Error al guardar los datos", "error");
                    throw new Error('Error en la petición POST');
                }
            })
            .then(responseData => {
                document.getElementById('successSound').play();
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('errorSound').play();
            });
    } catch (error) {
        console.error('Error en la petición HTTP PUT');
        console.error(error);
    }


}




