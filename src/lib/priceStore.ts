import { Currency, BillingCycle } from './pricingMatrix';

export interface PriceStoreState {
  currency: Currency;
  billingCycle: BillingCycle;
}

type PriceStoreListener = (state: PriceStoreState) => void;

class PriceStore {
  private state: PriceStoreState = {
    currency: 'USD',
    billingCycle: 'monthly'
  };
  private listeners = new Set<PriceStoreListener>();

  getState(): PriceStoreState {
    return { ...this.state };
  }

  setCurrency(currency: Currency) {
    if (this.state.currency !== currency) {
      this.state.currency = currency;
      this.notify();
    }
  }

  setBillingCycle(billingCycle: BillingCycle) {
    if (this.state.billingCycle !== billingCycle) {
      this.state.billingCycle = billingCycle;
      this.notify();
    }
  }

  subscribe(listener: PriceStoreListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const currentState = this.getState();
    this.listeners.forEach((listener) => listener(currentState));
  }
}

export const priceStore = new PriceStore();
export default priceStore;
