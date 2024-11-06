export class Header{

    actualizarNombre(nombre) {
        document.querySelector('.user-name').innerHTML = nombre
    }

    actualizarAvatar(avatar) {
        document.querySelector('.avatar').src = avatar
    }
}
