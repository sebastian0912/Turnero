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

if (usernameLocal == "HEIDY TORRES" || usernameLocal == "MAYRA HUAMANI"){
    cargarA.style.display = "block";
}

async function FormasdePago(cedula) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = urlBack.url + '/FormasdePago/traerformasDePago/' + cedula;

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

function modificarV(id, banco, nombre, centrodecosto, concepto, contrato, fechadepago, formadepago, valor) {

    console.log("id: " + id);
    console.log("banco: " + banco);
    console.log("nombre: " + nombre);
    console.log("centrodecosto: " + centrodecosto);
    console.log("concepto: " + concepto);
    console.log("contrato: " + contrato);
    console.log("fechadepago: " + fechadepago);
    console.log("formadepago: " + formadepago);
    console.log("valor: " + valor);

    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtToken = obj.jwt;
    console.log(jwtToken);

    const urlcompleta = urlBack.url + '/FormasdePago/editarFormasdepago/' + id;
    try {
        fetch(urlcompleta, {
            method: 'POST',
            body:
                JSON.stringify({
                    banco: banco,
                    nombre: nombre,
                    centrodecosto: centrodecosto,
                    concepto: concepto,
                    contrato: contrato,
                    fechadepago: fechadepago,
                    formadepago: formadepago,
                    valor: valor,

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

async function eliminarformadepago(id) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtToken = obj.jwt;

    const urlcompleta = urlBack.url + '/FormasdePago/eliminarformadepago/' + id;
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

    if (usernameLocal != "HEIDY TORRES" || usernameLocal == "MAYRA HUAMANI") {
        if (event.target.classList.contains('delete-icon')) {
            aviso("No tiene permitido realizar esta accion", "error")
        }
        if (event.target.classList.contains('editar-icon')) {
            aviso("No tiene permitido realizar esta accion", "error")
        }
    }

    else {

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
            const formadepago = celdas[5].innerText;
            const valor = celdas[6].innerText;
            const banco = celdas[7].innerText;
            const fechadepago = celdas[8].innerText;

            // Establecer estilos para las celdas con campos de entrada
            celdas[5].innerHTML = `<input type='text' class='input-estetico' value='${formadepago}' />`;
            celdas[6].innerHTML = `<input type='text' class='input-estetico' value='${valor}' />`;
            celdas[7].innerHTML = `<input type='text' class='input-estetico' value='${banco}' />`;
            celdas[8].innerHTML = `<input type='text' class='input-estetico' value='${fechadepago}' />`;


            // Cambiar el ícono de editar a un botón de guardar
            event.target.src = '../../assets/disquete.png';
            event.target.classList.remove('editar-icon');
            event.target.classList.add('guardar-icon');
            // Establecer tamaño de 20px de ancho y alto
            event.target.style.width = '20px'; // Establecer el ancho en 20px
            event.target.style.height = '20px'; // Establecer la altura en 20px
            event.target.style.cursor = "pointer"


        } else if (event.target.classList.contains('guardar-icon')) {
            const tr = event.target.closest('tr');
            const id = event.target.getAttribute('data-id');
            const inputs = tr.querySelectorAll('input');

            const contrato = tr.cells[0].innerText;
            const cedula = tr.cells[1].innerText;
            const nombre = tr.cells[2].innerText;
            const centrodecosto = tr.cells[3].innerText;
            const concepto = tr.cells[4].innerText;
            // Obteniendo los valores actualizados de los inputs
            const formadepago = inputs[0].value;
            const valor = inputs[1].value;
            const banco = inputs[2].value;
            const fechadepago = inputs[3].value;

            // Aquí llamas a la función modificarV con los valores actualizados
            modificarV(id, banco, nombre, centrodecosto, concepto, contrato, fechadepago, formadepago, valor);
            await sleep(100);

            cargarYMostrarDatos(cedula);
        }
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

    let datosExtraidos = await FormasdePago(cedulaEm);

    if (datosExtraidos.message == "No se encontró el número de cédula") {
        aviso("No se encontró el número de cédula en las formas de pago", "warning");
        tabla.innerHTML = '';
        return;
    }
    tabla.innerHTML = '';

    let formaPago = datosExtraidos.formasdepago;
    formaPago.reverse();

    let contador = 0;

    formaPago.forEach(p => {
        if (contador < 4) {
            tabla.insertAdjacentHTML('beforeend', `
            <tr>
                <td>${p.contrato}</td>
                <td>${p.cedula}</td>
                <td>${p.nombre}</td>
                <td>${p.centrodecosto}</td>
                <td>${p.concepto}</td>
                <td>${p.formadepago}</td>
                <td>${p.valor}</td>
                <td>${p.banco}</td>
                <td>${p.fechadepago}</td>
                <td> <img src="../../assets/editar.png" class="editar-icon" data-id="${p.id}" ></td>
                <td> <img src="../../assets/eliminar.png" class="delete-icon" data-id="${p.id}"></td>
            </tr>
        `);

            contador++;
        }

    });
}


boton.addEventListener('click', async () => {
    let cedulaEm = document.getElementById("cedula").value;
    cedulaEm = cedulaEm.replace(/\s/g, '').replace(/\./g, '');

    cargarYMostrarDatos(cedulaEm);
});

const claves = ["NroDes", "Contrato", "Cedula", "Nombre", "CentrodeCosto", "Concepto", "FormadePago", "Valor", "Banco", "FECHADEPAGO"];

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
                const modifiedRows = rows.map((row) => {
                    let modifiedRow = {};
                    row.forEach((cell, index) => {
                        if (index < claves.length) {
                            modifiedRow[claves[index]] = cell !== null ? cell : 'N/A';
                        }
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


const descargardoc = document.querySelector('#descargardoc');

descargardoc.addEventListener('click', async () => {

    let datosFormasPago = await FormasdePagoTodo();
    let aux = datosFormasPago.formasdepago;
    console.log(aux);


    try {

        if (!aux || aux.length === 0) {
            aviso("No se han encontrado datos de formas de pago", "warning");
            return;
        }

        let excelData = [
            ['NroDes', 'Contrato', 'Cédula', 'Nombre', 'Centro de Costo', 'Concepto', 'Forma de Pago', 'Valor', 'Banco', 'Fecha de Pago']
        ];

        aux.forEach((formaPago) => {
            excelData.push([
                formaPago.NroDes || "",
                formaPago.contrato || "",
                formaPago.cedula || "",
                formaPago.nombre || "",
                formaPago.centrodecosto || "",
                formaPago.concepto || "",
                formaPago.formadepago || "",
                formaPago.valor || "",
                formaPago.banco || "",
                formaPago.fechadepago || "",
            ]);
        });

        const ws = XLSX.utils.aoa_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Datos Formas de Pago');

        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

        const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);

        const element = document.createElement('a');
        element.href = url;
        element.download = 'datosFormasPago.xlsx';
        element.style.display = 'none';

        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error al generar el archivo Excel", error);
        // Manejar el error como consideres necesario
    }
});

function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
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

    const urlcompleta = urlBack.url + '/FormasdePago/crearformasDePago';
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




