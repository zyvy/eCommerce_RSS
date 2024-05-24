import TextField from '@mui/material/TextField';
import React, { useContext } from 'react';
import CustomerContext from '../../../context/CustomerContext.ts';
import { isEmailValid } from '../../../utils/validation.ts';

function InputEmail() {
  const EMAIL_ERROR_TEXT = 'Incorrect email. The email should be like: example@email.com';
  const customer = useContext(CustomerContext);
  const { emailError, setData } = { ...customer };

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    const error = !(!email || isEmailValid(email));
    setData({ ...customer, email, emailError: error });
  };

  return (
    <TextField
      defaultValue="johndoe@example.com"
      error={emailError}
      helperText={emailError ? EMAIL_ERROR_TEXT : ''}
      required
      label="email"
      variant="outlined"
      onInput={handleOnInput}
    />
  );
}

export default InputEmail;
