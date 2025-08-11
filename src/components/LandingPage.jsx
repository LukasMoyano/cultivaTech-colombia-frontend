import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * LandingPage - Página de presentación de CultivaTech ColombIA
 * Muestra información detallada sobre la aplicación antes del registro
 */
export default function LandingPage({ setCurrentPage }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "🌱 Bienvenido a CultivaTech ColombIA",
      subtitle: "Innovación Agro-IoT con Arte, Ciencia y Tecnología",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🌿🤖</div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Una plataforma revolucionaria que combina <strong>sensores inteligentes</strong>, 
              <strong> inteligencia artificial</strong> y <strong>diseño intuitivo</strong> para 
              transformar la agricultura colombiana.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-bold text-green-700">Arte</h3>
              <p className="text-sm text-gray-600">Interfaces intuitivas y visuales</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">🔬</div>
              <h3 className="font-bold text-blue-700">Ciencia</h3>
              <p className="text-sm text-gray-600">Análisis de datos precisos</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-2">💻</div>
              <h3 className="font-bold text-purple-700">Tecnología</h3>
              <p className="text-sm text-gray-600">Hardware de código abierto</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "🚀 ¿Qué Problemas Resolvemos?",
      subtitle: "Transformando los desafíos agrícolas en oportunidades",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
              <h3 className="font-bold text-red-700 mb-3">❌ Problemas Actuales</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Falta de monitoreo en tiempo real</li>
                <li>• Pérdidas económicas por decisiones tardías</li>
                <li>• Herramientas costosas e inaccesibles</li>
                <li>• Información fragmentada y poco clara</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
              <h3 className="font-bold text-green-700 mb-3">✅ Nuestra Solución</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Monitoreo 24/7 con sensores IoT</li>
                <li>• Alertas inteligentes y preventivas</li>
                <li>• Tecnología accesible y escalable</li>
                <li>• Dashboard unificado e intuitivo</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "🛠️ Tecnologías y Características",
      subtitle: "Potencia tecnológica al servicio del agro",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-800">🔧 Hardware</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                  <span className="text-2xl">📡</span>
                  <div>
                    <p className="font-semibold">Sensores ESP32</p>
                    <p className="text-xs text-gray-600">Temperatura, humedad, pH</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <p className="font-semibold">Robots Autónomos</p>
                    <p className="text-xs text-gray-600">Monitoreo y análisis</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-800">💻 Software</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <p className="font-semibold">IA Predictiva</p>
                    <p className="text-xs text-gray-600">Detección de anomalías</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="font-semibold">App Multiplataforma</p>
                    <p className="text-xs text-gray-600">Web y móvil</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "🎯 ¿Cómo Funciona?",
      subtitle: "Proceso simple y efectivo",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-lg">
              <div className="text-4xl mb-2">📡</div>
              <h3 className="font-bold text-green-800">1. Sensores</h3>
              <p className="text-xs text-green-700">Recolectan datos 24/7</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
              <div className="text-4xl mb-2">🧠</div>
              <h3 className="font-bold text-blue-800">2. IA Analiza</h3>
              <p className="text-xs text-blue-700">Procesa y predice</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg">
              <div className="text-4xl mb-2">⚠️</div>
              <h3 className="font-bold text-yellow-800">3. Alertas</h3>
              <p className="text-xs text-yellow-700">Notifica problemas</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="font-bold text-purple-800">4. Acción</h3>
              <p className="text-xs text-purple-700">Tomas decisiones</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg text-gray-700">
              <strong>Resultado:</strong> Cultivos más saludables, mayor productividad y decisiones informadas
            </p>
          </div>
        </div>
      )
    },
    {
      title: "🚀 ¡Comienza Tu Transformación Digital!",
      subtitle: "Únete a la revolución agro-tecnológica",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🌾✨</div>
            <p className="text-xl text-gray-700 mb-6">
              Más de <strong>1000+ agricultores</strong> ya confían en CultivaTech ColombIA
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">+35%</div>
              <p className="text-sm text-gray-600">Aumento en productividad</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">-50%</div>
              <p className="text-sm text-gray-600">Reducción de pérdidas</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <p className="text-sm text-gray-600">Monitoreo continuo</p>
            </div>
          </div>
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              ¿Listo para revolucionar tu agricultura?
            </p>
            <div className="space-x-4">
              <button
                onClick={() => setCurrentPage("ingreso")}
                className="btn btn-primary text-lg px-8 py-4"
              >
                🚀 ¡Comenzar Ahora!
              </button>
              <button
                onClick={() => setCurrentSlide(0)}
                className="btn btn-outline"
              >
                📖 Ver Presentación Nuevamente
              </button>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header de la presentación */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">🌿</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              CultivaTech ColombIA
            </h1>
            <span className="text-4xl">🇨🇴</span>
          </div>
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-green-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Contenido del slide actual */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 min-h-[500px]">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {slides[currentSlide].title}
              </h2>
              <p className="text-lg text-gray-600">
                {slides[currentSlide].subtitle}
              </p>
            </div>
            
            <div className="mb-8">
              {slides[currentSlide].content}
            </div>
          </div>
        </div>

        {/* Controles de navegación */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`btn ${currentSlide === 0 ? 'btn-outline opacity-50 cursor-not-allowed' : 'btn-secondary'}`}
          >
            ← Anterior
          </button>
          
          <span className="text-gray-600 font-medium">
            {currentSlide + 1} de {slides.length}
          </span>
          
          {currentSlide < slides.length - 1 ? (
            <button onClick={nextSlide} className="btn btn-primary">
              Siguiente →
            </button>
          ) : (
            <button
              onClick={() => setCurrentPage("ingreso")}
              className="btn btn-primary text-lg px-8"
            >
              🚀 ¡Empezar!
            </button>
          )}
        </div>

        {/* Botón de salto directo */}
        <div className="text-center mt-6">
          <button
            onClick={() => setCurrentPage("ingreso")}
            className="text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Saltar presentación e ir directo al registro
          </button>
        </div>
      </div>
    </div>
  );
}

LandingPage.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};