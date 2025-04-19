// Saldos por defecto
const saldosIniciales = {
  bn: 0.00,
  at: 1.00,
  tg: 15.00,
  ef: 58.00,
  az: 100.00,
  bv: 215.00,
  py: 458.00,
  yj: 636.00,
  ug: 759.00,
  oc: 11564.00
};

// Cargar saldos desde localStorage o usar valores iniciales
function cargarSaldos() {
  const guardados = localStorage.getItem("saldos");
  return guardados ? JSON.parse(guardados) : { ...saldosIniciales };
}

// Guardar saldos en localStorage
function guardarSaldos(saldos) {
  localStorage.setItem("saldos", JSON.stringify(saldos));
}

// Mostrar saldos en la interfaz
function mostrarSaldos(saldos) {
  let total = 0;

  for (const [id, valor] of Object.entries(saldos)) {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.textContent = valor.toFixed(2);
      total += valor;

      // Permitir edición
      elemento.style.cursor = "pointer";
      elemento.title = "Haz clic para editar";

      elemento.onclick = () => {
        const nuevo = prompt(`Editar saldo de ${id.toUpperCase()}:`, valor);
        if (nuevo !== null && !isNaN(parseFloat(nuevo))) {
          saldos[id] = parseFloat(nuevo);
          guardarSaldos(saldos);
          mostrarSaldos(saldos);
        }
      };
    }
  }

  const totalElemento = document.getElementById("st");
  if (totalElemento) {
    totalElemento.textContent = total.toFixed(2);
  }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const saldos = cargarSaldos();
  mostrarSaldos(saldos);
});

