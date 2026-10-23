import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registro local: el componente funciona aunque App.jsx no registre Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function pointColor(raw) {
  if (raw > 2200) return "#EF4444";
  if (raw >= 1200) return "#F59E0B";
  return "#10B981";
}

/**
 * Gráfica principal en tiempo real (ventana deslizante).
 * @param {Array} history - Lecturas { timeLabel, mq4_raw, voltage }
 * @param {"raw"|"voltage"} metric - Métrica graficada
 */
function Mq4Chart({ history, metric = "raw" }) {
  const isVoltage = metric === "voltage";

  const data = useMemo(() => {
    const values = history.map((h) => (isVoltage ? h.voltage : h.mq4_raw));
    return {
      labels: history.map((h) => h.timeLabel),
      datasets: [
        {
          label: isVoltage ? "Voltaje (V)" : "MQ-4 Raw (ADC)",
          data: values,
          borderColor: "#34D399",
          backgroundColor: (ctx) => {
            const { chart } = ctx;
            const { ctx: c, chartArea } = chart;
            if (!chartArea) return "rgba(52, 211, 153, 0.15)";
            const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            g.addColorStop(0, "rgba(52, 211, 153, 0.35)");
            g.addColorStop(1, "rgba(52, 211, 153, 0.02)");
            return g;
          },
          fill: true,
          tension: 0.4, // curva suave al insertar cada punto
          borderWidth: 2,
          pointRadius: (ctx) => (ctx.dataIndex === values.length - 1 ? 4 : 0),
          pointHoverRadius: 5,
          pointBackgroundColor: values.map(pointColor),
          pointBorderColor: "#06281d",
          pointBorderWidth: 1,
        },
      ],
    };
  }, [history, isVoltage]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 400, easing: "easeOutQuart" },
      transitions: { active: { animation: { duration: 250 } } },
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          display: true,
          labels: { color: "#C9E8D8", boxWidth: 14, font: { size: 11 } },
        },
        tooltip: {
          backgroundColor: "rgba(6, 30, 21, 0.95)",
          borderColor: "rgba(52, 211, 153, 0.4)",
          borderWidth: 1,
          titleColor: "#A7F3D0",
          bodyColor: "#E7F5ED",
          padding: 10,
          callbacks: {
            afterBody: (items) => {
              const raw = history[items[0]?.dataIndex]?.mq4_raw;
              if (raw == null) return "";
              if (raw > 2200) return "Estado: CRÍTICO";
              if (raw >= 1200) return "Estado: PRECAUCIÓN";
              return "Estado: NORMAL";
            },
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: "Tiempo", color: "#7FA895", font: { size: 11 } },
          ticks: { color: "#7FA895", maxTicksLimit: 8, font: { size: 10 } },
          grid: { color: "rgba(148, 196, 174, 0.08)" },
        },
        y: {
          title: {
            display: true,
            text: isVoltage ? "Voltaje (V)" : "Concentración (MQ-4 Raw)",
            color: "#7FA895",
            font: { size: 11 },
          },
          ticks: { color: "#7FA895", font: { size: 10 } },
          grid: { color: "rgba(148, 196, 174, 0.10)" },
          suggestedMin: isVoltage ? 0 : 0,
          suggestedMax: isVoltage ? 3.4 : 3000,
        },
      },
    }),
    [history, isVoltage]
  );

  if (history.length === 0) {
    return (
      <div className="mq4-chart-empty">
        <span aria-hidden="true">📡</span>
        <p>Esperando telemetría del ESP32…</p>
        <small>Conecta el bridge en ws://localhost:8080</small>
      </div>
    );
  }

  return (
    <div className="mq4-chart-wrap">
      <Line data={data} options={options} aria-label="Gráfica MQ-4 en tiempo real" />
    </div>
  );
}

Mq4Chart.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      timeLabel: PropTypes.string,
      mq4_raw: PropTypes.number,
      voltage: PropTypes.number,
    })
  ).isRequired,
  metric: PropTypes.oneOf(["raw", "voltage"]),
};

export default React.memo(Mq4Chart);
