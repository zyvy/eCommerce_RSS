import TextField from '@mui/material/TextField';
import React, { useContext, useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomerContext from '../../../context/CustomerContext.ts';
import { isPasswordValid } from '../../../utils/validation.ts';

function InputPassword() {
  const PASSWORD_ERROR_TEXT =
    'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';

  const [showPassword, setShowPassword] = useState(false);
  const customer = useContext(CustomerContext);
  const { passwordError, setData } = { ...customer };

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const error = !(!password || isPasswordValid(password));
    setData({ ...customer, password, passwordError: error });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextField
      defaultValue="Secret1234"
      error={passwordError}
      helperText={passwordError ? PASSWORD_ERROR_TEXT : ''}
      required
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

export default InputPassword;
