import React, { useState, useEffect, useRef } from 'react';
import { priceStore } from '../../lib/priceStore';
import { Currency, BillingCycle } from '../../lib/pricingMatrix';
import { PricingCard } from './PricingCard';

// Isolated Billing Cycle Toggle Component
const BillingToggle: React.FC = React.memo(() => {
  const [cycle, setCycle] = useState<BillingCycle>(() => priceStore.getState().billingCycle);

  useEffect(() => {
    const unsubscribe = priceStore.subscribe((state) => {
      setCycle(state.billingCycle);
    });
    return unsubscribe;
  }, []);

  const handleToggle = (newCycle: BillingCycle) => {
    priceStore.setBillingCycle(newCycle);
  };

  return (
    <div 
      className="inline-flex items-center p-1 rounded-xl bg-white/5 border border-white/10 select-none"
      role="radiogroup" 
      aria-label="Billing cycle"
    >
      <button
        type="button"
        role="radio"
        aria-checked={cycle === 'monthly'}
        onClick={() => handleToggle('monthly')}
        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-none ${
          cycle === 'monthly'
            ? 'bg-primary-hex text-oceanic shadow-md'
            : 'text-mint/60 hover:text-white'
        }`}
      >
        Monthly
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={cycle === 'annual'}
        onClick={() => handleToggle('annual')}
        className={`relative px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-none ${
          cycle === 'annual'
            ? 'bg-primary-hex text-oceanic shadow-md'
            : 'text-mint/60 hover:text-white'
        }`}
      >
        Annually
        <span className="absolute -top-3.5 -right-3 px-2 py-0.5 bg-accent-hex text-white font-extrabold text-[8px] rounded-md tracking-wider border border-oceanic animate-bounce">
          -20%
        </span>
      </button>
    </div>
  );
});
BillingToggle.displayName = 'BillingToggle';

// Isolated Currency Selector Component (With Accessibility controls)
const CurrencySelector: React.FC = React.memo(() => {
  const [currency, setCurrency] = useState<Currency>(() => priceStore.getState().currency);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = priceStore.subscribe((state) => {
      setCurrency(state.currency);
    });
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (cur: Currency) => {
    priceStore.setCurrency(cur);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, cur: Currency) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(cur);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="inline-flex justify-between items-center w-28 px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-wider text-white focus-visible:outline-none"
        >
          <span>{currency}</span>
          <svg className="w-4 h-4 ml-2 text-mint/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <ul 
          className="absolute right-0 w-28 mt-2 origin-top-right rounded-xl glass-heavy border border-white/10 shadow-lg z-20 focus:outline-none"
          role="listbox"
          aria-label="Currency"
        >
          {(['USD', 'EUR', 'INR'] as Currency[]).map((cur) => (
            <li key={cur} role="option" aria-selected={currency === cur}>
              <button
                type="button"
                onClick={() => handleSelect(cur)}
                onKeyDown={(e) => handleKeyDown(e, cur)}
                className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all first:rounded-t-xl last:rounded-b-xl hover:bg-primary-hex hover:text-oceanic ${
                  currency === cur ? 'text-primary-hex bg-white/5' : 'text-mint/80'
                }`}
              >
                {cur}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
CurrencySelector.displayName = 'CurrencySelector';

// Static PricingSection Component
export const PricingSection: React.FC = () => {
  const tiers = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small teams automating initial data flows.',
      ctaText: 'Start Building',
      features: [
        '15 active custom agents',
        'Real-time process telemetry',
        'Standard API access',
        '24/7 client support'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Advanced features for enterprise deployment scales.',
      ctaText: 'Deploy Now',
      isPopular: true,
      features: [
        'Unlimited custom agents',
        'Advanced telemetry dashboard',
        'High-frequency API throughput',
        'Dedicated account manager',
        'End-to-end data encryption'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'SLA-backed systems built for massive volume queries.',
      ctaText: 'Contact Sales',
      features: [
        'Custom model training pipelines',
        'Bespoke LLM-native integrations',
        'Unlimited telemetry logs',
        '99.99% direct SLA guarantees',
        '24-hour engineer standby'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden grid-bg">
      {/* Visual lighting background blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-nocturnal-hex/10 rounded-full blur-3xl -z-10 animate-drift-slow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-hex/5 rounded-full blur-3xl -z-10 animate-drift-delay" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-primary-hex uppercase mb-3">
            Pricing Plans
          </h2>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            SLA-Backed AI Operations
          </h2>
          <p className="max-w-2xl text-mint/70 text-lg mb-10">
            Select a plan that matches your pipeline scale. Regional currency tariffs and annual discounts are calculated dynamically without latency.
          </p>

          {/* Pricing control selectors container */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <BillingToggle />
            <CurrencySelector />
          </div>
        </div>

        {/* Pricing matrix grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <PricingCard
              key={tier.id}
              id={tier.id}
              name={tier.name}
              description={tier.description}
              features={tier.features}
              ctaText={tier.ctaText}
              isPopular={tier.isPopular}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
