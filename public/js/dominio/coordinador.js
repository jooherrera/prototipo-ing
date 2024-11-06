import {ZonaConCentros} from "./zona.js";
import {Usuario} from "./usuario.js";

export class Coordinador extends Usuario {
    constructor(coordinador){
        super(coordinador)
        this.zona = new ZonaConCentros(coordinador.zona);
    }

    zonaAsignada(){
        return this.zona;
    }
}