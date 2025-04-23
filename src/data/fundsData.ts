
import { Fund } from "@/types/fund";

export const funds: Fund[] = [
  {
    id: "jupiter-gold-silver",
    name: "Jupiter Gold & Silver Fund I USD ACC",
    isin: "IE00BYVJRD56",
    currentNAV: 129.42,
    currency: "USD",
    changes: {
      daily: 0.8,
      weekly: 2.3,
      monthly: -1.2,
      yearly: 14.5,
    },
    investment: 5000,
    topHoldings: [
      { name: "Newmont Corporation", weight: 8.2, change: 0.6 },
      { name: "Barrick Gold Corp", weight: 7.5, change: 1.2 },
      { name: "Franco-Nevada Corp", weight: 6.8, change: 0.3 },
      { name: "Wheaton Precious Metals", weight: 5.9, change: -0.4 },
      { name: "Agnico Eagle Mines", weight: 5.2, change: 0.7 },
      { name: "Royal Gold Inc", weight: 4.8, change: 0.2 },
      { name: "AngloGold Ashanti", weight: 4.3, change: -0.5 },
      { name: "Gold Fields Ltd", weight: 3.9, change: 0.8 },
      { name: "Kinross Gold Corp", weight: 3.6, change: 1.5 },
      { name: "Pan American Silver", weight: 3.4, change: -0.2 },
    ],
    sectorAllocation: [
      { sector: "Gold Mining", percentage: 65 },
      { sector: "Silver Mining", percentage: 20 },
      { sector: "Precious Metals", percentage: 12 },
      { sector: "Other", percentage: 3 },
    ],
    geographicExposure: [
      { region: "North America", percentage: 58 },
      { region: "Australia", percentage: 14 },
      { region: "South Africa", percentage: 12 },
      { region: "Russia", percentage: 8 },
      { region: "Other", percentage: 8 },
    ],
  },
  {
    id: "allianz-income-growth",
    name: "Allianz Income and Growth A H2 EUR",
    isin: "LU0913601281",
    currentNAV: 95.67,
    currency: "EUR",
    changes: {
      daily: -0.3,
      weekly: 1.2,
      monthly: 3.5,
      yearly: 8.7,
    },
    investment: 7000,
    topHoldings: [
      { name: "Microsoft Corp", weight: 4.8, change: 1.1 },
      { name: "Apple Inc", weight: 4.2, change: -0.8 },
      { name: "Alphabet Inc", weight: 3.8, change: 0.7 },
      { name: "Amazon.com Inc", weight: 3.5, change: -0.5 },
      { name: "Tesla Inc", weight: 2.9, change: -1.2 },
      { name: "Nvidia Corp", weight: 2.7, change: 2.4 },
      { name: "Meta Platforms Inc", weight: 2.4, change: 0.9 },
      { name: "Johnson & Johnson", weight: 2.2, change: 0.3 },
      { name: "JPMorgan Chase & Co", weight: 2.0, change: -0.2 },
      { name: "Visa Inc", weight: 1.9, change: 0.5 },
    ],
    sectorAllocation: [
      { sector: "Technology", percentage: 32 },
      { sector: "Consumer Discretionary", percentage: 18 },
      { sector: "Healthcare", percentage: 15 },
      { sector: "Financials", percentage: 14 },
      { sector: "Communication Services", percentage: 12 },
      { sector: "Other", percentage: 9 },
    ],
    geographicExposure: [
      { region: "United States", percentage: 75 },
      { region: "Europe", percentage: 15 },
      { region: "Asia", percentage: 8 },
      { region: "Other", percentage: 2 },
    ],
  },
  {
    id: "franklin-technology",
    name: "Franklin Technology Fund",
    isin: "LU0109392836",
    currentNAV: 157.83,
    currency: "USD",
    changes: {
      daily: 1.2,
      weekly: 3.7,
      monthly: -2.1,
      yearly: 22.6,
    },
    investment: 6500,
    topHoldings: [
      { name: "Apple Inc", weight: 8.5, change: -0.8 },
      { name: "Microsoft Corp", weight: 7.9, change: 1.1 },
      { name: "Nvidia Corp", weight: 6.8, change: 2.4 },
      { name: "Advanced Micro Devices", weight: 5.3, change: 1.8 },
      { name: "Salesforce Inc", weight: 4.7, change: 0.5 },
      { name: "Adobe Inc", weight: 4.2, change: -0.3 },
      { name: "Taiwan Semiconductor", weight: 3.8, change: 0.7 },
      { name: "ServiceNow Inc", weight: 3.6, change: 1.5 },
      { name: "Intuit Inc", weight: 3.2, change: 0.2 },
      { name: "Broadcom Inc", weight: 2.9, change: -0.5 },
    ],
    sectorAllocation: [
      { sector: "Software", percentage: 42 },
      { sector: "Semiconductors", percentage: 28 },
      { sector: "IT Services", percentage: 15 },
      { sector: "Hardware", percentage: 12 },
      { sector: "Other", percentage: 3 },
    ],
    geographicExposure: [
      { region: "United States", percentage: 82 },
      { region: "Taiwan", percentage: 6 },
      { region: "Netherlands", percentage: 4 },
      { region: "South Korea", percentage: 3 },
      { region: "Other", percentage: 5 },
    ],
  },
  {
    id: "franklin-us-opportunities",
    name: "Franklin U.S. Opportunities Fund",
    isin: "LU0109391861",
    currentNAV: 54.21,
    currency: "USD",
    changes: {
      daily: 0.6,
      weekly: 2.2,
      monthly: 4.5,
      yearly: 17.8,
    },
    investment: 8000,
    topHoldings: [
      { name: "Amazon.com Inc", weight: 6.2, change: -0.5 },
      { name: "Microsoft Corp", weight: 5.8, change: 1.1 },
      { name: "Apple Inc", weight: 5.3, change: -0.8 },
      { name: "Alphabet Inc", weight: 4.7, change: 0.7 },
      { name: "Mastercard Inc", weight: 3.9, change: 0.4 },
      { name: "Visa Inc", weight: 3.7, change: 0.5 },
      { name: "Nvidia Corp", weight: 3.4, change: 2.4 },
      { name: "UnitedHealth Group", weight: 3.1, change: 0.2 },
      { name: "PayPal Holdings", weight: 2.8, change: -1.2 },
      { name: "Adobe Inc", weight: 2.6, change: -0.3 },
    ],
    sectorAllocation: [
      { sector: "Technology", percentage: 35 },
      { sector: "Consumer Discretionary", percentage: 22 },
      { sector: "Healthcare", percentage: 18 },
      { sector: "Communication Services", percentage: 12 },
      { sector: "Financials", percentage: 8 },
      { sector: "Other", percentage: 5 },
    ],
    geographicExposure: [
      { region: "United States", percentage: 92 },
      { region: "Netherlands", percentage: 3 },
      { region: "United Kingdom", percentage: 3 },
      { region: "Other", percentage: 2 },
    ],
  },
];

export const calculateTotalInvestment = (): number => {
  return funds.reduce((total, fund) => total + fund.investment, 0);
};

export const calculateTotalCurrentValue = (): number => {
  return funds.reduce((total, fund) => {
    const currentValue = (fund.investment / fund.currentNAV) * fund.currentNAV * (1 + fund.changes.yearly / 100);
    return total + currentValue;
  }, 0);
};

export const calculateTotalProfit = (): number => {
  return calculateTotalCurrentValue() - calculateTotalInvestment();
};

export const calculateTotalProfitPercentage = (): number => {
  const totalInvestment = calculateTotalInvestment();
  const totalProfit = calculateTotalProfit();
  return (totalProfit / totalInvestment) * 100;
};
