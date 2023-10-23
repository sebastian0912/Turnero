import { urlBack } from "../../model/base.js";
import { aviso } from "../../Avisos/avisos.js";
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

let graficas = document.getElementById("estadisticas");

if (perfilLocal == "GERENCIA") {
    graficas.style.display = "block";
}

let responseData

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
        renderCards(responseData);  // Llama a la función renderCards con responseData como argumento

        console.log(responseData);
    } else {
        throw new Error('Error en la petición GET');
    }
} catch (error) {
    //aviso("No hay publicaciones", "warning");

    console.error('Error en la petición HTTP GET');
    console.error(error);
    throw error; // Propaga el error para que se pueda manejar fuera de la función
}

async function vancanteId(id) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = urlBack.url + '/publicacion/publicaciones/' + id;

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

function crearVacante(Cargovacante_id, quienpublicolavacante, Localizaciondelavacante,
    localizacionDeLaPersona, Pruebatecnica, fechadePruebatecnica, horadePruebatecnica,
    fechadeIngreso, experiencia, numeroDeGenteRequerida, observacionVacante, empresaQueSolicita_id) {

    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtToken = obj.jwt;
    console.log(jwtToken);

    const urlcompleta = urlBack.url + '/publicacion/crearVacante';
    try {
        fetch(urlcompleta, {
            method: 'POST',
            body:
                JSON.stringify({
                    Cargovacante: Cargovacante_id,
                    quienpublicolavacante: quienpublicolavacante,
                    Localizaciondelavacante: Localizaciondelavacante,
                    localizacionDeLaPersona: localizacionDeLaPersona,
                    Pruebatecnica: Pruebatecnica,
                    fechadePruebatecnica: fechadePruebatecnica,
                    horadepruebatecnica: horadePruebatecnica,
                    fechadeingreso: fechadeIngreso,
                    experiencia: experiencia,
                    numeroDeGenteRequerida: numeroDeGenteRequerida,
                    observacionVacante: observacionVacante,
                    empresaQueSolicita: empresaQueSolicita_id,
                    Observaciones: "",

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

function modificarV(id, Cargovacante_id, quienpublicolavacante, Localizaciondelavacante,
    localizacionDeLaPersona, Pruebatecnica, fechadePruebatecnica, horadePruebatecnica,
    fechadeIngreso, experiencia, numeroDeGenteRequerida, observacionVacante, empresaQueSolicita_id) {

    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtToken = obj.jwt;
    console.log(jwtToken);

    const urlcompleta = urlBack.url + '/publicacion/editarVacante/' + id;
    try {
        fetch(urlcompleta, {
            method: 'POST',
            body:
                JSON.stringify({
                    Cargovacante: Cargovacante_id,
                    quienpublicolavacante: quienpublicolavacante,
                    Localizaciondelavacante: Localizaciondelavacante,
                    localizacionDeLaPersona: localizacionDeLaPersona,
                    Pruebatecnica: Pruebatecnica,
                    fechadePruebatecnica: fechadePruebatecnica,
                    horadepruebatecnica: horadePruebatecnica,
                    fechadeingreso: fechadeIngreso,
                    experiencia: experiencia,
                    numeroDeGenteRequerida: numeroDeGenteRequerida,
                    observacionVacante: observacionVacante,
                    empresaQueSolicita: empresaQueSolicita_id,
                    Observaciones: "",

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








/*
let Lcargos = await cargos();
console.log(Lcargos.publicacion);
let aux = Lcargos.publicacion;

// ordenar los cargos por orden alfabetico
aux.sort(function (a, b) {
    if (a.nombre > b.nombre) {
        return 1;
    }
    if (a.nombre < b.nombre) {
        return -1;
    }
    // a must be equal to b
    return 0;
});


let select = document.getElementById("tipoCargo");
let botonC = document.getElementById("botonC");

// si select existe hacere esto
if (select && botonC) {

    for (let i = 0; i < aux.length; i++) {
        let option = document.createElement("option");
        option.text = aux[i].nombredelavacante;
        option.value = aux[i].nombredelavacante;
        select.appendChild(option);
    }

    // agregar opcion otro al inicio
    let option = document.createElement("option");
    option.text = "Otro";
    option.value = "Otro";
    select.appendChild(option);

    // if select otro, mostrar input y borrando el valor del select
    select.addEventListener('change', function () {
        if (select.value == "Otro") {
            otroCargo.style.display = "inline-block";
        } else {
            otroCargo.style.display = "none";
            otroCargo.value = "";
        }
    });

    let empresaUsuaria = document.getElementById("empresaUsuaria");
    // if select otro, mostrar input y borrando el valor del select
    empresaUsuaria.addEventListener('change', function () {
        if (empresaUsuaria.value == "OTRO") {
            otraEmpresa.style.display = "inline-block";
        } else {
            otraEmpresa.style.display = "none";
            otraEmpresa.value = "";
        }
    });

    let pruebaTecnica = document.getElementById("pruebaTecnica");
    // si selecciona si, mostrar fecha prueba y hora prueba
    pruebaTecnica.addEventListener('change', function () {
        if (pruebaTecnica.value == "Si") {
            fechaPrueba.style.display = "inline-block";
            horaPrueba.style.display = "inline-block";
        } else {
            fechaPrueba.style.display = "none";
            horaPrueba.style.display = "none";
            fechaPrueba.value = "";
            horaPrueba.value = "";
        }
    });

    let FechaIngreso = document.getElementById("FechaIngreso");

    // si selecciona si, mostrar fecha prueba y hora prueba
    FechaIngreso.addEventListener('change', function () {
        if (FechaIngreso.value == "Si") {
            fechaIngreso.style.display = "inline-block";
        } else {
            fechaIngreso.style.display = "none";
            fechaIngreso.value = "";
        }
    });

    let zonaReq = document.getElementById("zonaReq");
    // Si OTRO, mostrar input
    zonaReq.addEventListener('change', function () {
        if (zonaReq.value == "OTRO") {
            otraZona.style.display = "inline-block";
        } else {
            otraZona.style.display = "none";
            otraZona.value = "";
        }
    }
    );

    botonC.addEventListener('click', async function () {
        // Variables para los elementos con sus respectivos id
        let tipoCargo = document.getElementById("tipoCargo");
        let otroCargo = document.getElementById("otroCargo");
        let empresaUsuaria = document.getElementById("empresaUsuaria");
        let otraEmpresa = document.getElementById("otraEmpresa");
        let zonaReq = document.getElementById("zonaReq");
        let otraZona = document.getElementById("otraZona");
        let pruebaTecnica = document.getElementById("pruebaTecnica");
        let fechaPrueba = document.getElementById("fechaPrueba");
        let horaPrueba = document.getElementById("horaPrueba");
        let FechaIngreso = document.getElementById("FechaIngreso");
        let fechaIngreso = document.getElementById("fechaIngreso");
        let experiencia = document.getElementById("experiencia");
        let numPersonas = document.getElementById("numPersonas");
        let observaciones = document.getElementById("observaciones");
        let empresaS = document.getElementById("empresaS");

        // otroCargo no esta vacio
        if (otroCargo.value != "") {
            tipoCargo.value = otroCargo.value;
        }

        // otraEmpresa no esta vacio
        if (otraEmpresa.value != "") {
            empresaUsuaria.value = otraEmpresa.value;
        }

        // otraZona no esta vacio
        if (otraZona.value != "") {
            zonaReq.value = otraZona.value;
        }

        let prueba;
        // si selecciona no en prueba tecnica, borrar fecha y hora
        if (pruebaTecnica.value == "No") {
            fechaPrueba.value = null;
            horaPrueba.value = null;
            prueba = false;
        }
        else {
            prueba = true;
        }

        // si selecciona no en FechaIngreso, borrar fecha
        if (FechaIngreso.value == "No") {
            fechaIngreso.value = null;
        }

        console.log(tipoCargo.value, usernameLocal, empresaUsuaria.value, zonaReq.value, prueba, fechaPrueba.value, horaPrueba.value, FechaIngreso.value, experiencia.value, numPersonas.value, observaciones.value);
        //crearVacante(tipoCargo.value, idUsuario, empresaUsuaria.value, zonaReq.value, pruebaTecnica, fechaPrueba.value, horaPrueba.value, FechaIngreso.value, experiencia.value, numPersonas.value, observaciones.value, empresaS.value);
        aviso("Se ha creado la vacante exitosamente", "success");

    });
}

let botonEb = document.getElementById("botonEb");

if (botonEb) {

    botonEb.addEventListener('click', async function () {
        let id = document.getElementById("id");
        let aux = await vancanteId(id.value);
        let vacante = aux.publicacion[0];

        // si aux.mensaje es error, mostrar una cadena vacía en su lugar
        if (aux.message == "error") {
            aviso("No se encontro la vacante", "warning");
            return;
        }

        let Lcargos = await cargos();
        let aux2L = Lcargos.publicacion;
        console.log(aux2L);

        for (let i = 0; i < aux2L.length; i++) {
            let option = document.createElement("option");
            option.text = aux2L[i].nombredelavacante;
            option.value = aux2L[i].nombredelavacante;
            select.appendChild(option);
        }

        // agregar opcion otro al inicio
        let option = document.createElement("option");
        option.text = "Otro";
        option.value = "Otro";
        select.appendChild(option);

        // if select otro, mostrar input y borrando el valor del select
        select.addEventListener('change', function () {
            if (select.value == "Otro") {
                otroCargo.style.display = "inline-block";
            } else {
                otroCargo.style.display = "none";
                otroCargo.value = "";
            }
        });

        let empresaUsuaria = document.getElementById("empresaUsuaria");
        // if select otro, mostrar input y borrando el valor del select
        empresaUsuaria.addEventListener('change', function () {
            if (empresaUsuaria.value == "OTRO") {
                otraEmpresa.style.display = "inline-block";
            } else {
                otraEmpresa.style.display = "none";
                otraEmpresa.value = "";
            }
        });

        let pruebaTecnica = document.getElementById("pruebaTecnica");
        // si selecciona si, mostrar fecha prueba y hora prueba
        pruebaTecnica.addEventListener('change', function () {
            if (pruebaTecnica.value == "Si") {
                fechaPrueba.style.display = "inline-block";
                horaPrueba.style.display = "inline-block";
            } else {
                fechaPrueba.style.display = "none";
                horaPrueba.style.display = "none";
                fechaPrueba.value = "";
                horaPrueba.value = "";
            }
        });

        let FechaIngreso = document.getElementById("FechaIngreso");

        // si selecciona si, mostrar fecha prueba y hora prueba
        FechaIngreso.addEventListener('change', function () {
            if (FechaIngreso.value == "Si") {
                fechaIngreso.style.display = "inline-block";
            } else {
                fechaIngreso.style.display = "none";
                fechaIngreso.value = "";
            }
        });

        let zonaReq = document.getElementById("zonaReq");
        // Si OTRO, mostrar input
        zonaReq.addEventListener('change', function () {
            if (zonaReq.value == "OTRO") {
                otraZona.style.display = "inline-block";
            } else {
                otraZona.style.display = "none";
                otraZona.value = "";
            }
        }
        );

        // Variables para los elementos con sus respectivos id
        let tipoCargo = document.getElementById("tipoCargo");
        let otroCargo = document.getElementById("otroCargo");
        let otraEmpresa = document.getElementById("otraEmpresa");
        let otraZona = document.getElementById("otraZona");
        let fechaPrueba = document.getElementById("fechaPrueba");
        let horaPrueba = document.getElementById("horaPrueba");
        let fechaIngreso = document.getElementById("fechaIngreso");
        let experiencia = document.getElementById("experiencia");
        let numPersonas = document.getElementById("numPersonas");
        let observaciones = document.getElementById("observaciones");
        let empresaS = document.getElementById("empresaS");

        // PONER VISIBILIDAD DE BOTONES
        botonEb.style.display = "none";
        botonE.style.display = "inline-block";
        tipoCargo.style.display = "inline-block";
        empresaUsuaria.style.display = "inline-block";
        zonaReq.style.display = "inline-block";
        pruebaTecnica.style.display = "inline-block";
        FechaIngreso.style.display = "inline-block";
        experiencia.style.display = "inline-block";
        numPersonas.style.display = "inline-block";
        observaciones.style.display = "inline-block";
        empresaS.style.display = "inline-block";

        let auxFechaI = "Si";
        let auxPruebaT = 'Si';

        if (vacante.fechadeIngreso == null) {
            auxFechaI = "No";
        }
        if (vacante.Pruebatecnica == false) {
            auxPruebaT = "No";
        }

        // LLENAR PLACEHOLDER CON AUX segun el id
        tipoCargo.value = vacante.Cargovacante_id;
        numPersonas.value = vacante.numeroDeGenteRequerida;
        observaciones.value = vacante.observacionVacante;
        empresaS.value = vacante.empresaQueSolicita_id;
        experiencia.value = vacante.experiencia;
        zonaReq.value = vacante.localizacionDeLaPersona;
        empresaUsuaria.value = vacante.Localizaciondelavacante;
        pruebaTecnica.value = auxPruebaT;
        FechaIngreso.value = auxFechaI;
        fechaPrueba.value = vacante.fechadePruebatecnica;
        horaPrueba.value = vacante.horadePruebatecnica;
        fechaIngreso.value = vacante.fechadeIngreso;

        if (auxPruebaT == "No") {
            auxPruebaT = false;
        }
        else {
            auxPruebaT = true;
        }

        botonE.addEventListener('click', async function () {
            modificarV(id.value, tipoCargo.value, idUsuario, empresaUsuaria.value, zonaReq.value, pruebaTecnica, fechaPrueba.value, horaPrueba.value, FechaIngreso.value, experiencia.value, numPersonas.value, observaciones.value, empresaS.value);
            aviso("Se ha modificado la vacante exitosamente", "success");
        }
        );



    }
    );
}


async function EliminarEm(id) {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtToken = obj.jwt;

    const urlcompleta = urlBack.url + '/publicacion/eliminarVacante/' + id;
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
        aviso("Se ha eliminado la vacante exitosamente", "success");
    });
}*/



