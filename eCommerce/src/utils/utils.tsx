import { useState, ChangeEvent } from 'react';
import { TextField } from '@mui/material';

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

export enum PagePaths {
  Main = '/',
  Login = '/login',
  Register = '/registration',
  NotFound = '/404',
}

type DateInputType = {
  dateOfBirth: string;
  updateDate: (date: string) => void;
};

function DateInput({ dateOfBirth, updateDate }: DateInputType) {
  const [error, setError] = useState<string>('');
  
  const isValidDate = (dateString: string): boolean => {
    // Check if the date string matches the format YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    // Parse the date components
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    // Check if the date is valid
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  };

  const isOver13 = (dateString: string): boolean => {
    const today = new Date();
    const [year, month, day] = dateString.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Check if the user is 18 years old
    if (age > 13 || (age === 13 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))) {
      return true;
    }
    return false;
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateDate(value);
    if (isValidDate(value)) {
      if (isOver13(value)) {
        setError('');
      } else {
        setError('You must be at least 13 years old.');
      }
    } else {
      setError('Invalid date format. Please use DD-MM-YYYY.');
    }
  };

  return (
    <>
      <TextField
        size="small"
        required
        variant="outlined"
        label="Date of birth"
        type="date"
        id="date-input"
        value={dateOfBirth}
        onChange={handleDateChange}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}

export default DateInput;
