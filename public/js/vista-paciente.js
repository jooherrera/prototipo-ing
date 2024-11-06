import {obtenerPaciente, actualizarPaciente, obtenerEncuesta} from "./repositorio.js";
import {Header} from "./header.js";
import {Mapa} from "./mapa.js";

document.addEventListener('DOMContentLoaded', async () => {
    const mapa =  Mapa.onContainer('mapa').fromCoords(-34.5309, -58.7113);
    const paciente = await obtenerPaciente()
    const header = new Header();

    header.actualizarNombre(paciente.getNombreCompleto())
    header.actualizarAvatar(paciente.getAvatar());
    mostrarCentroEnMapa(mapa,paciente)
    document.querySelector('.logout-btn').addEventListener('click', cerrarSesion);
})

function mostrarCentroEnMapa(mapa, paciente) {
    const atenciones = paciente.getAtenciones()
    atenciones.forEach(atencion => {
        const centroDeSalud = atencion.getCentroDeSalud();
        const coordenada = centroDeSalud.getCoordenada();
        const nombre = centroDeSalud.getNombre();
        mapa.agregarMarcador(coordenada.latitud,coordenada.longitud,nombre,()=> mostrarCentroDetalle(paciente,atencion))
    })
}

function mostrarCentroDetalle(paciente, atencion) {
    const centroDeSalud = atencion.getCentroDeSalud()
    generarModalCentroDetalle(paciente, atencion);
    actualizarDetalleDeCentro(centroDeSalud);
}

function generarModalCentroDetalle(paciente, atencion){
    document.getElementById("modal-info-centro-background").style.display = "flex";
    document.querySelector(".boton-cerrar").addEventListener('click', ocultarCentroDetalle);
    const btnResponderEncuesta = document.getElementById("boton-responder-encuesta")
    btnResponderEncuesta.addEventListener("click", mostrarModalEncuesta(paciente,atencion));
    btnResponderEncuesta.addEventListener("click", ocultarCentroDetalle)
}

function ocultarCentroDetalle(){
    document.getElementById("modal-info-centro-background").style.display = "none";
}

function mostrarModalEncuesta(paciente, atencion) {
    const modal = document.getElementById("modal");
    const btnCerrar = document.getElementById("cerrar-encuesta");
    const formulario = document.getElementById("formulario");
    const resultado = document.getElementById("resultado");
    const resultadoContenido = document.getElementById("resultadoContenido");
    const cerrarResultados = document.getElementById("cerrar-resultados");
    const errorMessage = document.getElementById("errorMessage");

    const getEncuesta = async ()=>{
        return await obtenerEncuesta()
    }

    btnCerrar.addEventListener('click', ()=> {
        modal.style.display = "none";
    })

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    formulario.addEventListener('submit',async (e)=>{
        e.preventDefault();
        const encuesta = await getEncuesta()
        const formData = new FormData(formulario);
        let results = "<ul>";
        // Recorrer las entradas del FormData
        for (const [name, value] of formData.entries()) {
            if (name === "comment") {
                // Si es el comentario, lo agregamos con un estilo especial
                results += value ? `<li><strong>Comentario adicional:</strong> ${value}</li>`: '';
                encuesta.agregarComentario(value)
            } else {
                // Encontrar el texto de la pregunta correspondiente
                const questionLabel = document.querySelector(`p#${name}`);
                const questionText = questionLabel ? questionLabel.textContent : "Pregunta no encontrada";
                results += `<li><strong>${questionText}</strong>: ${value}</li>`;
                // console.log(name.replace('q',''))
                encuesta.puntuarPregunta(value, name.replace('q',''))
            }
        }
        results += "</ul>";

        // Mostrar los resultados
        resultadoContenido.innerHTML = results;
        formulario.style.display = "none";
        resultado.style.display = "block";

        console.log(encuesta)
        // Marcar el centro como encuestado
        paciente.responderEncuenta(atencion.getIdentificardor())
        enviarRespuesta(paciente)
    })

    cerrarResultados.addEventListener('click',() => {
        modal.style.display = "none";
        formulario.reset();
    })

    return async function abrirModalDePreguntas() {
        modal.style.display = "block";
        if (atencion.estaRespondida()) {
            formulario.style.display = "none";
            resultado.style.display = "none";
            errorMessage.style.display = "block";
        } else {

            // const encuenta = await getEncuesta()
            cargarPreguentas(await getEncuesta())
            formulario.style.display = "block";
            resultado.style.display = "none";
            errorMessage.style.display = "none";
        }
    }
}

function actualizarDetalleDeCentro(detalleDeCentro){
    document.getElementById("details-centro-nombre").innerText = detalleDeCentro.nombre;
    document.getElementById("details-centro-direccion").innerText = detalleDeCentro.direccion;
    document.getElementById("details-centro-zona").innerText = detalleDeCentro.zona.getNombre();
    document.getElementById("details-centro-servicios").innerText = detalleDeCentro.servicios.join(", ");
}


function cerrarSesion() {
    alert('Cerrando sesión...');
    localStorage.clear();
    window.location.href = '/index.html';
}

function enviarRespuesta(paciente) {
    actualizarPaciente(paciente)
    mostrarMensajeOk("Encuesta enviada")
}

function mostrarMensajeOk(mensaje) {
    alert(mensaje)
}

function cargarPreguentas(encuesta){
    const contenedorDePreguntas = document.getElementById('contenedorDePreguentas')
    contenedorDePreguntas.innerHTML = '';

    const pregustas = encuesta.getPreguntas()
    console.log(pregustas)

    pregustas.forEach(({id, pregunta}) =>{
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        const parrafo = document.createElement('p');
        parrafo.setAttribute('id', `q${id}`);
        parrafo.innerText = `${id}. ${pregunta}`;

        const radioGroup = document.createElement('div');
        radioGroup.className = 'radio-group';

        for (let i = 1; i <= 10; i++) {
            const radioOption = document.createElement('div');
            radioOption.className = 'radio-option';

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.id = `q${id}-${i}`;
            radioInput.name = `q${id}`;
            radioInput.value = i;
            // if (i === 1) radioInput.required = true; // Solo el primer radio es obligatorio
            if(i === 1){
                radioInput.checked = true
            }
            const radioLabel = document.createElement('label');
            radioLabel.setAttribute('for', `q${id}-${i}`);
            radioLabel.innerText = i;

            // Agregar input y label al contenedor de la opción
            radioOption.appendChild(radioInput);
            radioOption.appendChild(radioLabel);

            // Agregar la opción al grupo de radio
            radioGroup.appendChild(radioOption);
        }

        questionDiv.appendChild(parrafo);
        questionDiv.appendChild(radioGroup);

        contenedorDePreguntas.appendChild(questionDiv);

    })

}


