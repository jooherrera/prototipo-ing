
export class Usuario{
    constructor(usuario) {
        this.id = usuario.id
        this.nombre = usuario.nombre
        this.apellido = usuario.apellido
        this.dni = usuario.dni
        this.mail = usuario.mail
        this.telefono = usuario.telefono
        this.avatar = usuario.avatar
        this.direccion = usuario.direccion
        this.ultimaConexion = usuario.ultimaConexion ? new Date(usuario.ultimaConexion) : new Date()
    }

    getNombreCompleto(){
        return `${this.nombre} ${this.apellido}`
    }

    getAvatar(){
        return this.avatar
    }

}
