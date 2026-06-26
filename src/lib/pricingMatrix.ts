export type Currency = 'USD' | 'EUR' | 'INR';
export type BillingCycle = 'monthly' | 'annual';

export interface PricingConfig {
  baseRates: {
    [key: string]: number;
  };
  annualDiscount: number; // e.g. 0.20
  currencies: {
    [key in Currency]: {
      symbol: string;
      rate: number;   // Conversion rate from USD
      tariff: number; // Regional tariff / purchasing power parity factor
    };
  };
}

export const PRICING_MATRIX: PricingConfig = {
  baseRates: {
    starter: 19,
    professional: 49,
    enterprise: 149
  },
  annualDiscount: 0.20,
  currencies: {
    USD: { symbol: '$', rate: 1.0, tariff: 1.0 },
    EUR: { symbol: '€', rate: 0.92, tariff: 0.95 },
    INR: { symbol: '₹', rate: 83.5, tariff: 0.80 } // 20% PPP adjustment
  }
};

/**
 * Calculates pricing dynamically based on the multi-dimensional configuration matrix.
 * Rounds to nearest integer for clean presentation.
 */
export function calculatePrice(
  tierId: string,
  currency: Currency,
  billingCycle: BillingCycle
): { symbol: string; value: string; originalValue?: string } {
  const baseRate = PRICING_MATRIX.baseRates[tierId] || 0;
  const currencyInfo = PRICING_MATRIX.currencies[currency];
  
  if (!currencyInfo) {
    return { symbol: '$', value: '0' };
  }

  const { symbol, rate, tariff } = currencyInfo;

  // Formula: BaseRate * Rate * Tariff * (Cycle Discount)
  const isAnnual = billingCycle === 'annual';
  const discountMultiplier = isAnnual ? (1 - PRICING_MATRIX.annualDiscount) : 1.0;
  
  // Calculate monthly equivalent price
  const monthlyCost = baseRate * rate * tariff * discountMultiplier;
  const roundedMonthly = Math.round(monthlyCost);

  if (isAnnual) {
    // Show original price (no discount) for comparison
    const originalMonthlyCost = baseRate * rate * tariff;
    const roundedOriginal = Math.round(originalMonthlyCost);
    return {
      symbol,
      value: roundedMonthly.toLocaleString(),
      originalValue: roundedOriginal.toLocaleString()
    };
  }

  return {
    symbol,
    value: roundedMonthly.toLocaleString()
  };
}

/**
 * Calculates the total annual billing amount
 */
export function calculateAnnualTotal(
  tierId: string,
  currency: Currency
): string {
  const baseRate = PRICING_MATRIX.baseRates[tierId] || 0;
  const currencyInfo = PRICING_MATRIX.currencies[currency];
  const { rate, tariff } = currencyInfo;
  
  const annualTotal = baseRate * rate * tariff * (1 - PRICING_MATRIX.annualDiscount) * 12;
  return Math.round(annualTotal).toLocaleString();
}
