import { ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import { useUserPersonalData } from '../../../../context/UserPersonalDataContext.tsx';
import { isValidDate } from '../../../../utils/validation.ts';

function InputDate() {
  const userPersonalData = useUserPersonalData();
  const { dateOfBirth, dateOfBirthError, setData } = { ...userPersonalData };

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

  const getDescriptionError = (date: string) => {
    if (isValidDate(date)) {
      return isOver13(date) ? '' : 'You must be at least 13 years old.';
    }
    return 'Invalid date format. Please use DD-MM-YYYY.';
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...userPersonalData, dateOfBirth: e.target.value, dateOfBirthError: !!getDescriptionError(dateOfBirth) });
  };

  return (
    <TextField
      error={dateOfBirthError}
      helperText={dateOfBirthError ? getDescriptionError(dateOfBirth) : ''}
      size="small"
      required
      variant="outlined"
      label="Date of birth"
      type="date"
      onChange={handleDateChange}
      value={dateOfBirth}
      InputLabelProps={{ shrink: !!dateOfBirth }}
    />
  );
}

export default InputDate;
