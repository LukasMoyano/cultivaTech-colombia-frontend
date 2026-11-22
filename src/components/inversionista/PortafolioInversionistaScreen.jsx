import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import InversionistaHub from "./InversionistaHub";
import useTelemetryStream from "../../hooks/useTelemetryStream";
import { usePilotoResumen } from "../../hooks/usePilotoResumen";
import { rawToVoltage } from "../telemetria/telemetria.constants";
import { formatCop } from "../../data/pilotoFallback";
import {
  HORIZONTES_SIMULACION,
  calcularProyeccionCiclos,
} from "../../data/simulacionFinanciera";

const ESCENARIOS_DEMO_PORTAFOLIO = [
  {
    id: "inicio",
    titulo: "Día 1 · Siembra",
    dia: 1,
    progresoCicloPct: 5,
    estadoCosecha: "Inoculación y arranque de lote",
    multiplicadorRetorno: 0.15,
    margenEstimadoPct: 0,
    tasaMultiCicloPct: 15,
    nota: "Capital aplicado en sustrato e insumos. Telemetría inicial verificando estabilidad térmica.",
  },
  {
    id: "desarrollo",
    titulo: "Día 42 · En Producción",
    dia: 42,
    progresoCicloPct: 52,
    estadoCosecha: "Crecimiento óptimo bajo alertas 24/7",
    multiplicadorRetorno: 0.62,
    margenEstimadoPct: 12,
    tasaMultiCicloPct: 18,
    nota: "Sensores activos sin incidencias. Comprador mayorista con orden de compra vigente.",
  },
  {
    id: "exito",
    titulo: "Día 90 · Cosecha Exitosa (+20%)",
    dia: 90,
    progresoCicloPct: 100,
    estadoCosecha: "Venta completada al 100 % · Recaudo listo",
    multiplicadorRetorno: 1.0,
    margenEstimadoPct: 20,
    tasaMultiCicloPct: 20,
    nota: "Meta productiva alcanzada gracias a cero pérdidas por alerta temprana. Capital + utilidad liquidables.",
  },
  {
    id: "superavit",
    titulo: "Día 90 · Súper Cosecha (+28%)",
    dia: 90,
    progresoCicloPct: 100,
    estadoCosecha: "Rendimiento superior · Mayor utilidad compartida",
    multiplicadorRetorno: 1.0,
    margenEstimadoPct: 28,
    tasaMultiCicloPct: 28,
    nota: "El productor optimizó rendimiento por m²: al crecer el éxito del agricultor, crece proporcionalmente la retribución del inversionista.",
  },
];

const PASOS_VIVOS_INVERSIONISTA = [
  {
    paso: "1",
    titulo: "Verifica su participación y contrato",
    detalle: "Confirma su % exacto del lote, fecha de cierre al día 90 y descarga su respaldo contractual.",
  },
  {
    paso: "2",
    titulo: "Observa la salud ambiental en vivo",
    detalle: "Mira lecturas reales del cultivo (gases/calidad de aire y voltaje del nodo) sin depender de llamadas ni reportes tardíos.",
  },
  {
    paso: "3",
    titulo: "Audita cada sello digital (Merkle)",
    detalle: "Cada 5 lecturas aparece una huella verificable que garantiza que nadie alteró el historial del lote.",
  },
  {
    paso: "4",
    titulo: "Monitorea el avance de su retribución",
    detalle: "Visualiza el progreso hasta el recaudo comercial y estado del comprador mayorista sin puntos ciegos.",
  },
];

/**
 * PANTALLA 3 · Mi Portafolio Vivo (Sigue Paso a Paso)
 * Muestra en vivo qué hace el inversionista, telemetría real ESP32, gráfica animada de torta + barra
 * de retribución ligada al éxito del agricultor, y auditoría de sellos Merkle.
 */
const PortafolioInversionistaScreen = ({
  onNav,
  participacionDemo,
  onConfirmarParticipacion,
}) => {
  const { resumen } = usePilotoResumen();
  const { latest, isOnline, history } = useTelemetryStream({ windowSize: 30 });
  const { lote, oraculo, confianzaSensor } = resumen;

  const [escenarioIdx, setEscenarioIdx] = useState(2); // Arranca en Cosecha Exitosa para ver cálculo claro
  const [horizonteMeses, setHorizonteMeses] = useState(3);
  const [reinvertir, setReinvertir] = useState(true);
  const [animandoDemo, setAnimandoDemo] = useState(false);
  const [pasoGuiaActivo, setPasoGuiaActivo] = useState(0);
  const [mostrarContratoModal, setMostrarContratoModal] = useState(false);

  const escenario = ESCENARIOS_DEMO_PORTAFOLIO[escenarioIdx];
  const capital = participacionDemo.montoCop;
  const tasaActivaPct = horizonteMeses > 3
    ? escenario.tasaMultiCicloPct
    : escenario.margenEstimadoPct;

  const proyeccion = useMemo(
    () =>
      calcularProyeccionCiclos({
        montoCop: capital,
        tasaCicloPct: tasaActivaPct,
        meses: horizonteMeses,
        reinvertir,
        multiplicadorAvanceActual: escenario.multiplicadorRetorno,
      }),
    [capital, tasaActivaPct, horizonteMeses, reinvertir, escenario.multiplicadorRetorno]
  );

  const utilidadTotalEstimada = proyeccion.utilidadNetaEstimada;
  const retornoObjetivo = proyeccion.totalFinalEstimado;
  const montoAcumuladoVisual = proyeccion.montoAcumuladoVisual;
  const faltanteVisual = proyeccion.faltanteVisual;
  const avanceRetribucionPct = proyeccion.avancePorcentaje;

  const cambiarAporteRapido = (nuevoMonto) => {
    if (!onConfirmarParticipacion) return;
    const puestos = Math.max(1, Math.round(nuevoMonto / lote.valorParticipacionCop));
    const pct = Number(((puestos / lote.totalParticipaciones) * 100).toFixed(1));
    onConfirmarParticipacion({
      ...participacionDemo,
      montoCop: nuevoMonto,
      participaciones: puestos,
      porcentajeLote: pct,
    });
  };

  // Animación automática para Demo Day (recorre Día 1 -> Día 42 -> Cosecha Exitosa -> Súper Cosecha)
  useEffect(() => {
    if (!animandoDemo) return undefined;
    if (escenarioIdx >= ESCENARIOS_DEMO_PORTAFOLIO.length - 1) {
      setAnimandoDemo(false);
      return undefined;
    }
    const timer = window.setTimeout(() => {
      setEscenarioIdx((prev) => prev + 1);
    }, 1450);
    return () => window.clearTimeout(timer);
  }, [animandoDemo, escenarioIdx]);

  const iniciarAnimacionRetribucion = () => {
    setHorizonteMeses(3);
    setEscenarioIdx(0);
    setAnimandoDemo(true);
  };

  const datosTorta = useMemo(
    () => ({
      labels: [
        "Tu aporte inicial",
        "Utilidad neta acumulada estimada",
        "Tramo restante de la cosecha",
      ],
      datasets: [
        {
          data: [
            Math.min(capital, montoAcumuladoVisual),
            Math.max(0, montoAcumuladoVisual - capital),
            faltanteVisual,
          ],
          backgroundColor: ["#1a8a40", "#E62A10", "#BDBDBD"],
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      ],
    }),
    [capital, montoAcumuladoVisual, faltanteVisual]
  );

  const opcionesTorta = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "62%",
    animation: { duration: 750 },
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 12, font: { size: 11 } },
      },
    },
  };

  const lecturaViva = latest || confianzaSensor?.ultimaLectura;
  const voltaje = lecturaViva?.voltage ?? (lecturaViva?.mq4_raw != null ? rawToVoltage(lecturaViva.mq4_raw) : null);

  return (
    <div className="container mx-auto px-2 sm:px-4 space-y-6">
      <InversionistaHub
        currentPage="inversion_portafolio"
        onNav={onNav}
        oraculo={oraculo}
        participacionDemo={participacionDemo}
      />

      {/* Guía Interactiva Paso a Paso: Qué hace y ve el inversionista en vivo */}
      <div className="bg-background-card border border-border rounded-lg p-5 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base sm:text-lg font-heading font-bold text-text-accent">
            🧭 Qué hace y monitorea el Inversionista paso a paso
          </h2>
          <span className="text-xs text-text-main/70">Haz clic en cada paso para revisarlo</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {PASOS_VIVOS_INVERSIONISTA.map((item, idx) => (
            <button
              key={item.paso}
              type="button"
              onClick={() => setPasoGuiaActivo(idx)}
              className={`text-left p-3 rounded-lg border transition-all ${
                pasoGuiaActivo === idx
                  ? "border-primary bg-primary/10"
                  : "border-border bg-background hover:border-primary/50"
              }`}
            >
              <span className="text-[11px] font-heading text-primary font-bold">PASO {item.paso}</span>
              <div className="text-xs font-bold text-text-accent mt-0.5">{item.titulo}</div>
              <p className="text-[11px] text-text-main/80 mt-1 leading-relaxed">{item.detalle}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Fila Principal: Torta + Barra Animada de Retribución vs Telemetría Real en Vivo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Torta & Barra Animada de Retribución */}
        <div className="lg:col-span-7 bg-background-card border-2 border-accent rounded-lg p-6 shadow-md space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-heading text-accent uppercase tracking-wider">
                DEMO DAY · RETRIBUCIÓN Y ÉXITO COMPARTIDO
              </span>
              <h3 className="text-xl font-bold font-heading text-text-accent mt-1">
                {escenario.titulo}
              </h3>
              <p className="text-xs text-text-main/80 mt-1">
                {escenario.estadoCosecha}
              </p>
            </div>
            <button
              type="button"
              onClick={iniciarAnimacionRetribucion}
              className="px-4 py-2 rounded bg-accent text-white font-heading text-xs hover:opacity-90 shadow"
            >
              {animandoDemo ? "● Animando Ciclo..." : "▶ Simular Avance hasta Cosecha"}
            </button>
          </div>

          {/* Botones de escenario de cosecha + Horizonte 3 a 24 meses + Monto */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {ESCENARIOS_DEMO_PORTAFOLIO.map((esc, idx) => (
                <button
                  key={esc.id}
                  type="button"
                  onClick={() => {
                    setAnimandoDemo(false);
                    setEscenarioIdx(idx);
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-bold border transition-colors ${
                    escenarioIdx === idx
                      ? "bg-primary text-white border-primary"
                      : "bg-background text-text-main border-border hover:border-primary"
                  }`}
                >
                  {esc.titulo}
                </button>
              ))}
            </div>

            {/* Simulador multi-horizonte y capital */}
            <div className="bg-background border border-border rounded-lg p-3.5 space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-heading font-bold text-text-accent">
                  ⏳ Simulador de Horizonte (3 a 24 meses · Cosechas de 90 días)
                </span>
                <button
                  type="button"
                  onClick={() => setReinvertir((v) => !v)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                    reinvertir
                      ? "bg-accent text-white border-accent"
                      : "bg-background-card text-text-main border-border"
                  }`}
                >
                  {reinvertir
                    ? "🔄 Reinvirtiendo en nuevas cosechas (Compuesto)"
                    : "💵 Retirando ganancias cada 90 días (Simple)"}
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {HORIZONTES_SIMULACION.map((h) => (
                  <button
                    key={h.meses}
                    type="button"
                    onClick={() => {
                      setAnimandoDemo(false);
                      setHorizonteMeses(h.meses);
                    }}
                    className={`p-2 rounded border text-center transition-all cursor-pointer ${
                      horizonteMeses === h.meses
                        ? "bg-accent text-white border-accent shadow"
                        : "bg-background-card text-text-main border-border hover:border-accent"
                    }`}
                  >
                    <div className="font-heading font-bold text-xs">{h.etiqueta}</div>
                    <div className="text-[10px] opacity-85">{h.sub}</div>
                  </button>
                ))}
              </div>

              {onConfirmarParticipacion && (
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/70">
                  <span className="font-bold text-text-main/80">
                    💰 Cambia el capital para probar:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[360000, 1200000, 3000000, 6000000, 10000000].map((monto) => (
                      <button
                        key={monto}
                        type="button"
                        onClick={() => cambiarAporteRapido(monto)}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-colors ${
                          capital === monto
                            ? "bg-primary text-white border-primary"
                            : "bg-background-card text-text-main border-border hover:border-primary"
                        }`}
                      >
                        {formatCop(monto)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Barra de llenado progresivo + Gráfica de torta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="h-56 w-full">
              <Doughnut data={datosTorta} options={opcionesTorta} />
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-background border border-border rounded-lg p-4 space-y-2">
                <div className="flex justify-between font-bold">
                  <span>LLENADO DE TU RETRIBUCIÓN ({proyeccion.ciclos} {proyeccion.ciclos === 1 ? "ciclo" : "ciclos"})</span>
                  <span className="text-accent">{avanceRetribucionPct}%</span>
                </div>
                <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-700"
                    style={{ width: `${avanceRetribucionPct}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div>
                    <span className="text-text-main/65 block">Tu Aporte Base</span>
                    <strong className="text-sm text-text-accent">{formatCop(capital)}</strong>
                  </div>
                  <div>
                    <span className="text-text-main/65 block">Proyección Total ({horizonteMeses}m)</span>
                    <strong className="text-sm text-primary">{formatCop(retornoObjetivo)}</strong>
                  </div>
                </div>
                {proyeccion.crecimientoPct > 0 && (
                  <div className="pt-1 text-accent font-bold">
                    + {formatCop(utilidadTotalEstimada)} de utilidad neta estimada (+{proyeccion.crecimientoPct}%)
                  </div>
                )}
                {proyeccion.ventajaEstimadaVsBanco > 0 && (
                  <div className="text-[11px] text-text-main/80 bg-accent/10 rounded p-2 border border-accent/30">
                    🏦 vs. CDT tradicional (~10% EA): <strong>+{formatCop(proyeccion.ventajaEstimadaVsBanco)}</strong> adicionales en economía real.
                  </div>
                )}
              </div>

              <div className="bg-background border border-border rounded-lg p-3 leading-relaxed text-text-main/85">
                <strong>Qué significa:</strong> {escenario.nota}
                <span className="block mt-1 text-[10px] text-text-main/60">
                  *Proyección ilustrativa ({tasaActivaPct}% por ciclo de 90 días, {reinvertir ? "reinversión compuesta" : "retiro simple"}). No garantiza tasa fija.
                </span>
              </div>
            </div>
          </div>

          {/* Pagos recibidos y Estado Comprador */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-border">
            <div className="p-3 rounded bg-background border border-border">
              <span className="text-text-main/70 block">
                {horizonteMeses > 3
                  ? `RETORNO PROYECTADO (${proyeccion.ciclos} CICLOS / ${horizonteMeses} MESES)`
                  : "PAGOS RECIBIDOS AL CIERRE"}
              </span>
              <strong className="text-base font-heading text-text-accent">
                {escenario.dia === 90 || horizonteMeses > 3
                  ? formatCop(retornoObjetivo)
                  : "$0 COP (Pago único día 90)"}
              </strong>
            </div>
            <div className="p-3 rounded bg-background border border-border">
              <span className="text-text-main/70 block">ESTADO COMPRADOR MAYORISTA / MORA</span>
              <strong className="text-sm text-accent">{lote.compradorMayorista}</strong>
            </div>
          </div>
        </div>

        {/* Columna derecha: Telemetría IoT en Vivo + Respaldo Digital */}
        <div className="lg:col-span-5 space-y-6">
          {/* Sensor real conectado */}
          <div className="bg-background-card border border-border rounded-lg p-5 shadow-md space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-heading text-base font-bold text-text-accent">
                📡 TELEMETRÍA DEL CULTIVO EN VIVO
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  isOnline ? "bg-accent/20 text-accent" : "bg-secondary/20 text-text-main"
                }`}
              >
                {isOnline ? "● Sensor Transmitiendo" : "◐ En espera de ráfaga"}
              </span>
            </div>

            {lecturaViva ? (
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-background border border-border rounded p-3">
                  <span className="text-text-main/70 block">Gases / Aire (MQ-4)</span>
                  <strong className="text-lg font-heading text-primary">
                    {lecturaViva.mq4_raw != null ? `${lecturaViva.mq4_raw} ADC` : "Activo"}
                  </strong>
                </div>
                <div className="bg-background border border-border rounded p-3">
                  <span className="text-text-main/70 block">Señal Eléctrica</span>
                  <strong className="text-lg font-heading text-text-accent">
                    {voltaje != null ? `${Number(voltaje).toFixed(2)} V` : "Estable"}
                  </strong>
                </div>
                <div className="col-span-2 bg-background border border-border rounded p-3 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-text-main/70">Nodo físico:</span>
                    <span className="font-mono font-bold text-text-accent">{lecturaViva.node || "NODE-CULTIVA-01"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-main/70">Muestras verificadas:</span>
                    <span className="font-bold">{Math.max(history.length, confianzaSensor.lecturasRegistradas || 0)} paquetes</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-text-main/75 bg-background border border-border rounded p-3">
                Monitoreo listo para recibir lecturas del nodo ESP32 (Sumapaz). El historial de integridad permanece al {confianzaSensor.porcentajeIntegridad}%.
              </p>
            )}

            {/* Último Sello Merkle */}
            <div className="bg-background border border-border rounded p-3 text-xs space-y-1.5">
              <div className="font-bold text-text-accent">
                ⛓️ Último Sello Merkle Verificable ({oraculo?.etiquetaEstado})
              </div>
              <code className="block font-mono text-[10px] text-primary break-all">
                {oraculo?.ultimaRaiz || participacionDemo.txHash || "0x8ec5a14d9f32b8e47c62e010ab94c7129ac5 (listo para anclaje en Sepolia)"}
              </code>
              {oraculo?.urlExplorador && (
                <a
                  href={oraculo.urlExplorador}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-primary underline font-bold"
                >
                  Verificar transacción en Sepolia ↗
                </a>
              )}
            </div>
          </div>

          {/* Mi Respaldo Legal */}
          <div className="bg-background-card border border-border rounded-lg p-5 shadow-md space-y-3 text-xs">
            <h3 className="font-heading text-base font-bold text-text-accent">
              📄 DÓNDE ESTÁ TU TOKEN Y RESPALDO LEGAL
            </h3>
            <p className="text-text-main/85 leading-relaxed">
              Tu participación ({participacionDemo.participaciones}/100 · {participacionDemo.porcentajeLote}%) figura como registro digital no negociable asociado a contrato escrito bajo legislación colombiana.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setMostrarContratoModal((v) => !v)}
                className="px-3 py-2 rounded border border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors"
              >
                {mostrarContratoModal ? "Ocultar Extracto de Contrato" : "Ver Contrato Asociativo Digital"}
              </button>
              <button
                type="button"
                onClick={() => onNav("inversion_salida")}
                className="px-3 py-2 rounded bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
              >
                Ver Salida al Día 90 (Pantalla 4) →
              </button>
            </div>
            {mostrarContratoModal && (
              <div className="p-3 rounded bg-background border border-border space-y-1 text-[11px]">
                <div><strong>Contrato:</strong> Cuentas en Participación · {lote.nombre}</div>
                <div><strong>Titular Demo:</strong> Aliado Privado Verificado (KYC Off-Chain)</div>
                <div><strong>Participación:</strong> {participacionDemo.participaciones} de 100 ({formatCop(capital)})</div>
                <div><strong>Sello Smart Contract:</strong> {lote.contrato}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

PortafolioInversionistaScreen.propTypes = {
  onNav: PropTypes.func.isRequired,
  participacionDemo: PropTypes.object.isRequired,
  onConfirmarParticipacion: PropTypes.func,
};

export default PortafolioInversionistaScreen;
