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

export default function LandingPage({ setCurrentPage }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };
  
  // Pass setCurrentPage to the last slide component
  const slidesWithProps = slides.map((slide, index) => {
    if (index === slides.length - 1) {
      return {
        ...slide,
        component: React.cloneElement(slide.component, { setCurrentPage }),
      };
    }
    return slide;
  });


  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-4">
            <h1 className="text-4xl md:text-5xl font-heading text-text-accent">
              CULTIVATECH COLOMBIA
            </h1>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-border h-1 mb-4">
          <div
            className="bg-primary h-1 transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>

        {/* Main Slide Container */}
        <div className="bg-background-card border border-border p-8 md:p-12 min-h-[550px] flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-heading text-text-accent mb-2">
              {slidesWithProps[currentSlide].title.toUpperCase()}
            </h2>
            <p className="text-lg text-text-main/80">
              {slidesWithProps[currentSlide].subtitle}
            </p>
          </div>
          
          <div className="flex-grow mb-8">
            {slidesWithProps[currentSlide].component}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center gap-4 mt-4">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="bg-secondary text-black py-2 px-6 font-heading disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/80 transition-colors"
          >
            ← ANTERIOR
          </button>
          
          <span className="text-text-main/70 font-sans text-sm">
            PASO {currentSlide + 1} DE {slides.length}
          </span>
          
          {currentSlide < slides.length - 1 ? (
            <button onClick={nextSlide} className="bg-primary text-white py-2 px-6 font-heading hover:bg-primary/80 transition-colors">
              SIGUIENTE →
            </button>
          ) : (
            <button
              onClick={() => setCurrentPage("ingreso")}
              className="bg-primary text-white py-2 px-6 font-heading hover:bg-primary/80 transition-colors"
            >
              🚀 FINALIZAR
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

LandingPage.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};