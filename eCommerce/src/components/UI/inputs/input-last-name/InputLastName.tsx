import TextField from '@mui/material/TextField';
import React from 'react';
import { isLastNameValid } from '../../../../utils/validation.ts';
import { useUserPersonalData } from '../../../../context/UserPersonalDataContext.tsx';

function InputLastName() {
  const ERROR_TEXT =
    'It must begin with a capital letter, must contain at least one character and no special characters or numbers';

  const userPersonalData = useUserPersonalData();
  const { lastNameError, setData } = { ...userPersonalData };

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastName = e.target.value;
    setData({ ...userPersonalData, lastName, lastNameError: !(!lastName || isLastNameValid(lastName)) });
  };

  return (
    <TextField
      error={lastNameError}
      helperText={lastNameError ? ERROR_TEXT : ''}
      size="small"
      required
      label="Last name"
      variant="outlined"
      type="text"
      onInput={handleOnInput}
    />
  );
}

export default InputLastName;
