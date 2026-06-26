import React from 'react';
import { PriceNode } from './PriceNode';

interface PricingCardProps {
  id: string;
  name: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = React.memo(({
  id,
  name,
  description,
  features,
  ctaText,
  isPopular = false
}) => {
  return (
    <article 
      className={`glass-card p-8 rounded-2xl flex flex-col relative h-full corner-frame ${
        isPopular 
          ? 'border-2 border-primary-hex/40 shadow-xl shadow-primary-hex/5' 
          : 'border border-text-primary-hex/5 corner-frame-purple'
      }`}
    >
      <div className="corner-bottom" />
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-hex to-accent-hex text-oceanic font-bold text-xs uppercase px-4 py-1.5 rounded-full tracking-wider shadow-md select-none">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold tracking-tight text-white mb-2">{name}</h3>
        <p className="text-sm text-mint/70 min-h-10">{description}</p>
      </div>

      <div className="mb-8">
        <PriceNode tierId={id} />
      </div>

      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-sm text-mint/90">
            <svg 
              className="w-5 h-5 text-primary-hex mr-3 flex-shrink-0 mt-0.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button 
        type="button"
        className={`w-full py-4.5 px-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all btn-hover-active focus-visible:outline-none ${
          isPopular 
            ? 'bg-gradient-to-r from-primary-hex to-accent-hex text-oceanic shadow-lg hover:shadow-primary-hex/20' 
            : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
        }`}
      >
        {ctaText}
      </button>
    </article>
  );
});

PricingCard.displayName = 'PricingCard';
export default PricingCard;
