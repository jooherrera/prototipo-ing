import {CentroSaludConZona} from "./centro-salud.js";

export class Atencion{
    constructor(atencion) {
        this.id = atencion.id
        this.fechaVisita = atencion.fechaVisita
        this.feedback = atencion.feedback
    }

    getIdentificardor(){
        return this.id
    }

    encuestaRespondida(){
        this.feedback = true
    }

    estaRespondida(){
        return this.feedback
    }
}

export class AtencionConCentroDeSalud extends Atencion{
    constructor(atencion) {
        super(atencion)
        this.centroDeSalud = new CentroSaludConZona(atencion.centroDeSalud)
    }

    getCentroDeSalud(){
        return this.centroDeSalud
    }

}

export class AtencionConPaciente extends Atencion{
    constructor(atencion) {
        super(atencion);
        this.paciente = atencion.paciente
    }

    getPaciente(){
        return this.paciente
    }


}