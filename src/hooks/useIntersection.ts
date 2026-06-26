import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * Returns whether an element has intersected with the viewport.
 * Latching (once intersected, stays intersected) to prevent scroll bounce.
 */
export function useIntersection<T extends HTMLElement>(
  options?: IntersectionObserverInit
): [RefObject<T | null>, boolean] {
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasIntersected(true);
        // Disconnect immediately as it is a latching fade-in
        observer.disconnect();
      }
    }, options || { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    observer.observe(currentElement);
    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [elementRef, hasIntersected];
}

export default useIntersection;
