import { AtencionConCentroDeSalud} from "./atencion.js";
import {Usuario} from "./usuario.js";

export class Paciente extends Usuario {
    constructor(paciente) {
        super(paciente)
        this.atenciones = paciente.atenciones.map(atencion => new AtencionConCentroDeSalud(atencion))
    }

    getAtenciones() {
        return this.atenciones
    }

    responderEncuenta(atencionId) {
        this.atenciones.forEach(atencion => {
            if (atencion.id === atencionId) {
                atencion.encuestaRespondida()
            }
        })
    }
}
