import { urlBack, usuarioR } from "../model/base.js";
import { aviso } from "../Avisos/avisos.js";

const signInform = document.querySelector('#signUp-form');


const icon = document.querySelector(".bx"),
    pas = document.getElementById("signIn-password")
icon.addEventListener("click", e => {
    if (pas.type === "password") {
        pas.type = "text";
        icon.classList.remove('bx-show-alt')
        icon.classList.add("bx-hide")
    }
    else {
        pas.type = "password"
        icon.classList.remove('bc-hide')
        icon.classList.add('bx-show-alt')
    }
})

signInform.addEventListener('submit', async (e) => {
    e.preventDefault();
    const values = await fetchData();

    localStorage.setItem('idUsuario', values.numero_de_documento);
    localStorage.setItem('perfil', values.rol);
    localStorage.setItem('username', values.primer_nombre + ' ' + values.primer_apellido);
    localStorage.setItem('sede', values.sucursalde);

    const esKarenRiquett = values.primer_nombre === 'KAREN' && values.primer_apellido === "RIQUETT";
    const esYeseniaPalacios = values.primer_nombre === 'Yesenia' && values.primer_apellido === "Palacios";


    if (values.numero_de_documento != null && !esKarenRiquett && !esYeseniaPalacios) {
        window.location.href = "../Roles/roles.html";
    } else if (esKarenRiquett || esYeseniaPalacios) {
        window.location.href = "../Recepcion/recepcion.html";
    } else {
        aviso('No tienes acceso todavía, comunícate con el administrador', 'error');
    }



});


async function fetchData() {
    let email = signInform['signIn-email'].value;
    const password = signInform['signIn-password'].value;
    const urlcompleta = urlBack.url + '/usuarios/ingresar';
    // quitar espacios en blanco
    email = email.trim();

    try {
        const response = await fetch(urlcompleta, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email: email, password: password }),
        });

        const responseBody = await response.text();

        localStorage.setItem('key', responseBody);

        var body = localStorage.getItem('key');

        const obj = JSON.parse(body);

        if (responseBody != null && obj.jwt != null) {
            const values = await getUserbyUsername(responseBody);
            if (values != null) {
                return values; // Devuelve el valor de 'values'
            }
        }
        return null; // Si no hay valores o hay errores, devuelve null
    } catch (error) {
        aviso('Error al iniciar sesión, constraseña o correo equivocados', 'error');
        return null; // En caso de error, devuelve null
    }
}

async function getUserbyUsername(jwt) {

    var user = usuarioR;
    var body = localStorage.getItem("key");
    const obj = JSON.parse(body);
    const jwtKey = obj.jwt;
    const headers = {
        'Authorization': jwtKey
    };

    const urlcompleta = urlBack.url + '/usuarios/usuario';
    try {
        const response = await fetch(urlcompleta, {
            headers: headers
        });
        const json = await response.json();
        if (json.message !== "sessionOut") {
            if (json !== null) {
                usuarioR.numero_de_documento = json.numero_de_documento;
                usuarioR.primer_nombre = json.primer_nombre;
                usuarioR.celular = json.celular;
                usuarioR.primer_apellido = json.primer_apellido;
                usuarioR.localizacion = json.localizacion;
                usuarioR.edad = json.edad;
                usuarioR.tipodedocumento = json.tipodedocumento;
                usuarioR.correo_electronico = json.correo_electronico;
                usuarioR.avatar = json.avatar;
                usuarioR.empladode = json.empleadode;
                usuarioR.sucursalde = json.sucursalde;
                usuarioR.rol = json.rol;
            }
        } else {
            this.currentUser = null;
            window.sessionStorage.removeItem('key');
            window.location.href = "/Login";
        }
        return user;
    } catch (error) {
        aviso('Error al iniciar sesión, constraseña o correo equivocados', 'error');

        return null;
    }
}