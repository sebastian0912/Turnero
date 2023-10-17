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
    const file = e.target.files[0];
    const reader = new FileReader();
    let datosFinales = [];
    // leer archivo excel y convertirlo en una matriz de datos JSON imprimir en consola
    reader.onload = (event) => {
        const fileContent = event.target.result;

        const workbook = XLSX.read(fileContent, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        for (const rowData of sheetData) {
            let fila = [
                rowData['Nro Des'] || '0',
                rowData['Contrato'] || '0',
                rowData['Cedula'] || '0',
                rowData['Nombre'] || '0',
                rowData['Centro de Costo'] || '0',
                rowData['Concepto'] || '0',
                rowData['Forma de Pago'] || '0',
                rowData['Valor'] || '0',
                rowData['Banco'] || '0',
                rowData['FECHA DE PAGO'] || '0'
            ];
            datosFinales.push(fila);
        }

        console.log('Datos cargados desde Excel:', datosFinales);
    }
    reader.readAsBinaryString(file);

    guardarDatos(datosFinales);

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



