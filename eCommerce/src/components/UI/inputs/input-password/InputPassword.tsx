import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { isPasswordValid } from '../../../../utils/validation.ts';
import { useAuth } from '../../../../context/AuthContext.tsx';
import { SizeOfInput } from '../../../../utils/utils.ts';

type ComponentProps = {
  size?: SizeOfInput;
};

function InputPassword({ size }: ComponentProps) {
  const ERROR_TEXT =
    'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';

  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  const { passwordError, setAuth } = { ...auth };

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const error = !(!password || isPasswordValid(password));
    setAuth({ ...auth, password, passwordError: error });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextField
      // defaultValue="Secret1234"
      error={passwordError}
      helperText={passwordError ? ERROR_TEXT : ''}
      required
      size={size}
      label="password"
      type={showPassword ? 'text' : 'password'}
      onInput={handleOnInput}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle passw visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

InputPassword.defaultProps = {
  size: 'medium',
};

export default InputPassword;
