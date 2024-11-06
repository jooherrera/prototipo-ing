import {Pregunta} from "./pregunta.js";

export class Encuesta{
    constructor(preguntas) {
        this.comentario = null
        this.preguntas =  preguntas.map(p => new Pregunta(p))
    }

    puntuarPregunta(puntaje, preguntaID){
        const pregunta = this.preguntas.find(pregunta => pregunta.id === +preguntaID);
        pregunta.agregarRespuesta(puntaje)
    }

    getPregunta(id){
        return this.preguntas.find(p => p.id = id)
    }

    getPreguntas(){
       return this.preguntas
    }

    agregarComentario(comentario){
        this.comentario = comentario
    }
}
