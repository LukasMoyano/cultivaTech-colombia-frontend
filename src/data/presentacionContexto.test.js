// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  FUENTES_OFICIALES_CAMPO,
  PILARES_CRISIS_CAMPO,
  RESPUESTA_CULTIVATECH_PILARES,
} from "./presentacionContexto";

describe("presentacionContexto — rigor documental y estructura introductoria", () => {
  it("expone exactamente los 3 ejes de diagnóstico y las 3 respuestas de CultivaTech", () => {
    expect(PILARES_CRISIS_CAMPO).toHaveLength(3);
    expect(RESPUESTA_CULTIVATECH_PILARES).toHaveLength(3);
    const textos = PILARES_CRISIS_CAMPO.map((p) => `${p.dato} ${p.detalle}`).join(" ");
    expect(textos).toMatch(/27,7 %/);
    expect(textos).toMatch(/17,6 %/);
    expect(textos).toMatch(/-15 %/);
  });

  it("cita explícitamente ANT, DANE, DNP/UPRA y SNIA sin contener datos personales ni claves", () => {
    expect(FUENTES_OFICIALES_CAMPO.length).toBeGreaterThanOrEqual(4);
    const corpus = FUENTES_OFICIALES_CAMPO.map((f) => `${f.entidad} ${f.resumen}`).join(" ");
    expect(corpus).toMatch(/Agencia Nacional de Tierras/);
    expect(corpus).toMatch(/7\.000\.000 ha/);
    expect(corpus).toMatch(/DANE/);
    expect(corpus).toMatch(/UPRA/);
    expect(corpus).toMatch(/plan-nacional-de-desarrollo-2022-2026/);
    expect(corpus).toMatch(/derecho-humano-a-la-alimentacion/);
    expect(corpus).not.toMatch(/sk-|password|@gmail/i);
  });
});
