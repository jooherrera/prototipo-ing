import {Zona} from "./zona.js";
import {AtencionConPaciente} from "./atencion.js";

export class CentroSalud {
    constructor(centro) {
        this.id = centro.id
        this.nombre = centro.nombre
        this.direccion = centro.direccion
        this.coordenada = {
            latitud: centro.coordenada.latitud,
            longitud: centro.coordenada.longitud
        }
        this.servicios = centro.servicios
    }

    getCoordenada() {
        return {
            latitud: this.coordenada.latitud,
            longitud: this.coordenada.longitud
        }
    }

    getNombre() {
        return this.nombre
    }

    getId(){
        return this.id
    }

    getDireccion() {
        return this.direccion
    }


    getServicios() {
        return this.servicios
    }
}

export class CentroSaludConZona extends CentroSalud {
    constructor(centro) {
        super(centro);
        this.zona = new Zona(centro.zona)
    }

    getNombreDeZona() {
        return this.zona.getNombre()
    }

}

export class CentroSaludConAtenciones extends CentroSalud {
    constructor(centro) {
        super(centro);
        this.atenciones = centro.atenciones.map(atencion => new AtencionConPaciente(atencion))
    }

    getAtenciones(){
        return this.atenciones
    }

    getPromedioDeEncuestas(){
        let completas = 0
        this.atenciones.forEach(atencion => {
            if(atencion.estaRespondida()){
                completas++
            }
        })
        return `${completas}/${this.atenciones.length}`
    }
}