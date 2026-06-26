import { useState, useEffect, useRef, RefObject } from 'react';

interface Size {
  width: number;
  height: number;
}

/**
 * Tracks the dimensions of an element using ResizeObserver.
 */
export function useResizeObserver<T extends HTMLElement>(): [RefObject<T | null>, Size] {
  const elementRef = useRef<T | null>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      if (!Array.isArray(entries) || !entries.length) return;
      
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      
      setSize({ width, height });
    });

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  return [elementRef, size];
}

export default useResizeObserver;
