import { urlBack } from "../../model/base.js";
import { aviso, avisoConfirmado } from "../../Avisos/avisos.js";
// Capturar el h1 del titulo y perfil
const titulo = document.querySelector('#username');
const perfil = document.querySelector('#perfil');
// Capturar el PERFIL y el USERNAME del local storage
const perfilLocal = localStorage.getItem("perfil");
const usernameLocal = localStorage.getItem("username");
const idUsuario = localStorage.getItem("idUsuario");

let input = document.getElementById('archivoInput');

//Muestra en la parte superior el nombre y el perfil
titulo.innerHTML = usernameLocal;
perfil.innerHTML = perfilLocal;


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

let responseData

let card = document.getElementById('card-container');
if (card) {
    let datos = await obtenerDatosPublicaciones();
    renderCards(datos);
    
}

async function obtenerDatosPublicaciones() {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = urlBack.url + '/Marketing/VertodosLosregistros';

    try {
        const response = await fetch(urlcompleta, {
            method: 'GET',
            headers: headers,
        });

        if (response.ok) {
            responseData = await response.json();
            console.log(responseData);
            return responseData;
        } else {
            throw new Error('Error en la petición GET');
        }
    } catch (error) {
        //aviso("No hay publicaciones", "warning");

        console.error('Error en la petición HTTP GET');
        console.error(error);
        throw error; // Propaga el error para que se pueda manejar fuera de la función
    }

}

async function publicidadId(id) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = urlBack.url + '/Marketing/traerRegistro/' + id;

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

function crearPublicidad(nombredelapublicacion, linkdelapublicacion, imagenenbase, redsocial, estadopublicacion, numerodevistaspublicacion, numerodemegusta, numerodecompartidos, comentariAdicional, cantidaddecomentarios) {

    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtToken = obj.jwt;
    console.log(jwtToken);

    const urlcompleta = urlBack.url + '/Marketing/CrearRegistroMarketing';
    try {
        fetch(urlcompleta, {
            method: 'POST',
            body:
                JSON.stringify({
                    nombredelapublicacion: nombredelapublicacion,
                    linkdelapublicacion: linkdelapublicacion,
                    imagenenbase: imagenenbase,
                    redsocial: redsocial,
                    estadopublicacion: estadopublicacion,
                    numerodevistaspublicacion: numerodevistaspublicacion,
                    numerodemegusta: numerodemegusta,
                    numerodecompartidos: numerodecompartidos,
                    cantidaddecomentarios: cantidaddecomentarios,
                    comentariAdicional: comentariAdicional,
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

function modificarP(id, nombredelapublicacion, linkdelapublicacion, valores, estadopublicacion, numerodevistaspublicacion, numerodemegusta, numerodecompartidos, cantidaddecomentarios, comentariAdicional) {

    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtToken = obj.jwt;
    console.log(jwtToken);

    const urlcompleta = urlBack.url + '/Marketing/editarRegistroMarketing/' + id;
    try {
        fetch(urlcompleta, {
            method: 'POST',
            body:
                JSON.stringify({
                    nombredelapublicacion: nombredelapublicacion,
                    linkdelapublicacion: linkdelapublicacion,
                    estadopublicacion: estadopublicacion,
                    numerodevistaspublicacion: numerodevistaspublicacion,
                    numerodemegusta: numerodemegusta,
                    numerodecompartidos: numerodecompartidos,
                    cantidaddecomentarios: cantidaddecomentarios,
                    comentariAdicional: comentariAdicional,
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

function renderCards(data) {
    const container = document.getElementById('card-container');

    data.marketing.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const image = new Image();
        image.src = `data:image/jpeg;base64,${item.imagenenbase}`;
        image.alt = "Imagen Descriptiva";
        image.classList.add('card-img-top');

        image.addEventListener('click', () => {
            showImage(image.src);
        });

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.innerHTML = `
            <p class="card-text">
                <strong>Nombre de la Publicación:</strong> ${item.nombredelapublicacion}<br>
                <strong>ID:</strong> ${item.id}<br>
                <strong>Quién Publicó el Reporte:</strong> ${item.quienpublicoelreporte}<br>
                <strong>Fecha de Subida:</strong> ${item.fechadesubida}<br>
                <strong>Número de Me gusta:</strong> ${item.numerodemegusta}<br>
                <strong>Link de la Publicación:</strong> <a href="${item.linkdelapublicacion}" target="_blank">Ver Publicación</a><br>
                <strong>Red Social:</strong> ${item.redsocial}
            </p>
        `;

        card.appendChild(image);
        card.appendChild(cardBody);
        container.appendChild(card);
    });
}

function showImage(src) {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.innerHTML = `<img src="${src}" style="max-width: 90%; max-height: 90%;" />`;

    overlay.addEventListener('click', () => {
        overlay.remove();
    });

    document.body.appendChild(overlay);
}


let botonC = document.getElementById("botonC");

// si select existe hacere esto
if (botonC) {
    botonC.addEventListener('click', function () {
        // Variables para los elementos con sus respectivos id

        let imagen = document.getElementById("imagen");



        let checkboxes = document.querySelectorAll('.control-group input[type="checkbox"]');

        // Inicializa una cadena vacía para almacenar los valores marcados
        let valoresMarcados = '';

        // Itera sobre las casillas de verificación
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                // Si la casilla de verificación está marcada, agrega su valor a la cadena
                valoresMarcados += checkbox.parentNode.textContent.trim() + ', ';
            }
        });

        // Elimina la coma y el espacio finales si existen
        if (valoresMarcados.endsWith(', ')) {
            valoresMarcados = valoresMarcados.slice(0, -2);
        }

        const archivo = imagen.files[0]; // Obtiene el archivo de imagen seleccionado
        let imagenBase64 = null;

        if (archivo) {
            const lector = new FileReader();

            // Configura el manejador de carga para el lector
            lector.onload = function (evento) {
                imagenBase64 = evento.target.result; // Obtiene la imagen en base64

                // Elimina el encabezado "data:image/png;base64," para obtener solo la parte de la cadena en base64
                const partes = imagenBase64.split(',');
                if (partes.length === 2) {
                    imagenBase64 = partes[1];
                }

                // Continúa con tu lógica aquí, por ejemplo, mostrar la imagen en un elemento HTML
                const imgElement = document.createElement('img');
                imgElement.src = 'data:image/png;base64,' + imagenBase64; // Agrega el encabezado nuevamente
                document.body.appendChild(imgElement);
                // margen izquierda de la imagen
                imgElement.style.marginLeft = "700px";

                // Llama a una función que contenga el resto de tu lógica
                procesarDatos(imagenBase64, valoresMarcados);
            };

            // Lee el archivo como una cadena en base64
            lector.readAsDataURL(archivo);
        }

    });
}

async function procesarDatos(imagenBase64, valoresMarcados) {
    let tituloP = document.getElementById("tituloP");
    let linkP = document.getElementById("LinkP");
    let estado = document.getElementById("estado");
    let NumV = document.getElementById("NumV");
    let NumL = document.getElementById("NumL");
    let NumC = document.getElementById("NumC");
    let Comentario = document.getElementById("Comentario");
    let NumCo = document.getElementById("NumCo");

    // ningun campo vacio
    if (tituloP.value == "" || linkP.value == "" || estado.value == "" || NumV.value == "" || NumL.value == "" || NumC.value == "" || imagenBase64 == "" || valoresMarcados == "") {
        aviso("Por favor llene todos los campos", "warning");
        return;
    }

    // console log de todos separados por titulo y valor
    console.log(tituloP.value);
    console.log(linkP.value);
    console.log(estado.value);
    console.log(NumV.value);
    console.log(NumL.value);
    console.log(NumC.value);
    console.log(imagenBase64);
    console.log(valoresMarcados);

    // crear publicidad
    crearPublicidad(tituloP.value, linkP.value, imagenBase64, valoresMarcados, estado.value, NumV.value, NumL.value, NumC.value, Comentario.value, NumCo.value);
    let confirmado = await avisoConfirmado("Se ha creado la vacante exitosamente", "success");
    if (confirmado) {
        window.location.href = "publicidad.html";
    }


}

let botonEb = document.getElementById("botonEb");

if (botonEb) {

    botonEb.addEventListener('click', async function () {
        let id = document.getElementById("id");
        let aux = await publicidadId(id.value);
        let vacante = aux.marketing[0];

        // si aux.mensaje es error, mostrar una cadena vacía en su lugar
        if (aux.message == "error") {
            aviso("No se encontre la publicidad con ese id", "warning");
            return;
        }
        let valoresMarcados = '';

        /*let checkboxes = document.querySelectorAll('.control-group input[type="checkbox"]');
 
        // Inicializa una cadena vacía para almacenar los valores marcados
 
        // Itera sobre las casillas de verificación
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                // Si la casilla de verificación está marcada, agrega su valor a la cadena
                valoresMarcados += checkbox.parentNode.textContent.trim() + ', ';
            }
        });
 
        // Elimina la coma y el espacio finales si existen
        if (valoresMarcados.endsWith(', ')) {
            valoresMarcados = valoresMarcados.slice(0, -2);
        }*/

        let tituloP = document.getElementById("tituloP");
        let linkP = document.getElementById("LinkP");
        let estado = document.getElementById("estado");
        let NumV = document.getElementById("NumV");
        let NumL = document.getElementById("NumL");
        let NumC = document.getElementById("NumC");
        let Comentario = document.getElementById("Comentario");
        let NumCo = document.getElementById("NumCo");
        //let group = document.getElementById("group");


        // PONER VISIBILIDAD DE BOTONES
        botonEb.style.display = "none";

        tituloP.style.display = "inline-block";
        linkP.style.display = "inline-block";
        estado.style.display = "inline-block";
        NumV.style.display = "inline-block";
        NumL.style.display = "inline-block";
        NumC.style.display = "inline-block";
        Comentario.style.display = "inline-block";
        NumCo.style.display = "inline-block";
        //group.style.display = "inline-block";
        botonE.style.display = "inline-block";

        // LLENAR PLACEHOLDER CON AUX segun el id
        tituloP.value = vacante.nombredelapublicacion;
        linkP.value = vacante.linkdelapublicacion;
        estado.value = vacante.estadopublicacion;
        NumV.value = vacante.numerodevistaspublicacion;
        NumL.value = vacante.numerodemegusta;
        NumC.value = vacante.numerodecompartidos;
        Comentario.value = vacante.comentariAdicional;
        NumCo.value = vacante.cantidaddecomentarios;

        //const redesSocialesSeleccionadas = vacante.redsocial.split(',').map(item => item.trim()); // Divide la cadena y elimina espacios
        /*console.log(redesSocialesSeleccionadas);
 
        checkboxes.forEach(function (checkbox) {
            if (redesSocialesSeleccionadas.includes(checkbox.parentNode.textContent.trim())) {
                checkbox.checked = true;
            }
        }
        );*/


        botonE.addEventListener('click', async function () {
            let id = document.getElementById("id");
            console.log("-------------------------------------------------------");
            console.log(id.value);
            console.log(tituloP.value);
            console.log(linkP.value);
            console.log(estado.value);
            console.log(NumV.value);
            console.log(NumL.value);
            console.log(NumC.value);
            console.log(Comentario.value);
            console.log(NumCo.value);
            console.log(valoresMarcados);
            modificarP(id.value, tituloP.value, linkP.value, valoresMarcados, estado.value, NumV.value, NumL.value, NumC.value, NumCo.value, Comentario.value);
            let confirmado = await avisoConfirmado("Se ha modificado la vacante exitosamente", "success");
            if (confirmado) {
                window.location.href = "publicidad.html";
            }

        }
        );



    }
    );
}


async function EliminarEm(id) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtToken = obj.jwt;

    const urlcompleta = urlBack.url + '/Marketing/eliminarRegistroMarketing/' + id;
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
                if (responseData.message == "error") {
                    //aviso("No se ha podido eliminar el empleado con cédula: " + cedulaEmpleado, "warning");
                }
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

let botonELI = document.getElementById("botonELI");

if (botonELI) {
    console.log("hola");
    botonELI.addEventListener('click', async function () {
        console.log("hola2");

        let id = document.getElementById("id");
        EliminarEm(id.value);
        let confirmado = await avisoConfirmado("Se ha eliminado la vacante exitosamente", "success");
        if (confirmado) {
            window.location.href = "publicidad.html";
        }
    });
}



