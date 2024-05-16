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
import { isPasswordValid,isEmailValid,isFirstNameValid,isLastNameValid,isStreetValid, isCityValid, isCountryValid} from '../../utils/my-utils';
import currencies from './currencies';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function Registration() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
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
  const [defaultBox, setDefaultBox] = useState(false);
  const [allDefaultBox, setAllDefaultBox] = useState(true);

  const [openBilling, setOpenBilling] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);

  const [openBill, setOpenBill] = React.useState(true);
  const [openShipp, setOpenShipp] = React.useState(true);

  const handleClickBilling = () => {
    setOpenBill(!openBill);
    setOpenBilling(!openBilling);
  };
  const handleClickShipping = () => {
    setOpenShipp(!openShipp);
    setOpenShipping(!openShipping);
  };

  const handleDefaultBox = () => {
    setDefaultBox(!defaultBox)
  }
  const handleAllDefaultBox = () => {
    setAllDefaultBox(!allDefaultBox)
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const isCodeValid = (code: string): boolean => {
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

    // if (!isDateValid(da)) {
    //     setDateError(true);
    //     mistake = true;
    // }

    if (!isStreetValid(street)) {
        setStreetError(true);
        mistake = true;
    }

    if (!isCityValid(city)) {
        setCityError(true);
        mistake = true;
    }

    if (!isCodeValid(code)) {
      setCodeError(true);
      mistake = true;
  }

    if (!isCountryValid(country)) {
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
          type={showPassword ? 'text' : 'password'}
          onInput={handlePasswordInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
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
        {DateInput()}
        
        <ListItemButton onClick={handleClickBilling}>
          <ListItemIcon>
            <p>1. </p>
          </ListItemIcon>
          <ListItemText primary="Add billing address"/>
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
                <FormControlLabel
                  control={<Checkbox />}
                  label="Default"
                  onChange={handleDefaultBox}
                 />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Also use as shipping adress"
                  onChange={handleAllDefaultBox}
                  />
            </Box>
            </ListItemButton>
          </List>
        </Collapse>
        {allDefaultBox &&
          <>
          <ListItemButton onClick={handleClickShipping}>
          <ListItemIcon>
            <p>2. </p>
          </ListItemIcon>
          <ListItemText primary="Add shipping address"/>
          {openShipp ? <ExpandLess /> : <ExpandMore />}
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
          </>
        }
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
