import React, { useEffect, useState } from 'react';
import styles from './Registration.module.css';
import DateInput from '../../utils/my-utils';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { RegistrationService } from '../../services/RegistrationService';
import { CustomerDraft } from '@commercetools/platform-sdk';
import {
  isPasswordValid,
  isEmailValid,
  isFirstNameValid,
  isLastNameValid,
  isStreetValid,
  isCityValid,
  isCountryValid,
} from '../../utils/my-utils';
import currencies from './currencies';
import Header from '../../components/UI/Header';
import Footer from '../../components/UI/footer';

function Registration() {
  //statt inputs
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState(false);
  const [dateOfBirth, setDate] = useState('');
  const [street, setStreet] = useState('');
  const [streetError, setStreetError] = useState(false);
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState(false);
  const [country, setCountry] = useState('');
  const [countryError, setCountryError] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [defaultBil, setDefaultBil] = useState(false);
  const [openBilling, setOpenBilling] = useState(false);
  const [openBill, setOpenBill] = useState(true);

  //inputs shipping address
  const [streetShip, setStreetShip] = useState('');
  const [streetShipError, setStreetShipError] = useState(false);
  const [cityShip, setCityShip] = useState('');
  const [cityShipError, setCityShipError] = useState(false);
  const [countryShip, setCountryShip] = useState('');
  const [countryShipError, setCountryShipError] = useState(false);
  const [codeShip, setCodeShip] = useState('');
  const [codeShipError, setCodeShipError] = useState(false);
  const [defaultShip, setDefaultShip] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);
  const [openShipp, setOpenShipp] = useState(true);

  const [allDefaultBox, setAllDefaultBox] = useState(false);
  const [authError, setAuthError] = useState('');

  const clearAuthError = () => setAuthError('');

  async function registration() {
    clearAuthError();
    const customer: CustomerDraft = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses: [
        {
          country: country,
          city: city,
          streetName: street,
          postalCode: code,
        },
        {
          country: countryShip,
          city: cityShip,
          streetName: streetShip,
          postalCode: codeShip,
        },
      ],
      shippingAddresses: [1],
      billingAddresses: [0],
      ...(defaultBil && { defaultBillingAddress: 0 }),
      ...(defaultShip && { defaultShippingAddress: 1 }),
    };

    const reg = await RegistrationService.registration(customer);
    if (reg.error) {
      setAuthError(reg.errorDescription);
    } else {
      console.log('редирект на main');
      // navigate(PagePaths.Main);
    }
  }

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearAuthError();
    setPasswordError(false);
    setPassword(e.target.value);
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearAuthError();
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

  const handleStreetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreetError(false);
    setStreet(e.target.value);
  };
  const handleStreetShipInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreetShipError(false);
    setStreetShip(e.target.value);
  };

  const handleCityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityError(false);
    setCity(e.target.value);
  };
  const handleCityShipInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityShipError(false);
    setCityShip(e.target.value);
  };

  const handleCountryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryError(false);
    setCountry(e.target.value);
  };
  const handleCountryShipInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryShipError(false);
    setCountryShip(e.target.value);
  };

  const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeError(false);
    setCode(e.target.value);
  };
  const handleCodeShipInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeShipError(false);
    setCodeShip(e.target.value);
  };

  const handleClickBilling = () => {
    setOpenBill(!openBill);
    setOpenBilling(!openBilling);
  };
  const handleClickShipping = () => {
    setOpenShipp(!openShipp);
    setOpenShipping(!openShipping);
  };

  const isCodeValid = () => {
    let regTemplate: RegExp = /^/;
    currencies.forEach((options) => {
      if (options.value === country) {
        regTemplate = new RegExp(options.reg);
      }
    });
    return regTemplate.test(code);
  };

  const handleAllDefaultBox = () => {
    setAllDefaultBox(!allDefaultBox);
    setCityShip(city);
    setCodeShip(code);
    setCountryShip(country);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let mistake = false;

    if (!isPasswordValid(password)) {
      setPasswordError(true);
      mistake = true;
    }

    if (!isEmailValid(email)) {
      setEmailError(true);
      mistake = true;
    }

    if (!isFirstNameValid(firstName)) {
      setFirstNameError(true);
      mistake = true;
    }

    if (!isLastNameValid(lastName)) {
      setLastNameError(true);
      mistake = true;
    }

    if (!isStreetValid(street)) {
      setStreetError(true);
      mistake = true;
    }

    if (!isCityValid(city)) {
      setCityError(true);
      mistake = true;
    }

    if (!isCodeValid()) {
      setCodeError(true);
      mistake = true;
    }

    if (!isCountryValid(country)) {
      setCountryError(true);
      mistake = true;
    }

    if (allDefaultBox) {
      console.log('street', streetShip);
      console.log('country', countryShip);
      console.log('code', codeShip);
      console.log('city', cityShip);
    }

    if (!mistake) {
      console.log('sent to the server');
      registration();
    }
  };

  const passwordErrorText =
    'Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters';

  const emailErrorText = 'Incorrect e-mail. The e-mail should be like: example@gmail.com';

  const firstNameErrorText =
    'It must begin with a capital letter, must contain at least one character and no special characters or numbers';

  const lastNameErrorText =
    'It must begin with a capital letter, must contain at least one character and no special characters or numbers';

  const streetErrorText = 'Must contain at least one character';

  const cityErrorText = 'Must contain at least one character and no special characters or numbers';

  const countryErrorText = 'Must contain at least one character and no special characters or numbers';

  let codeErrorText = '';
  currencies.forEach((options) => (options.value === country ? (codeErrorText = options.error) : ''));

  return (
    <>
    <Header/>
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
          type={showPassword ? 'text' : 'password'}
          onInput={handlePasswordInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();
                  }}
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
        <DateInput
          dateOfBirth={dateOfBirth}
          updateDate={(date: string) => {
            setDate(date);
          }}
        />

        <ListItemButton onClick={handleClickBilling}>
          <ListItemIcon>
            <p>1. </p>
          </ListItemIcon>
          <ListItemText primary="Add billing address" />
          {openBill ? <ExpandLess /> : <ExpandMore />}
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
                  sx={{ width: '100%' }}
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
                  sx={{ width: '100%' }}
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
                    sx={{ width: '100%' }}
                    size="small"
                    select
                    label="Country"
                    defaultValue=""
                    variant="outlined"
                    onChange={handleCountryInput}>
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
                    sx={{ width: '100%' }}
                    id="Registration_code"
                    label="Postal code"
                    variant="outlined"
                    type="text"
                    onInput={handleCodeInput}
                  />
                </Box>
                <FormControlLabel control={<Checkbox />} label="Default" onChange={() => setDefaultBil(!defaultBil)} />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Also use as default shipping and billing adress"
                  onChange={handleAllDefaultBox}
                  checked={allDefaultBox}
                />
              </Box>
            </ListItemButton>
          </List>
        </Collapse>
        {!allDefaultBox && (
          <>
            <ListItemButton onClick={handleClickShipping}>
              <ListItemIcon>
                <p>2. </p>
              </ListItemIcon>
              <ListItemText primary="Add shipping address" />
              {openShipp ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openShipping} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <TextField
                      error={streetShipError}
                      helperText={streetShipError ? streetErrorText : ''}
                      size="small"
                      required
                      sx={{ width: '100%' }}
                      id="Registration_street"
                      label="Street"
                      variant="outlined"
                      type="text"
                      onInput={handleStreetShipInput}
                    />
                    <TextField
                      error={cityShipError}
                      helperText={cityShipError ? cityErrorText : ''}
                      size="small"
                      required
                      sx={{ width: '100%' }}
                      id="Registration_city"
                      label="City"
                      variant="outlined"
                      type="text"
                      onInput={handleCityShipInput}
                    />
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                      <TextField
                        error={countryShipError}
                        helperText={countryShipError ? countryErrorText : ''}
                        required
                        id="Registration_country"
                        sx={{ width: '100%' }}
                        size="small"
                        select
                        label="Country"
                        defaultValue=""
                        variant="outlined"
                        onChange={handleCountryShipInput}>
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        error={codeShipError}
                        helperText={codeShipError ? codeErrorText : ''}
                        size="small"
                        required
                        sx={{ width: '100%' }}
                        id="Registration_code"
                        label="Postal code"
                        variant="outlined"
                        type="text"
                        onInput={handleCodeShipInput}
                      />
                    </Box>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Default"
                      onChange={() => setDefaultShip(!defaultShip)}
                    />
                  </Box>
                </ListItemButton>
              </List>
            </Collapse>
          </>
        )}
        {authError.length > 0 && <div className={styles.errorMessage}>{authError}</div>}
        <Button type="submit" className={styles.button} variant="contained">
          Register
        </Button>
        <h4 className={styles.subtitle}>Do you have an account?</h4>
        <Button
          className={[styles.button, styles.buttonNewAccount].join(' ')}
          variant="outlined"
          onClick={() => console.log('To login')}>
          Sign in
        </Button>
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default Registration;
