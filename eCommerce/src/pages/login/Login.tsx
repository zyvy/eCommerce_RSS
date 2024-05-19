import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from './Login.module.css';
import { AuthorizationService } from '../../services/AuthorizationService.ts';
import { PagePaths, isEmailValid, isPasswordValid } from '../../utils/utils.ts';
import Footer from '../../components/UI/Footer.tsx';
import Header from '../../components/UI/Header.tsx';

function Login() {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (AuthorizationService.getCustomerLogin().token) {
      navigate(PagePaths.Main);
    }
  });

  const clearAuthError = () => setAuthError('');

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(false);
    setAuthError('');
    setPassword(e.target.value);
    clearAuthError();
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setEmail(e.target.value);
    clearAuthError();
  };

  async function authorization() {
    clearAuthError();
    const login = await AuthorizationService.login({ email, password });
    if (login.error) {
      setAuthError(login.errorDescription);
      AuthorizationService.removeCustomerLogin();
    } else {
      AuthorizationService.updateCustomerLogin('id', login.customer!.id);
      const token = await AuthorizationService.getAccessToken({ email, password });
      if (!token.error) {
        AuthorizationService.updateCustomerLogin('token', token.accessToken);
        navigate(PagePaths.Main);
        console.log(login, token)
      }
    }
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let error = false;

    if (!isPasswordValid(password)) {
      setPasswordError(true);
      error = true;
    }

    if (!isEmailValid(email)) {
      setEmailError(true);
      error = true;
    }

    if (!error) {
      authorization();
    }
  };

  const passwordErrorText =
    'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';

  const emailErrorText = 'Incorrect email. The email should be like: example@email.com';

  return (
    <>
    <Header />
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submit}>
        <h2 className={styles.title}>Sign in</h2>
        <TextField
          // defaultValue="johndoe@example.com"
          error={emailError}
          helperText={emailError ? emailErrorText : ''}
          required
          id="login_email"
          label="email"
          variant="outlined"
          onInput={handleEmailInput}
        />
        <TextField
          // defaultValue="Secret123"
          error={passwordError}
          helperText={passwordError ? passwordErrorText : ''}
          required
          id="login_password"
          label="password"
          type={showPassword ? 'text' : 'password'}
          onInput={handlePasswordInput}
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
        {authError.length > 0 && <div className={styles.errorMessage}>{authError}</div>}
        <Button type="submit" className={styles.button} variant="contained" id="signin_button">
          Sign in
        </Button>
        <h4 className={styles.subtitle}>Don&#39;t have an account?</h4>
        <Button
          className={[styles.button, styles.buttonNewAccount].join(' ')}
          variant="outlined"
          onClick={() => navigate(PagePaths.Register)}
          id="register_button">
          Create new account
        </Button>
      </form>
    </div>
    <Footer />
    </>
  );
}

export default Login;
