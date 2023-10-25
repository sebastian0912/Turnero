import { urlBack } from "../../model/base.js";
import { aviso } from "../../Avisos/avisos.js";
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
    seleccion.style.display = "block";
    contratacion.style.display = "block";
}
if (usernameLocal == "HEIDY TORRES"){
    formasDePago.style.display = "block";
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


function modificarV(id, banco, nombre, centrodecosto, concepto, contrato, fechadepago, formadepago, valor) {

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

const boton = document.querySelector('#boton');
boton.addEventListener('click', async () => {
    let cedulaEm = document.getElementById("cedula").value;
    if (cedulaEm == "") {
        aviso("Por favor ingrese una cedula", "warning");
        return;
    }

    let datosExtraidos = await FormasdePago(cedulaEm);
    console.log(datosExtraidos);
    let formaPago = datosExtraidos.formasdepago;

    // ordenar por 

    if (datosExtraidos.message == "No se encontró el número de cédula") {
        aviso("No se encontró el número de cédula en las formas de pago", "warning");
        return;
    }
    const tabla = document.querySelector('#tabla');

    tabla.innerHTML = '';
    formaPago.forEach(async (p) => {
        // Verificar si p.nombreQuienEntrego es null y mostrar una cadena vacía en su lugar

        // Insertar al principio de la tabla
        tabla.insertAdjacentHTML('afterbegin', `
            <tr>
                <td>${p.id}</td>
                <td>${p.contrato}</td>
                <td>${p.cedula}</td>
                <td>${p.nombre}</td>
                <td>${p.centrodecosto}</td>
                <td>${p.concepto}</td>
                <td>${p.formadepago}</td>
                <td>${p.banco}</td>
                <td>${p.fechadepago}</td>        
            </tr>
        `);
    });

    let boton2 = document.getElementById("boton2");
    if (boton2) {

        let id = document.getElementById("id");
        cedula.style.display = "none";
        boton.style.display = "none";

        id.style.display = "block";
        boton2.style.display = "block";
        let datos
        boton2.addEventListener('click', async () => {
            if (id.value == "") {
                aviso("Por favor ingrese un id", "warning");
                return;
            }

            // buscar en datosExtraidos.formasdepago el id que coincida con el id que se ingreso
            for (let i = 0; i < datosExtraidos.formasdepago.length; i++) {
                if (datosExtraidos.formasdepago[i].id == id.value) {
                    datos = datosExtraidos.formasdepago[i];
                    console.log(datos);
                    /*let datos = datosExtraidos.formasdepago[i];
                    document.getElementById("contrato").value = datos.contrato;
                    document.getElementById("cedula").value = datos.cedula;
                    document.getElementById("nombre").value = datos.nombre;
                    document.getElementById("centrodecosto").value = datos.centrodecosto;
                    document.getElementById("concepto").value = datos.concepto;
                    document.getElementById("formadepago").value = datos.formadepago;
                    document.getElementById("banco").value = datos.banco;
                    document.getElementById("fechadepago").value = datos.fechadepago;*/
                }
            }
            let boton3 = document.getElementById("boton3");
            if (boton3) {

                boton2.style.display = "none";
                id.style.display = "none";

                // MAS ALTO 
                cuadroTexto.style.height = "300px";

                boton3.style.display = "block";

                banco.style.display = "inline-block";
                formadePago.style.display = "inline-block";
                fechadepago.style.display = "inline-block";



                banco.value = datos.banco;
                formadePago.value = datos.formadepago;
                fechadepago.value = datos.fechadepago;

                boton3.addEventListener('click', async () => {
                    let banco = document.getElementById("banco").value;
                    let formadePago = document.getElementById("formadePago").value;
                    let fechadepago = document.getElementById("fechadepago").value;
                    console.log(banco);
                    console.log(formadePago);
                    console.log(fechadepago);

                    modificarV(id.value, datos.banco, datos.nombre, datos.centrodecosto, datos.concepto, datos.contrato, fechadepago, formadePago, datos.valor)


                });
            }
        });
    }
});

if (input) {

    input.addEventListener('change', (e) => {
        const files = event.target.files;

        if (files.length) {
            const file = files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                const arrayBuffer = event.target.result;
                const data = new Uint8Array(arrayBuffer);

                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                const rows = XLSX.utils.sheet_to_json(worksheet);

                const modifiedRows = rows.map((row) => {
                    const modifiedRow = {};

                    for (const key in row) {
                        if (row.hasOwnProperty(key)) {
                            const trimmedKey = key.replace(/\s+/g, '').trim();
                            modifiedRow[trimmedKey] = row[key] !== null ? row[key] : 'N/A';
                        }
                    }
                    return modifiedRow;
                });
                console.log(modifiedRows);
                loader.style.display = "block";
                over.style.display = "block";
                // Hacer algo con modifiedRows, por ejemplo, almacenarlo en una variable
                guardarDatos(modifiedRows);
            };

            reader.readAsArrayBuffer(file);
        }


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

    const urlcompleta = urlBack.url + '/FormasdePago/crearformasDePago';
    try {
        fetch(urlcompleta, {
            method: 'POST',// para el resto de peticiónes HTTP le cambias a GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(bodyData),// Aquí va el body de tu petición tiene que ser asi en json para que el back lo pueda leer y procesar y hay algun problema me dices

        })
            .then(response => {
                if (response.ok) {
                    document.getElementById('successSound').play();
                    aviso("Datos guardados correctamente", "success");
                    over.style.display = "none";
                    loader.style.display = "none";
                    //muchas veces mando un mensaje de sucess o algo asi para saber que todo salio bien o mal
                    return response.json();
                } else {
                    document.getElementById('errorSound').play();
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




