import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InversionistaHub from "./InversionistaHub";
import { usePilotoResumen } from "../../hooks/usePilotoResumen";
import { simularVinculacionPiloto } from "../../api";
import {
  RIESGOS_OBLIGATORIOS_PILOTO,
  TERMINOS_Y_CONDICIONES_RESUMEN,
  formatCop,
} from "../../data/pilotoFallback";

const PASOS_DEMO_DEFAULT = [
  {
    id: 1,
    icono: "🪪",
    titulo: "Validación KYC & Lista Blanca (Allowlist)",
    detalle: "Identidad privada verificada fuera de cadena (Ley 1581). Se habilita la billetera del aliado sin exponer datos personales en blockchain.",
  },
  {
    id: 2,
    icono: "🏦",
    titulo: "Reserva de Cupo & Escrow del Contrato",
    detalle: "El contrato verifica el límite legal privado (< 20 aliados) y bloquea las participaciones solicitadas dentro del tope de 100 tokens.",
  },
  {
    id: 3,
    icono: "🪙",
    titulo: "Emisión del Registro Digital (mintParticipacion)",
    detalle: "Asigna el certificado digital no negociable del Lote Piloto #01 con vínculo criptográfico al contrato firmado off-chain.",
  },
  {
    id: 4,
    icono: "✅",
    titulo: "Sello Hash Confirmado y Acceso en Vivo",
    detalle: "Registro completado: el inversionista queda habilitado para auditar la telemetría IoT y liquidación desde Mi Portafolio.",
  },
];

/**
 * PANTALLA 2 · Antes de Invertir (★ MOMENTO DELICADO)
 * Incluye T&C completos, 3 riesgos obligatorios, 3 casillas sin pre-marcar
 * y simulación animada guiada paso a paso para Demo Day de cómo opera el pago/registro Blockchain.
 */
const SimuladorInversionScreen = ({ onNav, participacionDemo, onConfirmarParticipacion }) => {
  const { resumen } = usePilotoResumen();
  const { lote, oraculo } = resumen;

  const [montoCop, setMontoCop] = useState(participacionDemo.montoCop || 1200000);
  const [verTerminos, setVerTerminos] = useState(false);

  // Tres casillas separadas estrictamente SIN pre-marcar
  const [aceptoContratoRiesgos, setAceptoContratoRiesgos] = useState(false);
  const [autorizoLey1581, setAutorizoLey1581] = useState(false);
  const [aceptoAlertas, setAceptoAlertas] = useState(false);

  // Estado de animación guiada Demo Day
  const [animandoAuto, setAnimandoAuto] = useState(false);
  const [pasoVisible, setPasoVisible] = useState(0); // 0 = inactivo, 1..4 = paso alcanzado
  const [pasosDemo, setPasosDemo] = useState(PASOS_DEMO_DEFAULT);
  const [comprobante, setComprobante] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [cargando, setCargando] = useState(false);

  const participaciones = Math.max(1, Math.round(montoCop / lote.valorParticipacionCop));
  const montoExacto = participaciones * lote.valorParticipacionCop;
  const porcentajeLote = Number(((participaciones / lote.totalParticipaciones) * 100).toFixed(1));
  const retornoEstMin = Math.round(montoExacto * (1 + lote.escenarioBaseMinPct / 100));
  const retornoEstMax = Math.round(montoExacto * (1 + lote.escenarioBaseMaxPct / 100));

  const todasCasillasMarcadas = aceptoContratoRiesgos && autorizoLey1581 && aceptoAlertas;

  // Avance automático guiado en el Demo cuando animandoAuto === true
  useEffect(() => {
    if (!animandoAuto) return undefined;
    if (pasoVisible >= 4) {
      setAnimandoAuto(false);
      return undefined;
    }
    const timer = window.setTimeout(() => {
      setPasoVisible((prev) => Math.min(4, prev + 1));
    }, 1150);
    return () => window.clearTimeout(timer);
  }, [animandoAuto, pasoVisible]);

  const prepararSimulacion = async (autoPlay) => {
    setErrorMsg("");
    if (!todasCasillasMarcadas) {
      setErrorMsg("Por protección al inversionista, debes marcar manualmente las 3 casillas antes de iniciar la simulación.");
      return;
    }

    setCargando(true);
    let resultadoApi = null;
    try {
      resultadoApi = await simularVinculacionPiloto({
        montoCop: montoExacto,
        aceptoContratoRiesgos,
        autorizoLey1581,
        aceptoAlertas,
      });
    } catch {
      // Respaldo determinista local si el backend está dormido en modo presentación
      const tsHex = Date.now().toString(16).padStart(16, "0");
      resultadoApi = {
        modo: "simulacion_local",
        txHash: `0x9c4e${tsHex}a71b883f20d14e6b3a`,
        allowlistAddress: `0x71b0...${tsHex.slice(-6)}`,
        gasEstimado: "<45,000 gas",
        montoCop: montoExacto,
        participaciones,
        porcentajeLote,
        pasos: PASOS_DEMO_DEFAULT,
      };
    } finally {
      setCargando(false);
    }

    if (Array.isArray(resultadoApi.pasos)) {
      setPasosDemo(
        PASOS_DEMO_DEFAULT.map((base, idx) => ({
          ...base,
          detalle: resultadoApi.pasos[idx]?.detalle || base.detalle,
        }))
      );
    }
    setComprobante(resultadoApi);
    setPasoVisible(1);
    setAnimandoAuto(autoPlay);

    onConfirmarParticipacion({
      montoCop: montoExacto,
      participaciones,
      porcentajeLote,
      txHash: resultadoApi.txHash,
      confirmado: true,
    });
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 space-y-6">
      <InversionistaHub
        currentPage="inversion_simulador"
        onNav={onNav}
        oraculo={oraculo}
        participacionDemo={participacionDemo}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Columna izquierda: Monto, Riesgos, T&C y 3 Casillas */}
        <div className="lg:col-span-7 bg-background-card border-2 border-primary rounded-lg p-6 space-y-5 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-primary text-white">
                ★ MOMENTO DELICADO · PROTECCIÓN ANTES DE INVERTIR
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-accent mt-2">
                Configura tu Aporte y Revisa las Condiciones
              </h2>
            </div>
          </div>

          {/* Selector en Pesos COP */}
          <div className="bg-background border border-border rounded-lg p-4 space-y-3">
            <div className="flex flex-wrap justify-between items-baseline gap-2">
              <label htmlFor="slider-monto-cop" className="text-sm font-bold text-text-accent">
                Monto a simular en pesos colombianos (COP):
              </label>
              <span className="text-2xl font-bold font-heading text-primary">
                {formatCop(montoExacto)}
              </span>
            </div>
            <input
              id="slider-monto-cop"
              type="range"
              min={120000}
              max={3000000}
              step={120000}
              value={montoExacto}
              onChange={(e) => setMontoCop(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex flex-wrap gap-2 justify-between text-xs text-text-main/80">
              <span>Equivale a <strong>{participaciones} / 100</strong> participaciones (<strong>{porcentajeLote}%</strong> del lote)</span>
              <span>Escenario base día 90 (NO garantizado): <strong>{formatCop(retornoEstMin)} – {formatCop(retornoEstMax)}</strong></span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {[1080000, 1200000, 2040000, 3000000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setMontoCop(preset)}
                  className={`px-2.5 py-1 rounded text-xs font-bold border ${
                    montoExacto === preset
                      ? "bg-primary text-white border-primary"
                      : "bg-background-card text-text-main border-border hover:border-primary"
                  }`}
                >
                  {formatCop(preset)}
                </button>
              ))}
            </div>
          </div>

          {/* Aviso Obligatorio de 3 Riesgos */}
          <div className="bg-red-500/10 border-2 border-red-500/60 rounded-lg p-4 space-y-2">
            <h3 className="font-heading text-sm font-bold text-red-500">
              ⚠️ AVISO OBLIGATORIO DE 3 RIESGOS (LÉELO ANTES DE ACEPTAR)
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-text-main">
              {RIESGOS_OBLIGATORIOS_PILOTO.map((riesgo) => (
                <li key={riesgo.numero}>
                  <strong>{riesgo.numero}) {riesgo.titulo}:</strong> {riesgo.detalle}
                </li>
              ))}
            </ul>
          </div>

          {/* Términos y Condiciones Completos (Desplegable para Demo Day) */}
          <div className="bg-background border border-border rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-bold text-text-accent">
                📄 Términos, Condiciones y Contrato Asociativo del Piloto
              </span>
              <button
                type="button"
                onClick={() => setVerTerminos((prev) => !prev)}
                className="px-3 py-1 rounded border border-primary text-primary text-xs font-bold hover:bg-primary hover:text-white transition-colors"
              >
                {verTerminos ? "Ocultar Términos" : "Leer Términos y Condiciones"}
              </button>
            </div>
            {verTerminos && (
              <div className="mt-2 pt-3 border-t border-border space-y-2.5 text-xs text-text-main/90 max-h-60 overflow-y-auto pr-1">
                {TERMINOS_Y_CONDICIONES_RESUMEN.map((clausula) => (
                  <div key={clausula.titulo}>
                    <strong className="text-text-accent block">{clausula.titulo}</strong>
                    <p>{clausula.texto}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tres Casillas Separadas SIN Pre-Marcar */}
          <div className="bg-background border border-border rounded-lg p-4 space-y-3 text-xs sm:text-sm">
            <div className="font-bold text-text-accent text-xs uppercase tracking-wider">
              Confirmación Expresa (Casillas obligatorias sin pre-marcar)
            </div>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={aceptoContratoRiesgos}
                onChange={(e) => setAceptoContratoRiesgos(e.target.checked)}
                className="mt-1 accent-primary"
              />
              <span>
                Acepto los <strong>Términos, Condiciones y Contrato Asociativo</strong> y declaro entender los 3 riesgos del cultivo (incluyendo pérdida parcial o total y ausencia de rentabilidad fija).
              </span>
            </label>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={autorizoLey1581}
                onChange={(e) => setAutorizoLey1581(e.target.checked)}
                className="mt-1 accent-primary"
              />
              <span>
                Autorizo el tratamiento de datos personales (<strong>Ley 1581 de 2012</strong>) exclusivamente fuera de cadena para validación KYC/LAFT y liquidación.
              </span>
            </label>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={aceptoAlertas}
                onChange={(e) => setAceptoAlertas(e.target.checked)}
                className="mt-1 accent-primary"
              />
              <span>
                Autorizo el envío de notificaciones y alertas tempranas sobre sensores o estado de liquidación comercial del lote.
              </span>
            </label>
          </div>

          {errorMsg && (
            <div role="alert" className="p-3 rounded bg-red-500/15 border border-red-500 text-xs text-red-500 font-bold">
              {errorMsg}
            </div>
          )}

          {/* Botones de activación Demo Day */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!todasCasillasMarcadas || cargando}
              onClick={() => prepararSimulacion(true)}
              className="flex-1 min-w-[230px] px-5 py-3 rounded bg-primary text-white font-heading text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-all shadow"
            >
              {cargando ? "Preparando oráculo..." : "▶ Activar Simulación On-Chain Automática"}
            </button>
            <button
              type="button"
              disabled={!todasCasillasMarcadas || cargando}
              onClick={() => prepararSimulacion(false)}
              className="px-4 py-3 rounded border border-primary text-primary font-heading text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/10 transition-all"
            >
              Paso a Paso Manual
            </button>
          </div>
        </div>

        {/* Columna derecha: Animación Paso a Paso del Flujo de Pago/Registro Blockchain */}
        <div className="lg:col-span-5 bg-background-card border border-border rounded-lg p-6 space-y-4 shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-secondary/20 text-text-main border border-secondary">
                DEMO ARQUITECTURA WEB3 · PASO A PASO EN VIVO
              </span>
              <h3 className="text-lg font-bold font-heading text-text-accent mt-2">
                Cómo ocurre el Registro y Pago en Blockchain
              </h3>
              <p className="text-xs text-text-main/75 mt-1 leading-relaxed">
                Secuencia visual interactiva de lo que sucede por debajo al vincular un aporte ({formatCop(montoExacto)}).
                En el piloto real en Colombia, el usuario puede operar sin necesidad de instalar MetaMask ni manejar cripto directamente.
              </p>
            </div>

            {/* Tarjetas animadas de los 4 pasos */}
            <div className="space-y-3">
              {pasosDemo.map((paso) => {
                const completado = pasoVisible > paso.id || (pasoVisible === 4 && paso.id === 4);
                const enCurso = pasoVisible === paso.id && paso.id < 4;
                const pendiente = pasoVisible < paso.id;

                return (
                  <div
                    key={paso.id}
                    className={`p-3.5 rounded-lg border-2 transition-all duration-300 ${
                      completado
                        ? "border-accent bg-accent/10"
                        : enCurso
                          ? "border-primary bg-primary/10 animate-pulse"
                          : "border-border bg-background opacity-65"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-heading text-xs font-bold text-text-accent">
                        {paso.icono} PASO {paso.id} · {paso.titulo}
                      </span>
                      <span className="text-[11px] font-bold">
                        {completado ? "✓ Listo" : enCurso ? "● Ejecutando..." : pendiente ? "Pendiente" : ""}
                      </span>
                    </div>
                    <p className="text-xs text-text-main/85 mt-1 leading-relaxed">
                      {paso.detalle}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Control manual de avance si pausado/manual */}
            {pasoVisible > 0 && pasoVisible < 4 && (
              <div className="flex justify-between items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setAnimandoAuto((prev) => !prev)}
                  className="text-xs font-bold text-primary underline"
                >
                  {animandoAuto ? "⏸ Pausar avance automático" : "▶ Reanudar automático"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAnimandoAuto(false);
                    setPasoVisible((p) => Math.min(4, p + 1));
                  }}
                  className="px-3 py-1.5 rounded bg-primary text-white text-xs font-bold"
                >
                  Avanzar al Paso {pasoVisible + 1} →
                </button>
              </div>
            )}

            {/* Comprobante generado tras completar paso 4 */}
            {pasoVisible === 4 && comprobante && (
              <div className="p-4 rounded-lg bg-accent/15 border border-accent space-y-2 text-xs">
                <div className="font-heading font-bold text-accent text-sm">
                  🎉 Vinculación Demo Completada ({comprobante.participaciones} participaciones)
                </div>
                <div>
                  <strong>Billetera en Lista Blanca:</strong>{" "}
                  <code className="font-mono break-all">{comprobante.allowlistAddress}</code>
                </div>
                <div>
                  <strong>Hash Comprobante Simulación:</strong>{" "}
                  <code className="font-mono break-all text-primary">{comprobante.txHash}</code>
                </div>
                <button
                  type="button"
                  onClick={() => onNav("inversion_portafolio")}
                  className="w-full mt-2 px-4 py-2.5 rounded bg-accent text-white font-heading text-xs hover:opacity-90"
                >
                  Ir a Mi Portafolio Vivo (Pantalla 3) →
                </button>
              </div>
            )}
          </div>

          <p className="text-[11px] text-text-main/60 border-t border-border pt-3">
            Estado actual: <strong>{oraculo?.etiquetaEstado || "Oráculo en Simulación Local (listo para Sepolia)"}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

SimuladorInversionScreen.propTypes = {
  onNav: PropTypes.func.isRequired,
  participacionDemo: PropTypes.object.isRequired,
  onConfirmarParticipacion: PropTypes.func.isRequired,
};

export default SimuladorInversionScreen;
