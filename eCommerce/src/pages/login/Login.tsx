import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './Login.module.css';
import { AuthorizationService } from '../../services/AuthorizationService.ts';
import testGet from '../../services/test.ts';

function Login() {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (AuthorizationService.getCustomerToken()) {
      console.log('move to the main page');
    }
  }, []);

  const clearAuthError = () => setAuthError('');

  const isPasswordValid = () => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
    return regex.test(password);
  };

  const isEmailValid = () => {
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return regex.test(email);
  };

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
    const token = await AuthorizationService.getAccessTokenByPassword({ email, password });
    if (token.error) {
      setAuthError(token.errorDescription);
      AuthorizationService.removeCustomerToken();
    } else {
      AuthorizationService.saveCustomerToken(token.accessToken);
      console.log('move to the main page');
    }
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let error = false;

    if (!isPasswordValid()) {
      setPasswordError(true);
      error = true;
    }

    if (!isEmailValid()) {
      setEmailError(true);
      error = true;
    }

    if (!error) {
      authorization();
    }
    testGet();
  };

  const passwordErrorText =
    'Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters';

  const emailErrorText = 'Incorrect password. The password should be like: test@gmail.com';

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submit}>
        <h2 className={styles.title}>Sign in</h2>
        <TextField
          defaultValue="johndoe@example.com"
          error={emailError}
          helperText={emailError ? emailErrorText : ''}
          required
          id="login_email"
          label="email"
          variant="outlined"
          onInput={handleEmailInput}
        />
        <TextField
          defaultValue="Secret123"
          error={passwordError}
          helperText={passwordError ? passwordErrorText : ''}
          required
          id="login_password"
          label="password"
          variant="outlined"
          type="password"
          onInput={handlePasswordInput}
        />
        {authError.length > 0 && <div className={styles.errorMessage}>{authError}</div>}
        <Button type="submit" className={styles.button} variant="contained">
          Sign in
        </Button>
        <h4 className={styles.subtitle}>Don&#39;t have an account?</h4>
        <Button
          className={[styles.button, styles.buttonNewAccount].join(' ')}
          variant="outlined"
          onClick={() => console.log('move to registration page')}>
          Create new account
        </Button>
      </form>
    </div>
  );
}

export default Login;
