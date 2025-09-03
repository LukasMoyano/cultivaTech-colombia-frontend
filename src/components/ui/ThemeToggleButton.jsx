import React from 'react';
import { useTheme } from '../../hooks/useTheme'; // Importa el hook personalizado de tema

/**
 * @file ThemeToggleButton.jsx
 * @description Componente de React para un botón que permite a los usuarios alternar entre temas 'day' y 'night'.
 *              Usa el hook personalizado `useTheme` para acceder y controlar el estado del tema de la aplicación.
 *              El texto del botón cambia dinámicamente basado en el tema actual.
 *              El estilo se aplica usando clases de Tailwind CSS, aprovechando las variables de tema definidas en index.css.
 *
 * @returns {JSX.Element} Un elemento botón que alterna el tema.
 */
export const ThemeToggleButton = () => {
  // Desestructura 'theme' (tema actual) y 'toggleTheme' (función para cambiar el tema)
  // del hook personalizado useTheme.
  const { theme, toggleTheme } = useTheme();

  return (
    // El evento onClick del botón llama a la función toggleTheme.
    // Las clases de Tailwind aplican estilos basados en variables de tema para fondo, borde, texto y efectos de desplazamiento.
    // La clase font-heading asegura que el texto del botón use la fuente Audiowide.
    <button
      onClick={toggleTheme}
      className="p-2 border border-border text-text-main bg-background hover:bg-gray-500/20 transition-colors font-heading"
    >
      {/* Muestra dinámicamente el texto del botón basado en el tema actual */}
      {theme === 'day' ? 'MODO NOCHE' : 'MODO DÍA'}
    </button>
  );
};