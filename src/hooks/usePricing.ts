import { useMemo } from 'react';
import { Currency, BillingCycle, calculatePrice, calculateAnnualTotal } from '../lib/pricingMatrix';

export interface UsePricingResult {
  symbol: string;
  value: string;
  originalValue?: string;
  annualTotal?: string;
  billingText: string;
}

export function usePricing(
  tierId: string,
  currency: Currency,
  billingCycle: BillingCycle
): UsePricingResult {
  return useMemo(() => {
    const { symbol, value, originalValue } = calculatePrice(tierId, currency, billingCycle);
    
    let annualTotal: string | undefined;
    if (billingCycle === 'annual') {
      annualTotal = calculateAnnualTotal(tierId, currency);
    }

    const billingText = billingCycle === 'monthly' ? '/mo' : '/mo';

    return {
      symbol,
      value,
      originalValue,
      annualTotal,
      billingText
    };
  }, [tierId, currency, billingCycle]);
}
