import { useCallback, useEffect, useState } from "react";
import { obtenerResumenPiloto } from "../api";
import { RESUMEN_PILOTO_FALLBACK } from "../data/pilotoFallback";

/**
 * Hook compartido que consulta el resumen del Lote Piloto #01, estado del oráculo y confianza IoT.
 * Mantiene respaldo inmediato para presentaciones en vivo sin romper la interfaz si el backend hiberna.
 */
export function usePilotoResumen(refreshMs = 15000) {
  const [resumen, setResumen] = useState(RESUMEN_PILOTO_FALLBACK);
  const [cargando, setCargando] = useState(true);
  const [conectadoBackend, setConectadoBackend] = useState(false);

  const recargar = useCallback(async () => {
    try {
      const data = await obtenerResumenPiloto();
      if (data?.lote) {
        setResumen(data);
        setConectadoBackend(true);
      }
    } catch {
      setConectadoBackend(false);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    recargar();
    const timer = window.setInterval(recargar, refreshMs);
    return () => window.clearInterval(timer);
  }, [recargar, refreshMs]);

  return { resumen, cargando, conectadoBackend, recargar };
}

export default usePilotoResumen;
