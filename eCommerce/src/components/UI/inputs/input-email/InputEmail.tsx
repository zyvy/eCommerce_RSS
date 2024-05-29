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
  const { emailError, setAuth } = { ...auth };

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    const error = !(!email || isEmailValid(email));
    setAuth({ ...auth, email, emailError: error });
  };

  return (
    <TextField
      // defaultValue="johndoe@example.com"
      error={emailError}
      size={size}
      helperText={emailError ? ERROR_TEXT : ''}
      required
      label="email"
      variant="outlined"
      onInput={handleOnInput}
    />
  );
}

export default InputEmail;
