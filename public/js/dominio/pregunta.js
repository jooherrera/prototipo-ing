export class Pregunta{
    constructor(pregunta) {
        this.id = pregunta.id
        this.pregunta = pregunta.pregunta
        this.respuesta = null
    }

    agregarRespuesta(puntaje){
        this.respuesta = puntaje
    }

    getTexto(){
        return this.pregunta
    }
}
