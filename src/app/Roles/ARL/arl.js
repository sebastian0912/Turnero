import { urlBack } from "../../model/base.js";
import {
  aviso,
  avisoConfirmado,
  avisoConfirmacion,
} from "../../Avisos/avisos.js";
// Capturar el h1 del titulo y perfil
const titulo = document.querySelector("#username");
const perfil = document.querySelector("#perfil");
// Capturar el PERFIL y el USERNAME del local storage
const perfilLocal = localStorage.getItem("perfil");
const usernameLocal = localStorage.getItem("username");

let input = document.getElementById("archivoInput");

//Muestra en la parte superior el nombre y el perfil
titulo.innerHTML = usernameLocal;
perfil.innerHTML = perfilLocal;

const over = document.querySelector("#overlay");
const loader = document.querySelector("#loader");

if (perfilLocal == "GERENCIA" || correo == "tuafiliacion@tsservicios.co") {
  //estadisticas.style.display = "block";
  //vacantes.style.display = "block";
  //publicidad.style.display = "block";
  //seleccion.style.display = "block";
  //contratacion.style.display = "block";
  ausentismos.style.display = "block";
}

if (perfilLocal == "GERENCIA" || perfilLocal == "COORDINADOR" || perfilLocal == "JEFE-DE-AREA") {
  formasDePago.style.display = "block";
}

async function traerAusentimosCedual(cedula) {
  var body = localStorage.getItem("key");
  const obj = JSON.parse(body);
  const jwtKey = obj.jwt;

  const headers = {
    Authorization: jwtKey,
  };

  const urlcompleta = urlBack.url + "/contratacion/buscarCandidato/" + cedula;

  try {
    const response = await fetch(urlcompleta, {
      method: "GET",
      headers: headers,
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Respuesta:", responseData);
      return responseData;
    } else {
      throw new Error("Error en la petición GET");
    }
  } catch (error) {
    console.error("Error en la petición HTTP GET");
    console.error(error);
    throw error; // Propaga el error para que se pueda manejar fuera de la función
  }
}

function modificarV(id, numero_pagos, primercorreoelectronico) {
  var body = localStorage.getItem("key");
  const obj = JSON.parse(body);
  const jwtToken = obj.jwt;

  const urlcompleta =
    urlBack.url + "/Ausentismos/editarAusentismosCED_DAVI/" + id;
  try {
    fetch(urlcompleta, {
      method: "POST",
      body: JSON.stringify({
        numero_pagos: numero_pagos,
        primercorreoelectronico: primercorreoelectronico,
        jwt: jwtToken,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // aca metes los datos uqe llegan del servidor si necesitas un dato en especifico me dices
          //muchas veces mando un mensaje de sucess o algo asi para saber que todo salio bien o mal
        } else {
          throw new Error("Error en la petición POST");
        }
      })
      .then((responseData) => {
        console.log("Respuesta:", responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.error("Error en la petición HTTP POST");
    console.error(error);
  }
}

async function eliminarformadepago(id) {
  var body = localStorage.getItem("key");
  const obj = JSON.parse(body);
  const jwtToken = obj.jwt;

  const urlcompleta =
    urlBack.url + "/Ausentismos/eliminarAusentismosREAL/" + id;
  try {
    fetch(urlcompleta, {
      method: "DELETE",
      headers: {
        Authorization: jwtToken,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // aca metes los datos uqe llegan del servidor si necesitas un dato en especifico me dices
          //muchas veces mando un mensaje de sucess o algo asi para saber que todo salio bien o mal
        } else {
          throw new Error("Error en la petición POST");
        }
      })
      .then((responseData) => {
        return;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.error("Error en la petición HTTP POST");
    console.error(error);
  }
}

const boton = document.querySelector("#boton");

document
  .getElementById("tabla")
  .addEventListener("click", async function (event) {
    if (event.target.classList.contains("delete-icon")) {
      // Obtener el ID almacenado en el atributo data-id
      const id = event.target.getAttribute("data-id");
      let aviso = await avisoConfirmacion();
      if (aviso) {
        await eliminarformadepago(id);
        let cedulaEm = document.getElementById("cedula").value;
        await sleep(100);
        cargarYMostrarDatos(cedulaEm);
      }
    }

    if (event.target.classList.contains("editar-icon")) {
      const tr = event.target.closest("tr");
      const id = event.target.getAttribute("data-id");

      // Convertir las celdas en campos de entrada
      const celdas = tr.querySelectorAll("td");
      const correo = celdas[2].innerText;
      const daviplata = celdas[3].innerText;

      // Establecer estilos para las celdas con campos de entrada
      celdas[2].innerHTML = `<input type='text' class='input-estetico' value='${correo}' />`;
      celdas[3].innerHTML = `<input type='text' class='input-estetico' value='${daviplata}' />`;

      // Cambiar el ícono de editar a un botón de guardar
      event.target.src = "../../assets/disquete.png";
      event.target.classList.remove("editar-icon");
      event.target.classList.add("guardar-icon");
      // Establecer tamaño de 20px de ancho y alto
      event.target.style.width = "20px"; // Establecer el ancho en 20px
      event.target.style.height = "20px"; // Establecer la altura en 20px
    } else if (event.target.classList.contains("guardar-icon")) {
      const tr = event.target.closest("tr");
      const id = event.target.getAttribute("data-id");
      const inputs = tr.querySelectorAll("input");

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
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function cargarYMostrarDatos(cedulaEm) {
  const tabla = document.querySelector("#tabla");
  if (!cedulaEm) {
    aviso("Por favor ingrese una cédula", "warning");
    return;
  }

  let datosExtraidos = await traerAusentimosCedual(cedulaEm);

  if (datosExtraidos.Ausentismos == "Error no se encontraron datos") {
    aviso(
      "No se encontró a la persona verifica que este bien escrito",
      "error"
    );
    tabla.innerHTML = "";
    return;
  }
  tabla.innerHTML = "";

  let auxNumeropagos = 0;
  datosExtraidos.data.forEach((p) => {
    auxNumeropagos = p.celular;
  });

  datosExtraidos.data.forEach((p) => {
    tabla.insertAdjacentHTML(
      "afterbegin",
      `
            <tr>
                <td>${p.numerodeceduladepersona}</td>
                <td>${p.primer_nombre} ${p.segundo_nombre} ${p.primer_apellido} ${p.segundo_apellido}</td>
                <td>${p.primercorreoelectronico}</td>
                <td>${auxNumeropagos}</td>
                <td>${p.telefono_conyugue}</td>
                <td>${p.telefono_familiar_emergencia}</td>
                <td>${p.telefono_madre}</td>
                <td>${p.telefono_padre}</td>
                <td>${p.telefono_referencia_familiar1}</td>
                <td>${p.telefono_referencia_familiar2}</td>
                <td>${p.telefono_referencia_personal1}</td>
                <td>${p.telefono_referencia_personal2}</td>


                <td> <img src="../../assets/editar.png" class="editar-icon" data-id="${p.numerodeceduladepersona}" ></td>
                <td> <img src="../../assets/eliminar.png" class="delete-icon" data-id="${p.numerodeceduladepersona}"></td>
            </tr>
        `
    );
  });
}

boton.addEventListener("click", async () => {
  let cedulaEm = document.getElementById("cedula").value;
  cedulaEm = cedulaEm.replace(/\s/g, "").replace(/\./g, "");
  cargarYMostrarDatos(cedulaEm);
});

if (input) {
  input.addEventListener("change", async () => {
    const file = input.files[0];
    const reader = new FileReader();

    let datosFinales = [];

    reader.onload = (event) => {
      const fileContent = event.target.result;
      const workbook = XLSX.read(new Uint8Array(fileContent), {
        type: "array",
        cellDates: true,
      });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      // Obtiene el rango de la hoja
      const range = XLSX.utils.decode_range(sheet["!ref"]);

      for (let rowNum = 1; rowNum <= range.e.r; rowNum++) {
        let rowData = [];
        for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
          // Obtiene la celda en la posición actual
          const cellRef = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
          const cell = sheet[cellRef];

          // Formatea la fecha si la celda es una fecha
          let cellText = "";
          if (cell && cell.t === "d") {
            cellText = cell.v.toLocaleDateString("es-CO", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
          } else {
            cellText = cell ? `${cell.w || cell.v}` : "";
          }

          // Agrega el texto de la celda al array de datos finales
          rowData.push(cellText);
        }
        datosFinales.push(rowData);
      }

      console.log("Datos cargados desde Excel:", datosFinales);

      over.style.display = "block";
      loader.style.display = "block";

      guardarDatos(datosFinales);
    };

    reader.readAsArrayBuffer(file);
  });
}

async function guardarDatos(datosFinales) {
  var body = localStorage.getItem("key");
  const obj = JSON.parse(body);
  const jwtKey = obj.jwt;

  const bodyData = {
    jwt: jwtKey,
    mensaje: "muchos",
    datos: datosFinales,
  };

  const headers = {
    Authorization: jwtKey,
  };

  const urlcompleta = urlBack.url + "/contratacion/validarDatos/";
  try {
    const response = await fetch(urlcompleta, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtKey,
      },
      body: JSON.stringify(bodyData),
    });

    const responseData = await response.json();
    console.log("Respuesta completa:", responseData);

    if (responseData.errores && responseData.errores.length > 0) {
      //exportarErroresAExcel(responseData.errores);
    } else {
      exportarDatosAExcel(
        responseData.resultados,
        responseData.cedulas_no_encontradas
      );
      document.getElementById("successSound").play();
      let aviso = await avisoConfirmado(
        "Datos guardados correctamente",
        "success"
      );
      if (aviso) {
        location.reload();
      }
    }
  } catch (error) {
    console.error("Error en la petición HTTP:", error);
    document.getElementById("errorSound").play();
    aviso("Error al guardar los datos", "error");
  }
}

function exportarDatosAExcel(datos, cedulasNoEncontradas) {
  const titulos = [
    "ARL",
    "ARL Fecha",
    "Fecha de firma de contrato",
    "N° CC",
    "TEM",
    "Código",
    "Empresa Usuaria y Centro de Costo",
    "Tipo de Documento de Identidad",
    "Ingreso,(ing) No Ingres , Sin Confirmar, Cambio de contrato",
    "Cargo (Operario de... y/oficios varios)",
    "Fecha de Ingreso",
    "Descripción de la Obra / Motivo Temporada/// Cambia cada mes",
    "Salario S.M.M.L.V.",
    "Número de Identificación Trabajador",
    "Primer Apellido Trabajador",
    "Segundo Apellido Trabajador",
    "Primer Nombre Trabajador",
    "Segundo Nombre Trabajador",
    "Fecha de Nacimiento (DD/MM/AAAA) Trabajador",
    "Sexo (F - M) Trabajador",
    "Estado civil (SO-UL - CA-SE-VI) Trabajador",
    "Dirección de residencia Trabajador",
    "Barrio Trabajador",
    "Teléfono móvil Trabajador",
    "Correo electrónico E-mail Trabajador",
    "Ciudad de Residencia Trabajador",
    "Fecha Expedición CC Trabajador",
    "Municipio Expedición CC Trabajador",
    "Departamento Expedición CC Trabajador",
    "Lugar de Nacimiento Municipio Trabajador",
    "Lugar de Nacimiento Departamento Trabajador",
    "Rh Trabajador",
    "Zurdo/Diestro Trabajador",
    "EPS Trabajador",
    "AFP Trabajador",
    "AFC Trabajador",
    "Centro de costo Para el Carné Trabajador",
    "Persona que hace Contratación",
    "Edad Apropiada",
    "Escolaridad (1-11) Trabajador",
    "Técnico Trabajador",
    "Tecnólogo Trabajador",
    "Universidad Trabajador",
    "Especialización Trabajador",
    "Otros Trabajador",
    "Nombre Institución Trabajador",
    "Año de Finalización Trabajador",
    "Título Obtenido Trabajador",
    "Chaqueta Trabajador",
    "Pantalón Trabajador",
    "Camisa Trabajador",
    "Calzado Trabajador",
    "Familiar en caso de Emergencia",
    "Parentesco Emergencia",
    "Dirección Emergencia",
    "Barrio Emergencia",
    "Teléfono Emergencia",
    "Ocupación Emergencia",
    "Nombre Pareja",
    "Vive Si/No Pareja",
    "Ocupación Pareja",
    "Dirección Pareja",
    "Teléfono Pareja",
    "Barrio Pareja",
    "No de Hijos Dependientes",
    "Nombre Hijo 1",
    "Sexo Hijo 1",
    "Fecha Nacimiento Hijo 1",
    "No de Documento de Identidad Hijo 1",
    "Estudia o Trabaja Hijo 1",
    "Curso Hijo 1",
    "Nombre Hijo 2",
    "Sexo Hijo 2",
    "Fecha Nacimiento Hijo 2",
    "No de Documento de Identidad Hijo 2",
    "Estudia o trabaja Hijo 2",
    "Curso Hijo 2",
    "Nombre Hijo 3",
    "Sexo Hijo 3",
    "Fecha Nacimiento Hijo 3",
    "No de Documento de Identidad Hijo 3",
    "Estudia o trabaja Hijo 3",
    "Curso Hijo 3",
    "Nombre Hijo 4",
    "Sexo Hijo 4",
    "Fecha Nacimiento Hijo 4",
    "No de Documento de Identidad Hijo 4",
    "Estudia o trabaja Hijo 4",
    "Curso Hijo 4",
    "Nombre Hijo 5",
    "Sexo Hijo 5",
    "Fecha Nacimiento Hijo 5",
    "No de Documento de Identidad Hijo 5",
    "Estudia o trabaja Hijo 5",
    "Curso Hijo 5",
    "Nombre Hijo 6",
    "Sexo Hijo 6",
    "Fecha Nacimiento Hijo 6",
    "No de Documento de Identidad Hijo 6",
    "Estudia o trabaja Hijo 6",
    "Curso Hijo 6",
    "Nombre Hijo 7",
    "Sexo Hijo 7",
    "Fecha Nacimiento Hijo 7",
    "No de Documento de Identidad Hijo 7",
    "Estudia o trabaja Hijo 7",
    "Curso Hijo 7",
    "Nombre Padre",
    "Vive Si /No Padre",
    "Ocupación Padre",
    "Dirección Padre",
    "Teléfono Padre",
    "Barrio/Municipio Padre",
    "Nombre Madre",
    "Vive Si /No Madre",
    "Ocupación Madre",
    "Dirección Madre",
    "Teléfono Madre",
    "Barrio/Municipio Madre",
    "Nombre Referencia Personal 1",
    "Teléfono* Referencia Personal 1",
    "Ocupación Referencia Personal 1",
    "Nombre Referencia Personal 2",
    "Teléfono* Referencia Personal 2",
    "Ocupación Referencia Personal 2",
    "Nombre Referencia Familiar 1",
    "Teléfono* Referencia Familiar 1",
    "Ocupación Referencia Familiar 1",
    "Nombre Referencia Familiar 2",
    "Teléfono* Referencia Familiar 2",
    "Ocupación Referencia Familiar 2",
    "Nombre Empresa Experiencia Laboral 1",
    "Dirección Empresa Experiencia Laboral 1",
    "Teléfonos* (Obligatorio) Experiencia Laboral 1",
    "Nombre Jefe Inmediato Experiencia Laboral 1",
    "AREA DE EXPERIENCIA Experiencia Laboral 1",
    "Fecha de Retiro Experiencia Laboral 1",
    "Motivo Retiro Experiencia Laboral 1",
    "Nombre Empresa Experiencia Laboral 2",
    "Dirección Empresa Experiencia Laboral 2",
    "Teléfonos* Experiencia Laboral 2",
    "Nombre Jefe Inmediato Experiencia Laboral 2",
    "Cargo del Trabajador Experiencia Laboral 2",
    "Fecha de Retiro Experiencia Laboral 2",
    "Motivo Retiro Experiencia Laboral 2",
    "Nombre del Carnet",
    "Desea Plan Funerario",
    "Número Cuenta/Celular",
    "Número Tarjeta/ Tipo de Cuenta",
    "Clave para Asignar",
    "Examen Salud Ocupacional",
    "Apto para el Cargo? Sí o No",
    "EXAMEN DE SANGRE",
    "PLANILLA FUMIGACION",
    "Otros Examenes2 (Nombre)",
    "VACUNA COVID",
    "Nombre de la EPS afiliada",
    "EPS A TRASLADAR",
    "Nombre de AFP Afiliado 01",
    "AFP A TRASLADAR",
    "Afiliación Caja de compensación",
    "Nombre de AFP Afiliado 02",
    "Revisión de Fecha de Ingreso ARL",
    "Confirmación de los Ingresos Envío de correos a las Fincas a diario Confirmacion hasta las 12:30",
    "Fecha confirmación Ingreso a las Empresas Usuarias",
    "Afiliación enviada con fecha (Coomeva-Nueva Eps - Sura - S.O.S - Salud Vida -Compensar - Famisanar",
    "Revisión Personal Confirmado Empresas Usuarias VS Nómina los días 14 y los días 29 de cada Mes",
    "Referenciación Personal 1",
    "Referenciación Personal 2",
    "Referenciación Familiar 1",
    "Referenciación Familiar 2",
    "Referenciación Experiencia Laboral 1",
    "Referenciación Experiencia Laboral 2",
    "Revisión Registraduria (Fecha entrega CC )",
    "COMO SE ENTERO DEL EMPLEO",
    "Tiene Experiencia laboral ?",
    "Empresas de flores que ha trabajado (Separarlas con ,)",
    "¿En que area?",
    "Describa paso a paso como es su labora (ser lo más breve posible)",
    "Califique su rendimiento",
    "¿Por qué se da esta auto calificación?",
    "Hace cuanto vive en la zona",
    "Tipo de vivienda",
    "Con quien Vive",
    "Estudia Actualmente",
    "Personas a cargo",
    "Numero de hijos a cargo",
    "Quien los cuida?",
    "Como es su relación Familiar",
    "Según su Experiencia y desempeño laboral por que motivos lo han felicitado",
    "Ha tenido algún malentendido o situación conflictiva en algún trabajo, Si si en otro especificar por qué:",
    "Está dispuesto a realizar actividades diferentes al cargo:",
    "Mencione una experiencia significativa en su trabajo",
    "Que proyecto de vida tiene de aquí a 3 años",
    "La vivienda es:",
    "¿Cuál es su motivación?",
    "OBSERVACIONES",
  ];

  // Crear un array de objetos con los datos mapeados
  const datosMapeados = datos.map((dato) => {
    const mapeado = {
      ARL: dato.ARL,
      "ARL Fecha": dato.ARL_FECHA,
      "Fecha de firma de contrato":
        dato.proceso_contratacion.fecha_contratacion,
      "N° CC": dato.datos_generales.numerodeceduladepersona,
      TEM: dato.proceso_contratacion.temporal,
      Código: dato.proceso_contratacion.codigo_contrato,
      "Empresa Usuaria y Centro de Costo":
        dato.proceso_contratacion.centro_de_costos,
      "Tipo de Documento de Identidad": dato.proceso_contratacion.tipodocumento,
      "Ingreso,(ing) No Ingres , Sin Confirmar, Cambio de contrato":
        dato.proceso_contratacion.ingreso,
      "Cargo (Operario de... y/oficios varios)":
        dato.proceso_contratacion.cargo,
      "Fecha de Ingreso": dato.proceso_contratacion.fechaIngreso,
      "Descripción de la Obra / Motivo Temporada/// Cambia cada mes":
        dato.proceso_contratacion.descripcionLabor,
      "Salario S.M.M.L.V.": dato.proceso_contratacion.salarios,
      "Número de Identificación Trabajador":
        dato.datos_generales.numerodeceduladepersona,
      "Primer Apellido Trabajador": dato.datos_generales.primer_apellido,
      "Segundo Apellido Trabajador": dato.datos_generales.segundo_apellido,
      "Primer Nombre Trabajador": dato.datos_generales.primer_nombre,
      "Segundo Nombre Trabajador": dato.datos_generales.segundo_nombre,
      "Fecha de Nacimiento (DD/MM/AAAA) Trabajador":
        dato.datos_generales.fecha_nacimiento,
      "Sexo (F - M) Trabajador": dato.datos_generales.genero,
      "Estado civil (SO-UL - CA-SE-VI) Trabajador":
        dato.datos_generales.estado_civil,
      "Dirección de residencia Trabajador":
        dato.datos_generales.direccion_residencia,
      "Barrio Trabajador": dato.datos_generales.barrio,
      "Teléfono móvil Trabajador": dato.datos_generales.celular,
      "Correo electrónico E-mail Trabajador":
        dato.datos_generales.primercorreoelectronico,
      "Ciudad de Residencia Trabajador": dato.datos_generales.barrio,
      "Fecha Expedición CC Trabajador":
        dato.datos_generales.fecha_expedicion_cc,
      "Municipio Expedición CC Trabajador":
        dato.datos_generales.municipio_expedicion_cc,
      "Departamento Expedición CC Trabajador":
        dato.datos_generales.departamento_expedicion_cc,
      "Lugar de Nacimiento Municipio Trabajador":
        dato.datos_generales.lugar_nacimiento_municipio,
      "Lugar de Nacimiento Departamento Trabajador":
        dato.datos_generales.lugar_nacimiento_departamento,
      "Rh Trabajador": dato.datos_generales.rh,
      "Zurdo/Diestro Trabajador": dato.datos_generales.zurdo_diestro,
      "EPS Trabajador": dato.proceso_seleccion.eps,
      "AFP Trabajador": dato.proceso_seleccion.afp,
      "AFC Trabajador": dato.proceso_seleccion.afc,
      "Centro de costo Para el Carné Trabajador":
        dato.proceso_contratacion.centro_de_costos,
      "Persona que hace Contratación":
        dato.proceso_contratacion.persona_que_hace_contratacion,
      "Edad Apropiada": dato.datos_generales.edadTrabajador,
      "Escolaridad (1-11) Trabajador": dato.datos_generales.escolaridad,

      "Técnico Trabajador": dato.datos_generales.tecnico,
      "Tecnólogo Trabajador": dato.datos_generales.tecnologo,
      "Universidad Trabajador": dato.datos_generales.profesional,
      "Especialización Trabajador": dato.datos_generales.especializacion,
      "Otros Trabajador": dato.datos_generales.otros,

      "Nombre Institución Trabajador": dato.datos_generales.nombre_institucion,
      "Año de Finalización Trabajador": dato.datos_generales.ano_finalizacion,

      "Título Obtenido Trabajador": dato.datos_generales.titulo_obtenido,
      "Chaqueta Trabajador": dato.datos_generales.chaqueta,
      "Pantalón Trabajador": dato.datos_generales.pantalon,
      "Camisa Trabajador": dato.datos_generales.camisa,
      "Calzado Trabajador": dato.datos_generales.calzado,

      "Familiar en caso de Emergencia":
        dato.datos_generales.familiar_emergencia,
      "Parentesco Emergencia":
        dato.datos_generales.parentesco_familiar_emergencia,
      "Dirección Emergencia":
        dato.datos_generales.direccion_familiar_emergencia,
      "Barrio Emergencia": dato.datos_generales.barrio_familiar_emergencia,
      "Teléfono Emergencia": dato.datos_generales.telefono_familiar_emergencia,
      "Ocupación Emergencia":
        dato.datos_generales.ocupacion_familiar_emergencia,

      "Nombre Pareja": dato.datos_generales.nombre_conyugue,
      "Vive Si/No Pareja": dato.datos_generales.vive_con_el_conyugue,
      "Ocupación Pareja": dato.datos_generales.ocupacion_conyugue,
      "Dirección Pareja": dato.datos_generales.direccion_conyugue,
      "Teléfono Pareja": dato.datos_generales.telefono_conyugue,
      "Barrio Pareja": dato.datos_generales.barrio_municipio_conyugue,

      "No de Hijos Dependientes":
        dato.datos_generales.num_hijos_dependen_economicamente,
    };

    // Inicializar los campos de los hijos con valores por defecto
    for (let i = 1; i <= 7; i++) {
      mapeado[`Nombre Hijo ${i}`] = "-";
      mapeado[`Sexo Hijo ${i}`] = "-";
      mapeado[`Fecha Nacimiento Hijo ${i}`] = "-";
      mapeado[`No de Documento de Identidad Hijo ${i}`] = "-";
      mapeado[`Estudia o Trabaja Hijo ${i}`] = "-";
      mapeado[`Curso Hijo ${i}`] = "-";
    }

    // Sobrescribir los campos de los hijos si hay datos disponibles
    if (dato.datos_generales.hijos) {
      for (let i = 0; i < dato.datos_generales.hijos.length; i++) {
        const hijo = dato.datos_generales.hijos[i];
        mapeado[`Nombre Hijo ${i + 1}`] = hijo.nombre || "-";
        mapeado[`Sexo Hijo ${i + 1}`] = hijo.sexo || "-";
        mapeado[`Fecha Nacimiento Hijo ${i + 1}`] =
          hijo.fecha_nacimiento || "-";
        mapeado[`No de Documento de Identidad Hijo ${i + 1}`] =
          hijo.no_documento || "-";
        mapeado[`Estudia o Trabaja Hijo ${i + 1}`] =
          hijo.estudia_o_trabaja || "-";
        mapeado[`Curso Hijo ${i + 1}`] = hijo.curso || "-";
      }
    }

    // Continuar con el resto de los campos
    mapeado["Nombre Padre"] = dato.datos_generales.nombre_padre;
    mapeado["Vive Si /No Padre"] = dato.datos_generales.vive_padre;
    mapeado["Ocupación Padre"] = dato.datos_generales.ocupacion_padre;
    mapeado["Dirección Padre"] = dato.datos_generales.direccion_padre;
    mapeado["Teléfono Padre"] = dato.datos_generales.telefono_padre;
    mapeado["Barrio/Municipio Padre"] = dato.datos_generales.barrio_padre;

    mapeado["Nombre Madre"] = dato.datos_generales.nombre_madre;
    mapeado["Vive Si /No Madre"] = dato.datos_generales.vive_madre;
    mapeado["Ocupación Madre"] = dato.datos_generales.ocupacion_madre;
    mapeado["Dirección Madre"] = dato.datos_generales.direccion_madre;
    mapeado["Teléfono Madre"] = dato.datos_generales.telefono_madre;
    mapeado["Barrio/Municipio Madre"] = dato.datos_generales.barrio_madre;

    mapeado["Nombre Referencia Personal 1"] =
      dato.datos_generales.nombre_referencia_personal1;
    mapeado["Teléfono* Referencia Personal 1"] =
      dato.datos_generales.telefono_referencia_personal1;
    mapeado["Ocupación Referencia Personal 1"] =
      dato.datos_generales.ocupacion_referencia_personal1;

    mapeado["Nombre Referencia Personal 2"] =
      dato.datos_generales.nombre_referencia_personal2;
    mapeado["Teléfono* Referencia Personal 2"] =
      dato.datos_generales.telefono_referencia_personal2;
    mapeado["Ocupación Referencia Personal 2"] =
      dato.datos_generales.ocupacion_referencia_personal2;

    mapeado["Nombre Referencia Familiar 1"] =
      dato.datos_generales.nombre_referencia_familiar1;
    mapeado["Teléfono* Referencia Familiar 1"] =
      dato.datos_generales.telefono_referencia_familiar1;
    mapeado["Ocupación Referencia Familiar 1"] =
      dato.datos_generales.ocupacion_referencia_familiar1;

    mapeado["Nombre Referencia Familiar 2"] =
      dato.datos_generales.nombre_referencia_familiar2;
    mapeado["Teléfono* Referencia Familiar 2"] =
      dato.datos_generales.telefono_referencia_familiar2;
    mapeado["Ocupación Referencia Familiar 2"] =
      dato.datos_generales.ocupacion_referencia_familiar2;

    mapeado["Nombre Empresa Experiencia Laboral 1"] =
      dato.datos_generales.nombre_expe_laboral1_empresa;
    mapeado["Dirección Empresa Experiencia Laboral 1"] =
      dato.datos_generales.direccion_empresa1;
    mapeado["Teléfonos* (Obligatorio) Experiencia Laboral 1"] =
      dato.datos_generales.telefonos_empresa1;
    mapeado["Nombre Jefe Inmediato Experiencia Laboral 1"] =
      dato.datos_generales.nombre_jefe_empresa1;
    mapeado["AREA DE EXPERIENCIA Experiencia Laboral 1"] =
      dato.datos_generales.cargo_empresa1;
    mapeado["Fecha de Retiro Experiencia Laboral 1"] =
      dato.datos_generales.fecha_retiro_empresa1;
    mapeado["Motivo Retiro Experiencia Laboral 1"] =
      dato.datos_generales.motivo_retiro_empresa1;

    mapeado["Nombre Empresa Experiencia Laboral 2"] =
      dato.datos_generales.nombre_expe_laboral2_empresa;
    mapeado["Dirección Empresa Experiencia Laboral 2"] =
      dato.datos_generales.direccion_empresa2;
    mapeado["Teléfonos* Experiencia Laboral 2"] =
      dato.datos_generales.telefonos_empresa2;
    mapeado["Nombre Jefe Inmediato Experiencia Laboral 2"] =
      dato.datos_generales.nombre_jefe_empresa2;
    mapeado["Cargo del Trabajador Experiencia Laboral 2"] =
      dato.datos_generales.cargo_empresa2;
    mapeado["Fecha de Retiro Experiencia Laboral 2"] =
      dato.datos_generales.fecha_retiro_empresa2;
    mapeado["Motivo Retiro Experiencia Laboral 2"] =
      dato.datos_generales.motivo_retiro_empresa2;

    mapeado["Nombre del Carnet"] = dato.proceso_contratacion.nombreCarnet;
    mapeado["Desea Plan Funerario"] = dato.proceso_contratacion.planfunerario;
    mapeado["Número Cuenta/Celular"] =
      dato.proceso_contratacion.numeroCuenta_celular;
    mapeado["Número Tarjeta/ Tipo de Cuenta"] =
      dato.proceso_contratacion.numeroTarjeta_tipo;
    mapeado["Clave para Asignar"] = dato.proceso_contratacion.clave_asignada;

    mapeado["Examen Salud Ocupacional"] =
      dato.proceso_seleccion.examen_salud_ocupacional;
    mapeado["Apto para el Cargo? Sí o No"] = dato.proceso_seleccion.apto_cargo;
    mapeado["EXAMEN DE SANGRE"] = dato.proceso_seleccion.examen_sangre;
    mapeado["PLANILLA FUMIGACION"] = dato.proceso_seleccion.planilla_fumigacion;
    mapeado["Otros Examenes2 (Nombre)"] =
      dato.proceso_seleccion.otros_examenes2;
    mapeado["VACUNA COVID"] = dato.proceso_seleccion.vacuna_covid;

    mapeado["Nombre de la EPS afiliada"] =
      dato.proceso_contratacion.nombre_eps_afiliada;
    mapeado["EPS A TRASLADAR"] = dato.proceso_contratacion.eps_a_trasladar;
    mapeado["Nombre de AFP Afiliado 01"] = dato.proceso_contratacion.nombre_afp;
    mapeado["AFP A TRASLADAR"] = dato.proceso_contratacion.afp_trasladar;

    mapeado["Afiliación Caja de compensación"] =
      dato.proceso_contratacion.afiliacion_caja_compensacion;
    mapeado["Nombre de AFP Afiliado 02"] = dato.proceso_seleccion.nombre_afp2; ////////////////////////

    mapeado["Revisión de Fecha de Ingreso ARL"] =
      dato.proceso_contratacion.revision_arl;
    mapeado[
      "Confirmación de los Ingresos Envío de correos a las Fincas a diario Confirmacion hasta las 12:30"
    ] = dato.proceso_contratacion.confirmacion_ingreso_correo;
    mapeado["Fecha confirmación Ingreso a las Empresas Usuarias"] =
      dato.proceso_contratacion.fecha_confirmacion_correo;
    mapeado[
      "Afiliación enviada con fecha (Coomeva-Nueva Eps - Sura - S.O.S - Salud Vida -Compensar - Famisanar"
    ] = dato.proceso_contratacion.afiliacion_enviada;
    mapeado[
      "Revisión Personal Confirmado Empresas Usuarias VS Nómina los días 14 y los días 29 de cada Mes"
    ] = dato.proceso_contratacion.revision_personal;

    mapeado["Referenciación Personal 1"] =
      dato.datos_generales.referenciacionPersonal1;
    mapeado["Referenciación Personal 2"] =
      dato.datos_generales.referenciacionPersonal2;
    mapeado["Referenciación Familiar 1"] =
      dato.datos_generales.referenciacionFamiliar1;
    mapeado["Referenciación Familiar 2"] =
      dato.datos_generales.referenciacionFamiliar2;
    mapeado["Referenciación Experiencia Laboral 1"] =
      dato.datos_generales.referenciacionLaboral1;
    mapeado["Referenciación Experiencia Laboral 2"] =
      dato.datos_generales.referenciacionLaboral2;

    mapeado["Revisión Registraduria (Fecha entrega CC )"] =
      dato.datos_generales.registroRegistraduria;
    mapeado["COMO SE ENTERO DEL EMPLEO"] = dato.datos_generales.como_se_entero;
    mapeado["Tiene Experiencia laboral ?"] =
      dato.datos_generales.tiene_experiencia_laboral;
    mapeado["Empresas de flores que ha trabajado (Separarlas con ,)"] =
      dato.datos_generales.empresas_laborado;
    mapeado["¿En que area?"] = dato.datos_generales.area_experiencia;
    mapeado[
      "Describa paso a paso como es su labora (ser lo más breve posible)"
    ] = dato.datos_generales.labores_realizadas;
    mapeado["Califique su rendimiento"] =
      dato.datos_generales.rendimiento_laboral;
    mapeado["¿Por qué se da esta auto calificación?"] =
      dato.datos_generales.porqueRendimiento;
    mapeado["Hace cuanto vive en la zona"] =
      dato.datos_generales.hacecuantoviveenlazona;
    mapeado["Tipo de vivienda"] = dato.datos_generales.tipo_vivienda;
    mapeado["Con quien Vive"] = dato.datos_generales.personas_con_quien_convive;

    mapeado["Estudia Actualmente"] = dato.datos_generales.estudia_actualmente;
    mapeado["Personas a cargo"] = dato.datos_generales.personas_a_cargo;
    mapeado["Numero de hijosacargo"] =
      dato.datos_generales.num_hijos_dependen_economicamente;
    mapeado["Quien los cuida?"] = dato.datos_generales.quien_los_cuida;
    mapeado["Como es su relación Familiar"] =
      dato.datos_generales.como_es_su_relacion_familiar;

    mapeado[
      "Según su Experiencia y desempeño laboral por que motivos lo han felicitado"
    ] = dato.datos_generales.porqueLofelicitarian;
    mapeado[
      "Ha tenido algún malentendido o situación conflictiva en algún trabajo, Si si en otro especificar por qué:"
    ] = dato.datos_generales.malentendido;
    mapeado["Está dispuesto a realizar actividades diferentes al cargo:"] =
      dato.datos_generales.actividadesDi;
    mapeado["Mencione una experiencia significativa en su trabajo"] =
      dato.datos_generales.experienciaSignificativa;
    mapeado["Que proyecto de vida tiene de aquí a 3 años"] =
      dato.datos_generales.expectativas_de_vida;
    mapeado["La vivienda es:"] = dato.datos_generales.tipo_vivienda_2p;
    mapeado["¿Cuál es su motivación?"] = dato.datos_generales.motivacion;
    mapeado["OBSERVACIONES"] = dato.datos_generales.observaciones;

    return mapeado;
  });

  // Crear un nuevo libro de trabajo
  const workbook = XLSX.utils.book_new();

  // Crear una hoja de cálculo a partir de los datos mapeados
  const worksheet = XLSX.utils.json_to_sheet(datosMapeados);

  // Agregar encabezados a la hoja de cálculo
  XLSX.utils.sheet_add_aoa(worksheet, [titulos], { origin: "A1" });

  // Agregar la hoja de cálculo al libro de trabajo
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  // Añadir hoja de calculo con las cedulas no encontradas
  // TÍTULO
  const titulosCedulasNoEncontradas = ["Cédula"];

  // Colocar las cédulas no encontradas
  const cedulasNoEncontradasMapeadas = cedulasNoEncontradas.map((cedula) => {
    return [cedula];
  });

  // Crear una hoja de cálculo a partir de los datos mapeados
  const worksheetCedulasNoEncontradas = XLSX.utils.aoa_to_sheet(
    cedulasNoEncontradasMapeadas
  );

  // Agregar encabezados a la hoja de cálculo
  XLSX.utils.sheet_add_aoa(
    worksheetCedulasNoEncontradas,
    [titulosCedulasNoEncontradas],
    { origin: "A1" }
  );

  // Añadir la hoja de cálculo al libro de trabajo
  XLSX.utils.book_append_sheet(
    workbook,
    worksheetCedulasNoEncontradas,
    "Cédulas No Encontradas"
  );

  // Generar el archivo Excel
  XLSX.writeFile(workbook, "ReporteARL.xlsx");
}
