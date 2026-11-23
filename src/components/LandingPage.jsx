import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

// Import slide components
import IntroCrisisSlide from "./landing/slides/IntroCrisisSlide";
import WelcomeSlide from "./landing/slides/WelcomeSlide";
import ProblemSolutionSlide from "./landing/slides/ProblemSolutionSlide";
import TechStackSlide from "./landing/slides/TechStackSlide";
import HowItWorksSlide from "./landing/slides/HowItWorksSlide";
import CtaSlide from "./landing/slides/CtaSlide";

const slides = [
  {
    tab: "1. El Campo",
    title: "La Realidad del Campo Hoy",
    subtitle: "Por qué nace CultivaTech ColombIA",
    component: <IntroCrisisSlide />,
  },
  {
    tab: "2. Propuesta",
    title: "Bienvenido a CultivaTech ColombIA",
    subtitle: "Campo inteligente + Registro digital seguro sin enredos",
    component: <WelcomeSlide />,
  },
  {
    tab: "3. Solución",
    title: "¿Qué Problemas Resolvemos?",
    subtitle: "Conectamos al productor, al joven rural y al inversionista",
    component: <ProblemSolutionSlide />,
  },
  {
    tab: "4. Tecnología",
    title: "Tecnologías y Características",
    subtitle: "Fácil para la finca, blindado para el aliado",
    component: <TechStackSlide />,
  },
  {
    tab: "5. Pasos",
    title: "¿Cómo Funciona?",
    subtitle: "Del surco a tu celular en 5 pasos sencillos",
    component: <HowItWorksSlide />,
  },
  {
    tab: "6. Demo",
    title: "¡Comienza Tu Transformación Digital!",
    subtitle: "Dos caminos conectados por una sola confianza",
    component: <CtaSlide />,
  },
];

export default function LandingPage({ setCurrentPage, onEnterDemo }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const tabRefs = useRef([]);

  const selectSlide = (nextIdx, moveFocus = false) => {
    const bounded = Math.max(0, Math.min(slides.length - 1, nextIdx));
    setCurrentSlide(bounded);
    if (moveFocus) {
      window.requestAnimationFrame(() => tabRefs.current[bounded]?.focus());
    }
  };

  const nextSlide = () => selectSlide(currentSlide + 1);
  const prevSlide = () => selectSlide(currentSlide - 1);

  const handleQuickDemo = (moduleName, targetPage) => {
    if (onEnterDemo) {
      onEnterDemo(moduleName, targetPage);
      return;
    }
    setCurrentPage("ingreso");
  };

  // Pass setCurrentPage and onEnterDemo to the last slide component
  const slidesWithProps = slides.map((slide, index) => {
    if (index === slides.length - 1) {
      return {
        ...slide,
        component: React.cloneElement(slide.component, { setCurrentPage, onEnterDemo }),
      };
    }
    return slide;
  });

  return (
    <div className="bg-background text-text-main flex flex-col items-center px-0 py-2 sm:px-3 sm:py-4 overflow-x-hidden">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-[clamp(1.4rem,1rem+2vw,2rem)] font-heading text-text-accent leading-tight">
            Cultiva Tech ColombIA
          </h1>
          <p className="text-xs sm:text-sm text-text-main/75 mt-1">
            Cultivos vigilados en vivo e inversión transparente · Piloto Demo Day CCB
          </p>
        </div>

        {/* Acceso directo Demo Day (sin fricción de registro para jurados) */}
        <div className="mb-4 p-3 bg-background-card border border-border space-y-2">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2.5">
            <span className="text-xs font-heading text-text-accent uppercase tracking-wider shrink-0">
              Acceso Directo Demo Day
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
              <button
                type="button"
                onClick={() => handleQuickDemo("inversionista")}
                className="w-full sm:w-auto bg-[var(--color-primary-btn)] text-white px-3.5 py-2 text-xs font-heading hover:opacity-90 transition-opacity cursor-pointer min-h-[44px]"
              >
                💎 Explorar Demo Inversionista
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("agricultor")}
                className="w-full sm:w-auto border-2 border-accent text-text-accent px-3.5 py-2 text-xs font-heading hover:bg-accent/15 transition-colors cursor-pointer min-h-[44px]"
              >
                🌱 Explorar Demo Agricultor
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("inversionista", "como_funciona")}
                className="w-full sm:w-auto border border-border text-text-main px-3.5 py-2 text-xs font-heading hover:border-text-accent hover:text-text-accent transition-colors cursor-pointer min-h-[44px]"
              >
                ⛓️ Cómo Funciona el Registro Digital
              </button>
            </div>
          </div>
          <p className="text-[11px] text-text-main/70 text-center md:text-left border-t border-border/50 pt-1.5">
            Modo demostración interactivo con datos piloto del Lote #01 y oráculo Blockchain en
            simulación local.
          </p>
        </div>

        {/* Pestañas rápidas responsivas con soporte teclado y marca visual WCAG 1.4.1 */}
        <div
          role="tablist"
          aria-label="Secciones de la presentación"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              selectSlide(currentSlide + 1, true);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              selectSlide(currentSlide - 1, true);
            } else if (e.key === "Home") {
              e.preventDefault();
              selectSlide(0, true);
            } else if (e.key === "End") {
              e.preventDefault();
              selectSlide(slides.length - 1, true);
            }
          }}
          className="grid grid-cols-3 sm:flex sm:flex-wrap gap-1.5 justify-center mb-2.5"
        >
          {slides.map((s, idx) => {
            const seleccionado = currentSlide === idx;
            return (
              <button
                key={s.tab}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                id={`landing-tab-${idx}`}
                type="button"
                role="tab"
                tabIndex={seleccionado ? 0 : -1}
                aria-selected={seleccionado}
                aria-controls="landing-tabpanel"
                onClick={() => selectSlide(idx)}
                className={`px-2 sm:px-3 py-1.5 text-[11px] font-heading border border-b-4 transition-colors cursor-pointer min-h-[40px] ${
                  seleccionado
                    ? "bg-[var(--color-primary-btn)] text-white border-[var(--color-primary-btn)] border-b-text-accent underline underline-offset-4"
                    : "bg-background-card text-text-main/85 border-border border-b-border hover:border-primary/70"
                }`}
              >
                {s.tab}
              </button>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-border h-1.5 mb-4">
          <div
            className="bg-primary h-1.5 transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>

        {/* Main Slide Container */}
        <div
          id="landing-tabpanel"
          role="tabpanel"
          aria-labelledby={`landing-tab-${currentSlide}`}
          tabIndex={0}
          className="bg-background-card border border-border p-4 sm:p-6 min-h-[400px] sm:min-h-[470px] flex flex-col focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-[clamp(1.1rem,0.9rem+1.2vw,1.5rem)] font-heading text-text-accent mb-2">
              {slidesWithProps[currentSlide].title.toUpperCase()}
            </h2>
            <p className="text-sm sm:text-base text-text-main/80">
              {slidesWithProps[currentSlide].subtitle}
            </p>
          </div>

          <div className="flex-grow mb-4 sm:mb-6">
            {slidesWithProps[currentSlide].component}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center gap-2 sm:gap-4 mt-4">
          <button
            type="button"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="bg-secondary text-black py-2.5 px-3 sm:px-5 font-heading disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/80 transition-colors text-xs sm:text-base min-h-[44px]"
          >
            ← ANTERIOR
          </button>

          <span className="text-text-main/75 font-sans text-xs sm:text-sm text-center" aria-live="polite">
            PASO {currentSlide + 1} DE {slides.length}
          </span>

          {currentSlide < slides.length - 1 ? (
            <button
              type="button"
              onClick={nextSlide}
              className="bg-[var(--color-primary-btn)] text-white py-2.5 px-3 sm:px-5 font-heading hover:opacity-90 transition-opacity text-xs sm:text-base min-h-[44px]"
            >
              SIGUIENTE →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => (onEnterDemo ? onEnterDemo("inversionista") : setCurrentPage("ingreso"))}
              className="bg-[var(--color-primary-btn)] text-white py-2.5 px-3 sm:px-5 font-heading hover:opacity-90 transition-opacity text-xs sm:text-base min-h-[44px]"
            >
              {onEnterDemo ? "💎 VER DEMO" : "🚀 FINALIZAR"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

LandingPage.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  onEnterDemo: PropTypes.func,
};