import React, { useState } from "react";
import PropTypes from "prop-types";
import { usePilotoResumen } from "../../hooks/usePilotoResumen";

const PASOS_FLUJO = [
  {
    numero: "01",
    icono: "📡",
    titulo: "El sensor en la finca sella cada dato",
    resumenClaro:
      "En Sumapaz, el equipo mide gases, temperatura y humedad cada pocos segundos. Antes de salir hacia internet, le estampa una firma de autenticidad.",
    detalleTecnico: "Nodo ESP32 firma el paquete con HMAC-SHA256 + respaldo offline LittleFS ante cortes rurales.",
  },
  {
    numero: "02",
    icono: "📦",
    titulo: "Se agrupan 5 lecturas en una huella única",
    resumenClaro:
      "En lugar de gastar dinero registrando dato por dato, el sistema reúne grupos de 5 lecturas y genera un código resumen único (como un recibo maestro).",
    detalleTecnico: "Queue Worker calcula Raíz de Merkle Keccak-256 sobre 5 hashes SHA-256 sin guardar PII.",
  },
  {
    numero: "03",
    icono: "⛓️",
    titulo: "La huella queda guardada e inalterable",
    resumenClaro:
      "Ese código resumen viaja al contrato inteligente público. Nadie —ni siquiera nosotros— puede borrar o maquillar lo que ocurrió en el cultivo.",
    detalleTecnico: "Evento RaizAnclada(bytes32) emitido en TrazabilidadAgricola_IR.sol (<45,000 gas).",
  },
  {
    numero: "04",
    icono: "🔍",
    titulo: "Cualquier aliado verifica en segundos",
    resumenClaro:
      "Si alguien intentara cambiar un dato histórico en la base privada, la huella dejaría de coincidir y el sistema levantaría una alerta automática.",
    detalleTecnico: "Verificación cruzada off-chain vs on-chain + enlace público al explorador de bloques.",
  },
];

/**
 * Mapa visual compartido en lenguaje claro para explicar cómo funciona Blockchain
 * tanto al Agricultor como al Inversionista o al Jurado.
 */
const PuenteBlockchainVisual = ({ compact = false, onNavigate = null }) => {
  const { resumen, conectadoBackend } = usePilotoResumen();
  const [pasoActivo, setPasoActivo] = useState(0);
  const [mostrarTecnico, setMostrarTecnico] = useState(false);

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
            <p className="text-sm sm:text-base text-text-main/80 mt-2 leading-relaxed">
              La tecnología Blockchain funciona aquí como un <strong>notario digital abierto</strong>:
              certifica que la salud del cultivo es real y protege las reglas pactadas, mientras tus datos
              personales y tu dinero en pesos permanecen privados y resguardados por la ley colombiana.
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
        <div className="bg-background-card border-2 border-accent rounded-lg p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">🔒</span>
            <div>
              <h3 className="font-heading text-base text-text-accent font-bold">
                LO QUE NUNCA ENTRA A BLOCKCHAIN (PRIVADO)
              </h3>
              <p className="text-xs text-text-main/70">Resguardado fuera de cadena · Ley 1581 de 2012</p>
            </div>
          </div>
          <ul className="text-sm text-text-main space-y-2 list-disc pl-5">
            <li>Tu nombre completo, número de cédula, correo o teléfono.</li>
            <li>Tus documentos de verificación (KYC) y contrato firmado en PDF.</li>
            <li>Cuentas bancarias y movimientos financieros en pesos colombianos (COP).</li>
          </ul>
        </div>

        <div className="bg-background-card border-2 border-primary rounded-lg p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">🌐</span>
            <div>
              <h3 className="font-heading text-base text-text-accent font-bold">
                LO QUE SÍ QUEDA VERIFICABLE EN BLOCKCHAIN (PÚBLICO)
              </h3>
              <p className="text-xs text-text-main/70">Auditoría abierta e inalterable para aliados y agricultores</p>
            </div>
          </div>
          <ul className="text-sm text-text-main space-y-2 list-disc pl-5">
            <li>Huellas digitales del clima, humedad y gases del cultivo cada 5 lecturas.</li>
            <li>Permiso anónimo (lista blanca) que valida qué participantes están autorizados.</li>
            <li>Registro verificable del cumplimiento de hitos y liquidación al cierre de 90 días.</li>
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
        <div className="flex flex-wrap gap-3 justify-end">
          <button
            type="button"
            onClick={() => onNavigate("dashboard", "agricultor")}
            className="px-5 py-2.5 rounded border border-border bg-background-card text-text-main font-heading text-xs hover:border-primary"
          >
            🌱 Ir al Panel Agricultor
          </button>
          <button
            type="button"
            onClick={() => onNavigate("inversion_oferta", "inversionista")}
            className="px-5 py-2.5 rounded bg-primary text-white font-heading text-xs hover:bg-primary/90"
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
