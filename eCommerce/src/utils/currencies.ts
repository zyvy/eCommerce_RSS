export type CountryType = 'IT' | 'BE' | 'DE' | 'ES' | '';

export type CurrencyType = {
  value: CountryType;
  label: string;
  reg: RegExp;
  error: string;
};

export const currencies: CurrencyType[] = [
  {
    value: '',
    label: '',
    reg: /^/,
    error: '',
  },
  {
    value: 'IT',
    label: 'Italy',
    reg: /^\d{5}$/,
    error: 'Must contain only 5 digits',
  },
  {
    value: 'BE',
    label: 'Belgium',
    reg: /^(?:(?:[1-9])(?:\d{3}))$/,
    error: 'Must contain only 4 digits',
  },
  {
    value: 'DE',
    label: 'Germany',
    reg: /^\d{5}$/,
    error: 'Must contain only 5 digits',
  },
  {
    value: 'ES',
    label: 'Spain',
    reg: /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/,
    error: 'Must contain 5 digits',
  },
];

export function getErrorDescription(country: CountryType): string {
  const value = currencies.find((currency) => currency.value === country);
  if (!value) {
    return '';
  }
  return value.error;
}
