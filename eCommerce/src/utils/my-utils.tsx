import React, {useState, ChangeEvent} from "react";
import { TextField } from "@mui/material";

function DateInput() {
    const [date, setDate] = useState<string>('');
    const [error, setError] = useState<string>('');
  
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setDate(value);
  
      // Date validation logic
      if (isValidDate(value)) {
        if (isOver18(value)) {
          setError('');
        } else {
          setError('You must be at least 18 years old.');
        }
      } else {
        setError('Invalid date format. Please use YYYY-MM-DD.');
      }
    };
  
    const isValidDate = (dateString: string): boolean => {
      // Check if the date string matches the format YYYY-MM-DD
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(dateString)) return false;
  
      // Parse the date components
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day);
  
      // Check if the date is valid
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    };
  
    const isOver18 = (dateString: string): boolean => {
      const today = new Date();
      const [year, month, day] = dateString.split('-').map(Number);
      const birthDate = new Date(year, month - 1, day);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
  
      // Check if the user is 18 years old
      if (
        age > 18 ||
        (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
      ) {
        return true;
      }
      return false;
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
          value={date}
          onChange={handleDateChange}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );
  };
  
  export default DateInput;

  export const isPasswordValid = (password: string): boolean => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    return regex.test(password);
  };

  export const isEmailValid = (email: string): boolean => {
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return regex.test(email);
  };

  export const isFirstNameValid = (firstName: string): boolean => {
    const regex = /^[A-Z][a-z]*$/;
    return regex.test(firstName);
  };

  export const isLastNameValid = (lastName: string): boolean => {
    const regex = /^[A-Z][a-z]*$/;
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
    const regex = /^[A-Za-z]*$/;
    return regex.test(city);
  };

  export const isCountryValid = (country: string): boolean => {
    const regex = /^[A-Za-z]*$/;
    return regex.test(country);
  };
