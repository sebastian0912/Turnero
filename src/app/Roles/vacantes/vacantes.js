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
    seleccion.style.display = "block";
    contratacion.style.display = "block";
}
if (usernameLocal == "HEIDY TORRES") {
    formasDePago.style.display = "block";
}

let responseData
let card = document.getElementById('card-container');
if (card) {



    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = urlBack.url + '/publicacion/publicaciones';

    try {
        const response = await fetch(urlcompleta, {
            method: 'GET',
            headers: headers,
        });

        if (response.ok) {
            responseData = await response.json();
            renderCards(responseData);  // Llama a la función renderCards con responseData como argumento
        } else {
            throw new Error('Error en la petición GET');
        }
    } catch (error) {
        console.error('Error en la petición HTTP GET');
        console.error(error);
        throw error; // Propaga el error para que se pueda manejar fuera de la función
    }
}

async function cargos() {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = urlBack.url + '/publicacion/cargos';

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

function crearVacante(Cargovacante_id, CargovacanteOtros, Localizaciondelavacante, zonaquenoesta, empresaUsuaria, empresausuariaquenoesta, experiencia, Pruebatecnica, fechadePruebatecnica, horadePruebatecnica, fechadeIngreso, numeroDeGenteRequerida, observacionVacante, empresaQueSolicita_id) {

    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtToken = obj.jwt;
    console.log(jwtToken);

    console.log("fechadeIngreso: " + fechadeIngreso);
    console.log("fechadePruebatecnica: " + fechadePruebatecnica);

    const urlcompleta = urlBack.url + '/publicacion/crearVacante';
    try {
        fetch(urlcompleta, {
            method: 'POST',
            body:
                JSON.stringify({
                    Cargovacante: Cargovacante_id,
                    CargovacanteOtros: CargovacanteOtros,
                    Localizaciondelavacante: Localizaciondelavacante,
                    zonaquenoesta: zonaquenoesta,
                    localizacionDeLaPersona: empresaUsuaria,
                    empresausuariaquenoesta: empresausuariaquenoesta,

                    experiencia: experiencia,
                    Pruebatecnica: Pruebatecnica,
                    fechadePruebatecnica: fechadePruebatecnica,
                    horadepruebatecnica: horadePruebatecnica,
                    numeroDeGenteRequerida: numeroDeGenteRequerida,
                    Observaciones: observacionVacante,
                    empresaQueSolicita: empresaQueSolicita_id,

                    fechadeingreso: fechadeIngreso,


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

function modificarV(id, Localizaciondelavacante, empresaUsuaria, fechadeIngreso, numeroDeGenteRequerida) {

    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtToken = obj.jwt;
    console.log(jwtToken);

    let x = JSON.stringify({

        Localizaciondelavacante: Localizaciondelavacante,
        localizacionDeLaPersona: empresaUsuaria,

        numeroDeGenteRequerida: numeroDeGenteRequerida,

        fechadeIngreso: fechadeIngreso,

        jwt: jwtToken
    })

    // imprimir el json bonito
    console.log(JSON.stringify(JSON.parse(x), null, 2));
    const urlcompleta = urlBack.url + '/publicacion/editarVacante/' + id;
    try {
        fetch(urlcompleta, {
            method: 'POST',
            body:
                JSON.stringify({

                    Localizaciondelavacante: Localizaciondelavacante,
                    localizacionDeLaPersona: empresaUsuaria,

                    numeroDeGenteRequerida: numeroDeGenteRequerida,
                    fechadeIngreso: fechadeIngreso,

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

    data.publicacion.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');



        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        cardBody.innerHTML = `
            <p class="card-text">
                <strong>Id:</strong> ${item.id}<br>
                <strong>Cargo de la vacante:</strong> ${item.Cargovacante_id}<br>
                <strong>Quien publicó la vacante:</strong> ${item.quienpublicolavacante}<br>
                <strong>Fecha de ingreso :</strong> ${item.fechadeIngreso}<br>
                <strong>Fecha de Prueba Técnica:</strong> ${item.fechadePruebatecnica}<br>
                <strong>Localización de la vacante:</strong> ${item.Localizaciondelavacante}<br>
                <strong>Fecha Publicado:</strong> ${item.fechaPublicado}<br>
                <strong>Localización de la Persona:</strong> ${item.localizacionDeLaPersona}<br>
                <strong>Número de Gente Requerida:</strong> ${item.numeroDeGenteRequerida}<br>
                <strong>Prueba Técnica:</strong> ${item.Pruebatecnica}<br>
                <strong>Experiencia:</strong> ${item.experiencia}<br>
                <strong>Observación Vacante:</strong> ${item.observacionVacante}<br>
                <strong>Hora de Prueba Técnica:</strong> ${item.horadePruebatecnica}<br>            
            </p>
        `;
        card.appendChild(cardBody);
        container.appendChild(card);
    });
}


function ejecutarCodigo() {

    if (responseData.message == "error") {
        aviso("No se han encontrado vacantes", "warning");
        return true; // Indicamos que la condición se cumplió
    }

    responseData.publicacion.forEach(async (p) => {
        // Verificar si p.nombreQuienEntrego es null y mostrar una cadena vacía en su lugar

        // Insertar al principio de la tabla
        tabla.insertAdjacentHTML('afterbegin', `
            <tr>
                <td>${p.id}</td>
                <td>${p.Cargovacante_id}</td>
                <td>${p.quienpublicolavacante}</td>
                <td>${p.empresaQueSolicita_id}</td>
                <td>${p.fechadeIngreso}</td>
                <td>${p.fechadePruebatecnica}</td>
                <td>${p.Localizaciondelavacante}</td>
                <td>${p.fechaPublicado}</td>
                <td>${p.localizacionDeLaPersona}</td>
                <td>${p.numeroDeGenteRequerida}</td>
                <td>${p.Pruebatecnica}</td>
                <td>${p.experiencia}</td>
                <td>${p.observacionVacante}</td>
                <td>${p.Observaciones}</td>
                <td>${p.horadePruebatecnica}</td>            
            </tr>
        `);
    });


}


let tabla = document.getElementById("tabla");
if (tabla) {
    tabla.innerHTML = '';
    ejecutarCodigo();
}


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

    let FechaIngreso = document.getElementById("FechaIngreso");

    // si selecciona si, mostrar fecha prueba y hora prueba
    FechaIngreso.addEventListener('change', function () {
        if (FechaIngreso.value == "Si") {
            fechaIngresoHello.style.display = "inline-block";
        } else {
            fechaIngresoHello.style.display = "none";
            fechaIngresoHello.value = "";
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
        let fechaIngreso = document.getElementById("fechaIngresoHello");
        let experiencia = document.getElementById("experiencia");
        let numPersonas = document.getElementById("numPersonas");
        let observaciones = document.getElementById("observaciones");
        let empresaS = document.getElementById("empresaS");

        let auxFechaI;
        // si selecciona no en FechaIngreso, borrar fecha
        if (FechaIngreso.value == "No") {
            auxFechaI = "No aplica";
        }
        else {
            auxFechaI = fechaIngreso.value;
        }

        let auxPruebaT = true;


        console.log("tipoCargo: " + tipoCargo.value);
        console.log("empresaUsuaria: " + empresaUsuaria.value);
        console.log("zonaReq: " + zonaReq.value);
        //console.log("pruebaTecnica: " + prueba);    
        console.log("fechaPrueba: " + fechaPrueba.value);
        console.log("horaPrueba: " + horaPrueba.value);
        console.log("FechaIngreso: " + auxFechaI);
        console.log("Fecha ingreso 2: " + fechaIngreso.value);

        console.log("experiencia: " + experiencia.value);
        console.log("numPersonas: " + numPersonas.value);
        console.log("observaciones: " + observaciones.value);
        console.log("empresaS: " + empresaS.value);


        crearVacante(tipoCargo.value, otroCargo.value, zonaReq.value, otraZona.value, empresaUsuaria.value, otraEmpresa.value, experiencia.value, auxPruebaT, fechaPrueba.value, horaPrueba.value, auxFechaI, numPersonas.value, observaciones.value, empresaS.value);

        let confirmacion = await avisoConfirmado("Se ha creado la vacante exitosamente", "success");
        if (confirmacion) {
            // retornar a la pagina de vacantes
            window.location.href = "vacantes.html";
        }
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

        // Variables para los elementos con sus respectivos id

        let empresaUsuaria = document.getElementById("empresaUsuaria");
        let otraEmpresa = document.getElementById("otraEmpresa");

        let zonaReq = document.getElementById("zonaReq");
        let otraZona = document.getElementById("otraZona");

        let FechaIngreso = document.getElementById("FechaIngreso");
        let fechaIngreso = document.getElementById("fechaIngreso");
        let numPersonas = document.getElementById("numPersonas");

        let aux2L = Lcargos.publicacion;
        console.log(aux2L);

        // PONER VISIBILIDAD DE BOTONES
        botonEb.style.display = "none";
        botonE.style.display = "inline-block";
        empresaUsuaria.style.display = "inline-block";
        zonaReq.style.display = "inline-block";
        numPersonas.style.display = "inline-block";

        if (vacante.fechadeIngreso != "No aplica") {
            fechaIngreso.style.display = "inline-block";
            fechaIngreso.value = vacante.fechadeIngreso;
            FechaIngreso.value = "Si";
        }
        else {
            fechaIngreso.value = "No";
        }

        // if select otro, mostrar input y borrando el valor del select
        empresaUsuaria.addEventListener('change', function () {
            if (empresaUsuaria.value == "OTRO") {
                otraEmpresa.style.display = "inline-block";
            } else {
                otraEmpresa.style.display = "none";
                otraEmpresa.value = "";
            }
        });

        // si selecciona si, mostrar fecha prueba y hora prueba
        FechaIngreso.addEventListener('change', function () {
            if (FechaIngreso.value == "Si") {
                fechaIngreso.style.display = "inline-block";
            } else {
                fechaIngreso.style.display = "none";
                fechaIngreso.value = "";
            }
        });

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

        let auxFechaI;

        // si selecciona no en FechaIngreso, borrar fecha
        if (FechaIngreso.value == "No") {
            auxFechaI = "No";
        }
        else {
            auxFechaI = vacante.fechadeIngreso;
        }


        // LLENAR PLACEHOLDER CON AUX segun el id
        numPersonas.value = vacante.numeroDeGenteRequerida;
        zonaReq.value = vacante.localizacionDeLaPersona;
        empresaUsuaria.value = vacante.Localizaciondelavacante;
        fechaIngreso.value = vacante.fechadeIngreso;

        console.log("empresaUsuaria: " + empresaUsuaria.value);
        console.log("zonaReq: " + zonaReq.value);
        console.log("FechaIngreso: " + auxFechaI);
        console.log("Fecha ingreso 2: " + fechaIngreso.value);
        console.log("numPersonas: " + numPersonas.value);



        botonE.addEventListener('click', async function () {
            modificarV(id.value, zonaReq.value, empresaUsuaria.value, auxFechaI, numPersonas.value);
            let confirmacion = await avisoConfirmado("Se ha modificado la vacante exitosamente", "success");
            if (confirmacion) {
                // retornar a la pagina de vacantes
                window.location.href = "vacantes.html";
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
                    aviso("No se ha podido eliminar el empleado con cédula: " + cedulaEmpleado, "warning");
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
        let confirmacion = await avisoConfirmado("Se ha eliminado la vacante exitosamente", "success");
        if (confirmacion) {
            // retornar a la pagina de vacantes
            window.location.href = "vacantes.html";
        }
    });
}



