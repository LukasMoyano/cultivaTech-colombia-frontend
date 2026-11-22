import React, { useState } from "react";
import PropTypes from "prop-types";
import { usePilotoResumen } from "../../hooks/usePilotoResumen";

const PASOS_FLUJO = [
  {
    numero: "01",
    icono: "📡",
    titulo: "El sensor en la finca sella cada dato",
    resumenClaro:
      "En cualquier cultivo o unidad productiva con nuestro dispositivo IoT, el sensor mide en vivo variables clave como dióxido de carbono (CO₂), niveles y emisiones de oxígeno, humedad y temperatura. Así refleja la salubridad real de tu plantación y firma cada lectura antes de enviarla.",
    detalleTecnico: "Dispositivo IoT firma cada paquete con HMAC-SHA256 + respaldo local ante cortes rurales.",
  },
  {
    numero: "02",
    icono: "📦",
    titulo: "Se agrupan 5 lecturas en una huella única",
    resumenClaro:
      "Para no volver lento ni costoso el sistema, reunimos cada 5 lecturas de salud del cultivo en un solo paquete y generamos una huella matemática irrepetible —como un recibo maestro único del buen cuidado de tu finca.",
    detalleTecnico: "Oráculo agrupa lotes de 5 mediciones válidas en una Raíz Merkle Keccak-256 sin datos personales.",
  },
  {
    numero: "03",
    icono: "⛓️",
    titulo: "La huella queda guardada e inalterable",
    resumenClaro:
      "Ese código resumen viaja a un registro digital público e indestructible. Nadie —ni operadores, ni terceros— puede borrar, alterar o maquillar cómo estuvo realmente la salud y aireación de tu cultivo.",
    detalleTecnico: "Evento RaizAnclada(bytes32) registrado en TrazabilidadAgricola_IR.sol (<45,000 gas).",
  },
  {
    numero: "04",
    icono: "🔍",
    titulo: "Cualquier aliado verifica en segundos",
    resumenClaro:
      "Agricultores, compradores e inversionistas pueden comprobar al instante que el historial es genuino. Si alguien intentara cambiar una sola cifra del pasado, la huella dejaría de coincidir y el sistema avisaría de inmediato.",
    detalleTecnico: "Auditoría cruzada entre base privada del productor y sello público en explorador de bloques.",
  },
];

/**
 * Mapa visual compartido en lenguaje claro y cercano para explicar cómo funciona Blockchain
 * tanto al Agricultor como al Inversionista o al Jurado.
 */
const PuenteBlockchainVisual = ({ compact = false, onNavigate = null }) => {
  const { resumen, conectadoBackend } = usePilotoResumen();
  const [pasoActivo, setPasoActivo] = useState(0);
  const [mostrarTecnico, setMostrarTecnico] = useState(false);
  const [hoverLey1581, setHoverLey1581] = useState(false);
  const [pinLey1581, setPinLey1581] = useState(false);

  const mostrarLey1581 = hoverLey1581 || pinLey1581;

  const oraculo = resumen.oraculo;
  const esSepolia = oraculo?.modo === "sepolia";

  return (
    <section
      aria-label="Cómo funciona la verificación en Blockchain"
      className={`${compact ? "" : "container mx-auto px-2 sm:px-4 py-2"} space-y-6`}
    >
      {/* Cabecera clara + Badge obligatorio de estado del oráculo */}
      <div className="bg-background-card border border-border rounded-lg p-6 shadow-md">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-xs font-heading tracking-wider text-primary uppercase">
              TRANSPARENCIA SIN NECESIDAD DE SABER DE CRIPTO
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-text-accent mt-1">
              ¿Cómo conecta CultivaTech el campo con los inversionistas?
            </h2>
            <p className="text-sm sm:text-base text-text-main/85 mt-2 leading-relaxed">
              Aquí Blockchain trabaja como un <strong>notario digital de confianza</strong>: prueba
              que la salud del cultivo (CO₂, oxígeno, humedad y temperatura) y los acuerdos son
              reales, mientras tu identidad y tu plata en pesos se cuidan en privado bajo la ley colombiana.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                esSepolia
                  ? "bg-accent/20 text-accent border-accent"
                  : "bg-secondary/20 text-text-main border-secondary"
              }`}
            >
              {esSepolia
                ? "● Red Pública Sepolia Activa"
                : "◐ Oráculo en Simulación Local (listo para Sepolia)"}
            </span>
            <span className="text-xs text-text-main/70">
              {conectadoBackend
                ? `Oráculo en línea · Lotes sellados: ${oraculo?.lotesAnclados ?? 0} · En cola: ${oraculo?.pendientes ?? 0}`
                : "Vista de arquitectura · Esperando telemetría del servidor local"}
            </span>
            <button
              type="button"
              onClick={() => setMostrarTecnico((prev) => !prev)}
              className="text-xs font-bold text-primary underline hover:opacity-80"
            >
              {mostrarTecnico ? "Ocultar detalles de ingeniería" : "Ver detalles técnicos Web3"}
            </button>
          </div>
        </div>

        {/* Pipeline gráfico interactivo en 4 pasos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {PASOS_FLUJO.map((paso, index) => {
            const activo = pasoActivo === index;
            return (
              <button
                key={paso.numero}
                type="button"
                onClick={() => setPasoActivo(index)}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  activo
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border bg-background hover:border-primary/60"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl" aria-hidden="true">{paso.icono}</span>
                  <span className="text-xs font-heading px-2 py-0.5 rounded bg-background-card border border-border text-text-accent">
                    PASO {paso.numero}
                  </span>
                </div>
                <h3 className="font-heading text-sm text-text-accent font-bold mb-1.5">
                  {paso.titulo}
                </h3>
                <p className="text-xs text-text-main/85 leading-relaxed">
                  {paso.resumenClaro}
                </p>
                {mostrarTecnico && (
                  <p className="mt-2 pt-2 border-t border-border text-[11px] font-mono text-primary">
                    {paso.detalleTecnico}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Frontera visual Privacidad vs Transparencia Pública */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-background-card border-2 border-accent rounded-lg p-5 space-y-3 relative">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">🔒</span>
              <div>
                <h3 className="font-heading text-base text-text-accent font-bold">
                  LO QUE NUNCA ENTRA A BLOCKCHAIN (PRIVADO)
                </h3>
                <div className="text-xs text-text-main/75 flex flex-wrap items-center gap-1.5 mt-0.5">
                  <span>Resguardado en privado ·</span>
                  <div
                    className="relative inline-block"
                    onMouseEnter={() => setHoverLey1581(true)}
                    onMouseLeave={() => setHoverLey1581(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setPinLey1581((prev) => !prev)}
                      onFocus={() => setHoverLey1581(true)}
                      onBlur={() => setHoverLey1581(false)}
                      aria-expanded={mostrarLey1581}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent/15 border border-accent/50 text-accent font-bold hover:bg-accent/25 transition-colors cursor-help"
                    >
                      <span>🛡️ Ley 1581 de 2012</span>
                      <span aria-hidden="true" className="text-[10px]">ⓘ</span>
                    </button>

                    {mostrarLey1581 && (
                      <div
                        role="tooltip"
                        className="absolute left-0 bottom-full mb-2 w-72 sm:w-80 z-30 p-3.5 rounded-lg bg-background border-2 border-accent shadow-xl text-xs text-text-main leading-relaxed space-y-1.5"
                      >
                        <div className="flex items-center justify-between font-heading font-bold text-accent">
                          <span>📜 ¿Qué es la Ley 1581 de 2012?</span>
                          <button
                            type="button"
                            onClick={() => {
                              setPinLey1581(false);
                              setHoverLey1581(false);
                            }}
                            className="text-text-main/60 hover:text-primary font-sans text-xs px-1"
                            aria-label="Cerrar resumen Ley 1581"
                          >
                            ✕
                          </button>
                        </div>
                        <p>
                          Es la <strong>Ley de Protección de Datos Personales (Habeas Data)</strong> en Colombia.
                          Garantiza que tú decides quién conoce tu información personal, que solo se usa con
                          tu permiso expreso y que jamás se publica ni se expone en cadenas abiertas como Blockchain.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ul className="text-sm text-text-main space-y-2.5 list-disc pl-5">
            <li>
              <strong>Tu identidad de contacto:</strong> Tu nombre completo, cédula, teléfono o correo jamás se suben ni quedan visibles en Blockchain.
            </li>
            <li>
              <strong>Verificación KYC y tu contrato PDF individual:</strong> El <em>KYC</em> (&quot;Conoce a tu Cliente&quot;) es simplemente confirmar tu identidad real para evitar suplantaciones; esa validación y tu <strong>contrato firmado en PDF —único y exclusivo para cada participación—</strong> se guardan solo en tu bóveda privada.
            </li>
            <li>
              <strong>Cuentas bancarias y plata en pesos (COP):</strong> Nunca se capturan en Blockchain ni se muestran públicamente tus cuentas bancarias, tarjetas ni movimientos financieros en pesos colombianos.
            </li>
          </ul>
        </div>

        <div className="bg-background-card border-2 border-primary rounded-lg p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">🌐</span>
            <div>
              <h3 className="font-heading text-base text-text-accent font-bold">
                LO QUE SÍ QUEDA VERIFICABLE EN BLOCKCHAIN (PÚBLICO)
              </h3>
              <p className="text-xs text-text-main/75">
                Cuentas claras y pruebas reales fáciles de revisar para gente del campo y aliados
              </p>
            </div>
          </div>
          <ul className="text-sm text-text-main space-y-2.5 list-disc pl-5">
            <li>
              <strong>Pruebas de que el cultivo sí se está cuidando:</strong> Quedan sellos digitales de temperatura, humedad, dióxido de carbono (CO₂) y oxígeno que demuestran la salubridad del lote sin que nadie pueda inventar cifras.
            </li>
            <li>
              <strong>Confirmación anónima de participantes:</strong> Un código sin nombres ni cédulas que prueba que quienes aportan o producen están habilitados legalmente.
            </li>
            <li>
              <strong>Cumplimiento paso a paso hasta la cosecha:</strong> Constancia pública de cuándo arrancó el ciclo, qué metas se cumplieron y cuándo se liquida la venta final al cierre de los 90 días.
            </li>
          </ul>
        </div>
      </div>

      {/* Sello vivo actual si ya hay huella Merkle */}
      {oraculo?.ultimaRaiz && (
        <div className="bg-background-card border border-border rounded-lg p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-text-accent">Última huella digital sellada del cultivo: </span>
            <code className="font-mono text-primary break-all">{oraculo.ultimaRaiz}</code>
          </div>
          {oraculo.urlExplorador ? (
            <a
              href={oraculo.urlExplorador}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded bg-primary text-white font-bold hover:opacity-90"
            >
              Ver en Explorador Público ↗
            </a>
          ) : (
            <span className="px-2.5 py-1 rounded bg-secondary/20 text-text-main font-semibold">
              Sellado en modo simulación local (sin gas externo)
            </span>
          )}
        </div>
      )}

      {/* Accesos rápidos opcionales cuando está en vista dedicada */}
      {!compact && onNavigate && (
        <div className="flex flex-wrap gap-3 justify-end items-center pt-1">
          <button
            type="button"
            onClick={() => onNavigate("dashboard", "agricultor")}
            className="px-5 py-3 rounded-lg border-2 border-accent bg-accent/15 text-accent font-heading text-xs sm:text-sm font-bold shadow-md hover:bg-accent hover:text-white transition-all animate-pulse cursor-pointer"
          >
            🌱 Ir al Panel del Agricultor · Ver Sensores y Lote →
          </button>
          <button
            type="button"
            onClick={() => onNavigate("inversion_oferta", "inversionista")}
            className="px-5 py-3 rounded-lg bg-primary text-white font-heading text-xs sm:text-sm hover:bg-primary/90 transition-colors cursor-pointer"
          >
            💎 Explorar Lote e Inversión Demo →
          </button>
        </div>
      )}
    </section>
  );
};

PuenteBlockchainVisual.propTypes = {
  compact: PropTypes.bool,
  onNavigate: PropTypes.func,
};

export default PuenteBlockchainVisual;
