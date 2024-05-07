import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './Login.module.css';

function Login() {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

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
    setPassword(e.target.value);
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setEmail(e.target.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let mistake = false;

    if (!isPasswordValid()) {
      setPasswordError(true);
      mistake = true;
    }

    if (!isEmailValid()) {
      setEmailError(true);
      mistake = true;
    }

    if (!mistake) {
      console.log('sent to the server');
    }
  };

  const passwordErrorText =
    'Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters';

  const emailErrorText = 'Incorrect password. The password should be like: test@gmail.com';

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submit}>
        <h2 className={styles.title}>Sign in</h2>
        <TextField
          error={emailError}
          helperText={emailError ? emailErrorText : ''}
          required
          id="login_email"
          label="email"
          variant="outlined"
          onInput={handleEmailInput}
        />
        <TextField
          error={passwordError}
          helperText={passwordError ? passwordErrorText : ''}
          required
          id="login_password"
          label="password"
          variant="outlined"
          type="password"
          onInput={handlePasswordInput}
        />
        <Button type="submit" className={styles.button} variant="contained">
          Sign in
        </Button>
        <h4 className={styles.subtitle}>Don&#39;t have an account?</h4>
        <Button className={[styles.button, styles.buttonNewAccount].join(' ')} variant="outlined">
          Create new account
        </Button>
      </form>
    </div>
  );
}

export default Login;
