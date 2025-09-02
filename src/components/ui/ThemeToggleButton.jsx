import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border border-border text-text-main bg-background hover:bg-gray-500/20 transition-colors font-heading"
    >
      {theme === 'day' ? 'MODO DÍA' : 'MODO NOCHE'}
    </button>
  );
};
