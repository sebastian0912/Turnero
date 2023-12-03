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


if (perfilLocal == "GERENCIA") {
    estadisticas.style.display = "block";
    vacantes.style.display = "block";
    publicidad.style.display = "block";
    //seleccion.style.display = "block";
    //contratacion.style.display = "block";
    ausentismos.style.display = "block";
}
if (usernameLocal == "HEIDY TORRES") {
    formasDePago.style.display = "block";
}

let responseData
let card = document.getElementById('card-container');

if (card) {
    let datos = await obtenerDatosVacantes();
    console.log(datos);
    renderCards(datos);  // Llama a la función renderCards con responseData como argumento
}

async function obtenerDatosVacantes() {
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

    let x = JSON.stringify({
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
    })

    console.log(JSON.stringify(JSON.parse(x), null, 2));
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
                aviso("Algo salio mal, por favor vuelva a intentarlo", "warning")
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

function obtenerInicioYFinDeSemana() {
    const ahora = new Date();
    const primerDia = ahora.getDate() - ahora.getDay() + (ahora.getDay() === 0 ? -6 : 1); // Ajuste para el primer día de la semana (lunes)
    const ultimoDia = primerDia + 6; // Último día de la semana (domingo)

    const inicioSemana = new Date(ahora.setDate(primerDia));
    inicioSemana.setHours(0, 0, 0, 0); // Comienzo del día

    const finSemana = new Date(ahora.setDate(ultimoDia));
    finSemana.setHours(23, 59, 59, 999); // Final del día

    return { inicioSemana, finSemana };
}

async function datosUsuarios() {
    var body = localStorage.getItem('key');
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;

    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = urlBack.url + '/usuarios/usuarios';

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

function nombre(datos, cedula) {
    let nombre = "";
    datos.forEach((usuario) => {
        if (usuario.numero_de_documento == cedula) {
            nombre = usuario.primer_nombre + " " + usuario.primer_apellido;
        }
    });
    return nombre;
}

function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}


// si le doy click a descargar, descargar el archivo en excel con los datos de la tabla
let descargar = document.getElementById("descargar");

descargar.addEventListener('click', async function () {
    let datosVacantes = await obtenerDatosVacantes(); // Asumiendo que esta función obtiene tus datos
    let datos2 = await datosUsuarios();

    if (!datosVacantes || datosVacantes.length === 0) {
        aviso("No se han encontrado datos de vacantes", "warning");
        return;
    }

    let excelData = [
        ['Cargo de la Vacante', 'Id', 'Quien Publicó la Vacante', 'Fecha de Ingreso', 'Fecha de Prueba Técnica', 'Localización de la Vacante', 'Fecha Publicado', 'Localización de la Persona', 'Número de Gente Requerida', 'Prueba Técnica', 'Experiencia', 'Observación Vacante', 'Hora de Prueba Técnica']
    ];

    datosVacantes.publicacion.forEach((item) => {
        // Asumiendo que tienes una función para obtener el nombre de la persona
        let nombrePersona = nombre(datos2, item.quienpublicolavacante);
        let pruebaTecnica = item.pruebaTecnica ? "Sí" : "No"; // Ajusta según tus datos
        // si la fecha de ingreso es null, mostrar no aplica
        if (item.fechadeIngreso == null) {
            item.fechadeIngreso = "No aplica";
        }

        excelData.push([
            item.Cargovacante_id || "",
            item.id || "",
            nombrePersona || "",
            item.fechaIngreso || "",
            item.fechadePruebatecnica || "",
            item.Localizaciondelavacante || "",
            item.fechaPublicado || "",
            item.localizacionDeLaPersona || "",
            item.numeroDeGenteRequerida || "",
            pruebaTecnica || "",
            item.experiencia || "",
            item.observacionVacante || "",
            item.horadePruebatecnica || ""
        ]);
    });

    // El resto del código para crear y descargar el Excel es igual
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos de Vacantes');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const element = document.createElement('a');
    element.href = url;
    element.download = 'datosVacantes.xlsx';
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
    URL.revokeObjectURL(url);
});


async function renderCards(data) {
    let datos2 = await datosUsuarios();

    const container = document.getElementById('card-container');

    const { inicioSemana, finSemana } = obtenerInicioYFinDeSemana();

    // Filtrar y eliminar publicaciones que no están en la semana actual
    data.publicacion = data.publicacion.filter(item => {
        const fechaPublicado = new Date(item.fechaPublicado);
        return fechaPublicado >= inicioSemana && fechaPublicado <= finSemana;
    });

    // Ordenar por fechaPublicado de más reciente a más antiguo
    data.publicacion.sort((a, b) => new Date(b.fechaPublicado) - new Date(a.fechaPublicado));

    // ordernar por id 
    data.publicacion.sort((a, b) => b.id - a.id);

    data.publicacion.forEach(item => {
        let nombrePersona = nombre(datos2, item.quienpublicolavacante);
        let fechaIngreso = item.fechadeIngreso;
        let pruebaTecnica = item.Pruebatecnica;


        if (fechaIngreso == null) {
            fechaIngreso = "No aplica";
        }
        // si es false, mostrar no
        if (pruebaTecnica == false) {
            pruebaTecnica = "No";
        }

        const card = document.createElement('div');
        card.classList.add('card');



        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        cardBody.innerHTML = `
            <p class="card-text">
                <strong>Cargo de la vacante:</strong> ${item.Cargovacante_id}<br>
                <strong>Id:</strong> ${item.id}<br>
                <strong>Quien publicó la vacante:</strong> ${nombrePersona}<br>
                <strong>Fecha de ingreso :</strong> ${fechaIngreso}<br>
                <strong>Fecha de Prueba Técnica:</strong> ${item.fechadePruebatecnica}<br>
                <strong>Localización de la vacante:</strong> ${item.Localizaciondelavacante}<br>
                <strong>Fecha Publicado:</strong> ${item.fechaPublicado}<br>
                <strong>Localización de la Persona:</strong> ${item.localizacionDeLaPersona}<br>
                <strong>Número de Gente Requerida:</strong> ${item.numeroDeGenteRequerida}<br>
                <strong>Prueba Técnica:</strong> ${pruebaTecnica}<br>
                <strong>Experiencia:</strong> ${item.experiencia}<br>
                <strong>Observación Vacante:</strong> ${item.observacionVacante}<br>
                <strong>Hora de Prueba Técnica:</strong> ${item.horadePruebatecnica}<br>            
            </p>
        `;
        card.appendChild(cardBody);
        container.appendChild(card);
    });
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

// Función para obtener los valores de los checkboxes
function obtenerValoresCheckboxes() {
    let valores = [];
    let checkboxes = checkboxesContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            valores.push(checkbox.parentNode.textContent.trim());
        }
    });
    return valores.join(", ");
}

// si select existe hacere esto
if (select && botonC) {

    const empresas = [
        "Empresa Usuaria",
        "7100 (YUNDAMA)",
        "7200 ARANDANOS (VALMAR)",
        "7210 (VALMAR)",
        "7211 (VALMAR)",
        "7219 (COMERCIAL/VALMAR)",
        "7220 (CURUBITAL)",
        "7243 (CURUBITAL)",
        "7300 (VALMAR)",
        "7312 (VALMAR)",
        "7315 GENÉTICA",
        "7930 (VALMAR)",
        "ADMINISTRACION CENTRAL",
        "ADMINISTRATIVO",
        "AGRÍCOLA CARDENAL",
        "AGRÍCOLA CARDENAL ROSAL",
        "ALEJANDRA",
        "AMANCAY",
        "APOYO FINCAS",
        "APOYO LABORAL TS",
        "APOYO POSTCOSECHAS",
        "BELCHITE 2, VIA NEMOCON",
        "BELCHITE II - VIA NEMOCON",
        "BIOCONTROLADORES",
        "BOUQUETS MIXTO",
        "CALAFATE",
        "CARNATION",
        "CASA DENTAL EDUARDO DAZA",
        "CHUSACA E.U.",
        "CFC CAFARCOL",
        "CIRCASIA",
        "COMERCIALIZADORA",
        "COMERCIALIZADORA TS",
        "DANIELA LEON MACHICADO",
        "DESARROLLO INVESTIGACIÓN DIVERSIFICADOS (DID)",
        "DISTRIHROM",
        "EL COLEGIO",
        "EL HATO",
        "EL RESPIRO",
        "EL ROSAL",
        "EL REBAÑO",
        "ELITE GERBERAS",
        "EMBOTELLADORA DE AGUA POTABLE",
        "ENVIOS LOS REYES SAS",
        "ESTADISTICA",
        "ESTADISTICA MERCEDES",
        "ESTADISTICA VALENTINO",
        "ESTUDIO ECOTECH S.A.S",
        "EXCELLENCE BELCHITE, VIA NEMOCON",
        "EXCELLENCE ESTADISTICA",
        "EXCELLENCE FLOWERS POZO AZUL",
        "EXPOWONDER VEREDA SAN RAFAEL, FINCA EL CEREZO",
        "FANTASY CULTIVO",
        "FANTASY ESTADISTICA",
        "FANTASY GESTION HUMANA",
        "FLOREX",
        "FLOREX 1",
        "FLOREX 2",
        "FLOREX 3",
        "FLORES DE LOS ANDES",
        "FLORES DEL RIO",
        "FRUITSFULL",
        "FUNDACION FERNANDO BORRERO CAICEDO",
        "GUACARI",
        "GUAYMARAL 'N-O'",
        "GUAYMARAL 'PRINCIPAL'",
        "GUENSUCA",
        "GYPSOPHILA",
        "HMVE",
        "JARDINES DE COLOMBIA",
        "JARDINES DE LOS ANDES",
        "LABORATORIO",
        "LABORATORIO INVITRO PROPAGACIÓN",
        "LA ALBORADA",
        "LA ESMERALDA",
        "LA MACARENA",
        "LA MONTAÑA",
        "LA NENA",
        "LA VALENTINA",
        "LAS DELICIAS",
        "LAS MARGARITAS",
        "LAS MERCEDES",
        "LAS PALMAS",
        "LUZAMA",
        "MANTENIMIENTO",
        "MANTENIMIENTO PSV",
        "MANTENIMIENTO SAN VALENTINO",
        "MARIBEL BALLESTEROS",
        "MARLY",
        "MARLY 1",
        "MIPE SALAS",
        "MONTEVERDE",
        "MORADO",
        "NORMANDIA",
        "NUEVO MANTENIMIENTO",
        "NUEVO MANTENIMIENTO DIVERSIFICADOS",
        "ORNATOS",
        "PALMAS",
        "POMPOM",
        "POSTCOSECHA ASTROMELIA",
        "POSTCOSECHA CARNATION",
        "POSTCOSECHA EL ROSAL",
        "POSTCOSECHA EXCELLENCE",
        "POSTCOSECHA FANTASY",
        "POSTCOSECHA FLOREX",
        "POSTCOSECHA GERBERAS",
        "POSTCOSECHA GUACARI",
        "POSTCOSECHA GYPSOPHILA",
        "POSTCOSECHA JARDINES",
        "POSTCOSECHA LAS MARGARITAS",
        "POSTCOSECHA LAS PALMAS",
        "POSTCOSECHA MORADO",
        "POSTCOSECHA ROSAS COLOMBIANAS",
        "POSTCOSECHA SANTA CATALINA",
        "POSTCOSECHA SANTA MARIA",
        "POSTCOSECHA SANTA MARIA SIGNATURE",
        "POSTCOSECHA VALDAYA",
        "POSTCOSECHA VISTA FARMS",
        "PROPAGADORA ALSTROEMERIA",
        "PROPAGADORA CARNATION",
        "PROPAGADORA CONFINAMIENTO POMPOM",
        "PROPAGADORA HYPERPHHBAN",
        "PROPAGADORA JARDINES",
        "PROPAGADORA PLANTAS MADRE CLAVEL",
        "PROPAGADORA PLANTAS ROSA FLOREX",
        "PUNTO LA PAZ",
        "ROSAS COLOMBIANAS",
        "SAN CARLOS",
        "SAN JUAN",
        "SAN MATEO",
        "SAN PEDRO",
        "SAN PEDRO1",
        "SAN VALENTINO",
        "SEVILLA",
        "SÁGARO",
        "SANTA MARIA",
        "TINZUQUE",
        "TIKIYA",
        "TESORO",
        "TITANIUM CHIA",
        "TITANIUM MADRID",
        "TRABAJO SUELOS",
        "TURFLOR MOSQUERA",
        "TU AFILIACIÓN",
        "TU ALIANZA",
        "ULTRASEGUROS",
        "VALDAYA",
        "VALENTINO ADMINISTRACION CENT",
        "VALMAR",
        "VENTAS",
        "VISTA FARMS",
        "WAYUU GUASCA, CUNDINAMARCA",
        "WAYUU SUESCA, CUNDINAMARCA",
        "OTRO"
    ];

    let empresaUsuaria = document.getElementById("empresaUsuaria");

    const opciones = [
        { value: "FACA_PRINCIPAL", label: "FACATATIVA" },
        { value: "ROSAL", label: "ROSAL" },
        { value: "CARTAGENITA", label: "CARTAGENITA" },
        { value: "MADRID", label: "MADRID" },
        { value: "FUNZA", label: "FUNZA" },
        { value: "SOACHA", label: "SOACHA" },
        { value: "FONTIBÓN", label: "FONTIBÓN" },
        { value: "SUBA", label: "SUBA" },
        { value: "TOCANCIPÁ", label: "TOCANCIPÁ" },
        { value: "BOSA", label: "BOSA" },
        { value: "BOGOTÁ", label: "BOGOTÁ" },
        { value: "OTRO", label: "OTRA" }
    ];

    const zonaReq = document.getElementById('checkboxesContainer');
    const otraZona = document.getElementById('otraZona');

    opciones.forEach(opcion => {
        const label = document.createElement('label');
        label.classList.add('control', 'control-checkbox');
        label.style.maxWidth = '250px';
        label.textContent = opcion.label;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = opcion.value;

        // Agregar un controlador de eventos para cada checkbox
        checkbox.addEventListener('change', () => {
            // Verificar si el checkbox seleccionado es "Otro"
            if (checkbox.value === 'OTRA' && checkbox.checked) {
                // Mostrar el campo otraZona
                otraZona.style.display = 'inline-block';
            } else if (checkbox.value === 'OTRA' && !checkbox.checked) {
                // Esconder el campo otraZona
                otraZona.style.display = 'none';
            }
        });

        const indicator = document.createElement('div');
        indicator.classList.add('control_indicator');

        label.appendChild(checkbox);
        label.appendChild(indicator);

        zonaReq.appendChild(label);
    });

    empresas.forEach(empresa => {
        const option = document.createElement('option');
        option.value = empresa;
        empresaUsuaria.appendChild(option);
    });

    for (let i = 0; i < aux.length; i++) {
        let option = document.createElement("option");
        option.text = aux[i].nombredelavacante;
        option.value = aux[i].nombredelavacante;
        select.appendChild(option);
    }

    // Añadir otro a select
    let option = document.createElement("option");
    option.text = "OTRO";
    option.value = "OTRO";
    select.appendChild(option);

    // si select es OTRO, mostrar input y borrando el valor del select
    inputCargo.addEventListener('input', function () {
        if (inputCargo.value === 'OTRO') {
            otroCargo.style.display = 'inline-block';
        } else {
            otroCargo.style.display = 'none';
        }
    });

    // si empresaUsuaria es OTRO, mostrar input y borrando el valor del select
    inputEmpresa.addEventListener('input', function () {
        if (inputEmpresa.value === 'OTRO') {
            otraEmpresa.style.display = 'inline-block';
        } else {
            otraEmpresa.style.display = 'none';
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

    // SI PRUEBA TECNICA, mostrar fecha prueba y hora prueba
    pruebaT.addEventListener('change', function () {
        if (pruebaT.value == "Si") {
            fechaPrueba.style.display = "block";
            horaPrueba.style.display = "block";
            tite.style.display = "block";
        } else {
            fechaPrueba.style.display = "none";
            horaPrueba.style.display = "none";
            tite.style.display = "none";
            fechaPrueba.value = "";
            horaPrueba.value = "";
        }
    });

    botonC.addEventListener('click', async function () {
        // Variables para los elementos con sus respectivos id
        let empresaS = document.getElementById("empresaS");
        let inputCargo = document.getElementById("inputCargo");
        let otroCargo = document.getElementById("otroCargo");
        let inputEmpresa = document.getElementById("inputEmpresa");
        let otraEmpresa = document.getElementById("otraEmpresa");
        let checkboxesContainer = document.getElementById("checkboxesContainer");
        let otraZona = document.getElementById("otraZona");
        let pruebaT = document.getElementById("pruebaT");
        let fechaPrueba = document.getElementById("fechaPrueba");
        let horaPrueba = document.getElementById("horaPrueba");
        let FechaIngreso = document.getElementById("FechaIngreso");
        let fechaIngresoHello = document.getElementById("fechaIngresoHello");
        let experiencia = document.getElementById("experiencia");
        let numPersonas = document.getElementById("numPersonas");
        let observaciones = document.getElementById("observaciones");

        let auxFechaI;
        // si selecciona no en FechaIngreso, borrar fecha
        if (FechaIngreso.value == "No") {
            auxFechaI = "No aplica";
        }
        else {
            auxFechaI = FechaIngreso.value;
        }
        let auxPruebaT;
        if (pruebaT == "Si") {
            auxPruebaT = true;
        }
        else {
            auxPruebaT = false;
        }


        console.log("Empresa que solicita: " + empresaS.value);
        console.log("Cargo que necesita: " + inputCargo.value);
        console.log("Otro Cargo: " + otroCargo.value);
        console.log("Empresa usuaria: " + inputEmpresa.value);
        console.log("Otra Empresa: " + otraEmpresa.value);
        // Para los checkboxes, necesitarás iterar sobre ellos si quieres obtener sus valores
        console.log("Oficina quien puede contratar: " + obtenerValoresCheckboxes());
        console.log("Otra Zona: " + otraZona.value);
        console.log("Prueba técnica: " + pruebaT.value);
        console.log("Fecha prueba técnica: " + fechaPrueba.value);
        console.log("Hora prueba técnica: " + horaPrueba.value);
        console.log("Tiene fecha de Ingreso: " + FechaIngreso.value);
        console.log("Fecha de Ingreso: " + fechaIngresoHello.value);
        console.log("Requiere Experiencia: " + experiencia.value);
        console.log("Número de Personas: " + numPersonas.value);
        console.log("Observaciones: " + observaciones.value);

        console.log("Prueba aux: " + auxPruebaT);


        crearVacante(inputCargo.value, otroCargo.value, obtenerValoresCheckboxes(), otraZona.value, inputEmpresa.value, otraEmpresa.value, experiencia.value, auxPruebaT, fechaPrueba.value, horaPrueba.value, auxFechaI, numPersonas.value, observaciones.value, empresaS.value);

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



