document
    .getElementById('paciente-btn-1')
    .addEventListener('click', () => loginComoPaciente(1))

document
    .getElementById('paciente-btn-2')
    .addEventListener('click', () => loginComoPaciente(2))

document
    .getElementById('paciente-btn-3')
    .addEventListener('click', () => loginComoPaciente(3))

document
    .getElementById('coordinador-btn-1')
    .addEventListener('click', () => loginComoCoordinador(1))

document
    .getElementById('coordinador-btn-2')
    .addEventListener('click', () => loginComoCoordinador(2))

async function loginComoPaciente(paciente_id) {
    localStorage.setItem('paciente_logueado', JSON.stringify(paciente_id))
    window.location.href = 'html/vista-paciente.html'
}


function loginComoCoordinador(coordinador_id) {
    localStorage.setItem('coordinador_logueado', JSON.stringify(coordinador_id))
    window.location.href = 'html/vista-coordinador.html'
}
