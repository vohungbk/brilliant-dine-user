const CURRENCY_LIST = [
  'USD',
  'EUR',
  'JPY',
  'GBP',
  'AUD',
  'CAD',
  'CHF',
  'CNY',
  'SEK',
  'NZD',
  'MXN',
  'SGD',
  'HKD',
  'NOK',
  'KRW',
  'TRY',
  'INR',
  'RUB',
  'BRL',
  'ZAR',
  'MYR',
  'THB',
  'IDR',
  'DKK',
  'PLN',
  'TWD',
  'AED',
  'SAR',
  'ARS',
  'ILS',
  'PHP',
  'CZK',
  'PKR',
  'EGP',
  'HUF',
  'CLP',
  'BDT',
  'VND',
  'NGN',
  'COP',
  'KES',
  'QAR',
  'LKR',
  'KWD',
  'OMR',
  'BHD',
  'JOD',
  'MAD',
  'TND',
];

export const getCurrencySymbols = () => {
  const symbols: { [key: string]: string } = {};
  CURRENCY_LIST.forEach((currency) => {
    try {
      const formatter = new Intl.NumberFormat('en', {
        style: 'currency',
        currency,
      });
      const parts = formatter.formatToParts(1);
      const symbol = parts.find((part) => part.type === 'currency')?.value;
      if (symbol) symbols[currency] = symbol;
    } catch (error) {
      console.error(`Error fetching symbol for currency ${currency}:`, error);
    }
  });
  return symbols;
};
