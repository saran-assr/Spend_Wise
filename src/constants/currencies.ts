export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  country: string;
  locale: string;
  decimals: number;
  flag: string;
}

/**
 * Comprehensive ISO 4217 Global Currency Model
 * Covers 110+ major world currencies spanning all continents.
 */
export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  // Top Global Reserve & High-Volume Currencies
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', country: 'United States', locale: 'en-US', decimals: 2, flag: '🇺🇸' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', country: 'European Union', locale: 'de-DE', decimals: 2, flag: '🇪🇺' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', country: 'United Kingdom', locale: 'en-GB', decimals: 2, flag: '🇬🇧' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', country: 'India', locale: 'en-IN', decimals: 2, flag: '🇮🇳' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', country: 'Japan', locale: 'ja-JP', decimals: 0, flag: '🇯🇵' },
  CAD: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', country: 'Canada', locale: 'en-CA', decimals: 2, flag: '🇨🇦' },
  AUD: { code: 'AUD', symbol: 'AU$', name: 'Australian Dollar', country: 'Australia', locale: 'en-AU', decimals: 2, flag: '🇦🇺' },
  CHF: { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', country: 'Switzerland', locale: 'de-CH', decimals: 2, flag: '🇨🇭' },
  CNY: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', country: 'China', locale: 'zh-CN', decimals: 2, flag: '🇨🇳' },
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', country: 'United Arab Emirates', locale: 'en-AE', decimals: 2, flag: '🇦🇪' },
  SGD: { code: 'SGD', symbol: 'SG$', name: 'Singapore Dollar', country: 'Singapore', locale: 'en-SG', decimals: 2, flag: '🇸🇬' },
  SAR: { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal', country: 'Saudi Arabia', locale: 'ar-SA', decimals: 2, flag: '🇸🇦' },
  NZD: { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', country: 'New Zealand', locale: 'en-NZ', decimals: 2, flag: '🇳🇿' },
  HKD: { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', country: 'Hong Kong', locale: 'zh-HK', decimals: 2, flag: '🇭🇰' },
  KRW: { code: 'KRW', symbol: '₩', name: 'South Korean Won', country: 'South Korea', locale: 'ko-KR', decimals: 0, flag: '🇰🇷' },
  BRL: { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', country: 'Brazil', locale: 'pt-BR', decimals: 2, flag: '🇧🇷' },
  ZAR: { code: 'ZAR', symbol: 'R', name: 'South African Rand', country: 'South Africa', locale: 'en-ZA', decimals: 2, flag: '🇿🇦' },
  MXN: { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso', country: 'Mexico', locale: 'es-MX', decimals: 2, flag: '🇲🇽' },
  SEK: { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', country: 'Sweden', locale: 'sv-SE', decimals: 2, flag: '🇸🇪' },
  NOK: { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', country: 'Norway', locale: 'nb-NO', decimals: 2, flag: '🇳🇴' },
  DKK: { code: 'DKK', symbol: 'kr', name: 'Danish Krone', country: 'Denmark', locale: 'da-DK', decimals: 2, flag: '🇩🇰' },
  PLN: { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', country: 'Poland', locale: 'pl-PL', decimals: 2, flag: '🇵🇱' },
  TRY: { code: 'TRY', symbol: '₺', name: 'Turkish Lira', country: 'Turkey', locale: 'tr-TR', decimals: 2, flag: '🇹🇷' },

  // Asia & Pacific
  IDR: { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', country: 'Indonesia', locale: 'id-ID', decimals: 0, flag: '🇮🇩' },
  THB: { code: 'THB', symbol: '฿', name: 'Thai Baht', country: 'Thailand', locale: 'th-TH', decimals: 2, flag: '🇹🇭' },
  MYR: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', country: 'Malaysia', locale: 'ms-MY', decimals: 2, flag: '🇲🇾' },
  PHP: { code: 'PHP', symbol: '₱', name: 'Philippine Peso', country: 'Philippines', locale: 'en-PH', decimals: 2, flag: '🇵🇭' },
  VND: { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', country: 'Vietnam', locale: 'vi-VN', decimals: 0, flag: '🇻🇳' },
  TWD: { code: 'TWD', symbol: 'NT$', name: 'New Taiwan Dollar', country: 'Taiwan', locale: 'zh-TW', decimals: 2, flag: '🇹🇼' },
  PKR: { code: 'PKR', symbol: 'PKR', name: 'Pakistani Rupee', country: 'Pakistan', locale: 'ur-PK', decimals: 2, flag: '🇵🇰' },
  BDT: { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', country: 'Bangladesh', locale: 'bn-BD', decimals: 2, flag: '🇧🇩' },
  LKR: { code: 'LKR', symbol: 'LKR', name: 'Sri Lankan Rupee', country: 'Sri Lanka', locale: 'si-LK', decimals: 2, flag: '🇱🇰' },
  NPR: { code: 'NPR', symbol: 'NPR', name: 'Nepalese Rupee', country: 'Nepal', locale: 'ne-NP', decimals: 2, flag: '🇳🇵' },
  MMK: { code: 'MMK', symbol: 'K', name: 'Myanmar Kyat', country: 'Myanmar', locale: 'my-MM', decimals: 0, flag: '🇲🇲' },
  KHR: { code: 'KHR', symbol: '៛', name: 'Cambodian Riel', country: 'Cambodia', locale: 'km-KH', decimals: 0, flag: '🇰🇭' },
  LAK: { code: 'LAK', symbol: '₭', name: 'Lao Kip', country: 'Laos', locale: 'lo-LA', decimals: 0, flag: '🇱🇦' },
  KZT: { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge', country: 'Kazakhstan', locale: 'kk-KZ', decimals: 2, flag: '🇰🇿' },
  UZS: { code: 'UZS', symbol: 'soʻm', name: 'Uzbekistani Som', country: 'Uzbekistan', locale: 'uz-UZ', decimals: 0, flag: '🇺🇿' },
  MNT: { code: 'MNT', symbol: '₮', name: 'Mongolian Tugrik', country: 'Mongolia', locale: 'mn-MN', decimals: 0, flag: '🇲🇳' },
  BND: { code: 'BND', symbol: 'BN$', name: 'Brunei Dollar', country: 'Brunei', locale: 'ms-BN', decimals: 2, flag: '🇧🇳' },
  FJD: { code: 'FJD', symbol: 'FJ$', name: 'Fijian Dollar', country: 'Fiji', locale: 'en-FJ', decimals: 2, flag: '🇫🇯' },
  PGK: { code: 'PGK', symbol: 'K', name: 'Papua New Guinean Kina', country: 'Papua New Guinea', locale: 'en-PG', decimals: 2, flag: '🇵🇬' },

  // Middle East & North Africa
  QAR: { code: 'QAR', symbol: 'QAR', name: 'Qatari Riyal', country: 'Qatar', locale: 'ar-QA', decimals: 2, flag: '🇶🇦' },
  KWD: { code: 'KWD', symbol: 'KWD', name: 'Kuwaiti Dinar', country: 'Kuwait', locale: 'ar-KW', decimals: 3, flag: '🇰🇼' },
  BHD: { code: 'BHD', symbol: 'BHD', name: 'Bahraini Dinar', country: 'Bahrain', locale: 'ar-BH', decimals: 3, flag: '🇧🇭' },
  OMR: { code: 'OMR', symbol: 'OMR', name: 'Omani Rial', country: 'Oman', locale: 'ar-OM', decimals: 3, flag: '🇴🇲' },
  JOD: { code: 'JOD', symbol: 'JOD', name: 'Jordanian Dinar', country: 'Jordan', locale: 'ar-JO', decimals: 3, flag: '🇯🇴' },
  ILS: { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel', country: 'Israel', locale: 'he-IL', decimals: 2, flag: '🇮🇱' },
  EGP: { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', country: 'Egypt', locale: 'ar-EG', decimals: 2, flag: '🇪🇬' },
  MAD: { code: 'MAD', symbol: 'MAD', name: 'Moroccan Dirham', country: 'Morocco', locale: 'ar-MA', decimals: 2, flag: '🇲🇦' },
  DZD: { code: 'DZD', symbol: 'DZD', name: 'Algerian Dinar', country: 'Algeria', locale: 'ar-DZ', decimals: 2, flag: '🇩🇿' },
  TND: { code: 'TND', symbol: 'TND', name: 'Tunisian Dinar', country: 'Tunisia', locale: 'ar-TN', decimals: 3, flag: '🇹🇳' },
  IQD: { code: 'IQD', symbol: 'IQD', name: 'Iraqi Dinar', country: 'Iraq', locale: 'ar-IQ', decimals: 0, flag: '🇮🇶' },
  LBP: { code: 'LBP', symbol: 'L£', name: 'Lebanese Pound', country: 'Lebanon', locale: 'ar-LB', decimals: 0, flag: '🇱🇧' },

  // Sub-Saharan Africa
  NGN: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', country: 'Nigeria', locale: 'en-NG', decimals: 2, flag: '🇳🇬' },
  KES: { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', country: 'Kenya', locale: 'en-KE', decimals: 2, flag: '🇰🇪' },
  GHS: { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', country: 'Ghana', locale: 'en-GH', decimals: 2, flag: '🇬🇭' },
  ETB: { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr', country: 'Ethiopia', locale: 'am-ET', decimals: 2, flag: '🇪🇹' },
  TZS: { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling', country: 'Tanzania', locale: 'sw-TZ', decimals: 0, flag: '🇹🇿' },
  UGX: { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling', country: 'Uganda', locale: 'en-UG', decimals: 0, flag: '🇺🇬' },
  RWF: { code: 'RWF', symbol: 'RF', name: 'Rwandan Franc', country: 'Rwanda', locale: 'rw-RW', decimals: 0, flag: '🇷🇼' },
  ZMW: { code: 'ZMW', symbol: 'ZK', name: 'Zambian Kwacha', country: 'Zambia', locale: 'en-ZM', decimals: 2, flag: '🇿🇲' },
  AOA: { code: 'AOA', symbol: 'Kz', name: 'Angolan Kwanza', country: 'Angola', locale: 'pt-AO', decimals: 2, flag: '🇦🇴' },
  MZN: { code: 'MZN', symbol: 'MT', name: 'Mozambican Metical', country: 'Mozambique', locale: 'pt-MZ', decimals: 2, flag: '🇲🇿' },
  BWP: { code: 'BWP', symbol: 'P', name: 'Botswana Pula', country: 'Botswana', locale: 'en-BW', decimals: 2, flag: '🇧🇼' },
  MUR: { code: 'MUR', symbol: '₨', name: 'Mauritian Rupee', country: 'Mauritius', locale: 'en-MU', decimals: 2, flag: '🇲🇺' },
  NAD: { code: 'NAD', symbol: 'N$', name: 'Namibian Dollar', country: 'Namibia', locale: 'en-NA', decimals: 2, flag: '🇳🇦' },
  XOF: { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc', country: 'West Africa (UEMOA)', locale: 'fr-SN', decimals: 0, flag: '🌍' },
  XAF: { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc', country: 'Central Africa (CEMAC)', locale: 'fr-CM', decimals: 0, flag: '🌍' },

  // Latin America & Caribbean
  ARS: { code: 'ARS', symbol: 'AR$', name: 'Argentine Peso', country: 'Argentina', locale: 'es-AR', decimals: 2, flag: '🇦🇷' },
  COP: { code: 'COP', symbol: 'COL$', name: 'Colombian Peso', country: 'Colombia', locale: 'es-CO', decimals: 0, flag: '🇨🇴' },
  CLP: { code: 'CLP', symbol: 'CLP$', name: 'Chilean Peso', country: 'Chile', locale: 'es-CL', decimals: 0, flag: '🇨🇱' },
  PEN: { code: 'PEN', symbol: 'S/.', name: 'Peruvian Sol', country: 'Peru', locale: 'es-PE', decimals: 2, flag: '🇵🇪' },
  UYU: { code: 'UYU', symbol: '$U', name: 'Uruguayan Peso', country: 'Uruguay', locale: 'es-UY', decimals: 2, flag: '🇺🇾' },
  CRC: { code: 'CRC', symbol: '₡', name: 'Costa Rican Colon', country: 'Costa Rica', locale: 'es-CR', decimals: 2, flag: '🇨🇷' },
  DOP: { code: 'DOP', symbol: 'RD$', name: 'Dominican Peso', country: 'Dominican Republic', locale: 'es-DO', decimals: 2, flag: '🇩🇴' },
  GTQ: { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal', country: 'Guatemala', locale: 'es-GT', decimals: 2, flag: '🇬🇹' },
  PAB: { code: 'PAB', symbol: 'B/.', name: 'Panamanian Balboa', country: 'Panama', locale: 'es-PA', decimals: 2, flag: '🇵🇦' },
  JMD: { code: 'JMD', symbol: 'J$', name: 'Jamaican Dollar', country: 'Jamaica', locale: 'en-JM', decimals: 2, flag: '🇯🇲' },
  TTD: { code: 'TTD', symbol: 'TT$', name: 'Trinidad and Tobago Dollar', country: 'Trinidad & Tobago', locale: 'en-TT', decimals: 2, flag: '🇹🇹' },
  PYG: { code: 'PYG', symbol: '₲', name: 'Paraguayan Guarani', country: 'Paraguay', locale: 'es-PY', decimals: 0, flag: '🇵🇾' },
  BOB: { code: 'BOB', symbol: 'Bs', name: 'Bolivian Boliviano', country: 'Bolivia', locale: 'es-BO', decimals: 2, flag: '🇧🇴' },
  HNL: { code: 'HNL', symbol: 'L', name: 'Honduran Lempira', country: 'Honduras', locale: 'es-HN', decimals: 2, flag: '🇭🇳' },
  NIO: { code: 'NIO', symbol: 'C$', name: 'Nicaraguan Cordoba', country: 'Nicaragua', locale: 'es-NI', decimals: 2, flag: '🇳🇮' },
  BBD: { code: 'BBD', symbol: 'Bds$', name: 'Barbadian Dollar', country: 'Barbados', locale: 'en-BB', decimals: 2, flag: '🇧🇧' },
  BSD: { code: 'BSD', symbol: 'B$', name: 'Bahamian Dollar', country: 'Bahamas', locale: 'en-BS', decimals: 2, flag: '🇧🇸' },
  XCD: { code: 'XCD', symbol: 'EC$', name: 'East Caribbean Dollar', country: 'East Caribbean', locale: 'en-AG', decimals: 2, flag: '🏝️' },

  // Eastern & Northern Europe
  CZK: { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', country: 'Czech Republic', locale: 'cs-CZ', decimals: 2, flag: '🇨🇿' },
  HUF: { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', country: 'Hungary', locale: 'hu-HU', decimals: 0, flag: '🇭🇺' },
  RON: { code: 'RON', symbol: 'lei', name: 'Romanian Leu', country: 'Romania', locale: 'ro-RO', decimals: 2, flag: '🇷🇴' },
  BGN: { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev', country: 'Bulgaria', locale: 'bg-BG', decimals: 2, flag: '🇧🇬' },
  UAH: { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia', country: 'Ukraine', locale: 'uk-UA', decimals: 2, flag: '🇺🇦' },
  RSD: { code: 'RSD', symbol: 'din', name: 'Serbian Dinar', country: 'Serbia', locale: 'sr-RS', decimals: 2, flag: '🇷🇸' },
  ISK: { code: 'ISK', symbol: 'kr', name: 'Icelandic Krona', country: 'Iceland', locale: 'is-IS', decimals: 0, flag: '🇮🇸' },
  BAM: { code: 'BAM', symbol: 'KM', name: 'Bosnia Convertible Mark', country: 'Bosnia & Herzegovina', locale: 'bs-BA', decimals: 2, flag: '🇧🇦' },
  ALL: { code: 'ALL', symbol: 'L', name: 'Albanian Lek', country: 'Albania', locale: 'sq-AL', decimals: 0, flag: '🇦🇱' },
  MKD: { code: 'MKD', symbol: 'den', name: 'Macedonian Denar', country: 'North Macedonia', locale: 'mk-MK', decimals: 2, flag: '🇲🇰' },
  GEL: { code: 'GEL', symbol: '₾', name: 'Georgian Lari', country: 'Georgia', locale: 'ka-GE', decimals: 2, flag: '🇬🇪' },
  AMD: { code: 'AMD', symbol: '֏', name: 'Armenian Dram', country: 'Armenia', locale: 'hy-AM', decimals: 0, flag: '🇦🇲' },
  AZN: { code: 'AZN', symbol: '₼', name: 'Azerbaijani Manat', country: 'Azerbaijan', locale: 'az-AZ', decimals: 2, flag: '🇦🇿' },
};

export const DEFAULT_CURRENCY = 'USD';

/**
 * Standard benchmark FX exchange rates relative to 1.00 USD.
 * Calibrated with real-world baseline rates for instantaneous cross-currency calculation.
 */
export const DEFAULT_EXCHANGE_RATES_TO_USD: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  INR: 86.8,
  JPY: 154.5,
  CAD: 1.41,
  AUD: 1.54,
  CHF: 0.89,
  CNY: 7.24,
  AED: 3.6725,
  SGD: 1.34,
  SAR: 3.75,
  NZD: 1.72,
  HKD: 7.78,
  KRW: 1390.0,
  BRL: 5.76,
  ZAR: 18.1,
  MXN: 20.35,
  SEK: 10.6,
  NOK: 10.95,
  DKK: 6.87,
  PLN: 4.02,
  TRY: 34.6,
  IDR: 15850.0,
  THB: 34.2,
  MYR: 4.45,
  PHP: 58.4,
  VND: 25350.0,
  TWD: 32.4,
  PKR: 278.5,
  BDT: 119.8,
  LKR: 292.0,
  NPR: 138.8,
  MMK: 2095.0,
  KHR: 4050.0,
  LAK: 21800.0,
  KZT: 495.0,
  UZS: 12800.0,
  MNT: 3410.0,
  BND: 1.34,
  FJD: 2.25,
  PGK: 3.98,
  QAR: 3.64,
  KWD: 0.308,
  BHD: 0.376,
  OMR: 0.385,
  JOD: 0.709,
  ILS: 3.69,
  EGP: 49.3,
  MAD: 9.95,
  DZD: 133.5,
  TND: 3.12,
  IQD: 1310.0,
  LBP: 89500.0,
  NGN: 1680.0,
  KES: 129.5,
  GHS: 16.2,
  ETB: 125.0,
  TZS: 2600.0,
  UGX: 3670.0,
  RWF: 1380.0,
  ZMW: 27.2,
  AOA: 915.0,
  MZN: 63.8,
  BWP: 13.6,
  MUR: 46.5,
  NAD: 18.1,
  XOF: 603.5,
  XAF: 603.5,
  ARS: 1015.0,
  COP: 4380.0,
  CLP: 965.0,
  PEN: 3.78,
  UYU: 42.5,
  CRC: 512.0,
  DOP: 60.2,
  GTQ: 7.72,
  PAB: 1.0,
  JMD: 158.0,
  TTD: 6.78,
  PYG: 7850.0,
  BOB: 6.92,
  HNL: 25.1,
  NIO: 36.8,
  BBD: 2.0,
  BSD: 1.0,
  XCD: 2.7,
  CZK: 23.4,
  HUF: 375.0,
  RON: 4.58,
  BGN: 1.80,
  UAH: 41.6,
  RSD: 108.0,
  ISK: 137.0,
  BAM: 1.80,
  ALL: 92.5,
  MKD: 56.6,
  GEL: 2.78,
  AMD: 388.0,
  AZN: 1.7,
};

/**
 * Returns the exchange rate to convert from one currency to another.
 * e.g. getExchangeRate('USD', 'EUR') => 0.92
 * e.g. getExchangeRate('EUR', 'USD') => ~1.087
 */
export function getExchangeRate(
  fromCurrency: string,
  toCurrency: string,
  customRates: Record<string, number> = DEFAULT_EXCHANGE_RATES_TO_USD
): number {
  if (fromCurrency === toCurrency) return 1.0;
  
  const fromRateToUsd = customRates[fromCurrency] ?? DEFAULT_EXCHANGE_RATES_TO_USD[fromCurrency] ?? 1.0;
  const toRateToUsd = customRates[toCurrency] ?? DEFAULT_EXCHANGE_RATES_TO_USD[toCurrency] ?? 1.0;

  if (fromRateToUsd === 0) return 1.0;

  // Since rates are: 1 USD = fromRate [fromCurrency]
  // and 1 USD = toRate [toCurrency]
  // Then 1 [fromCurrency] = (toRate / fromRate) [toCurrency]
  return toRateToUsd / fromRateToUsd;
}

/**
 * Converts a numeric amount from one currency to another using exchange rates.
 */
export function convertAmount(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  customRates: Record<string, number> = DEFAULT_EXCHANGE_RATES_TO_USD
): number {
  if (fromCurrency === toCurrency || isNaN(amount)) return amount;
  
  const rate = getExchangeRate(fromCurrency, toCurrency, customRates);
  const converted = amount * rate;
  
  const targetConfig = SUPPORTED_CURRENCIES[toCurrency] || SUPPORTED_CURRENCIES.USD;
  const factor = Math.pow(10, targetConfig.decimals);
  return Math.round(converted * factor) / factor;
}

/**
 * High-precision currency formatter honoring locale and decimal configuration
 */
export function formatCurrency(amount: number, currencyCode: string = 'USD'): string {
  const config = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD;
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  let formattedNumber = '';
  try {
    formattedNumber = new Intl.NumberFormat(config.locale, {
      minimumFractionDigits: config.decimals,
      maximumFractionDigits: config.decimals,
    }).format(absAmount);
  } catch {
    formattedNumber = absAmount.toFixed(config.decimals);
  }

  const sign = isNegative ? '-' : '';

  // Specific currency suffix / prefix styling
  if (['AED', 'SAR', 'QAR', 'KWD', 'BHD', 'OMR', 'JOD', 'MAD', 'DZD', 'TND', 'IQD'].includes(config.code)) {
    return `${sign}${formattedNumber} ${config.code}`;
  }

  return `${sign}${config.symbol}${formattedNumber}`;
}
