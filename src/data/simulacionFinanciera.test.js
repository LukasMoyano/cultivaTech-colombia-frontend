// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  HORIZONTES_SIMULACION,
  MODELOS_PROYECTO_EJEMPLOS,
  calcularProyeccionCiclos,
} from "./simulacionFinanciera";

describe("simulacionFinanciera — proyección multi-ciclo honesta y proporcional", () => {
  it("soporta todos los horizontes (3, 6, 9, 12, 18 y 24 meses) con ciclos de 90 días", () => {
    expect(HORIZONTES_SIMULACION.map((h) => h.meses)).toEqual([3, 6, 9, 12, 18, 24]);

    const de3m = calcularProyeccionCiclos({ montoCop: 1200000, tasaCicloPct: 20, meses: 3, reinvertir: true });
    const de12m = calcularProyeccionCiclos({ montoCop: 1200000, tasaCicloPct: 20, meses: 12, reinvertir: true });
    const de24m = calcularProyeccionCiclos({ montoCop: 1200000, tasaCicloPct: 20, meses: 24, reinvertir: true });

    expect(de3m.ciclos).toBe(1);
    expect(de3m.totalFinalEstimado).toBe(1440000);
    expect(de12m.ciclos).toBe(4);
    expect(de12m.totalFinalEstimado).toBeGreaterThan(de3m.totalFinalEstimado);
    expect(de24m.ciclos).toBe(8);
    expect(de24m.totalFinalEstimado).toBeGreaterThan(de12m.totalFinalEstimado);
  });

  it("produce utilidad estrictamente proporcional al capital y diferencia entre compuesto y simple", () => {
    const aporteMenor = calcularProyeccionCiclos({ montoCop: 1200000, tasaCicloPct: 20, meses: 12, reinvertir: false });
    const aporteDoble = calcularProyeccionCiclos({ montoCop: 2400000, tasaCicloPct: 20, meses: 12, reinvertir: false });
    const compuesto = calcularProyeccionCiclos({ montoCop: 1200000, tasaCicloPct: 20, meses: 12, reinvertir: true });

    expect(aporteDoble.utilidadNetaEstimada).toBe(aporteMenor.utilidadNetaEstimada * 2);
    expect(compuesto.utilidadNetaEstimada).toBeGreaterThan(aporteMenor.utilidadNetaEstimada);
  });

  it("maneja entradas límite sin devolver NaN ni valores negativos y expone múltiples ejemplos", () => {
    const invalido = calcularProyeccionCiclos({ montoCop: -500, tasaCicloPct: 20, meses: 6 });
    expect(invalido.capital).toBe(0);
    expect(invalido.utilidadNetaEstimada).toBe(0);
    expect(MODELOS_PROYECTO_EJEMPLOS.length).toBeGreaterThanOrEqual(4);
  });
});
