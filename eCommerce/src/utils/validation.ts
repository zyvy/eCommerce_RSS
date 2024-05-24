export const isEmailValid = (email: string) => {
  const regex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return regex.test(email);
};

export const isPasswordValid = (password: string) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/;
  return regex.test(password);
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

export const isStreetBillValid = (street: string): boolean => {
  const regex = /^[A-Za-z0-9]*$/;
  return regex.test(street);
};

export const isStreetShippValid = (street: string): boolean => {
  const regex = /^[A-Za-z0-9]*$/;
  return regex.test(street);
};

export const isCityBillValid = (city: string): boolean => {
  const regex = /^[a-zA-Z][\sa-zA-Z]*$/;
  return regex.test(city);
};

export const isCityShippValid = (city: string): boolean => {
  const regex = /^[a-zA-Z][\sa-zA-Z]*$/;
  return regex.test(city);
};

export const isCountryBillValid = (country: string): boolean => {
  const regex = /^[A-Za-z]*$/;
  return regex.test(country);
};

export const isCountryShippValid = (countryShip: string): boolean => {
  const regex = /^[A-Za-z]*$/;
  return regex.test(countryShip);
};
