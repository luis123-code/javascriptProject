const tituloInput = document.querySelector('#titulo');
const personaInput = document.querySelector('#persona');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const descripcionInput = document.querySelector('#descripcion');

// Contenedor para las citas
const contenedorCitas = document.querySelector('#citas');

// Formulario nuevas citas
const formulario = document.querySelector('#nueva-cita');
formulario.addEventListener('submit', nuevaCita);

let editando = false;

// Eventos
eventListeners();
function eventListeners() {
    tituloInput.addEventListener('change', datosCita);
    personaInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    descripcionInput.addEventListener('change', datosCita);
}

const citaObj = {
    titulo: '',
    persona: '',
    telefono: '',
    fecha: '',
    hora: '',
    descripcion: ''
};

function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

// Clases
class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }

    editarCita(citaActualizada) {
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
    }
}

class UI {
    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        divMensaje.classList.add(tipo === 'error' ? 'alert-danger' : 'alert-success');
        divMensaje.textContent = mensaje;
        document.querySelector('#contenido')?.insertBefore(divMensaje, document.querySelector('.agregar-cita')) || document.body.prepend(divMensaje);
        setTimeout(() => divMensaje.remove(), 3000);
    }

    imprimirCitas({ citas }) {
        this.limpiarHTML();
        citas.forEach(cita => {
            const { titulo, persona, telefono, fecha, hora, descripcion, id } = cita;

            const divCita = document.createElement('li');
            divCita.classList.add('list-group-item');
            divCita.dataset.id = id;

            divCita.innerHTML = `
                <h5>${titulo}</h5>
                <p><strong>Persona:</strong> ${persona}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
                <p><strong>Fecha:</strong> ${fecha}</p>
                <p><strong>Hora:</strong> ${hora}</p>
                <p><strong>Descripción:</strong> ${descripcion}</p>
            `;

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm', 'me-2');
            btnEliminar.innerHTML = '<i class="bi bi-trash"></i> Eliminar';
            btnEliminar.onclick = () => eliminarCita(id);

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info', 'btn-sm');
            btnEditar.innerHTML = '<i class="bi bi-pencil-square"></i> Editar';
            btnEditar.onclick = () => cargarEdicion(cita);

            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            contenedorCitas.appendChild(divCita);
        });
    }

    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

const ui = new UI();
const administrarCitas = new Citas();

function nuevaCita(e) {
    e.preventDefault();

    const { titulo, persona, telefono, fecha, hora, descripcion } = citaObj;

    if (!titulo || !persona || !fecha || !hora || !descripcion) {
        ui.imprimirAlerta('Todos los campos obligatorios deben ser llenados', 'error');
        return;
    }

    if (editando) {
        administrarCitas.editarCita({ ...citaObj });
        ui.imprimirAlerta('Guardado correctamente');
        formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cita';
        editando = false;
    } else {
        citaObj.id = Date.now();
        administrarCitas.agregarCita({ ...citaObj });
        ui.imprimirAlerta('Cita agregada correctamente');
    }

    ui.imprimirCitas(administrarCitas);
    reiniciarObjeto();
    formulario.reset();
}

function reiniciarObjeto() {
    citaObj.titulo = '';
    citaObj.persona = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.descripcion = '';
}

function eliminarCita(id) {
    administrarCitas.eliminarCita(id);
    ui.imprimirCitas(administrarCitas);
}

function cargarEdicion(cita) {
    const { titulo, persona, telefono, fecha, hora, descripcion, id } = cita;

    tituloInput.value = titulo;
    personaInput.value = persona;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    descripcionInput.value = descripcion;

    citaObj.titulo = titulo;
    citaObj.persona = persona;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.descripcion = descripcion;
    citaObj.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    editando = true;
}
