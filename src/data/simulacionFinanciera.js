/**
 * Lógica económica transparente y catálogo de ejemplos reales para el Módulo Inversionistas.
 * Centraliza proyecciones multi-ciclo (3 a 24 meses) para evitar cálculos duplicados.
 */

export const HORIZONTES_SIMULACION = [
  { meses: 3, ciclos: 1, etiqueta: "3 meses", sub: "1 cosecha (90 días)" },
  { meses: 6, ciclos: 2, etiqueta: "6 meses", sub: "2 cosechas" },
  { meses: 9, ciclos: 3, etiqueta: "9 meses", sub: "3 cosechas" },
  { meses: 12, ciclos: 4, etiqueta: "12 meses", sub: "4 cosechas (1 año)" },
  { meses: 18, ciclos: 6, etiqueta: "18 meses", sub: "6 cosechas" },
  { meses: 24, ciclos: 8, etiqueta: "24 meses", sub: "8 cosechas (2 años)" },
];

export const EJEMPLOS_APORTE_PILOTO = [
  {
    id: "semilla",
    icono: "🌱",
    nombre: "Ejemplo Semilla",
    montoCop: 360000,
    puestos: 3,
    cubreEnFinca: "Cubre bolsas de sustrato inoculado y empaques biodegradables de entrega.",
  },
  {
    id: "productor",
    icono: "🌿",
    nombre: "Ejemplo Aliado Base",
    montoCop: 1200000,
    puestos: 10,
    cubreEnFinca: "Financia el paquete completo de insumos biológicos y calibración IoT del lote.",
  },
  {
    id: "impulsor",
    icono: "🏆",
    nombre: "Ejemplo Aliado Impulsor",
    montoCop: 3000000,
    puestos: 25,
    cubreEnFinca: "Apalanca climatización controlada y logística refrigerada directo a restaurantes.",
  },
];

export const MODELOS_PROYECTO_EJEMPLOS = [
  {
    id: "PRIVADA-HONGOS",
    badge: "🟢 ABIERTO HOY · COLOCACIÓN PRIVADA CERRADA (< 20 ALIADOS)",
    icono: "🍄",
    titulo: "Lote Piloto #01 · Hongos Gourmet Sumapaz",
    contrato: "Contrato Cuentas en Participación · Meta $12.000.000 COP",
    ciclo: "Ciclo rápido de 90 días · Desde $120.000 COP",
    queProduce: "Orellanas y hongos medicinales con contrato de suministro a restaurantes en Bogotá.",
    sensores: "🌡️ Temperatura · 💧 Humedad · 🌬️ Aire / CO₂ / O₂ en vivo",
    highlight: true,
  },
  {
    id: "ROTATIVO-APICULTURA",
    badge: "🟡 PRÓXIMO LOTE #02 · FONDO PRODUCTIVO APÍCOLA",
    icono: "🐝",
    titulo: "Apiarios de Alta Montaña · Miel y Polen Trazable",
    contrato: "Alianza productiva con apicultores rurales · Meta $15.000.000 COP",
    ciclo: "Ciclo productivo de 90 a 120 días · Cupo cerrado",
    queProduce: "Miel de páramo certificada sin adulteración y polen seco en empaques sellados.",
    sensores: "🌡️ Calor interno de colmena · ⚖️ Peso · 🛡️ Alertas de estrés",
    highlight: false,
  },
  {
    id: "CIRCULAR-ACUAPONIA",
    badge: "🟡 PRÓXIMO LOTE #03 · ECONOMÍA CIRCULAR ACUAPÓNICA",
    icono: "🐟",
    titulo: "Acuaponía Tecnificada · Peces + Hortalizas Limpias",
    contrato: "Producción escalonada multi-cosecha · Meta $18.000.000 COP",
    ciclo: "Hortalizas cada 45 días + peces al día 90",
    queProduce: "Lechuga gourmet + trucha o tilapia en sistema cerrado con mínimo gasto de agua.",
    sensores: "💧 Oxígeno disuelto · 🧪 Aireación · 🌡️ Agua y ambiente",
    highlight: false,
  },
  {
    id: "COOPERATIVA-CAFE",
    badge: "🔵 FASE 2 ESCALAMIENTO · COOPERATIVA CON COMPRA ASEGURADA",
    icono: "☕",
    titulo: "Café Especial Regional con Trazabilidad de Origen",
    contrato: "Esquema asociativo con orden de compra (off-take) · Asociaciones",
    ciclo: "Cosechas semestrales y beneficio controlado",
    queProduce: "Microlotes de café especial de exportación con sello verificable de secado y fermentación.",
    sensores: "🌡️ Secado controlado · 🌬️ Fermentación CO₂ · 🔍 Trazabilidad lote a lote",
    highlight: false,
  },
];

/**
 * Calcula una proyección transparente multi-ciclo en pesos colombianos (COP).
 * Nota: Cifras ilustrativas ligadas al éxito productivo real de cada cosecha; no son tasa fija.
 */
export function calcularProyeccionCiclos({
  montoCop = 1200000,
  tasaCicloPct = 20,
  meses = 3,
  reinvertir = true,
  multiplicadorAvanceActual = 1,
} = {}) {
  const capital = Number.isFinite(Number(montoCop)) && Number(montoCop) > 0
    ? Math.round(Number(montoCop))
    : 0;
  const tasa = Number.isFinite(Number(tasaCicloPct)) ? Math.max(0, Number(tasaCicloPct)) / 100 : 0;
  const horizonteMeses = Math.max(3, Number(meses) || 3);
  const ciclos = Math.max(1, Math.round(horizonteMeses / 3));

  const totalFinalEstimado = reinvertir
    ? Math.round(capital * Math.pow(1 + tasa, ciclos))
    : Math.round(capital + capital * tasa * ciclos);

  const utilidadNetaEstimada = Math.max(0, totalFinalEstimado - capital);
  const crecimientoPct = capital > 0
    ? Number(((utilidadNetaEstimada / capital) * 100).toFixed(1))
    : 0;

  // Avance visual del progreso (solo aplica fracción en el ciclo actual de 3 meses si está en Día 1 o Día 42)
  const avanceFactor = ciclos === 1
    ? Math.min(1, Math.max(0, Number(multiplicadorAvanceActual) || 0))
    : 1;
  const montoAcumuladoVisual = Math.round(totalFinalEstimado * avanceFactor);
  const faltanteVisual = Math.max(0, totalFinalEstimado - montoAcumuladoVisual);
  const avancePorcentaje = totalFinalEstimado > 0
    ? Math.min(100, Math.round((montoAcumuladoVisual / totalFinalEstimado) * 100))
    : 0;

  // Comparación ilustrativa frente a depósito tradicional bancario (~10% EA)
  const utilidadBanco10Ea = Math.round(capital * (Math.pow(1.1, horizonteMeses / 12) - 1));
  const ventajaEstimadaVsBanco = Math.max(0, utilidadNetaEstimada - utilidadBanco10Ea);

  return {
    capital,
    horizonteMeses,
    ciclos,
    reinvertir,
    tasaCicloPct,
    utilidadNetaEstimada,
    totalFinalEstimado,
    crecimientoPct,
    montoAcumuladoVisual,
    faltanteVisual,
    avancePorcentaje,
    utilidadBanco10Ea,
    ventajaEstimadaVsBanco,
  };
}
