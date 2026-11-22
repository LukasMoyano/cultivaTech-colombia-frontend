import React, { useState } from "react";
import PropTypes from "prop-types";
import InversionistaHub from "./InversionistaHub";
import { usePilotoResumen } from "../../hooks/usePilotoResumen";
import { formatCop } from "../../data/pilotoFallback";

/**
 * PANTALLA 4 · Vender mi Parte / Salida (Sale)
 * Muestra reglas claras de liquidez del piloto y liquidación dual al día 90
 * (wallet verificada + equivalente en pesos COP a cuenta bancaria).
 */
const SalidaLiquidacionScreen = ({ onNav, participacionDemo }) => {
  const { resumen } = usePilotoResumen();
  const { lote, oraculo } = resumen;
  const [escenarioSalida, setEscenarioSalida] = useState("normal"); // 'normal' | 'retraso'

  const capital = participacionDemo.montoCop;
  const utilidadBase = Math.round(capital * 0.2);
  const totalLiquidar = capital + utilidadBase;

  return (
    <div className="container mx-auto px-2 sm:px-4 space-y-6">
      <InversionistaHub
        currentPage="inversion_salida"
        onNav={onNav}
        oraculo={oraculo}
        participacionDemo={participacionDemo}
      />

      <div className="bg-background-card border border-border rounded-lg p-6 shadow-md space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
          <div>
            <span className="inline-block px-2.5 py-1 rounded text-xs font-bold bg-secondary/20 text-text-main border border-secondary mb-2">
              TRANSPARENCIA SOBRE LIQUIDEZ Y CIERRE DEL LOTE
            </span>
            <h2 className="text-2xl font-bold font-heading text-text-accent">
              ¿Cómo y Cuándo Recuperas tu Inversión?
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setEscenarioSalida("normal")}
              className={`px-3 py-1.5 rounded text-xs font-bold border ${
                escenarioSalida === "normal"
                  ? "bg-accent text-white border-accent"
                  : "bg-background text-text-main border-border"
              }`}
            >
              Escenario Salida Normal (Día 90)
            </button>
            <button
              type="button"
              onClick={() => setEscenarioSalida("retraso")}
              className={`px-3 py-1.5 rounded text-xs font-bold border ${
                escenarioSalida === "retraso"
                  ? "bg-primary text-white border-primary"
                  : "bg-background text-text-main border-border"
              }`}
            >
              Simular Retraso de Comprador
            </button>
          </div>
        </div>

        {/* Regla del Piloto Demo Day */}
        <div className="bg-background border-2 border-primary rounded-lg p-4 text-sm space-y-1">
          <h3 className="font-heading font-bold text-primary">
            📌 REGLA DEL PILOTO (FASE DEMO DAY · 90 DÍAS)
          </h3>
          <p className="text-text-main/90">
            Durante el piloto cerrado, la participación <strong>NO se revende en mercado abierto</strong> ni existe obligación de recompra anticipada por parte del agricultor ni de CultivaTech ColombIA. Tu salida ocurre naturalmente al venderse la cosecha.
          </p>
        </div>

        {/* Salida Natural Dual: Wallet + Equivalente COP */}
        {escenarioSalida === "normal" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="bg-background border border-border rounded-lg p-4 space-y-2">
              <div className="font-heading font-bold text-text-accent">1️⃣ DÍA 90 · COSECHA Y VENTA</div>
              <p className="text-text-main/80">
                Se consolida la venta de los hongos gourmet al comprador mayorista con facturas DIAN y cierre de sensores del lote.
              </p>
            </div>
            <div className="bg-background border-2 border-accent rounded-lg p-4 space-y-2">
              <div className="font-heading font-bold text-accent">2️⃣ LIQUIDACIÓN DUAL TRAZADA</div>
              <p className="text-text-main/90">
                Se registra el cierre on-chain (<code>cerrarYQuemarLote</code>) transfiriendo la liquidación a la <strong>wallet verificada del inversionista y su equivalente en pesos COP a su cuenta bancaria</strong> ({formatCop(totalLiquidar)} estimados en escenario +20%).
              </p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4 space-y-2">
              <div className="font-heading font-bold text-text-accent">3️⃣ PLAZO Y TRANSPARENCIA</div>
              <p className="text-text-main/80">
                Dispersión bancaria completada entre <strong>5 y 10 días hábiles</strong> tras recaudo real, con estado financiero descargable.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-red-500/10 border-2 border-red-500/60 rounded-lg p-5 space-y-2 text-sm">
            <h3 className="font-heading font-bold text-red-500">
              ⏱️ PROTOCOLO ANTE RETRASO COMERCIAL DEL COMPRADOR (&lt; 24 HORAS)
            </h3>
            <p className="text-text-main">
              Si el comprador mayorista se atrasa en pagar la factura de la cosecha:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-text-main/90 text-xs sm:text-sm">
              <li>El contrato inteligente registra el estado <strong>EN_MORA</strong> (jamás libera pagos ficticios sin recaudo real).</li>
              <li>Notificamos en <strong>menos de 24 horas</strong> por correo/WhatsApp/SMS con la nueva fecha de dispersión.</li>
              <li>El vehículo administrador activa cobro jurídico contractual y publica trazabilidad contable actualizada.</li>
            </ul>
          </div>
        )}

        {/* Fase 2: Escalamiento regulado */}
        <div className="bg-background border border-border rounded-lg p-4 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="max-w-3xl">
            <strong className="text-text-accent block mb-1">
              🚀 Fase 2 (Escalamiento Regulado · Cesión y Crowdfunding)
            </strong>
            <span className="text-text-main/80">
              Al escalar a más de 20 aliados ({lote.id} → Fase Comercial), la cesión entre inversionistas verificados y mercado secundario operarán mediante plataforma autorizada bajo Decreto 1357/2018, fiducia o Sandbox SFC con validación KYC completa del comprador.
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNav("como_funciona")}
            className="px-4 py-2 rounded border border-primary text-primary font-heading text-xs hover:bg-primary hover:text-white transition-colors"
          >
            🔗 Ver Puente Blockchain Completo
          </button>
        </div>
      </div>
    </div>
  );
};

SalidaLiquidacionScreen.propTypes = {
  onNav: PropTypes.func.isRequired,
  participacionDemo: PropTypes.object.isRequired,
};

export default SalidaLiquidacionScreen;
