import { CountryType, currencies } from './currencies.ts';

export const isEmailValid = (email: string) => {
  const regex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return regex.test(email);
};

export const isPasswordValid = (password: string) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/;
  return regex.test(password);
};

export const isValidDate = (dateString: string): boolean => {
  // Check if the date string matches the format YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};

export const isUserLoggedIn = (): boolean => {
  const accessToken = localStorage.getItem('customer');
  return !!accessToken;
};

export const isFirstNameValid = (firstName: string): boolean => {
  const regex = /^[A-Z][\sa-zA-Z]*$/;
  return regex.test(firstName);
};

export const isLastNameValid = (lastName: string): boolean => {
  const regex = /^[A-Z][\sa-zA-Z]*$/;
  return regex.test(lastName);
};

export const isDateValid = (Date: string): boolean => {
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
  return regex.test(Date);
};

export const isStreetValid = (street: string): boolean => {
  const regex = /^[A-Za-z0-9]*$/;
  return regex.test(street);
};

export const isCityValid = (city: string): boolean => {
  const regex = /^[a-zA-Z][\sa-zA-Z]*$/;
  return regex.test(city);
};

export const isCountryValid = (country: string): boolean => {
  const regex = /^[A-Za-z]*$/;
  return regex.test(country);
};

export const isCodeValid = (country: CountryType, code: string) => {
  let regTemplate: RegExp = /^/;
  currencies.forEach((options) => {
    if (options.value === country) {
      regTemplate = new RegExp(options.reg);
    }
  });
  return regTemplate.test(code);
};
