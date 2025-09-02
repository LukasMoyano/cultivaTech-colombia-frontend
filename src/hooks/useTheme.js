import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('day'); // Default to 'day' as requested

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
    
    // Priority: 1. LocalStorage, 2. OS preference, 3. Default ('day')
    const initialTheme = storedTheme || preferredTheme;
    // On initial load, respect the user's request for day mode to be first
    setTheme(storedTheme || 'day');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'day' ? 'night' : 'day'));
  };

  return { theme, toggleTheme };
};
