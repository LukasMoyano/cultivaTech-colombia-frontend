// @vitest-environment node
import { describe, expect, it } from "vitest";
import { getNavItems } from "./navigation";

describe("navigation — coherencia de menú en Header y Sidebar", () => {
  it("ubica Blockchain justo después de Inicio en Agricultura y conserva el resto del flujo", () => {
    const headerKeys = getNavItems("agricultor", "header").map((i) => i.key);
    const sidebarKeys = getNavItems("agricultor", "sidebar").map((i) => i.key);

    const esperado = [
      "landing",
      "como_funciona",
      "dashboard",
      "telemetria",
      "cultivos",
      "alertas",
      "foro",
      "robot",
    ];

    expect(headerKeys).toEqual(esperado);
    expect(sidebarKeys).toEqual(esperado);
  });

  it("ubica Blockchain justo después de Inicio también en Inversionista (Opción A)", () => {
    const headerKeys = getNavItems("inversionista", "header").map((i) => i.key);
    const sidebarKeys = getNavItems("inversionista", "sidebar").map((i) => i.key);

    const esperado = [
      "landing",
      "como_funciona",
      "inversion_oferta",
      "inversion_simulador",
      "inversion_portafolio",
      "inversion_salida",
    ];

    expect(headerKeys).toEqual(esperado);
    expect(sidebarKeys).toEqual(esperado);
  });
});
