import React, { useState } from 'react';
import DateInput from '../../utils/my-utils';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import styles from './Registration.module.css';
import { Box } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Registration() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState(false);
  const [Date, setDate] = useState('');
  const [DateError, setDateError] = useState(false);
  const [street, setStreet] = useState('');
  const [streetError, setStreetError] = useState(false);
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState(false);
  const [country, setCountry] = useState('');
  const [countryError, setCountryError] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  const [openBilling, setOpenBilling] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);

  const handleClickBilling = () => {
    setOpenBilling(!openBilling);
  };
  const handleClickShipping = () => {
    setOpenShipping(!openShipping);
  };

  const currencies = [
    {
      value: 'Italy',
      label: 'Italy',
      reg: '/^\d{5}$/',
      error: 'Must contain only 5 digits',
    },
    {
      value: 'Belgium',
      label: 'Belgium',
      reg: '/^(?:(?:[1-9])(?:\d{3}))$/',
      error: 'Must contain only 4 digits',
    },
    {
      value: 'Germany',
      label: 'Germany',
      reg: '/^\d{5}$/',
      error: 'Must contain only 5 digits',
    },
    {
      value: 'Spain',
      label: 'Spain',
      reg: '/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/',
      error: 'Must contain 5 digits',
    },
  ];

  const isPasswordValid = (): boolean => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    return regex.test(password);
  };

  const isEmailValid = (): boolean => {
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return regex.test(email);
  };

  const isFirstNameValid = (): boolean => {
    const regex = /^[A-Z][a-z]*$/;
    return regex.test(firstName);
  };

  const isLastNameValid = (): boolean => {
    const regex = /^[A-Z][a-z]*$/;
    return regex.test(lastName);
  };

  const isDateValid = (): boolean => {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
    return regex.test(Date);
  };

  const isStreetValid = (): boolean => {
    const regex = /^[A-Za-z0-9]*$/;
    return regex.test(street);
  };

  const isCityValid = (): boolean => {
    const regex = /^[A-Za-z]*$/;
    return regex.test(city);
  };

  const isCountryValid = (): boolean => {
    const regex = /^[A-Za-z]*$/;
    return regex.test(country);
  };

  const isCodeValid = (): boolean => {
    let regTemplate: RegExp = /^/
    currencies.forEach(options => {
      if (options.value === country) {
        console.log(options.reg)
        regTemplate = new RegExp(`${options.reg}`)
      }
    })
    return regTemplate.test(code);
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

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateError(false);
    setDate(e.target.value);
  };

  const handleStreetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreetError(false);
    setStreet(e.target.value);
  };

  const handleCityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityError(false);
    setCity(e.target.value);
  };

  const handleCountryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryError(false);
    setCountry(e.target.value);
  };

  const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeError(false);
    setCode(e.target.value);
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

    if (!isDateValid()) {
        setDateError(true);
        mistake = true;
    }

    if (!isStreetValid()) {
        setStreetError(true);
        mistake = true;
    }

    if (!isCityValid()) {
        setCityError(true);
        mistake = true;
    }

    if (!isCodeValid()) {
      setCodeError(true);
      mistake = true;
  }

    if (!isCountryValid()) {
      setCountryError(true);
      mistake = true;
  }

    if (!mistake) {
      console.log('sent to the server');
    }
  };

  const passwordErrorText =
    'Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters';

  const emailErrorText = 'Incorrect e-mail. The e-mail should be like: example@gmail.com';

  const firstNameErrorText = 'It must begin with a capital letter, must contain at least one character and no special characters or numbers';

  const lastNameErrorText = 'It must begin with a capital letter, must contain at least one character and no special characters or numbers';

  const streetErrorText = 'Must contain at least one character';

  const cityErrorText = 'Must contain at least one character and no special characters or numbers';

  const countryErrorText = 'Must contain at least one character and no special characters or numbers';

  let codeErrorText = '';
  currencies.forEach(options => options.value === country ? codeErrorText = options.error : '')

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submit}>
        <h2 className={styles.title}>Registration</h2>
        <TextField
          error={emailError}
          helperText={emailError ? emailErrorText : ''}
          size="small"
          required
          id="Registration_email"
          label="Email"
          variant="outlined"
          onInput={handleEmailInput}
        />
        <TextField
          error={passwordError}
          helperText={passwordError ? passwordErrorText : ''}
          size="small"
          required
          id="Registration_password"
          label="Password"
          variant="outlined"
          type="password"
          onInput={handlePasswordInput}
        />
        <TextField
          error={firstNameError}
          helperText={firstNameError ? firstNameErrorText : ''}
          size="small"
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
          size="small"
          required
          id="Registration_lastName"
          label="Last name"
          variant="outlined"
          type="text"
          onInput={handleLastNameInput}
        />
        {DateInput()}
        
        <ListItemButton onClick={handleClickBilling}>
          <ListItemIcon>
            <p>1. </p>
          </ListItemIcon>
          <ListItemText primary="Add billing address"/>
        </ListItemButton>
        <Collapse in={openBilling} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <TextField
              error={streetError}
              helperText={streetError ? streetErrorText : ''}
              size="small"
              required
              sx={{ width: "100%"}}
              id="Registration_street"
              label="Street"
              variant="outlined"
              type="text"
              onInput={handleStreetInput}
            />
            <TextField
              error={cityError}
              helperText={cityError ? cityErrorText : ''}
              size="small"
              required
              sx={{ width: "100%" }}
              id="Registration_city"
              label="City"
              variant="outlined"
              type="text"
              onInput={handleCityInput}
            />
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                <TextField
                  error={countryError}
                  helperText={countryError ? countryErrorText : ''}
                  required
                  id="Registration_country"
                  sx={{width: '100%' }}
                  size="small"
                  select
                  label="Country"
                  defaultValue = ""
                  variant="outlined"
                  onChange={handleCountryInput}
                  >
                  {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                  ))}
                </TextField>
                <TextField
                  error={codeError}
                  helperText={codeError ? codeErrorText : ''}
                  size="small"
                  required
                  sx={{width: '100%' }}
                  id="Registration_code"
                  label="Postal code"
                  variant="outlined"
                  type="text"
                  onInput={handleCodeInput}
                />
            </Box>
                <FormControlLabel control={<Checkbox />} label="Default" />
            </Box>
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleClickShipping}>
          <ListItemIcon>
            <p>2. </p>
          </ListItemIcon>
          <ListItemText primary="Add shipping address"/>
        </ListItemButton>
        <Collapse in={openShipping} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <TextField
              error={streetError}
              helperText={streetError ? streetErrorText : ''}
              size="small"
              required
              sx={{ width: "100%"}}
              id="Registration_street"
              label="Street"
              variant="outlined"
              type="text"
              onInput={handleStreetInput}
            />
            <TextField
              error={cityError}
              helperText={cityError ? cityErrorText : ''}
              size="small"
              required
              sx={{ width: "100%" }}
              id="Registration_city"
              label="City"
              variant="outlined"
              type="text"
              onInput={handleCityInput}
            />
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                <TextField
                  error={countryError}
                  helperText={countryError ? countryErrorText : ''}
                  required
                  id="Registration_country"
                  sx={{width: '100%' }}
                  size="small"
                  select
                  label="Country"
                  defaultValue = ""
                  variant="outlined"
                  onChange={handleCountryInput}
                  >
                  {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                  ))}
                </TextField>
                <TextField
                  error={codeError}
                  helperText={codeError ? codeErrorText : ''}
                  size="small"
                  required
                  sx={{width: '100%' }}
                  id="Registration_code"
                  label="Postal code"
                  variant="outlined"
                  type="text"
                  onInput={handleCodeInput}
                />
            </Box>
                <FormControlLabel control={<Checkbox />} label="Default" />
            </Box>
            </ListItemButton>
          </List>
        </Collapse>
        <Button type="submit" className={styles.button} variant="contained">
        Register
        </Button>
        <h4 className={styles.subtitle}>Do you have an account?</h4>
        <Button
          className={[styles.button, styles.buttonNewAccount].join(' ')}
          variant="outlined"
          onClick={() => console.log('To login')}
          >
        Sign in
        </Button>
      </form>
    </div>
  );
}

export default Registration;
