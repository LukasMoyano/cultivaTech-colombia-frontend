import { useState, useEffect } from 'react';

/**
 * @file useTheme.js
 * @description Custom React Hook for managing and persisting the application's theme (Day/Night mode).
 *              It handles theme state, applies it to the document's root element, and saves user preference in localStorage.
 *              It also respects the user's operating system theme preference on initial load.
 */

export const useTheme = () => {
  // State to hold the current theme ('day' or 'night').
  // 'day' is set as the default theme as per user's request.
  const [theme, setTheme] = useState('day'); 

  /**
   * useEffect hook to determine the initial theme when the component mounts.
   * Priority:
   * 1. Theme saved in localStorage (user's last preference).
   * 2. User's operating system theme preference (prefers-color-scheme).
   * 3. Default to 'day' if no preference is found.
   */
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme'); // Get theme from localStorage
    // Check OS preference for dark mode
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
    
    // Set the initial theme based on stored preference or OS preference, defaulting to 'day'.
    // The user specifically requested 'day' to be the first theme on initial load if no stored preference.
    setTheme(storedTheme || 'day'); 
  }, []); // Empty dependency array ensures this runs only once on mount

  /**
   * useEffect hook to apply the current theme to the document's root element
   * and persist it in localStorage whenever the 'theme' state changes.
   * The 'data-theme' attribute on <html> is used by CSS to apply theme-specific styles.
   */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme); // Apply theme to HTML element
    localStorage.setItem('theme', theme); // Persist theme in localStorage
  }, [theme]); // Reruns whenever the 'theme' state changes

  /**
   * Function to toggle the theme between 'day' and 'night'.
   * This function is exposed by the hook for components to use.
   */
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'day' ? 'night' : 'day'));
  };

  // Returns the current theme and the toggle function for components to consume.
  return { theme, toggleTheme };
};