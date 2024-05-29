import React from 'react';
import TextField from '@mui/material/TextField';
import { useAuth } from '../../../../context/AuthContext.tsx';
import { isEmailValid } from '../../../../utils/validation.ts';
import { SizeOfInput } from '../../../../utils/utils.ts';

type ComponentProps = {
  size: SizeOfInput;
};

function InputEmail({ size = 'small' }: ComponentProps) {
  const ERROR_TEXT = 'Incorrect email. The email should be like: example@email.com';
  const auth = useAuth();
  const { email, emailError, setAuth } = { ...auth };

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    const error = !(!newEmail || isEmailValid(newEmail));
    setAuth({ ...auth, email: newEmail, emailError: error });
  };

  return (
    <TextField
      // defaultValue="test@a.com"
      error={emailError}
      size={size}
      helperText={emailError ? ERROR_TEXT : ''}
      required
      label="email"
      variant="outlined"
      onInput={handleOnInput}
      value={email}
      InputLabelProps={{ shrink: !!email }}
    />
  );
}

export default InputEmail;
