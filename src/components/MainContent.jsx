// Importa PropTypes para validar los tipos de las props que recibe el componente.
import PropTypes from "prop-types";

// Importa los componentes hijos que se mostrarán según la página actual.
import IngresoRegistro from "./IngresoRegistro";
import Dashboard from "./Dashboard";
import { Mq4Dashboard } from "./telemetria";
import Cultivos from "./Cultivos";
import Alertas from "./Alertas";
import Robot from "./Robot";
import LandingPage from "./LandingPage";
import Foro from "./Foro";
import PuenteBlockchainVisual from "./shared/PuenteBlockchainVisual";
import {
  OfertaLoteScreen,
  SimuladorInversionScreen,
  PortafolioInversionistaScreen,
  SalidaLiquidacionScreen,
} from "./inversionista";

// Componente principal que renderiza el contenido central de la aplicación.
export default function MainContent({
  currentPage,
  setCurrentPage,
  onEnterDemo,
  participacionDemo,
  onConfirmarParticipacion,
}) {
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
      {/* Página de presentación inicial */}
      {currentPage === "landing" && (
        <LandingPage setCurrentPage={setCurrentPage} onEnterDemo={onEnterDemo} />
      )}

      {currentPage === "ingreso" && (
        <IngresoRegistro setCurrentPage={setCurrentPage} />
      )}

      {/* Módulo A: Agricultores */}
      {currentPage === "dashboard" && (
        <Dashboard setCurrentPage={setCurrentPage} />
      )}

      {currentPage === "telemetria" && (
        <div className="container mx-auto">
          <Mq4Dashboard />
        </div>
      )}

      {currentPage === "cultivos" && (
        <Cultivos setCurrentPage={setCurrentPage} />
      )}

      {currentPage === "alertas" && <Alertas setCurrentPage={setCurrentPage} />}

      {currentPage === "robot" && <Robot setCurrentPage={setCurrentPage} />}

      {currentPage === "foro" && (
        <Foro setCurrentPage={setCurrentPage} />
      )}

      {/* Módulo B: Inversionistas (4 Pantallas CCB) */}
      {currentPage === "inversion_oferta" && (
        <OfertaLoteScreen
          onNav={setCurrentPage}
          participacionDemo={participacionDemo}
          onConfirmarParticipacion={onConfirmarParticipacion}
        />
      )}

      {currentPage === "inversion_simulador" && (
        <SimuladorInversionScreen
          onNav={setCurrentPage}
          participacionDemo={participacionDemo}
          onConfirmarParticipacion={onConfirmarParticipacion}
        />
      )}

      {currentPage === "inversion_portafolio" && (
        <PortafolioInversionistaScreen
          onNav={setCurrentPage}
          participacionDemo={participacionDemo}
          onConfirmarParticipacion={onConfirmarParticipacion}
        />
      )}

      {currentPage === "inversion_salida" && (
        <SalidaLiquidacionScreen
          onNav={setCurrentPage}
          participacionDemo={participacionDemo}
        />
      )}

      {/* Puente Visual Blockchain (Compartido en lenguaje claro) */}
      {currentPage === "como_funciona" && (
        <PuenteBlockchainVisual onNavigate={setCurrentPage} />
      )}
    </main>
  );
}

MainContent.propTypes = {
  currentPage: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  onEnterDemo: PropTypes.func,
  participacionDemo: PropTypes.object,
  onConfirmarParticipacion: PropTypes.func,
};