import React from 'react';

interface FeatureItem {
  id: string;
  name: string;
  description: string;
  iconPath: string;
}

export const FeatureGrid: React.FC = () => {
  const features: FeatureItem[] = [
    {
      id: 'secure',
      name: 'Secure Guard',
      description: 'We fortify your AI deployments with robust security protocols. Our team ensures every model adheres to strict data privacy standards.',
      iconPath: 'cog-8-tooth.svg'
    },
    {
      id: 'agent',
      name: 'Agent Build',
      description: 'Tailored AI agents designed for your specific needs. We develop custom logic and workflows that integrate deeply with your existing tools.',
      iconPath: 'link-solid.svg'
    },
    {
      id: 'scale',
      name: 'Cloud Scale',
      description: 'Infrastructure optimization for high-traffic AI apps. We ensure your systems remain fast, responsive, and ready for any level of demand.',
      iconPath: 'arrow-trending-up.svg'
    },
    {
      id: 'mining',
      name: 'Data Mining',
      description: 'Transform raw information into actionable intelligence. We build the pipelines and vector stores that power your organization\'s future.',
      iconPath: 'cube-16-solid.svg'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-oceanic/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-sm font-semibold tracking-widest text-primary-hex uppercase mb-3">
              Capabilities
            </h2>
            <h3 className="text-4xl font-extrabold tracking-tight text-white mb-0">
              Technical Feature Showcase
            </h3>
          </div>
          <p className="max-w-md text-mint/60 text-sm leading-relaxed">
            Every feature is engineered to deliver zero-latency inference and secure process isolated queries under extreme load conditions.
          </p>
        </div>

        {/* Feature Grid layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat) => (
            <article 
              key={feat.id} 
              className="glass-card p-6.5 rounded-2xl flex flex-col justify-between border border-white/5 min-h-[220px]"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-hex mb-5 select-none">
                  <img 
                    src={`/src/assets/svgs/${feat.iconPath}`} 
                    alt="" 
                    className="w-5 h-5 brightness-150 animate-float"
                    style={{ animationDuration: feat.id === 'secure' ? '4s' : '5s' }}
                  />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{feat.name}</h4>
                <p className="text-xs text-mint/70 leading-relaxed">{feat.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
