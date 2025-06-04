// Variables y Selectores
const formulario = document.getElementById('agregar-gasto');
const gastosListado = document.querySelector('#gastos ul');

// Eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
    gastosListado.addEventListener('click', eliminarGasto);
}

// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id.toString() !== id);
        this.calcularRestante();
    }

    calcularRestante() {
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        document.querySelector('#total').textContent = cantidad.presupuesto;
        document.querySelector('#restante').textContent = cantidad.restante;
    }

    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'mt-3');

        divMensaje.classList.add(tipo === 'error' ? 'alert-danger' : 'alert-success');
        divMensaje.textContent = mensaje;
        // divMensaje.style.position = 'absolute';
        // divMensaje.style.bottom = '-81px';
        // divMensaje.style.left = '21px';

        document.querySelector('.mensaje').insertBefore(divMensaje, document.querySelector('.mensaje').firstChild);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);12
    }

    agregarGastoListado(gastos) {
        this.limpiarHTML();

        gastos.forEach(gasto => {
            const { nombre, cantidad, id } = gasto;

            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            nuevoGasto.innerHTML = `
                ${nombre}
                <span class="badge bg-primary rounded-pill">$${cantidad}</span>
            `;

            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'btn-sm', 'borrar-gasto');
            btnBorrar.textContent = 'Borrar';
            nuevoGasto.appendChild(btnBorrar);

            gastosListado.appendChild(nuevoGasto);
        });
    }

    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestoObj) {
        const { presupuesto, restante } = presupuestoObj;
        const restanteDiv = document.querySelector('.restante');

        restanteDiv.classList.remove('alert-success', 'alert-warning', 'alert-danger');

        if (restante <= 0) {
            this.imprimirAlerta('El presupuesto se ha agotado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        } else if ((presupuesto / 4) > restante) {
            restanteDiv.classList.add('alert-danger');
        } else if ((presupuesto / 2) > restante) {
            restanteDiv.classList.add('alert-warning');
        } else {
            restanteDiv.classList.add('alert-success');
        }
    }

    limpiarHTML() {
        while (gastosListado.firstChild) {
            gastosListado.removeChild(gastosListado.firstChild);
        }
    }
}

const ui = new UI();
let presupuesto;

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cuál es tu presupuesto semanal?');

    if (
        presupuestoUsuario === '' ||
        presupuestoUsuario === null ||
        isNaN(presupuestoUsuario) ||
        presupuestoUsuario <= 0
    ) {
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);
    ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e) {
    e.preventDefault();

    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no válida', 'error');
        return;
    }

    const gasto = { nombre, cantidad, id: Date.now() };

    presupuesto.nuevoGasto(gasto);

    ui.imprimirAlerta('Gasto agregado correctamente', 'success');
    ui.agregarGastoListado(presupuesto.gastos);
    ui.comprobarPresupuesto(presupuesto);
    ui.actualizarRestante(presupuesto.restante);

    formulario.reset();
}

function eliminarGasto(e) {
    if (e.target.classList.contains('borrar-gasto')) {
        const { id } = e.target.parentElement.dataset;

        presupuesto.eliminarGasto(id);
        ui.agregarGastoListado(presupuesto.gastos);
        ui.comprobarPresupuesto(presupuesto);
        ui.actualizarRestante(presupuesto.restante);
    }
}
