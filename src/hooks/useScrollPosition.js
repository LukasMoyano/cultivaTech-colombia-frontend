import { useState, useEffect } from 'react';

/**
 * @file useScrollPosition.js
 * @description Hook personalizado de React para rastrear la posición de desplazamiento vertical de la ventana.
 *              Proporciona la posición actual de desplazamiento en píxeles desde la parte superior del documento.
 *              Útil para implementar efectos de UI dependientes del desplazamiento (ej. encabezados fijos, animaciones).
 */
const useScrollPosition = () => {
  // Estado para almacenar la posición actual de desplazamiento. Inicializado a 0 (parte superior de la página).
  const [scrollPosition, setScrollPosition] = useState(0);

  /**
   * Hook useEffect para añadir y eliminar el escuchador de eventos de desplazamiento.
   * Esto asegura que el escuchador esté activo solo cuando el componente que usa el hook está montado
   * y se limpie cuando se desmonte para prevenir fugas de memoria.
   */
  useEffect(() => {
    /**
     * Función manejadora de eventos que actualiza el estado scrollPosition
     * con el desplazamiento vertical actual del documento.
     */
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset); // window.pageYOffset es una propiedad de solo lectura que devuelve el número de píxeles que el documento está actualmente desplazado verticalmente.
    };

    // Añade el escuchador de eventos de desplazamiento a la ventana.
    window.addEventListener('scroll', handleScroll);

    /**
     * Función de limpieza: Esto es devuelto por useEffect y se ejecuta cuando el componente se desmonta
     * o antes de que el efecto se ejecute de nuevo (si las dependencias cambian, aunque aquí el array de dependencias está vacío).
     * Elimina el escuchador de eventos para prevenir fugas de memoria.
     */
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Array de dependencias vacío asegura que este efecto se ejecute solo una vez al montar y se limpie al desmontar.

  // Devuelve la posición actual de desplazamiento al componente que usa este hook.
  return scrollPosition;
};

export default useScrollPosition;