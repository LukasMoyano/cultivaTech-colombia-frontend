import React from "react";
import IngresoRegistro from "./IngresoRegistro";
import Dashboard from "./Dashboard";
import Cultivos from "./Cultivos";
import Alertas from "./Alertas";
import Robot from "./Robot";

export default function MainContent({ currentPage, setCurrentPage }) {
  return (
    {/* eslint-disable-next-line */}
    <main className="flex-1 cultiva-bg-light">
      {/* eslint-disable-next-line */}
      {currentPage === "ingreso" && (
        <IngresoRegistro setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "dashboard" && (
        <Dashboard setCurrentPage={setCurrentPage} />
      )}
      {/* eslint-disable-next-line */}
      {currentPage === "cultivos" && (
        <Cultivos setCurrentPage={setCurrentPage} />
      )}
      {/* eslint-disable-next-line */}
      {currentPage === "alertas" && <Alertas />}
      {currentPage === "robot" && <Robot />}
    </main>
  );
}