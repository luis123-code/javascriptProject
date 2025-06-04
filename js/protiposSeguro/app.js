// Constructor para Seguro
function Seguro(marca, anio, tipo) {
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {
  const base = 2000;
  let cantidad;

  switch (this.marca) {
    case '1':
      cantidad = base * 1.15;
      break;
    case '2':
      cantidad = base * 1.05;
      break;
    case '3':
      cantidad = base * 1.35;
      break;
  }

  const diferencia = new Date().getFullYear() - this.anio;
  cantidad -= ((diferencia * 3) * cantidad) / 100;

  if (this.tipo === 'basico') {
    cantidad *= 1.30;
  } else {
    cantidad *= 1.50;
  }

  return cantidad.toFixed(2);
};

// UI
function Interfaz() {}

Interfaz.prototype.mostrarMensaje = function (mensaje, tipo) {
  const div = document.createElement('div');
  div.classList.add('alert', 'mt-3');

  if (tipo === 'error') {
    div.classList.add('alert-danger');
  } else {
    div.classList.add('alert-success');
  }

  div.textContent = mensaje;

  const formulario = document.querySelector('#cotizar-seguro');
  formulario.insertBefore(div, document.querySelector('#resultado'));

  setTimeout(() => {
    div.remove();
  }, 3000);
};

Interfaz.prototype.mostrarResultado = function (seguro, total) {
  const resultado = document.querySelector('#resultado');
  const marcas = {
    '1': 'Americano',
    '2': 'Asiático',
    '3': 'Europeo'
  };

  const div = document.createElement('div');
  div.classList.add('mt-4', 'border', 'p-3', 'bg-light', 'rounded');

  div.innerHTML = `
    <h4 class="mb-3">Tu Resumen:</h4>
    <p><strong>Marca:</strong> ${marcas[seguro.marca]}</p>
    <p><strong>Año:</strong> ${seguro.anio}</p>
    <p><strong>Tipo de cobertura:</strong> ${seguro.tipo}</p>
    <p class="fs-5"><strong>Total:</strong> $${total}</p>
  `;

  const spinner = document.querySelector('#cargando');
  spinner.classList.remove('d-none');
  spinner.classList.add('d-block');

  setTimeout(() => {
    spinner.classList.remove('d-block');
    spinner.classList.add('d-none');
    resultado.appendChild(div);
  }, 3000);
};

Interfaz.prototype.llenarOpciones = function () {
  const max = new Date().getFullYear(),
        min = max - 20;

  const selectAnios = document.querySelector('#year');

  for (let i = max; i >= min; i--) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectAnios.appendChild(option);
  }
};

// Instanciar
const interfaz = new Interfaz();

document.addEventListener('DOMContentLoaded', () => {
  interfaz.llenarOpciones();
});

const formulario = document.querySelector('#cotizar-seguro');

formulario.addEventListener('submit', e => {
  e.preventDefault();

  const marca = document.querySelector('#marca').value;
  const year = document.querySelector('#year').value;
  const tipo = document.querySelector('input[name="tipo"]:checked');

  if (marca === '' || year === '' || !tipo) {
    interfaz.mostrarMensaje('Faltan datos, revisa el formulario.', 'error');
    return;
  }

  // Limpiar resultado anterior
  const resultadoAnterior = document.querySelector('#resultado div');
  if (resultadoAnterior) {
    resultadoAnterior.remove();
  }

  const seguro = new Seguro(marca, year, tipo.value);
  const total = seguro.cotizarSeguro();

  interfaz.mostrarResultado(seguro, total);
  interfaz.mostrarMensaje('Cotizando seguro...', 'correcto');
});
