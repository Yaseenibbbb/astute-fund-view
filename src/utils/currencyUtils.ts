
// AED to USD conversion rate (1 USD = 3.67 AED)
const USD_TO_AED = 3.67;

export const usdToAed = (amountUSD: number): number => {
  return amountUSD * USD_TO_AED;
};

export const formatCurrency = (amount: number, currency: string = 'AED'): string => {
  return `${currency} ${amount.toLocaleString('ar-AE', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};
