import React from "react";
import PropTypes from "prop-types";
import InversionistaHub from "./InversionistaHub";
import { usePilotoResumen } from "../../hooks/usePilotoResumen";
import { formatCop } from "../../data/pilotoFallback";
import {
  EJEMPLOS_APORTE_PILOTO,
  MODELOS_PROYECTO_EJEMPLOS,
  calcularProyeccionCiclos,
} from "../../data/simulacionFinanciera";

/**
 * PANTALLA 1 · La ficha de la oferta (Entiende)
 * Claridad absoluta antes de comprometer dinero: qué sí se compra, qué no, costos y ejemplos reales.
 */
const OfertaLoteScreen = ({ onNav, participacionDemo, onConfirmarParticipacion }) => {
  const { resumen } = usePilotoResumen();
  const { lote, oraculo } = resumen;

  const simularEjemplo = (ejemplo) => {
    if (onConfirmarParticipacion) {
      const porcentajeLote = Number(((ejemplo.puestos / lote.totalParticipaciones) * 100).toFixed(1));
      onConfirmarParticipacion({
        ...participacionDemo,
        montoCop: ejemplo.montoCop,
        participaciones: ejemplo.puestos,
        porcentajeLote,
      });
    }
    onNav("inversion_simulador");
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 space-y-6">
      <InversionistaHub
        currentPage="inversion_oferta"
        onNav={onNav}
        oraculo={oraculo}
        participacionDemo={participacionDemo}
      />

      {/* Tarjeta principal del Lote Piloto #01 */}
      <div className="bg-background-card border border-border rounded-lg p-6 shadow-md space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
          <div>
            <span className="inline-block px-2.5 py-1 rounded text-xs font-bold bg-accent/20 text-accent mb-2">
              COLOCACIÓN PRIVADA CERRADA · CUPO &lt; {lote.maxAliadosPrivados + 1} ALIADOS
            </span>
            <h2 className="text-2xl font-bold font-heading text-text-accent">
              {lote.nombre}
            </h2>
            <p className="text-sm text-text-main/80 mt-1">
              {lote.linea} · {lote.ubicacion} · Respaldo: <strong>{lote.respaldoTecnico}</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNav("inversion_simulador")}
            className="px-5 py-3 rounded bg-primary text-white font-heading text-xs sm:text-sm hover:bg-primary/90 transition-colors shadow"
          >
            Quiero revisar términos, riesgos y participar →
          </button>
        </div>

        {/* Métricas rápidas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="bg-background border border-border rounded-lg p-4">
            <span className="text-xs text-text-main/70 block">META DEL LOTE</span>
            <strong className="text-lg sm:text-xl font-heading text-text-accent">{formatCop(lote.metaCop)}</strong>
            <span className="text-[11px] text-text-main/70 block mt-1">{lote.totalParticipaciones} participaciones de {formatCop(lote.valorParticipacionCop)}</span>
          </div>
          <div className="bg-background border border-border rounded-lg p-4">
            <span className="text-xs text-text-main/70 block">CICLO PRODUCTIVO</span>
            <strong className="text-lg sm:text-xl font-heading text-text-accent">{lote.cicloDias} DÍAS</strong>
            <span className="text-[11px] text-text-main/70 block mt-1">Avance actual: Día {lote.diaActual} de {lote.cicloDias}</span>
          </div>
          <div className="bg-background border border-border rounded-lg p-4">
            <span className="text-xs text-text-main/70 block">APORTE SUGERIDO</span>
            <strong className="text-lg sm:text-xl font-heading text-primary">$1M – $3M COP</strong>
            <span className="text-[11px] text-text-main/70 block mt-1">Cupos disponibles: {lote.cuposDisponibles} aliados</span>
          </div>
          <div className="bg-background border border-border rounded-lg p-4">
            <span className="text-xs text-text-main/70 block">ESCENARIO BASE ESTIMADO</span>
            <strong className="text-lg sm:text-xl font-heading text-accent">+{lote.escenarioBaseMinPct}% a +{lote.escenarioBaseMaxPct}%</strong>
            <span className="text-[11px] text-text-main/70 block mt-1">En el ciclo (NO garantizado)</span>
          </div>
        </div>

        {/* Lo que SÍ compras vs Lo que NO compras */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background border-2 border-accent rounded-lg p-5 space-y-2">
            <h3 className="font-heading text-base font-bold text-accent">
              ✅ LO QUE SÍ COMPRAS CON TU PARTICIPACIÓN
            </h3>
            <ul className="text-sm text-text-main space-y-2 list-disc pl-5">
              <li>
                <strong>Participación contractual proporcional</strong> (1% por cada {formatCop(lote.valorParticipacionCop)}) sobre la utilidad neta real generada al vender esta cosecha.
              </li>
              <li>
                <strong>Acceso 24/7 en vivo</strong> a temperatura, humedad y calidad de aire del cultivo desde tu celular.
              </li>
              <li>
                <strong>Trazabilidad digital inalterable</strong> que certifica el estado de la cosecha y liquidación contable transparente.
              </li>
            </ul>
          </div>

          <div className="bg-background border-2 border-primary rounded-lg p-5 space-y-2">
            <h3 className="font-heading text-base font-bold text-primary">
              ⛔ LO QUE NO COMPRAS (SIN LETRA PEQUEÑA)
            </h3>
            <ul className="text-sm text-text-main space-y-2 list-disc pl-5">
              <li>
                <strong>NO compras tierra ni hipotecas campesinas:</strong> la finca y propiedad del suelo permanecen 100 % en manos del productor.
              </li>
              <li>
                <strong>NO es un CDT ni cuenta con seguro Fogafín:</strong> no prometemos tasa fija; asumes el riesgo real agrícola mitigado por IoT.
              </li>
              <li>
                <strong>NO permite retiro anticipado ni reventa libre:</strong> el retorno se liquida únicamente al finalizar la cosecha (día 90).
              </li>
            </ul>
          </div>
        </div>

        {/* Quién responde + Desglose transparente de costos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-background border border-border rounded-lg p-5 space-y-3">
            <h3 className="font-heading text-base font-bold text-text-accent">
              📋 Presupuesto Transparente del Lote ({formatCop(lote.metaCop)})
            </h3>
            <div className="space-y-2">
              {(lote.desgloseCostos || []).map((item) => {
                const pct = Math.round((item.valorCop / lote.metaCop) * 100);
                return (
                  <div key={item.rubro} className="text-xs space-y-1">
                    <div className="flex justify-between gap-2">
                      <span className="text-text-main">{item.rubro}</span>
                      <span className="font-bold text-text-accent whitespace-nowrap">
                        {formatCop(item.valorCop)} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg p-5 space-y-3 text-sm">
            <h3 className="font-heading text-base font-bold text-text-accent">
              🛡️ Quién Responde y Saneamiento Previo
            </h3>
            <p className="text-text-main/90">
              <strong>Operación Tecnológica IoT y Blockchain:</strong> CultivaTech ColombIA (_-IR-_Productions · MasterLukasMoyano.com).
            </p>
            <p className="text-text-main/90">
              <strong>Vehículo Legal Administrador:</strong> Contrato asociativo / cuentas en participación con cuentas contables separadas del lote.
            </p>
            <p className="text-text-main/90">
              <strong>Saneamiento Legal Verificado:</strong> {lote.saneamiento}.
            </p>
            <p className="text-text-main/90">
              <strong>Comprador Comercial:</strong> {lote.compradorMayorista}.
            </p>
          </div>
        </div>

        {/* Ejemplos reales en pesos colombianos: ¿con cuánto participas y qué paga en la finca? */}
        <div className="bg-background border border-border rounded-lg p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-heading text-base font-bold text-text-accent">
                💡 Ejemplos con Números Reales (Míralo en Pesos Colombianos)
              </h3>
              <p className="text-xs text-text-main/75">
                Elige cualquiera para pre-cargar la calculadora y ver su proyección en tiempo real.
              </p>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-accent/15 text-accent">
              Desde $120.000 COP (1 puesto = 1%)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {EJEMPLOS_APORTE_PILOTO.map((ej) => {
              const p90 = calcularProyeccionCiclos({ montoCop: ej.montoCop, tasaCicloPct: 20, meses: 3 });
              const p12m = calcularProyeccionCiclos({ montoCop: ej.montoCop, tasaCicloPct: 20, meses: 12, reinvertir: true });
              return (
                <div
                  key={ej.id}
                  className="bg-background-card border border-border hover:border-primary rounded-lg p-4 flex flex-col justify-between gap-3 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-heading font-bold text-text-accent">
                        {ej.icono} {ej.nombre}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-primary/15 text-primary font-bold">
                        {ej.puestos}% del lote
                      </span>
                    </div>
                    <div className="text-xl font-heading font-bold text-primary">
                      {formatCop(ej.montoCop)}
                    </div>
                    <p className="text-text-main/80 leading-relaxed">{ej.cubreEnFinca}</p>
                    <div className="pt-2 border-t border-border/70 space-y-1 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-text-main/70">⏱️ A 3 meses (+20% est.):</span>
                        <strong className="text-accent">{formatCop(p90.totalFinalEstimado)}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-main/70">🌱 A 12 meses (reinvertido):</span>
                        <strong className="text-text-accent">{formatCop(p12m.totalFinalEstimado)}</strong>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => simularEjemplo(ej)}
                    className="w-full py-2 rounded bg-primary text-white font-heading text-xs hover:bg-primary/90 transition-colors cursor-pointer"
                  >
                    Simular {formatCop(ej.montoCop)} →
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Catálogo ampliado de modalidades y líneas productivas */}
        <div className="pt-2 space-y-3">
          <div>
            <h3 className="font-heading text-sm sm:text-base font-bold text-text-accent">
              🌎 Más Ejemplos de Lotes y Modalidades Productivas CultivaTech
            </h3>
            <p className="text-xs text-text-main/75">
              Además de la colocación privada cerrada del Lote Piloto #01 (&lt; 20 aliados), la tecnología IoT respalda distintos cultivos y etapas:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {MODELOS_PROYECTO_EJEMPLOS.map((modelo) => (
              <div
                key={modelo.id}
                className={`rounded-lg p-4 border space-y-2 ${
                  modelo.highlight
                    ? "bg-accent/10 border-2 border-accent"
                    : "bg-background border-border"
                }`}
              >
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-background-card border border-border text-text-accent">
                  {modelo.badge}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl" aria-hidden="true">{modelo.icono}</span>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-text-accent">{modelo.titulo}</h4>
                    <div className="text-[11px] text-text-main/75">{modelo.contrato}</div>
                  </div>
                </div>
                <p className="text-text-main/90 leading-relaxed">{modelo.queProduce}</p>
                <div className="flex flex-wrap justify-between gap-2 pt-1 border-t border-border/60 text-[11px] text-text-main/75">
                  <span>{modelo.ciclo}</span>
                  <span className="font-semibold text-text-accent">{modelo.sensores}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

OfertaLoteScreen.propTypes = {
  onNav: PropTypes.func.isRequired,
  participacionDemo: PropTypes.object.isRequired,
  onConfirmarParticipacion: PropTypes.func,
};

export default OfertaLoteScreen;
