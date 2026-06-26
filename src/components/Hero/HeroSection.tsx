import React, { Suspense, lazy } from 'react';
import { useMouseGlow } from '../../hooks/useMouseGlow';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

// Lazy-load ThreeBrain WebGL element to minimize blocking initial paint
const ThreeBrain = lazy(() => import('./Character/Scene'));

export const HeroSection: React.FC = () => {
  const glowRef = useMouseGlow<HTMLDivElement>();

  return (
    <section 
      ref={glowRef}
      className="relative min-h-screen pt-32 pb-24 flex items-center justify-center overflow-hidden grid-bg bg-noise select-none"
      style={{
        // Combined brand teal mouse radial highlight with a premium neon lavender aura
        background: `
          radial-gradient(circle 650px at var(--mouse-x, 50%) var(--mouse-y, 40%), rgba(17, 76, 90, 0.22), transparent 75%),
          radial-gradient(circle 900px at 50% 50%, rgba(199, 169, 255, 0.08), transparent 70%)
        `
      }}
    >
      {/* Decorative floating animated background blobs */}
      <div className="absolute top-1/10 left-1/12 w-80 h-80 bg-primary-hex/5 rounded-full blur-3xl -z-10 animate-drift-slow" />
      <div className="absolute bottom-1/4 right-1/12 w-96 h-96 bg-[#C7A9FF]/12 rounded-full blur-3xl -z-10 animate-drift-delay" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Side Content (Heading, CTA, Badges) (Spans 6 columns) */}
        <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs font-bold text-[#C7A9FF] uppercase tracking-widest animate-float select-none">
            <span className="w-2 h-2 rounded-full bg-[#C7A9FF] animate-ping" />
            <span>Next-Gen Release</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
            Power your <br className="hidden lg:block"/>
            future with <span className="text-gradient-neon">AI</span>
          </h1>

          <p className="max-w-xl text-mint/75 text-base md:text-lg leading-relaxed font-sans">
            Deploy custom enterprise agents and automate complex data workflows. Scale your intelligence, secure your logs, and accelerate execution with Armory today.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#C7A9FF] via-primary-hex to-accent-hex text-oceanic text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary-hex/10 btn-hover-active text-center focus-visible:outline-none"
            >
              Build a Workflow
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white text-sm font-bold uppercase tracking-wider rounded-xl border border-white/10 transition-all btn-hover-active text-center focus-visible:outline-none"
            >
              Live Demo
            </a>
          </div>

          {/* Small static metrics board under heading */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 w-full">
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">99.98%</div>
              <div className="text-[10px] text-mint/50 font-bold uppercase tracking-wider">SLA Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">8.4M</div>
              <div className="text-[10px] text-mint/50 font-bold uppercase tracking-wider">Req / Day</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white tracking-tight">24ms</div>
              <div className="text-[10px] text-mint/50 font-bold uppercase tracking-wider">Inference</div>
            </div>
          </div>
        </div>

        {/* Right Side 3D WebGL Mesh (Spans 6 columns) */}
        <div className="md:col-span-6 relative flex items-center justify-center min-h-[350px] corner-frame corner-frame-purple p-8">
          <div className="corner-bottom" />
          {/* Decorative grid framing rings */}
          <div className="absolute inset-0 border border-white/5 rounded-full -z-10 scale-95" />
          <div className="absolute inset-8 border border-dashed border-white/5 rounded-full -z-10 scale-75 animate-spin-slow" />

          <WebGLErrorBoundary>
            <Suspense fallback={
              <div className="w-full h-full min-h-[300px] md:min-h-[500px] flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-primary-hex/30 animate-spin" />
              </div>
            }>
              <ThreeBrain />
            </Suspense>
          </WebGLErrorBoundary>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
