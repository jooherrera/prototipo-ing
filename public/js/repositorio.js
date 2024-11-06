import {Paciente} from "./dominio/paciente.js";
import {Encuesta} from "./dominio/encuesta.js";
import {Coordinador} from "./dominio/coordinador.js";
import {CentroSaludConAtenciones} from "./dominio/centro-salud.js";

export async function obtenerPaciente(){
    let paciente = localStorage.getItem('paciente')
    if(paciente){
        return new Paciente(JSON.parse(paciente))
    }
    const resp = await fetch('../db/pacientes.json')
    const pacientes = await resp.json()
    const idPacienteLogueado = localStorage.getItem('paciente_logueado')
    const paciente_encontrado = pacientes.find(paciente => paciente.id === +idPacienteLogueado)
    paciente = new Paciente(paciente_encontrado)
    actualizarPaciente(paciente)
    return paciente
}

export async function obtenerCoordinador(){
    let coordinador = localStorage.getItem('coordinador')
    if(coordinador){
        return new Coordinador(JSON.parse(coordinador))
    }
    const resp = await fetch('../db/coordinadores.json')
    const coordinadores = await resp.json()
    const idCoordinadorLogueado = localStorage.getItem('coordinador_logueado')
    const coordinador_encontrado = coordinadores.find(coordinador => coordinador.id === +idCoordinadorLogueado)
    return new Coordinador(coordinador_encontrado)
}

export async function obtenerCentroSalud(id){
    const resp = await fetch(`../db/centro_de_salud.json`)
    const centrosDeSalud = await resp.json()
    const centro = centrosDeSalud.find(centro => centro.id === id)
    return new CentroSaludConAtenciones(centro)
}

export function actualizarPaciente(paciente){
    localStorage.setItem('paciente',JSON.stringify(paciente))
}

export async function obtenerEncuesta(){
    const resp = await fetch('../db/preguntas.json')
    const preguntas = await resp.json()
    return new Encuesta(preguntas)
}

