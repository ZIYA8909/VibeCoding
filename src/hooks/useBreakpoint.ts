import { useState, useEffect } from 'react';

/**
 * Tracks responsive viewports using ResizeObserver.
 * Fallback to passive resize listeners if unsupported.
 * @param breakpointWidth Width threshold in pixels. Defaults to 768px (MD breakpoint)
 */
export function useBreakpoint(breakpointWidth: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpointWidth;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let active = true;

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver((entries) => {
        if (!active) return;
        for (const entry of entries) {
          // contentRect width provides the accurate layout rendering bounds
          const width = entry.contentBoxSize 
            ? entry.contentBoxSize[0].inlineSize 
            : entry.contentRect.width;
          setIsMobile(width < breakpointWidth);
        }
      });

      observer.observe(document.body);
      return () => {
        active = false;
        observer.disconnect();
      };
    } else {
      // Passive fallback for older browsers
      const handleResize = () => {
        if (!active) return;
        setIsMobile(window.innerWidth < breakpointWidth);
      };

      window.addEventListener('resize', handleResize, { passive: true });
      return () => {
        active = false;
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [breakpointWidth]);

  return isMobile;
}

export default useBreakpoint;
