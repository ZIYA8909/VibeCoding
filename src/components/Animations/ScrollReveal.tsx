import React, { ReactNode } from 'react';
import { useIntersection } from '../../hooks/useIntersection';

interface ScrollRevealProps {
  children: ReactNode;
  delayClassName?: string; // Tailwind transition delays: e.g. 'delay-100', 'delay-200'
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delayClassName = '',
  className = ''
}) => {
  const [ref, isVisible] = useIntersection<HTMLDivElement>({
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px' // Triggers slightly before hitting viewport edge
  });

  return (
    <div
      ref={ref}
      className={`reveal-hidden ${isVisible ? 'reveal-visible' : ''} ${delayClassName} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
