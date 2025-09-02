import React from 'react';
import { useTheme } from '../../hooks/useTheme'; // Import the custom theme hook

/**
 * @file ThemeToggleButton.jsx
 * @description React component for a button that allows users to toggle between 'day' and 'night' themes.
 *              It uses the `useTheme` custom hook to access and control the application's theme state.
 *              The button's text dynamically changes based on the current theme.
 *              Styling is applied using Tailwind CSS classes, leveraging the theme variables defined in index.css.
 *
 * @returns {JSX.Element} A button element that toggles the theme.
 */
export const ThemeToggleButton = () => {
  // Destructure 'theme' (current theme) and 'toggleTheme' (function to change theme)
  // from the useTheme custom hook.
  const { theme, toggleTheme } = useTheme();

  return (
    // The button's onClick event calls the toggleTheme function.
    // Tailwind classes apply styling based on theme variables for background, border, text, and hover effects.
    // The font-heading class ensures the button text uses the Audiowide font.
    <button
      onClick={toggleTheme}
      className="p-2 border border-border text-text-main bg-background hover:bg-gray-500/20 transition-colors font-heading"
    >
      {/* Dynamically display button text based on the current theme */}
      {theme === 'day' ? 'MODO NOCHE' : 'MODO DÍA'}
    </button>
  );
};