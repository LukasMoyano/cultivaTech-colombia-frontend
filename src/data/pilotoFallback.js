/**
 * Datos base y constantes oficiales del Lote Piloto #01 (CultivaTech ColombIA).
 * Sirve como respaldo inmediato si el servidor está iniciando y evita duplicar textos/formatos.
 */

export const formatCop = (valor) => {
  const num = Number(valor);
  if (!Number.isFinite(num)) return "$0 COP";
  return `$${new Intl.NumberFormat("es-CO").format(Math.round(num))} COP`;
};

export const RIESGOS_OBLIGATORIOS_PILOTO = [
  {
    numero: "1",
    titulo: "Riesgo productivo real",
    detalle: "Puedes perder parte o todo tu capital si la cosecha falla por plaga, enfermedad o evento climático pese al monitoreo.",
  },
  {
    numero: "2",
    titulo: "Ganancia variable NO garantizada",
    detalle: "No es un CDT ni tiene seguro Fogafín; no existe rentabilidad fija prometida y depende 100 % de la venta real del lote.",
  },
  {
    numero: "3",
    titulo: "Sin retiro anticipado (90 días)",
    detalle: "No puedes revender libremente tu participación en mercado abierto ni exigir recompra antes del cierre del ciclo.",
  },
];

export const TERMINOS_Y_CONDICIONES_RESUMEN = [
  {
    titulo: "1. Naturaleza Jurídica (Colocación Privada < 20 Aliados)",
    texto:
      "Participación contractual bajo contrato típico colombiano (cuentas en participación o contrato asociativo agropecuario) sobre el resultado neto comercial del Lote Piloto #01. No constituye oferta pública de valores ni captación masiva (Decreto 2555/2010). Cupo cerrado máximo a 19 aliados determinados.",
  },
  {
    titulo: "2. Qué Compras y Qué NO Compras",
    texto:
      "Adquieres un derecho económico proporcional (1/100 = 1 % por participación de $120.000 COP) sobre la utilidad neta vendida de hongos gourmet en Sumapaz más acceso verificable 24/7 a telemetría IoT sellada en Blockchain. NO adquieres propiedad sobre la tierra ni depósito financiero tradicional.",
  },
  {
    titulo: "3. Privacidad y Datos Personales (Ley 1581 de 2012)",
    texto:
      "Ningún dato personal (nombre, cédula, correo o cuenta bancaria) entra a la Blockchain. Toda verificación KYC/LAFT y trazabilidad financiera se custodia fuera de cadena (off-chain) con autorización previa expresa.",
  },
  {
    titulo: "4. Simulación Demo Day vs. Operación en Campo",
    texto:
      "Esta interfaz muestra gráficamente el flujo de registro en contrato inteligente (Allowlist KYC → Escrow → Emisión de participación → Liquidación Día 90). En el piloto comercial en Colombia, el recaudo y liquidación se soportan contablemente en pesos COP verificados (no-PSAV) o wallet habilitada tras validación normativa.",
  },
];

export const RESUMEN_PILOTO_FALLBACK = {
  lote: {
    id: "LOTE-PILOTO-01",
    nombre: "Lote Piloto #01 — Hongos Gourmet Sumapaz",
    linea: "Micología Tecnificada (Hongos Gourmet y Medicinales)",
    ubicacion: "Provincia del Sumapaz · Cundinamarca",
    cicloDias: 90,
    diaActual: 42,
    metaCop: 12000000,
    totalParticipaciones: 100,
    valorParticipacionCop: 120000,
    participacionesColocadas: 65,
    fondeadoCop: 7800000,
    porcentajeFondeado: 65,
    aliadosActuales: 8,
    maxAliadosPrivados: 19,
    cuposDisponibles: 11,
    aporteMinCop: 1000000,
    aporteMaxCop: 3000000,
    escenarioBaseMinPct: 15,
    escenarioBaseMaxPct: 22,
    ahorroFinancieroBanco: "24% – 36% EA frente a crédito bancario tradicional",
    compradorMayorista: "Contrato suministro restaurantes Bogotá · Al día / Sin mora",
    saneamiento: "Predio verificado · Cero prendas en Registro de Garantías Mobiliarias",
    respaldoTecnico: "Tecnoparque SENA TRL 6 (Acta 15750-2025-09-15 · Código P2024-044977-15750)",
    contrato: "TrazabilidadAgricola_IR.sol (<45,000 gas)",
    desgloseCostos: [
      { rubro: "Sustrato inoculado, semilla certificada e insumos biológicos", valorCop: 5400000 },
      { rubro: "Adecuación climática, empaque grado alimenticio y logística", valorCop: 3100000 },
      { rubro: "Operación técnica en campo y monitoreo IoT 24/7", valorCop: 2300000 },
      { rubro: "Fondo de contingencia agronómica y auditoría contable", valorCop: 1200000 },
    ],
  },
  proximosLotes: [
    {
      id: "LOTE-PILOTO-02",
      nombre: "Apicultura Alta Montaña — Sumapaz",
      cicloDias: 90,
      metaCop: 15000000,
      estado: "En estructuración técnica",
    },
    {
      id: "LOTE-PILOTO-03",
      nombre: "Acuaponía Tecnificada — Pasca / Fusagasugá",
      cicloDias: 90,
      metaCop: 18000000,
      estado: "Calibración multivariable",
    },
  ],
  oraculo: {
    modo: "simulacion",
    etiquetaEstado: "Oráculo en Simulación Local (listo para Sepolia)",
    pendientes: 0,
    lotesAnclados: 0,
    ultimaRaiz: null,
    ultimaTx: null,
    urlExplorador: null,
  },
  confianzaSensor: {
    porcentajeIntegridad: 98,
    lecturasRegistradas: 0,
    ultimaLectura: null,
  },
};
