
import { aviso } from "../../Avisos/avisos.js";
import { urlBack } from "../../model/base.js";

const uid = localStorage.getItem("idUsuario");

// Capturar el h1 del titulo y perfil
const titulo = document.querySelector('#username');
const perfil = document.querySelector('#perfil');
// Capturar el PERFIL y el USERNAME del local storage
const perfilLocal = localStorage.getItem("perfil");
const usernameLocal = localStorage.getItem("username");

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
    ausentismos.style.display = "block";
}

if (perfilLocal == "GERENCIA" || perfilLocal == "COORDINADOR" || perfilLocal == "JEFE-DE-AREA") {
    formasDePago.style.display = "block";
}

function toggleSeccion(id) {
    var seccion = document.getElementById(id);
    if (seccion.style.display === 'none') {
        seccion.style.display = 'block';
    } else {
        seccion.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Selecciona todos los títulos de sección
    var titulos = document.querySelectorAll('.tituloSeccion');

    // Asigna un event listener a cada título
    titulos.forEach(function (titulo) {
        titulo.addEventListener('click', function () {
            // Encuentra el próximo elemento hermano (la sección que sigue al título) y alterna su visibilidad
            var seccion = this.nextElementSibling;
            if (seccion.style.display === 'none' || seccion.style.display === '') {
                seccion.style.display = 'block';
            } else {
                seccion.style.display = 'none';
            }
        });
    });
});

let aux;

document.getElementById('info').onclick = function () {
    document.getElementById('infoBox').style.display = 'block';

    let experiencia
    if (aux.data[0].tiene_experiencia_laboral == "true") {
        experiencia = "Si";
    }
    else {
        experiencia = "No";
    }

    let edad
    let fechaNacimiento = aux.data[0].fecha_nacimiento;
    let fechaNacimientoISO = fechaNacimiento.split("T")[0]; // Esto ya está en formato "YYYY-MM-DD"
    let fechaNacimientoDate = new Date(fechaNacimientoISO);

    let hoy = new Date();
    let edadCalculada = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    let m = hoy.getMonth() - fechaNacimientoDate.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimientoDate.getDate())) {
        edadCalculada--;
    }

    edad = edadCalculada;

    // Nombre
    nombreBox.innerHTML = aux.data[0].primer_nombre + " " + aux.data[0].segundo_nombre + " " + aux.data[0].primer_apellido + " " + aux.data[0].segundo_apellido;
    // foto
    var fotoBase64 = aux.data[0].fotoPersonal;
    var imageData = 'data:image/jpeg;base64,' + fotoBase64;
    document.getElementById('foto').src = imageData;
    // cedula
    cedulaBox.innerHTML = aux.data[0].numerodeceduladepersona;
    // tipo
    tipoBox.innerHTML = aux.data[0].tipodedocumento;
    // Telefono
    telefonoBox.innerHTML = aux.data[0].celular;
    // numerowhat
    whaBox.innerHTML = aux.data[0].whatsapp;
    // genero
    generoBox.innerHTML = aux.data[0].genero;
    // edad
    edadBox.innerHTML = edad + " años";
    // barrio
    barrioBox.innerHTML = aux.data[0].barrio;
    // experiencia
    experienciaBox.innerHTML = experiencia;

};


buscarCedula.addEventListener('click', async () => { // Se añade async aquí
    const cedula = document.getElementById('cedulaB').value;
    // Mostrar elementos ocultos
    over.style.display = "block";
    loader.style.display = "block";
    let cedulaSeleccion = await buscarCedulaSeleccion(cedula); // Se espera el resultado con await
    if (cedulaSeleccion != "No se encontró el proceso de selección para la cédula proporcionada") {
        aux = await buscarCedulaContratacionGeneral(cedula); // Se espera el resultado con await
        info.style.display = "block";
        // Ocultar elementos después de completar la operación
        over.style.display = "none";
        loader.style.display = "none";
    }

});


descargarPdf.addEventListener('click', async () => { // Se añade async aquí

    // Copiar pdf_base64 del array que está en aux
    var pdf_base64 = aux.data[0].pdf_base64;
    // Ejemplo de cómo limpiar la cadena base64 si contiene metadatos al principio
    var pdf_base64_clean = pdf_base64.replace(/^data:application\/pdf;base64,/, "");

    // Convertir la cadena base64 a un blob de datos
    const pdfBlob = b64toBlob(pdf_base64_clean, 'application/pdf');

    // Crear un URL para el blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Crear un enlace <a> temporal para descargar el archivo
    const downloadLink = document.createElement('a');
    downloadLink.href = pdfUrl;
    downloadLink.download = 'archivo.pdf'; // Puedes darle el nombre de archivo que prefieras
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink); // Limpiar el enlace temporal

    // Función auxiliar para convertir base64 a Blob
    function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

});


async function buscarCedulaContratacionGeneral(cedula) {
    // guardar cedula en el localstogare
    localStorage.setItem("cedulaSeleccion", cedula);

    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlCompleta = urlBack.url + '/contratacion/buscarCandidato/' + cedula;

    try {
        const response = await fetch(urlCompleta, {
            method: 'GET',
            headers: headers,
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
            // Dentro de tu función buscarCedulaSeleccion, reemplaza la parte del error 404 con esto:
        } else if (response.status === 404) {
            const errorData = await response.json(); // Intenta leer el cuerpo de la respuesta

            if (errorData.message == "No se encontró el proceso de selección para la cédula proporcionada") {
                aviso("No se encontro la cedula, se procede a crearla", "warning");
                return errorData.message;
            }
        }
        else {
            // Maneja otros posibles errores HTTP
            throw new Error('Error en la petición GET');
        }
    } catch (error) {
        console.error('Error en la petición HTTP GET:', error);
        // Considera mostrar el error al usuario de una forma que sea parte de tu UI
        throw error;
    }


}

async function buscarCedulaSeleccion(cedula) {
    // guardar cedula en el localstogare
    localStorage.setItem("cedulaSeleccion", cedula);

    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlCompleta = urlBack.url + '/Seleccion/traerDatosSeleccion/' + cedula;

    try {
        const response = await fetch(urlCompleta, {
            method: 'GET',
            headers: headers,
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
            // Dentro de tu función buscarCedulaSeleccion, reemplaza la parte del error 404 con esto:
        } else if (response.status === 404) {
            const errorData = await response.json(); // Intenta leer el cuerpo de la respuesta

            if (errorData.message == "No se encontró el proceso de selección para la cédula proporcionada") {
                aviso("No se encontro la cedula, se procede a crearla", "warning");
                return errorData.message;
            }
        }
        else {
            // Maneja otros posibles errores HTTP
            throw new Error('Error en la petición GET');
        }
    } catch (error) {
        console.error('Error en la petición HTTP GET:', error);
        // Considera mostrar el error al usuario de una forma que sea parte de tu UI
        throw error;
    }


}



botonParte1.addEventListener('click', async () => { // Se añade async aquí
    const cedula = localStorage.getItem("cedulaSeleccion");
    console.log(cedula);
    let eps = document.getElementById('eps').value;
    let afp = document.getElementById('afp').value;
    let policivos = document.getElementById('policivos').value;
    let procuraduria = document.getElementById('procuraduria').value;
    let contraloria = document.getElementById('contraloria').value;
    let ramajudicial = document.getElementById('ramaJudicial').value;
    let medidasCorrectivas = document.getElementById('medidasCorrectivas').value;
    let areaAplica = document.getElementById('areaAplica').value;

    try {
        let parte1 = await guardarParte1(cedula, eps, afp, policivos, procuraduria, contraloria, ramajudicial, medidasCorrectivas, areaAplica); // Se espera el resultado con await
        console.log(parte1);
    } catch (error) {
        console.error(error);
    }
});


async function guardarParte1(cedula, eps, afp, policivos, producaduria, contraloria, ramajudicial, medidasCorrectivas, areaAplica) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;
    console.log(jwtKey);
    console.log(cedula);
    console.log(eps);
    console.log(afp);
    console.log(policivos);
    console.log(producaduria);
    console.log(contraloria);
    console.log(ramajudicial);
    console.log(medidasCorrectivas);
    console.log(areaAplica);

    const urlCompleta = urlBack.url + '/Seleccion/crearSeleccionParteUnoCandidato';

    try {
        const response = await fetch(urlCompleta, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numerodeceduladepersona: cedula,
                nombre_evaluador: usernameLocal,
                eps: eps,
                afp: afp,
                policivos: policivos,
                procuraduria: producaduria,
                contraloria: contraloria,
                rama_judicial: ramajudicial,
                medidas_correctivas: medidasCorrectivas,
                area_aplica: areaAplica,
                jwt: jwtKey
            })
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            // Maneja otros posibles errores HTTP
            throw new Error('Error en la petición POST');
        }
    } catch (error) {
        console.error('Error en la petición HTTP POST:', error);
        // Considera mostrar el error al usuario de una forma que sea parte de tu UI
        throw error;
    }
}


botonParte2.addEventListener('click', async () => { // Se añade async aquí
    let cedula = localStorage.getItem("cedulaSeleccion");
    console.log(cedula);
    let centroCosto = document.getElementById('centroCosto').value;
    let cargo = document.getElementById('cargo').value;
    let areaEntrevista = document.getElementById('areaEntrevista').value;
    let fechaPruebaEntrevista = document.getElementById('fechaPruebaEntrevista').value;
    let horaPruebaEntrevista = document.getElementById('horaPruebaEntrevista').value;
    let direccionEmpresa = document.getElementById('direccionEmpresa').value;

    try {
        let parte2 = await guardarParte2(cedula, centroCosto, cargo, areaEntrevista, fechaPruebaEntrevista, horaPruebaEntrevista, direccionEmpresa); // Se espera el resultado con await
        console.log(parte2);
    }
    catch (error) {
        console.error(error);
    }
});


async function guardarParte2(cedula, centroCosto, cargo, areaEntrevista, fechaPruebaEntrevista, horaPruebaEntrevista, direccionEmpresa) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;
    console.log(jwtKey);
    console.log(cedula);
    console.log(centroCosto);
    console.log(cargo);
    console.log(areaEntrevista);
    console.log(fechaPruebaEntrevista);
    console.log(horaPruebaEntrevista);
    console.log(direccionEmpresa);

    const urlCompleta = urlBack.url + '/Seleccion/crearSeleccionparteDoscandidato';

    try {
        const response = await fetch(urlCompleta, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numerodeceduladepersona: cedula,
                centro_costo_entrevista: centroCosto,
                cargo: cargo,
                area_entrevista: areaEntrevista,
                fecha_prueba_entrevista: fechaPruebaEntrevista,
                hora_prueba_entrevista: horaPruebaEntrevista,
                direccion_empresa: direccionEmpresa,
                jwt: jwtKey
            })
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            // Maneja otros posibles errores HTTP
            throw new Error('Error en la petición POST');
        }
    } catch (error) {
        console.error('Error en la petición HTTP POST:', error);
        // Considera mostrar el error al usuario de una forma que sea parte de tu UI
        throw error;
    }
}



botonParte3.addEventListener('click', async () => { // Se añade async aquí
    let cedula = localStorage.getItem("cedulaSeleccion");
    console.log(cedula);
    let examenSaludOcupacional = document.getElementById('examenSaludOcupacional').value;
    let ips = document.getElementById('ips').value;
    let laboratorios = document.getElementById('laboratorios').value;
    let ipsLab = document.getElementById('ipsLab').value;
    let aptoCargo = document.getElementById('aptoCargo').value;

    try {
        let parte3 = await guardarParte3(cedula, examenSaludOcupacional, ips, laboratorios, ipsLab, aptoCargo); // Se espera el resultado con await
        console.log(parte3);
    }
    catch (error) {
        console.error(error);
    }
});


async function guardarParte3(cedula, examenSaludOcupacional, ips, laboratorios, ipsLab, aptoCargo) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;
    console.log(jwtKey);
    console.log(cedula);
    console.log(examenSaludOcupacional);
    console.log(ips);
    console.log(laboratorios);
    console.log(ipsLab);
    console.log(aptoCargo);

    const urlCompleta = urlBack.url + '/Seleccion/crearSeleccionparteTrescandidato';

    try {
        const response = await fetch(urlCompleta, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numerodeceduladepersona: cedula,
                examen_salud_ocupacional: examenSaludOcupacional,
                ips: ips,
                delaboratorios: laboratorios,
                ipslab: ipsLab,
                apto_para_el_cargo: aptoCargo,
                jwt: jwtKey
            })
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            // Maneja otros posibles errores HTTP
            throw new Error('Error en la petición POST');
        }
    } catch (error) {
        console.error('Error en la petición HTTP POST:', error);
        // Considera mostrar el error al usuario de una forma que sea parte de tu UI
        throw error;
    }
}

botonParte4.addEventListener('click', async () => { // Se añade async aquí
    let cedula = localStorage.getItem("cedulaSeleccion");
    console.log(cedula);
    let empresaUsuaria = document.getElementById('empresaUsuaria').value;
    let fechaIngreso = document.getElementById('fechaIngreso').value;
    let salario = document.getElementById('salario').value;
    let auxTransporte = document.getElementById('auxTransporte').value;
    let rodamiento = document.getElementById('rodamiento').value;
    let auxMovilidad = document.getElementById('auxMovilidad').value;
    let bonificacion = document.getElementById('bonificacion').value;

    try {
        let parte4 = await guardarParte4(cedula, empresaUsuaria, fechaIngreso, salario, auxTransporte, rodamiento, auxMovilidad, bonificacion); // Se espera el resultado con await
        console.log(parte4);
    }
    catch (error) {
        console.error(error);
    }
});

async function guardarParte4(cedula, empresaUsuaria, fechaIngreso, salario, auxTransporte, rodamiento, auxMovilidad, bonificacion) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;
    console.log(jwtKey);
    console.log(cedula);
    console.log(empresaUsuaria);
    console.log(fechaIngreso);
    console.log(salario);
    console.log(auxTransporte);
    console.log(rodamiento);
    console.log(auxMovilidad);
    console.log(bonificacion);

    const urlCompleta = urlBack.url + '/Seleccion/crearSeleccionparteCuatrocandidato';

    try {
        const response = await fetch(urlCompleta, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numerodeceduladepersona: cedula,
                empresa_usuario: empresaUsuaria,
                fecha_ingreso_usuario: fechaIngreso,
                salario: salario,
                aux_transporte: auxTransporte,
                rodamiento: rodamiento,
                aux_movilidad: auxMovilidad,
                bonificacion: bonificacion,
                jwt: jwtKey
            })
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            // Maneja otros posibles errores HTTP
            throw new Error('Error en la petición POST');
        }
    } catch (error) {
        console.error('Error en la petición HTTP POST:', error);
        // Considera mostrar el error al usuario de una forma que sea parte de tu UI
        throw error;
    }
}






// foto modal
// Obtén los elementos
var modal = document.getElementById("modal");
var img = document.getElementById("foto");
var modalImg = document.getElementById("img01");
var cerrar = document.getElementsByClassName("cerrar")[0];

// Al hacer clic en la imagen, se muestra el modal
img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
}

// Al hacer clic en (x), cierra el modal
cerrar.onclick = function () {
    modal.style.display = "none";
}
