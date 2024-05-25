import React, { useState } from 'react';
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
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { RegistrationService } from '../../services/RegistrationService.ts';
import {
  isStreetBillValid,
  isCityBillValid,
  isStreetShippValid,
  isCityShippValid,
  isCountryBillValid,
  isCountryShippValid,
} from '../../utils/validation.ts';
import InputDate from '../../components/UI/inputs/input-date/InputDate.tsx';
import { PagePaths } from '../../utils/utils.ts';
import currencies from './currencies.tsx';
import Header from '../../components/UI/header/Header.tsx';
import Footer from '../../components/UI/footer/Footer.tsx';
import styles from './Registration.module.css';
import { AuthorizationService } from '../../services/AuthorizationService.ts';
import InputPassword from '../../components/UI/inputs/input-password/InputPassword.tsx';
import InputEmail from '../../components/UI/inputs/input-email/InputEmail.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { useUserPersonalData } from '../../context/UserPersonalDataContext.tsx';
import InputFirstName from '../../components/UI/inputs/input-first-name/InputFirstName.tsx';
import InputLastName from '../../components/UI/inputs/input-last-name/InputLastName.tsx';
import DividerWithText from '../../components/UI/DividerWithText/DividerWithText.tsx';

function Registration() {
  const auth = useAuth();
  const { email, password, passwordError, emailError } = { ...auth };

  const userPersonalData = useUserPersonalData();
  const { firstName, firstNameError, lastName, lastNameError, dateOfBirth, dateOfBirthError } = { ...userPersonalData };

  // const [dateOfBirth, setDate] = useState('');
  const [street, setStreet] = useState('');
  const [streetError, setStreetError] = useState(false);
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState(false);
  const [country, setCountry] = useState('');
  const [countryError, setCountryError] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [defaultBil, setDefaultBil] = useState(false);
  const [openBilling, setOpenBilling] = useState(true);
  const [openBill, setOpenBill] = useState(true);

  const [streetShip, setStreetShip] = useState('');
  const [streetShipError, setStreetShipError] = useState(false);
  const [cityShip, setCityShip] = useState('');
  const [cityShipError, setCityShipError] = useState(false);
  const [countryShip, setCountryShip] = useState('');
  const [countryShipError, setCountryShipError] = useState(false);
  const [codeShip, setCodeShip] = useState('');
  const [codeShipError, setCodeShipError] = useState(false);
  const [defaultShip, setDefaultShip] = useState(false);
  const [openShipping, setOpenShipping] = useState(true);
  const [openShipp, setOpenShipp] = useState(true);

  const [allDefaultBox, setAllDefaultBox] = useState(false);
  const [authError, setAuthError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  const navigate = useNavigate();

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
          country,
          city,
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
      if (reg.errorDescription === 'There is already an existing customer with the provided email.') {
        setAuthError(
          'A user with such an e-mail has already been registered. Go to the authorization page or use another e-mail',
        );
      } else {
        setAuthError(reg.errorDescription);
      }
    } else {
      setRegSuccess(true);
      AuthorizationService.removeCustomerLogin();
      const login = await AuthorizationService.login({ email, password });
      AuthorizationService.updateCustomerLogin('id', login.customer!.id);
      const token = await AuthorizationService.getAccessToken({ email, password });
      if (!token.error) {
        AuthorizationService.updateCustomerLogin('token', token.accessToken);
      }
      setTimeout(() => {
        navigate(PagePaths.Main);
      }, 3000);
    }
  }

  const handleStreetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearAuthError();
    setStreetError(false);
    setStreet(e.target.value);
    if (allDefaultBox) {
      setStreetShip(e.target.value);
    }
  };
  const handleStreetShipInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearAuthError();
    setStreetShipError(false);
    setStreetShip(e.target.value);
  };

  const handleCityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearAuthError();
    setCityError(false);
    setCity(e.target.value);
    if (allDefaultBox) {
      setCityShip(e.target.value);
    }
  };
  const handleCityShipInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearAuthError();
    setCityShipError(false);
    setCityShip(e.target.value);
  };

  const handleCountryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearAuthError();
    setCountryError(false);
    setCountry(e.target.value);
    if (allDefaultBox) {
      setCountryShip(e.target.value);
    }
  };
  const handleCountryShipInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearAuthError();
    setCountryShipError(false);
    setCountryShip(e.target.value);
  };

  const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearAuthError();
    setCodeError(false);
    setCode(e.target.value);
    if (allDefaultBox) {
      setCodeShip(e.target.value);
    }
  };
  const handleCodeShipInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearAuthError();
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

  const isCodeBillValid = () => {
    let regTemplate: RegExp = /^/;
    currencies.forEach((options) => {
      if (options.value === country) {
        regTemplate = new RegExp(options.reg);
      }
    });
    return regTemplate.test(code);
  };

  const isCodeShippValid = () => {
    let regTemplate: RegExp = /^/;
    currencies.forEach((options) => {
      if (options.value === countryShip) {
        regTemplate = new RegExp(options.reg);
      }
    });
    return regTemplate.test(codeShip);
  };

  const handleAllDefaultBox = () => {
    clearAuthError();
    setAllDefaultBox(!allDefaultBox);
    setCityShip(city);
    setCodeShip(code);
    setCountryShip(country);
    setStreetShip(street);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let mistake = false;

    if (passwordError || emailError || firstNameError || lastNameError || dateOfBirthError) {
      mistake = true;
    }

    if (!isStreetBillValid(street)) {
      setStreetError(true);
      mistake = true;
    }

    if (!isStreetShippValid(streetShip)) {
      setStreetShipError(true);
      mistake = true;
    }

    if (!isCityBillValid(city)) {
      setCityError(true);
      mistake = true;
    }

    if (!isCityShippValid(cityShip)) {
      setCityShipError(true);
      mistake = true;
    }

    if (!isCodeBillValid()) {
      setCodeError(true);
      mistake = true;
    }

    if (!isCodeShippValid()) {
      setCodeShipError(true);
      mistake = true;
    }

    if (!isCountryBillValid(country)) {
      setCountryError(true);
      mistake = true;
    }

    if (!isCountryShippValid(country)) {
      setCountryShipError(true);
      mistake = true;
    }

    if (!mistake) {
      registration();
    }
  };

  const streetErrorText = 'Must contain at least one character';

  const cityErrorText = 'Must contain at least one character and no special characters or numbers';

  const countryErrorText = 'Must contain at least one character and no special characters or numbers';

  let codeErrorText = '';
  currencies.forEach((options) => {
    if (options.value === country) {
      codeErrorText = options.error;
      return codeErrorText;
    }
    return '';
  });

  let codeShippErrorText = '';
  currencies.forEach((options) => {
    if (options.value === countryShip) {
      codeShippErrorText = options.error;
      return codeShippErrorText;
    }
    return '';
  });

  return (
    <div className={styles.container}>
      <Header />
      <form className={styles.form} onSubmit={submit}>
        <h2 className={styles.title}>Registration</h2>
        <InputEmail size="small" />
        <InputPassword size="small" />
        <InputFirstName />
        <InputLastName />
        <InputDate />
        <DividerWithText text="Billing address" />

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
                  id="Registration_street_billing"
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
                  id="Registration_city_billing"
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
                    id="Registration_code_billing"
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
                      id="Registration_street_shipping"
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
                      id="Registration_city_shipping"
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
                        helperText={codeShipError ? codeShippErrorText : ''}
                        size="small"
                        required
                        sx={{ width: '100%' }}
                        id="Registration_code_shipping"
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
        {regSuccess && (
          <>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Registration was completed successfully!
            </Alert>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          </>
        )}
        <Button type="submit" className={styles.button} variant="contained">
          Register
        </Button>
        <h4 className={styles.subtitle}>Do you have an account?</h4>
        <Button
          className={[styles.button, styles.buttonNewAccount].join(' ')}
          variant="outlined"
          onClick={() => navigate(PagePaths.Login)}>
          Sign in
        </Button>
      </form>
      <Footer />
    </div>
  );
}

export default Registration;
