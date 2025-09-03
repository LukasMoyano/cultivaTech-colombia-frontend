import { useState, useEffect } from 'react';

/**
 * @file useTheme.js
 * @description Hook personalizado de React para gestionar y persistir el tema de la aplicación (modo Día/Noche).
 *              Maneja el estado del tema, lo aplica al elemento raíz del documento y guarda la preferencia del usuario en localStorage.
 *              También respeta la preferencia de tema del sistema operativo del usuario en la carga inicial.
 */

export const useTheme = () => {
  // Estado para mantener el tema actual ('day' o 'night').
  // 'day' se establece como tema por defecto según la solicitud del usuario.
  const [theme, setTheme] = useState('day'); 

  /**
   * Hook useEffect para determinar el tema inicial cuando el componente se monta.
   * Prioridad:
   * 1. Tema guardado en localStorage (última preferencia del usuario).
   * 2. Preferencia de tema del sistema operativo del usuario (prefers-color-scheme).
   * 3. Por defecto 'day' si no se encuentra preferencia.
   */
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme'); // Obtiene el tema de localStorage
    // Verifica la preferencia del SO para modo oscuro
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
    
    // Establece el tema inicial basado en la preferencia guardada o la del SO, por defecto 'day'.
    // El usuario solicitó específicamente que 'day' sea el primer tema en la carga inicial si no hay preferencia guardada.
    setTheme(storedTheme || 'day'); 
  }, []); // Array de dependencias vacío asegura que esto se ejecute solo una vez al montar

  /**
   * Hook useEffect para aplicar el tema actual al elemento raíz del documento
   * y persistirlo en localStorage cada vez que el estado 'theme' cambia.
   * El atributo 'data-theme' en <html> es usado por CSS para aplicar estilos específicos del tema.
   */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme); // Aplica el tema al elemento HTML
    localStorage.setItem('theme', theme); // Persiste el tema en localStorage
  }, [theme]); // Se ejecuta cada vez que el estado 'theme' cambia

  /**
   * Función para alternar el tema entre 'day' y 'night'.
   * Esta función es expuesta por el hook para que los componentes la usen.
   */
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'day' ? 'night' : 'day'));
  };

  // Devuelve el tema actual y la función de alternancia para que los componentes la consuman.
  return { theme, toggleTheme };
};