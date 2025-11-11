const backendURL = "http://localhost:3000/api";
const ctx = document.getElementById("earningsChart").getContext("2d");
let chart;

// Crear gráfica inicial
function createChart(labels = [], data = []) {
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Ingresos (sats)",
        data,
        fill: true,
        backgroundColor: "rgba(0, 238, 255, 0.1)",
        borderColor: "#00eaff",
        tension: 0.3
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, ticks: { color: "#00eaff" } },
        x: { ticks: { color: "#00eaff" } }
      },
      plugins: { legend: { labels: { color: "#fff" } } }
    }
  });
}

// Generar factura y QR
document.getElementById("btnGenerate").addEventListener("click", async () => {
  const amount = document.getElementById("amount").value;
  const memo = document.getElementById("memo").value;
  const qrCanvas = document.getElementById("qrCanvas");
  const qrContainer = document.getElementById("qrContainer");

  if (!amount) return alert("Por favor ingresa un monto.");

  try {
    const response = await fetch(`${backendURL}/invoice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, memo })
    });

    const data = await response.json();

    if (data.success) {
      const invoice = data.invoice;
      qrContainer.style.display = "block";
      document.getElementById("invoiceText").innerText = memo || "Pasaje";

      QRCode.toCanvas(qrCanvas, invoice, { width: 200 }, (err) => {
        if (err) console.error(err);
      });
    } else {
      alert("Error al generar factura");
    }
  } catch (err) {
    alert("Error de conexión al servidor");
  }
});

// Actualizar pagos y gráfica
document.getElementById("btnRefresh").addEventListener("click", async () => {
  try {
    const res = await fetch(`${backendURL}/payments`);
    const data = await res.json();

    const list = document.getElementById("paymentList");
    list.innerHTML = "";

    if (data.success && data.payments.length) {
      const labels = [];
      const values = [];

      data.payments.slice(-6).forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.memo} — ${p.amount} sats — ${p.paid ? "✅" : "⏳"}`;
        list.appendChild(li);

        labels.push(p.memo);
        values.push(p.amount);
      });

      createChart(labels, values);
    } else {
      list.innerHTML = "<li>No hay pagos registrados</li>";
      createChart([], []);
    }
  } catch (error) {
    alert("Error al obtener pagos");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  createChart([], []);
});
