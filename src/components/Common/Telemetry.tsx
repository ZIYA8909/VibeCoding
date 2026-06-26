import React, { useState, useEffect, useRef } from 'react';
import { useIntersection } from '../../hooks/useIntersection';

interface TelemetryMetric {
  id: string;
  label: string;
  subLabel: string;
  targetValue: number;
  suffix: string;
  decimals: number;
}

export const Telemetry: React.FC = () => {
  const [ref, isVisible] = useIntersection<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  const metrics: TelemetryMetric[] = [
    { id: 'load', label: 'System Load', subLabel: 'Active neural processing', targetValue: 98.4, suffix: '%', decimals: 1 },
    { id: 'sla', label: 'SLA Response', subLabel: 'Global uptime monitoring', targetValue: 99.998, suffix: '%', decimals: 3 },
    { id: 'volume', label: 'Token Usage', subLabel: 'Monthly volume throughput', targetValue: 3.8, suffix: 'M', decimals: 1 },
    { id: 'latency', label: 'Core Latency', subLabel: 'Real-time inference speed', targetValue: 42, suffix: 'ms', decimals: 0 }
  ];

  // Store animating numbers state
  const [values, setValues] = useState<number[]>([0, 0, 0, 0]);
  const animationStarted = useRef(false);

  useEffect(() => {
    if (!isVisible || animationStarted.current) return;
    animationStarted.current = true;

    const duration = 1500; // 1.5 seconds animation
    const startTime = performance.now();

    let animationFrameId: number;

    const easeOutCubic = (x: number): number => {
      return 1 - Math.pow(1 - x, 3);
    };

    const updateCounters = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const nextValues = metrics.map((metric) => {
        return easedProgress * metric.targetValue;
      });

      setValues(nextValues);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounters);
      } else {
        // Force snap to exact targets at end
        setValues(metrics.map(m => m.targetValue));
      }
    };

    animationFrameId = requestAnimationFrame(updateCounters);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <section ref={ref} id="telemetry" className="py-24 relative overflow-hidden bg-oceanic/20">
      {/* Background visual spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C7A9FF]/6 rounded-full blur-3xl -z-10 animate-drift-slow" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-[#C7A9FF] uppercase mb-3">
            Real-time Metrics
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Optimized for Performance
          </h3>
          <p className="text-mint/70 text-lg">
            Monitor every neural query pulse in real-time. Armory provides deep telemetry logs, server speeds, and data volume efficiency metrics instantly.
          </p>
        </div>

        {/* Telemetry metrics panel with layout containment */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto contain-heavy">
          {metrics.map((metric, index) => {
            const displayValue = values[index].toFixed(metric.decimals);
            
            // Apply different text gradients based on card index
            const gradientClass = 
              index === 0 ? 'text-gradient-neon' :
              index === 1 ? 'text-gradient-gold' :
              index === 2 ? 'text-gradient-purple' : 'text-gradient-neon';

            return (
              <div 
                key={metric.id}
                className="glass corner-frame corner-frame-purple p-6 rounded-2xl border border-white/5 flex flex-col justify-between select-none min-h-[160px] hover:border-primary-hex/30 hover:scale-102 transition-all duration-300"
              >
                <div className="corner-bottom" />
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-bold text-mint/45 uppercase tracking-wider">{metric.label}</h4>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C7A9FF] animate-ping" />
                  </div>
                  <p className="text-[10px] text-mint/60 font-medium mb-4">{metric.subLabel}</p>
                </div>
                
                <div className="flex items-baseline gap-1 mt-auto">
                  <span className={`text-4xl md:text-5xl font-extrabold tracking-tight tabular-nums ${gradientClass}`}>
                    {displayValue}
                  </span>
                  <span className="text-lg font-bold text-primary-hex">
                    {metric.suffix}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Telemetry;
