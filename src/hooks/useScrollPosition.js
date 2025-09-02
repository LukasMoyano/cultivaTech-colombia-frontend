import { useState, useEffect } from 'react';

/**
 * @file useScrollPosition.js
 * @description Custom React Hook to track the vertical scroll position of the window.
 *              It provides the current scroll position in pixels from the top of the document.
 *              Useful for implementing scroll-dependent UI effects (e.g., sticky headers, animations).
 */
const useScrollPosition = () => {
  // State to store the current scroll position. Initialized to 0 (top of the page).
  const [scrollPosition, setScrollPosition] = useState(0);

  /**
   * useEffect hook to add and remove the scroll event listener.
   * This ensures the listener is active only when the component using the hook is mounted
   * and cleaned up when it unmounts to prevent memory leaks.
   */
  useEffect(() => {
    /**
     * Event handler function that updates the scrollPosition state
     * with the current vertical scroll offset of the document.
     */
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset); // window.pageYOffset is a read-only property that returns the number of pixels the document is currently scrolled vertically.
    };

    // Add the scroll event listener to the window.
    window.addEventListener('scroll', handleScroll);

    /**
     * Cleanup function: This is returned by useEffect and runs when the component unmounts
     * or before the effect runs again (if dependencies change, though here the dependency array is empty).
     * It removes the event listener to prevent memory leaks.
     */
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount.

  // Returns the current scroll position to the component using this hook.
  return scrollPosition;
};

export default useScrollPosition;