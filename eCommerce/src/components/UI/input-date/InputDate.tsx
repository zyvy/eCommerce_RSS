import { useState, ChangeEvent } from 'react';
import { TextField } from '@mui/material';

type InputDateType = {
  dateOfBirth: string;
  updateDate: (date: string) => void;
};

function InputDate({ dateOfBirth, updateDate }: InputDateType) {
  const [error, setError] = useState<string>('');
  const isValidDate = (dateString: string): boolean => {
    // Check if the date string matches the format YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  };

  const isOver13 = (dateString: string): boolean => {
    const today = new Date();
    const [year, month, day] = dateString.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

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

export default InputDate;
