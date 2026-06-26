import { useEffect, useRef, RefObject } from 'react';

/**
 * Updates CSS custom properties --mouse-x and --mouse-y on mouse movement.
 * Bypasses React re-renders entirely by mutating the DOM styles directly.
 */
export function useMouseGlow<T extends HTMLElement>(): RefObject<T | null> {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Mutating style properties directly triggers hardware-accelerated paint
      element.style.setProperty('--mouse-x', `${x}px`);
      element.style.setProperty('--mouse-y', `${y}px`);
    };

    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return elementRef;
}

export default useMouseGlow;
