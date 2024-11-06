import {Mapa} from "./mapa.js";
import { obtenerCentroSalud, obtenerCoordinador} from "./repositorio.js";
import {Header} from "./header.js";

let centroSeleccionadoId = undefined;

document.addEventListener('DOMContentLoaded', async () => {
    const mapa = Mapa.onContainer('mapa').fromCoords(-34.5309, -58.7113);
    const coordinador = await obtenerCoordinador()
    const header = new Header()
    header.actualizarNombre(coordinador.getNombreCompleto())
    header.actualizarAvatar(coordinador.getAvatar());
    actualizarNombreDeZona(coordinador.zonaAsignada().getNombre())
    mostrarCentroEnMapa(mapa, coordinador.zonaAsignada() )

    document.querySelector('.logout-btn').addEventListener('click', cerrarSesion);
    document.getElementById("boton-seguimiento").addEventListener('click', abrirModalFiltro);
    document.getElementById("cerrar-modal-filtro").addEventListener('click', cerrarModalFiltro);
    document.getElementById("boton-filtrar").addEventListener('click', () => filtrarPorEstado("Pendiente"));
    document.getElementById("boton-recordatorio").addEventListener('click', mostrarRecordatorio);
    document.getElementById("boton-enviar-recordatorio").addEventListener('click', enviarRecordatorio);
})

function mostrarCentroEnMapa(mapa, zona) {
    const centrosDeSalud = zona.getCentrosDeSalud();
    centrosDeSalud.forEach(centro => {
        const coordenada = centro.getCoordenada();
        const nombre = centro.getNombre();
        const id = centro.getId();
        mapa.agregarMarcador(coordenada.latitud,coordenada.longitud,nombre,()=> mostrarDetallesDelCentro(id))
    })
}

async function mostrarDetallesDelCentro(id) {
    const centro = await obtenerCentroSalud(id)
    centroSeleccionadoId = id
    document.getElementById("centro-detalle").style.display = "flex";
    document.getElementById("nombre-centro").innerHTML = centro.getNombre();
    document.getElementById("direccion-centro").innerHTML = centro.getDireccion();
    document.getElementById("centro-encuestas").innerHTML = centro.getPromedioDeEncuestas();
    ocultarRecordatorio()
    console.log(centro)
}

function actualizarNombreDeZona(nombre){
    document.getElementById("nombre-zona").innerHTML = nombre;
}

function cerrarSesion() {
    alert('Cerrando sesión...');
    localStorage.clear();
    window.location.href = '/index.html';
}


// Función para abrir el modal
function abrirModalFiltro() {
    document.getElementById("modal-fondo").style.display = "flex";
    const tablaUsuarios = document.getElementById("tabla-usuarios");
    tablaUsuarios.innerHTML = ""; // Limpia la tabla antes de insertar nuevos usuarios

     obtenerCentroSalud(centroSeleccionadoId)
        .then(centro => {
            const atenciones = centro.getAtenciones();

            atenciones.map(atencion => {
                const paciente = atencion.getPaciente();

                const fila = document.createElement("tr");
                const estado = atencion.feedback ? "Completado" : "Pendiente";
                fila.setAttribute("data-status", estado);

                // Nombre
                const nombreCelda = document.createElement("td");
                nombreCelda.textContent = paciente.nombre;
                fila.appendChild(nombreCelda);

                // Nombre
                const apellidoCelda = document.createElement("td");
                apellidoCelda.textContent = paciente.apellido;
                fila.appendChild(apellidoCelda);


                // Email
                const emailCelda = document.createElement("td");
                emailCelda.textContent = paciente.mail;
                fila.appendChild(emailCelda);

                // Estado
                const estadoCelda = document.createElement("td");
                const estadoSpan = document.createElement("span");
                estadoSpan.className = `modal-filtro-estado`;
                estadoSpan.textContent = atencion.feedback ? "Completado" : "Pendiente";
                estadoCelda.appendChild(estadoSpan);
                fila.appendChild(estadoCelda);
                tablaUsuarios.appendChild(fila);
            })

        })



}

// Función para cerrar el modal
function cerrarModalFiltro() {
    document.getElementById("modal-fondo").style.display = "none";
}


// Función para filtrar usuarios por estado (activo/inactivo)
function filtrarPorEstado(estado) {
    const filas = document.querySelectorAll("#tabla-usuarios tr");

    filas.forEach(fila => {
        fila.style.display = fila.getAttribute("data-status") === estado ? "" : "none";
    });
}

function mostrarRecordatorio(){
    document.getElementById("recordatorio").style.display = "block";
}

function ocultarRecordatorio(){
    document.getElementById("recordatorio").style.display = "none";
}

function enviarRecordatorio(){
    const mensaje = document.getElementById("mensaje").value;
    if(!mensaje){
        alert("Debes escribir un mensaje");
        return;
    }
    alert("Mensaje enviado a todos los pacientes")
    ocultarRecordatorio();
}