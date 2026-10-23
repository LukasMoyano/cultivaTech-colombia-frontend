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
import { GAS_META } from "./gas-concentration";

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

// Paleta legible tanto en tarjeta clara (tema día) como oscura (tema noche)
const GRID = "rgba(128, 128, 128, 0.18)";
const TICK = "#6B7280";

/**
 * Gráfica dual de gases en ppm (CH₄ medido + CO₂ equivalente estimado).
 * Paleta neutra del sistema de diseño CultivaTech (sin tema oscuro propio).
 *
 * @param {Array} history - Lecturas enriquecidas { timeLabel, ch4Ppm, co2Ppm }
 */
function GasChart({ history }) {
  const data = useMemo(
    () => ({
      labels: history.map((h) => h.timeLabel),
      datasets: [
        {
          label: `${GAS_META.ch4.label} (ppm)`,
          data: history.map((h) => h.ch4Ppm),
          borderColor: GAS_META.ch4.color,
          backgroundColor: "rgba(26, 138, 64, 0.12)",
          fill: true,
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
        {
          label: `${GAS_META.co2.label} (ppm, est.)`,
          data: history.map((h) => h.co2Ppm),
          borderColor: GAS_META.co2.color,
          backgroundColor: "transparent",
          borderDash: [6, 4],
          fill: false,
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
      ],
    }),
    [history]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 400, easing: "easeOutQuart" },
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: { color: TICK, boxWidth: 22, font: { size: 11 } },
        },
        tooltip: {
          callbacks: {
            footer: (items) => {
              const i = items[0]?.dataIndex;
              const ch4 = history[i]?.ch4Ppm;
              if (ch4 == null) return "";
              if (ch4 >= 1000) return "CH₄ alto: ventilar el área";
              if (ch4 > 200) return "CH₄ sobre el fondo: vigilar tendencia";
              return "Aire limpio";
            },
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: "Tiempo", color: TICK, font: { size: 11 } },
          ticks: { color: TICK, maxTicksLimit: 6, font: { size: 10 } },
          grid: { color: GRID },
        },
        y: {
          title: { display: true, text: "Concentración (ppm)", color: TICK, font: { size: 11 } },
          ticks: { color: TICK, font: { size: 10 } },
          grid: { color: GRID },
          suggestedMin: 0,
        },
      },
    }),
    [history]
  );

  if (history.length === 0) return null;

  return (
    <div style={{ position: "relative", height: 240 }}>
      <Line data={data} options={options} aria-label="Concentración de CH4 y CO2 en tiempo real" />
    </div>
  );
}

GasChart.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      timeLabel: PropTypes.string,
      ch4Ppm: PropTypes.number,
      co2Ppm: PropTypes.number,
    })
  ).isRequired,
};

export default React.memo(GasChart);
