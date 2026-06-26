import React, { useState, useEffect } from 'react';
import { priceStore, PriceStoreState } from '../../lib/priceStore';
import { usePricing } from '../../hooks/usePricing';

interface PriceNodeProps {
  tierId: string;
}

export const PriceNode: React.FC<PriceNodeProps> = React.memo(({ tierId }) => {
  // Subscribe to priceStore updates
  const [storeState, setStoreState] = useState<PriceStoreState>(() => priceStore.getState());

  useEffect(() => {
    const unsubscribe = priceStore.subscribe((newState) => {
      setStoreState(newState);
    });
    return unsubscribe;
  }, []);

  const { symbol, value, originalValue, annualTotal, billingText } = usePricing(
    tierId,
    storeState.currency,
    storeState.billingCycle
  );

  return (
    <div className="flex flex-col h-14 justify-end select-none">
      <div className="flex items-baseline gap-2">
        {originalValue && (
          <span className="text-lg font-medium text-mint/40 line-through decoration-accent/60">
            {symbol}{originalValue}
          </span>
        )}
        <span className="text-5xl font-extrabold text-primary-hex tracking-tight tabular-nums transition-all duration-200">
          {symbol}{value}
        </span>
        <span className="text-sm font-medium text-mint/60">
          {billingText}
        </span>
      </div>
      {annualTotal && (
        <div className="text-xs font-semibold text-accent-hex/90 mt-1 uppercase tracking-wider animate-fade-in">
          Billed annually ({symbol}{annualTotal}/yr)
        </div>
      )}
    </div>
  );
});

PriceNode.displayName = 'PriceNode';
