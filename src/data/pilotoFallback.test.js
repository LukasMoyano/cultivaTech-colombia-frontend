// @vitest-environment node
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import {
  RESUMEN_PILOTO_FALLBACK,
  RIESGOS_OBLIGATORIOS_PILOTO,
  TERMINOS_Y_CONDICIONES_RESUMEN,
  formatCop,
} from "./pilotoFallback";

describe("pilotoFallback — reglas de transparencia y coherencia financiera", () => {
  it("formatea pesos colombianos COP correctamente y maneja entradas inválidas", () => {
    expect(formatCop(1200000)).toContain("COP");
    expect(formatCop(1200000)).toMatch(/^\$1[.,]200[.,]000 COP$/);
    expect(formatCop(0)).toBe("$0 COP");
    expect(formatCop(Number.NaN)).toBe("$0 COP");
    expect(formatCop("invalido")).toBe("$0 COP");
  });

  it("incluye los 3 riesgos obligatorios y cláusulas jurídicas Ley 1581", () => {
    expect(RIESGOS_OBLIGATORIOS_PILOTO).toHaveLength(3);
    const textosRiesgo = RIESGOS_OBLIGATORIOS_PILOTO.map((r) => `${r.titulo} ${r.detalle}`).join(" ");
    expect(textosRiesgo).toMatch(/puedes perder/i);
    expect(textosRiesgo).toMatch(/Fogafín/i);
    expect(textosRiesgo).toMatch(/90/);

    expect(TERMINOS_Y_CONDICIONES_RESUMEN.length).toBeGreaterThanOrEqual(4);
    const textosTc = TERMINOS_Y_CONDICIONES_RESUMEN.map((t) => `${t.titulo} ${t.texto}`).join(" ");
    expect(textosTc).toMatch(/19 aliados/i);
    expect(textosTc).toMatch(/Ley 1581 de 2012/i);
  });

  it("mantiene consistencia aritmética exacta en el Lote Piloto #01 y desglose de costos", () => {
    const { lote, oraculo } = RESUMEN_PILOTO_FALLBACK;
    expect(lote.totalParticipaciones * lote.valorParticipacionCop).toBe(lote.metaCop);
    expect(lote.participacionesColocadas * lote.valorParticipacionCop).toBe(lote.fondeadoCop);

    const sumaCostos = lote.desgloseCostos.reduce((acc, item) => acc + item.valorCop, 0);
    expect(sumaCostos).toBe(lote.metaCop);
    expect(lote.maxAliadosPrivados).toBeLessThan(20);
    expect(oraculo.etiquetaEstado).toBe("Oráculo en Simulación Local (listo para Sepolia)");
  });

  it("mantiene paridad entre el JSON del backend y el respaldo del frontend sin PII", () => {
    const backendJsonUrl = new URL("../../backend/data/lotes_piloto.json", import.meta.url);
    const raw = fs.readFileSync(backendJsonUrl, "utf8");
    const parsed = JSON.parse(raw);

    expect(parsed.lotePrincipal.id).toBe(RESUMEN_PILOTO_FALLBACK.lote.id);
    expect(parsed.lotePrincipal.metaCop).toBe(RESUMEN_PILOTO_FALLBACK.lote.metaCop);
    expect(raw).not.toMatch(/@gmail|@hotmail|passwordHash|privateKey/i);
  });
});
