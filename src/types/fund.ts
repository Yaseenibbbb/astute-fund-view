
export interface Fund {
  id: string;
  name: string;
  isin: string;
  currentNAV: number;
  currency: string;
  changes: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  investment: number;
  topHoldings: Array<{
    name: string;
    weight: number;
    change: number;
  }>;
  sectorAllocation: Array<{
    sector: string;
    percentage: number;
  }>;
  geographicExposure: Array<{
    region: string;
    percentage: number;
  }>;
}
