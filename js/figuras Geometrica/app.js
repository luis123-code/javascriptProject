document.addEventListener('DOMContentLoaded', () => {
  const datoInput = document.querySelector('#datoPrincipal');
  const numeroInput = document.querySelector('#numeroAsociado');
  const figuraSelect = document.querySelector('#figuraSelect');
  const resultadoDiv = document.querySelector('.resultado');

  // Detectar cambios
  [datoInput, numeroInput, figuraSelect].forEach(el => {
    el.addEventListener('input', calcularArea);
  });

  function calcularArea() {
    const figura = figuraSelect.value;
    const dato = datoInput.value.trim();
    const numero = parseFloat(numeroInput.value);

    if (!figura || isNaN(numero) || numero <= 0) {
      resultadoDiv.classList.remove('alert-success');
      resultadoDiv.classList.add('alert-info');
      resultadoDiv.innerHTML = `<i class="bi bi-info-circle me-2"></i> Aquí se mostrará el resultado del cálculo.`;
      return;
    }

    let area = 0;
    let mensaje = '';

    switch (figura) {
      case 'cuadrado':
        area = numero ** 2;
        mensaje = `El área del cuadrado (${dato}) es ${area.toFixed(2)} u².`;
        break;
      case 'rectangulo':
        area = numero * numero; // Asume base = altura = número
        mensaje = `Área del rectángulo (${dato} x ${dato}) es ${area.toFixed(2)} u².`;
        break;
      case 'triangulo':
        area = (numero * numero) / 2; // Asume base = altura = número
        mensaje = `Área del triángulo (${dato}) es ${area.toFixed(2)} u².`;
        break;
      case 'circulo':
        area = Math.PI * numero ** 2;
        mensaje = `Área del círculo (radio ${dato}) es ${area.toFixed(2)} u².`;
        break;
      case 'rombo':
        area = (numero * numero) / 2; // Asume diagonales iguales
        mensaje = `Área del rombo (D1=${dato}, D2=${dato}) es ${area.toFixed(2)} u².`;
        break;
      case 'trapecio':
        area = ((numero + numero) * numero) / 2; // base mayor = base menor = altura = número
        mensaje = `Área del trapecio (base=${dato}, altura=${dato}) es ${area.toFixed(2)} u².`;
        break;
      case 'paralelogramo':
        area = numero * numero;
        mensaje = `Área del paralelogramo (base=${dato}, altura=${dato}) es ${area.toFixed(2)} u².`;
        break;
      case 'hexagono':
        area = (3 * Math.sqrt(3) * numero ** 2) / 2;
        mensaje = `Área del hexágono (lado=${dato}) es ${area.toFixed(2)} u².`;
        break;
      case 'pentagono':
        area = (5 * numero ** 2) / (4 * Math.tan(Math.PI / 5));
        mensaje = `Área del pentágono (lado=${dato}) es ${area.toFixed(2)} u².`;
        break;
      case 'elipse':
        area = Math.PI * numero * numero; // Asume eje mayor = eje menor = número
        mensaje = `Área de la elipse (a=${dato}, b=${dato}) es ${area.toFixed(2)} u².`;
        break;
      default:
        mensaje = 'Figura no reconocida.';
    }

    resultadoDiv.classList.remove('alert-info');
    resultadoDiv.classList.add('alert-success');
    resultadoDiv.innerHTML = `<i class="bi bi-check-circle me-2"></i> ${mensaje}`;
  }
});
