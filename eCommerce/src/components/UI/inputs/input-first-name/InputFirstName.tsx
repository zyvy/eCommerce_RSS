import TextField from '@mui/material/TextField';
import React from 'react';
import { isFirstNameValid } from '../../../../utils/validation.ts';
import { useUserPersonalData } from '../../../../context/UserPersonalDataContext.tsx';

function InputFirstName() {
  const ERROR_TEXT =
    'It must begin with a capital letter, must contain at least one character and no special characters or numbers';

  const userPersonalData = useUserPersonalData();
  const { firstNameError, setData } = { ...userPersonalData };

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const firstName = e.target.value;
    setData({ ...userPersonalData, firstName, firstNameError: !(!firstName || isFirstNameValid(firstName)) });
  };

  return (
    <TextField
      error={firstNameError}
      helperText={firstNameError ? ERROR_TEXT : ''}
      size="small"
      required
      label="First name"
      variant="outlined"
      type="text"
      onInput={handleOnInput}
    />
  );
}

export default InputFirstName;
