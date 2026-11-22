import React, { useState } from "react";
import PropTypes from "prop-types";

// Import the new slide components
import WelcomeSlide from "./landing/slides/WelcomeSlide";
import ProblemSolutionSlide from "./landing/slides/ProblemSolutionSlide";
import TechStackSlide from "./landing/slides/TechStackSlide";
import HowItWorksSlide from "./landing/slides/HowItWorksSlide";
import CtaSlide from "./landing/slides/CtaSlide";

// Cleaned up slides array
const slides = [
  {
    title: "Bienvenido a CultivaTech ColombIA",
    subtitle: "Innovación Agro-IoT con Arte, Ciencia y Tecnología",
    component: <WelcomeSlide />,
  },
  {
    title: "¿Qué Problemas Resolvemos?",
    subtitle: "Transformando los desafíos agrícolas en oportunidades",
    component: <ProblemSolutionSlide />,
  },
  {
    title: "Tecnologías y Características",
    subtitle: "Potencia tecnológica al servicio del agro",
    component: <TechStackSlide />,
  },
  {
    title: "¿Cómo Funciona?",
    subtitle: "Proceso simple y efectivo",
    component: <HowItWorksSlide />,
  },
  {
    title: "¡Comienza Tu Transformación Digital!",
    subtitle: "Únete a la revolución agro-tecnológica",
    component: <CtaSlide />,
  },
];

export default function LandingPage({ setCurrentPage, onEnterDemo }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

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
    <div className="min-h-screen bg-background text-text-main flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-heading text-text-accent">
            Cultiva Tech ColombIA
          </h1>
          <p className="text-xs text-text-main/70 mt-1">
            Trazabilidad IoT + Tokenización Productiva · Piloto Demo Day CCB
          </p>
        </div>

        {/* Acceso directo Demo Day (sin fricción de registro para jurados) */}
        <div className="mb-4 p-3 bg-background-card border border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs font-heading text-text-accent uppercase tracking-wider">
            Acceso Directo Demo Day
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo("inversionista")}
              className="bg-primary text-white px-3 py-1.5 text-xs font-heading hover:bg-primary/85 transition-colors cursor-pointer"
            >
              💎 Explorar Demo Inversionista
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("agricultor")}
              className="border border-accent text-accent px-3 py-1.5 text-xs font-heading hover:bg-accent/15 transition-colors cursor-pointer"
            >
              🌱 Explorar Demo Agricultor
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("inversionista", "como_funciona")}
              className="border border-border text-text-main px-3 py-1.5 text-xs font-heading hover:border-text-accent hover:text-text-accent transition-colors cursor-pointer"
            >
              ⛓️ Cómo Funciona Blockchain
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-border h-1.5 mb-4">
          <div
            className="bg-primary h-1.5 transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>

        {/* Main Slide Container */}
        <div className="bg-background-card border border-border p-6 min-h-[500px] flex flex-col">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-heading text-text-accent mb-3">
              {slidesWithProps[currentSlide].title.toUpperCase()}
            </h2>
            <p className="text-base text-text-main/80">
              {slidesWithProps[currentSlide].subtitle}
            </p>
          </div>
          
          <div className="flex-grow mb-6">
            {slidesWithProps[currentSlide].component}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center gap-4 mt-4">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="bg-secondary text-black py-2.5 px-5 font-heading disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/80 transition-colors text-base"
          >
            ← ANTERIOR
          </button>
          
          <span className="text-text-main/70 font-sans">
            PASO {currentSlide + 1} DE {slides.length}
          </span>
          
          {currentSlide < slides.length - 1 ? (
            <button onClick={nextSlide} className="bg-primary text-white py-2.5 px-5 font-heading hover:bg-primary/80 transition-colors text-base">
              SIGUIENTE →
            </button>
          ) : (
            <button
              onClick={() => (onEnterDemo ? onEnterDemo("inversionista") : setCurrentPage("ingreso"))}
              className="bg-primary text-white py-2.5 px-5 font-heading hover:bg-primary/80 transition-colors text-base"
            >
              {onEnterDemo ? "💎 VER DEMO INVERSIONISTA" : "🚀 FINALIZAR"}
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