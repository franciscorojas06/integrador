
function alternarMenu() {
    document.getElementById("menu").classList.toggle("abierto");
}

function irADiapositiva(indice) {
    let diapositivas = document.querySelectorAll(".diapositiva");
    let indicadores = document.querySelectorAll(".indicador");

    if (indice < 0 || indice >= diapositivas.length) {
        return;
    }

    for (let i = 0; i < diapositivas.length; i++) {
        let activa = i == indice;
        diapositivas[i].hidden = !activa;
        diapositivas[i].classList.toggle("activa", activa);
        indicadores[i].classList.toggle("activo", activa);

        if (activa) {
            indicadores[i].setAttribute("aria-current", "true");
        } else {
            indicadores[i].removeAttribute("aria-current");
        }
    }
}

function moverCarrusel(direccion) {
    let diapositivas = document.querySelectorAll(".diapositiva");
    let indiceActual = 0;

    for (let i = 0; i < diapositivas.length; i++) {
        if (diapositivas[i].classList.contains("activa")) {
            indiceActual = i;
            break;
        }
    }

    let siguienteIndice = (indiceActual + direccion + diapositivas.length) % diapositivas.length;
    irADiapositiva(siguienteIndice);
}

function mostrarDetalle(boton) {
    let tarjeta = boton.closest(".juego");
    let informacion = tarjeta.querySelector(".informacion-juego");
    let expandir = informacion.hidden;

    informacion.hidden = !expandir;
    boton.setAttribute("aria-expanded", expandir);
    boton.textContent = expandir ? "Ver menos información" : "Ver más información";
}

function filtrarJuegos() {
    let genero = document.getElementById("filtroGenero").value;
    let juegos = document.querySelectorAll(".juego");

    for (let i = 0; i < juegos.length; i++) {
        let categoria = juegos[i].getAttribute("data-genero");

        if (genero == "todos" || genero == categoria) {
            juegos[i].style.display = "block";
        } else {
            juegos[i].style.display = "none";
        }
    }
}

function validarCampo(campo) {
    let valor = campo.value.trim();

    let error = document.getElementById(
        "error" + campo.id.charAt(0).toUpperCase() + campo.id.slice(1)
    );

    if (valor == "") {
        error.textContent = "Este campo es obligatorio.";
        campo.className = "incorrecto";
        return false;
    }

    if (campo.id == "correo" && !valor.includes("@")) {
        error.textContent = "Ingresá un correo válido.";
        campo.className = "incorrecto";
        return false;
    }

    error.textContent = "";
    campo.className = "correcto";

    return true;
}

function validarFormulario() {
    let campos = ["nombre", "correo", "asunto", "mensaje"];
    let valido = true;

    for (let i = 0; i < campos.length; i++) {
        let campo = document.getElementById(campos[i]);

        if (!validarCampo(campo)) {
            valido = false;
        }
    }

    if (valido) {
        document.getElementById("resultadoFormulario").textContent =
            "¡Formulario validado correctamente! Este ejemplo no envía el mensaje.";
    } else {
        document.getElementById("resultadoFormulario").textContent =
            "Revisá los campos marcados.";
    }

    return false;
}

function mostrarMas() {
    let imagenes = document.querySelectorAll(".imagen-galeria");

    for (let i = 0; i < imagenes.length; i++) {
        imagenes[i].classList.remove("oculta");
    }

    document.getElementById("botonMas").style.display = "none";
}
