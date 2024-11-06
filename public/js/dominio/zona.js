import {CentroSalud} from "./centro-salud.js";

export class Zona{
    constructor(zona) {
        this.id = zona.id
        this.nombre = zona.nombre
    }

    getNombre() {
        return this.nombre
    }
}

export class ZonaConCentros extends Zona{
    constructor(zona) {
        super(zona);
        this.centrosDeSalud = zona.centrosDeSalud.map(centro => new CentroSalud(centro));
    }

    getCentrosDeSalud() {
        return this.centrosDeSalud;
    }

}