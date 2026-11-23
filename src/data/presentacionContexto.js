/**
 * Datos verificados de diagnóstico rural (PND 2022-2026, ANT, DANE, UPRA)
 * extraídos de DOCs_DontUpLoad/ para sustentar la presentación inicial de CultivaTech ColombIA.
 */

export const PILARES_CRISIS_CAMPO = [
  {
    id: "credito-tierra",
    icono: "💸",
    titulo: "Deuda y tierra en riesgo",
    dato: "27,7 % pobreza campesina",
    detalle:
      "La tenencia precaria dificulta el crédito formal; el productor cae en deudas costosas que arriesgan su finca y cosecha.",
    borde: "border-primary",
  },
  {
    id: "envejecimiento-exodo",
    icono: "👵",
    titulo: "Campo que envejece",
    dato: "Solo 17,6 % con pensión",
    detalle:
      "Sin oportunidades tecnológicas ni rentabilidad justa, los jóvenes migran a ciudades saturadas y se rompen saberes ancestrales.",
    borde: "border-secondary",
  },
  {
    id: "productividad-ciega",
    icono: "🌫️",
    titulo: "Inversión a ciegas",
    dato: "-15 % productividad vs. Latam",
    detalle:
      "La baja adopción tecnológica y falta de trazabilidad alejan al inversionista, que hoy no puede vigilar en vivo qué pasa con su plata.",
    borde: "border-primary",
  },
];

export const RESPUESTA_CULTIVATECH_PILARES = [
  {
    id: "sin-hipoteca",
    icono: "🛡️",
    titulo: "Capital sin perder la finca",
    texto: "Financiamiento por cosecha respaldado por sensores, sin gota a gota ni hipotecas.",
  },
  {
    id: "relevo-ancestral",
    icono: "👩‍💻",
    titulo: "Jóvenes + saber ancestral",
    texto: "Juventudes rurales operan IoT e IA junto a la experiencia de sus mayores en la vereda.",
  },
  {
    id: "inversion-en-vivo",
    icono: "⛓️",
    titulo: "Inversión auditable 24/7",
    texto: "Cada aliado monitorea aire en vivo (gas/CO₂ est.) y trazabilidad sellada con huella Merkle.",
  },
];

export const FUENTES_OFICIALES_CAMPO = [
  {
    entidad:
      "Agencia Nacional de Tierras (ANT · PND 2022–2026 & 2023-03-17-bases-plan-nacional-desarrollo-web.pdf)",
    resumen:
      "La inseguridad jurídica de la tenencia dificulta el acceso al crédito rural; metas trazadoras PMI de formalizar 7.000.000 ha de pequeña/mediana propiedad y entregar 3.000.000 ha vía Fondo de Tierras.",
  },
  {
    entidad:
      "DANE / PND 2022–2026 (plan-nacional-de-desarrollo-2022-2026-colombia-potencia-mundial-de-la-vida.pdf, p. 346)",
    resumen:
      "3 de cada 4 personas rurales se identifican como campesinas; su pobreza multidimensional alcanza 27,7 % frente al 16 % nacional (2021) y solo el 17,6 % de los ocupados campesinos cotiza a pensión.",
  },
  {
    entidad: "DNP / derecho-humano-a-la-alimentacion.pdf & UPRA (PND pp. 146–148)",
    resumen:
      "Productividad agropecuaria 15 % por debajo del promedio de América Latina por baja adopción tecnológica y ausencia de trazabilidad; 41 % del área del país está a >10 h de un centro comercial.",
  },
  {
    entidad: "PND 2022–2026 & SNIA (pp. 344–348)",
    resumen:
      "Mandato estratégico de abrir oportunidades productivas para jóvenes rurales e integrar saberes ancestrales con ciencia y tecnología en el campo.",
  },
];
