import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './Registration.module.css';

function Registration() {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState(false);

  const isPasswordValid = () => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
    return regex.test(password);
  };

  const isEmailValid = () => {
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return regex.test(email);
  };

  const isFirstNameValid = () => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
    return regex.test(firstName);
  };

  const isLastNameValid = () => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
    return regex.test(firstName);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(false);
    setPassword(e.target.value);
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setEmail(e.target.value);
  };

  const handleFirstNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstNameError(false);
    setFirstName(e.target.value);
  };

  const handleLastNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastNameError(false);
    setLastName(e.target.value);
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

    if (!isFirstNameValid()) {
        setFirstNameError(true);
        mistake = true;
    }

    if (!isLastNameValid()) {
        setLastNameError(true);
        mistake = true;
    }

    if (!mistake) {
      console.log('sent to the server');
    }
  };

  const passwordErrorText =
    'Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters';

  const emailErrorText = 'Incorrect password. The password should be like: test@gmail.com';

  const firstNameErrorText = 'Тут сделать текст ошибки First Name';

  const lastNameErrorText = 'Тут сделать текст ошибки First Name';

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submit}>
        <h2 className={styles.title}>Registration</h2>
        <TextField
          error={emailError}
          helperText={emailError ? emailErrorText : ''}
          required
          id="Registration_email"
          label="email"
          variant="outlined"
          onInput={handleEmailInput}
        />
        <TextField
          error={passwordError}
          helperText={passwordError ? passwordErrorText : ''}
          required
          id="Registration_password"
          label="password"
          variant="outlined"
          type="password"
          onInput={handlePasswordInput}
        />
        <TextField
          error={firstNameError}
          helperText={firstNameError ? firstNameErrorText : ''}
          required
          id="Registration_firstName"
          label="First name"
          variant="outlined"
          type="text"
          onInput={handleFirstNameInput}
        />
        <TextField
          error={lastNameError}
          helperText={lastNameError ? lastNameErrorText : ''}
          required
          id="Registration_lastName"
          label="Last name"
          variant="outlined"
          type="text"
          onInput={handleLastNameInput}
        />
        <Button type="submit" className={styles.button} variant="contained">
        Register
        </Button>
        <h4 className={styles.subtitle}>Do you have an account?</h4>
        <Button className={[styles.button, styles.buttonNewAccount].join(' ')} variant="outlined">
        Sign in
        </Button>
      </form>
    </div>
  );
}

export default Registration;
