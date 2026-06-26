import React, { useState } from 'react';
import { useBreakpoint } from '../../hooks/useBreakpoint';

interface BentoItem {
  id: string;
  label: string;
  shortDesc: string;
  fullDesc: string;
  iconPath: string;
  visualType: 'discovery' | 'analysis' | 'training' | 'deploy';
}

export const BentoSection: React.FC = () => {
  const isMobile = useBreakpoint(768);
  const [activeIndex, setActiveIndex] = useState<number>(1); // Default to Analysis as in the demo

  const items: BentoItem[] = [
    {
      id: 'discovery',
      label: 'Discovery',
      shortDesc: 'Automated workflow discovery',
      fullDesc: 'Map out multi-unit pipelines and active datasets without manual configuration. Armory crawls your database schemas and structures operations into neat workflows automatically.',
      iconPath: 'search.svg',
      visualType: 'discovery'
    },
    {
      id: 'analysis',
      label: 'Analysis',
      shortDesc: 'Real-time accuracy scoring',
      fullDesc: 'Evaluate agent performance with surgical precision. Get real-time scoring on accuracy, safety, and contextual relevance. Detect hallucinatory loops before they affect production logs.',
      iconPath: 'chart-pie.svg',
      visualType: 'analysis'
    },
    {
      id: 'training',
      label: 'Training',
      shortDesc: 'Continuous model alignment',
      fullDesc: 'Fine-tune weights and customize agent instructions using reinforcement feedback loops. Align model capabilities directly to target execution pipelines with zero developer friction.',
      iconPath: 'arrow-path.svg',
      visualType: 'training'
    },
    {
      id: 'deploy',
      label: 'Deploy',
      shortDesc: 'Isolated infrastructure scaling',
      fullDesc: 'Spin up isolated sandbox environments or serverless endpoints for each active agent. Contain security profiles and scale compute up to millions of requests dynamically.',
      iconPath: 'cube-16-solid.svg',
      visualType: 'deploy'
    }
  ];

  // Visual representations inside the Bento Detail / Accordion Panel
  const renderVisual = (type: BentoItem['visualType']) => {
    switch (type) {
      case 'discovery':
        return (
          <div className="flex flex-col gap-3 p-6 bg-oceanic/50 rounded-xl border border-white/5 font-mono text-xs select-none">
            <div className="flex items-center justify-between text-mint/40 border-b border-white/5 pb-2">
              <span>WORKFLOW TREE</span>
              <span className="text-primary-hex">ACTIVE</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-primary-hex">
                <span className="text-mint/40 mr-2">1.</span>
                <span>[Trigger] Email_IMAP_Receive</span>
              </div>
              <div className="flex items-center text-white pl-4 border-l border-white/10">
                <span className="text-mint/40 mr-2">2.</span>
                <span>[Action] Extract_Payload_Zod</span>
              </div>
              <div className="flex items-center text-mint/60 pl-8 border-l border-white/10">
                <span className="text-mint/40 mr-2">3.</span>
                <span>[Agent] AI_Router_Agent</span>
              </div>
            </div>
          </div>
        );
      case 'analysis':
        return (
          <div className="p-6 bg-oceanic/50 rounded-xl border border-white/5 select-none">
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-xs text-mint/40 uppercase tracking-widest">Score Assessment</span>
              <span className="px-2.5 py-0.5 bg-primary-hex/10 text-primary-hex font-bold text-[10px] uppercase rounded-full">Passed</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Accuracy</span>
                  <span className="text-primary-hex">9.8 / 10</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-hex rounded-full transition-all duration-500" style={{ width: '98%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Safety</span>
                  <span className="text-primary-hex">10.0 / 10</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-hex rounded-full transition-all duration-500" style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Contextual Relevance</span>
                  <span className="text-primary-hex">8.5 / 10</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-hex rounded-full transition-all duration-500" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </div>
        );
      case 'training':
        return (
          <div className="p-6 bg-oceanic/50 rounded-xl border border-white/5 font-mono text-xs space-y-4 select-none">
            <div className="flex justify-between items-center text-mint/40">
              <span>NEURAL WEIGHT ALIGNMENT</span>
              <span className="animate-pulse text-accent-hex">TRAINING...</span>
            </div>
            <div className="relative h-12 bg-white/5 rounded-lg border border-white/5 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-y-0 left-0 bg-accent-hex/10 transition-all duration-500" style={{ width: '74%' }} />
              <span className="relative font-bold text-accent-hex">EPOCH 42/50 | Loss: 0.012</span>
            </div>
            <div className="flex justify-between text-[10px] text-mint/50">
              <span>LR: 1e-4</span>
              <span>Optimizer: AdamW</span>
            </div>
          </div>
        );
      case 'deploy':
        return (
          <div className="p-6 bg-oceanic/50 rounded-xl border border-white/5 font-mono text-[11px] space-y-2 select-none">
            <div className="flex justify-between border-b border-white/5 pb-2 mb-2 text-mint/40">
              <span>SYSTEM LOGS</span>
              <span>HOST: ARMORY-NODE-4</span>
            </div>
            <div className="text-primary-hex">[INFO] Instance container initialized successfully.</div>
            <div className="text-mint/60">[INFO] Bind interface config established on port 8080.</div>
            <div className="text-accent-hex">[WARN] High query throughput detected, autoscaling Node-5...</div>
          </div>
        );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIndex(index);
    } else if (e.key === 'ArrowDown' && index < items.length - 1) {
      e.preventDefault();
      setActiveIndex(index + 1);
    } else if (e.key === 'ArrowUp' && index > 0) {
      e.preventDefault();
      setActiveIndex(index - 1);
    }
  };

  return (
    <section id="features" className="py-24 relative bg-oceanic/20 overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#C7A9FF]/8 rounded-full blur-3xl -z-10 animate-drift-slow" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-primary-hex/5 rounded-full blur-3xl -z-10 animate-drift-delay" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-20 text-center md:text-left max-w-3xl">
          <h2 className="text-sm font-semibold tracking-widest text-primary-hex uppercase mb-3">
            Core Architecture
          </h2>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Engineered for Autonomy
          </h2>
          <p className="text-mint/70 text-lg">
            Go beyond simple chatbot interfaces. Armory provides the production-ready infrastructure to orchestrate, analyze, train, and deploy enterprise AI operations.
          </p>
        </div>

        {isMobile ? (
          /* Mobile view: Touch-optimized Accordion list */
          <div className="space-y-4" role="tablist" aria-label="Features accordion">
            {items.map((item, index) => {
              const isOpen = activeIndex === index;
              return (
                <div 
                  key={item.id} 
                  className={`glass border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-primary-hex/40 shadow-lg shadow-primary-hex/5' : 'border-white/5'
                  }`}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isOpen}
                    aria-controls={`panel-${item.id}`}
                    id={`tab-${item.id}`}
                    onClick={() => setActiveIndex(isOpen ? -1 : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-hex">
                        <img 
                          src={`/src/assets/svgs/${item.iconPath}`} 
                          alt="" 
                          className="w-5 h-5" 
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white uppercase tracking-wider">{item.label}</h3>
                        <p className="text-xs text-mint/60">{item.shortDesc}</p>
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-mint/40 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180 text-primary-hex' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div
                    id={`panel-${item.id}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${item.id}`}
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[500px] border-t border-white/5 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="p-6 space-y-6">
                      <p className="text-sm text-mint/80 leading-relaxed">{item.fullDesc}</p>
                      {renderVisual(item.visualType)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Desktop view: Bento Grid Layout */
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left list tabs column (5 columns span) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {items.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={item.id}
                    role="tab"
                    id={`desktop-tab-${item.id}`}
                    aria-selected={isActive}
                    aria-controls={`desktop-panel-${item.id}`}
                    tabIndex={0}
                    onMouseEnter={() => setActiveIndex(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`glass-card p-6 rounded-2xl cursor-pointer flex items-center gap-5 border select-none ${
                      isActive 
                        ? 'border-primary-hex/40 bg-white/5 shadow-lg shadow-primary-hex/5' 
                        : 'border-white/5 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isActive ? 'bg-primary-hex text-oceanic' : 'bg-white/5 text-mint'
                    }`}>
                      <img 
                        src={`/src/assets/svgs/${item.iconPath}`} 
                        alt="" 
                        className={`w-6 h-6 ${isActive ? 'invert-0' : 'brightness-200'}`}
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-1">{item.label}</h3>
                      <p className="text-xs text-mint/60 font-medium">{item.shortDesc}</p>
                    </div>
                    <svg className={`w-5 h-5 text-mint/30 transition-transform ${isActive ? 'translate-x-1 text-primary-hex' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                );
              })}
            </div>

            {/* Right details bento wrapper panel (7 columns span) */}
            <div className="lg:col-span-7">
              <div className="glass corner-frame corner-frame-purple p-8 rounded-3xl h-full border border-white/5 flex flex-col justify-between relative overflow-hidden min-h-[460px]">
                <div className="corner-bottom" />
                {/* Lighting accent spot */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C7A9FF]/12 rounded-full blur-3xl -z-10" />

                {items.map((item, index) => {
                  const isActive = activeIndex === index;
                  if (!isActive) return null;
                  return (
                    <div 
                      key={item.id} 
                      id={`desktop-panel-${item.id}`}
                      role="tabpanel" 
                      aria-labelledby={`desktop-tab-${item.id}`}
                      className="h-full flex flex-col justify-between space-y-8 animate-fade-in"
                    >
                      <div className="space-y-4">
                        <div className="inline-flex px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs font-bold text-[#C7A9FF] uppercase tracking-widest">
                          Module 0{index + 1}
                        </div>
                        <h3 className={`text-3xl font-bold tracking-tight uppercase ${index % 2 === 0 ? 'text-gradient-neon' : 'text-gradient-gold'}`}>{item.label} Engine</h3>
                        <p className="text-mint/70 text-base leading-relaxed">{item.fullDesc}</p>
                      </div>

                      <div className="flex-grow flex items-center justify-center py-4">
                        <div className="w-full max-w-md">
                          {renderVisual(item.visualType)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/5 pt-6 text-xs font-mono text-mint/40">
                        <span>SECURITY LEVEL: ISO-27001</span>
                        <span>STATUS: OPTIMIZED</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BentoSection;
