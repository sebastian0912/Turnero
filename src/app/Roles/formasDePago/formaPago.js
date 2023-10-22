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

let graficas = document.getElementById("estadisticas");

if (perfilLocal == "GERENCIA") {
    graficas.style.display = "block";
}

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

            // Hacer algo con modifiedRows, por ejemplo, almacenarlo en una variable
            guardarDatos(modifiedRows);
        };

        reader.readAsArrayBuffer(file);
    }
    

});

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

boton.addEventListener('click', async () => {


    const tabla = document.querySelector('#tabla');
    tabla.innerHTML = '';
    datosExtraidos.historial.forEach(async (p) => {
        // Verificar si p.nombreQuienEntrego es null y mostrar una cadena vacía en su lugar
        const nombreQuienEntrego = p.nombreQuienEntrego !== null ? p.nombreQuienEntrego : '';

        // Insertar al principio de la tabla
        tabla.insertAdjacentHTML('afterbegin', `
            <tr>
                <td>${p.cedula}</td>
                <td>${p.concepto}</td>            
                <td>${p.fechaEfectuado}</td>
                <td>${p.valor}</td>
                <td>${p.cuotas}</td>
                <td>${nombreQuienEntrego}</td>
                <td>${p.generadopor}</td>
            </tr>
        `);
    });

});



