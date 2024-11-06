export class Mapa {
    constructor(container) {
        this.map = L.map(container);
        this.#cargarMapaBase();
    }

     fromCoords(lat, lng, zoom = 12) {
         this.map.setView([lat, lng],zoom)
         return this;
    }

    static onContainer(idDiv) {
        if(!idDiv){
            throw new Error('Falta id del container')
        }
        return new Mapa(idDiv)
    }

    agregarMarcador(lat, lng, popupText, action) {
        if (!lat || !lng || !popupText || !action) {
            throw new Error("Faltan parametros para agregar un marcador")
        }

        const marker = L.marker([lat, lng]).addTo(this.map);
        marker.bindPopup(popupText).on('click', () => action(popupText));

    }

    #cargarMapaBase() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }
}
