import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { RegistrationService } from '../../services/RegistrationService.ts';
import InputDate from '../../components/UI/inputs/input-date/InputDate.tsx';
import { PagePaths } from '../../utils/utils.ts';
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
import DividerWithText from '../../components/UI/divider-with-text/DividerWithText.tsx';
import AddressContainer from '../../components/UI/address-container/AddressContainer.tsx';
import { useAddresses } from '../../context/AddressesContext.tsx';

function Registration() {
  const auth = useAuth();
  const { email, password, passwordError, emailError } = { ...auth };
  const userPersonalData = useUserPersonalData();
  const { firstName, firstNameError, lastName, lastNameError, dateOfBirth, dateOfBirthError } = { ...userPersonalData };
  const [useAsShippingAddress, setUseAsShippingAddress] = useState(false);
  const [authError, setAuthError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);
  const navigate = useNavigate();
  const addressesState = useAddresses();
  const { setAddresses, currentAddressBilling, currentAddressShipping } = { ...addressesState };

  const clearAuthError = () => setAuthError('');

  useEffect(() => {
    setUseAsShippingAddress(false);
  }, [
    currentAddressBilling.city,
    currentAddressBilling.country,
    currentAddressBilling.street,
    currentAddressBilling.postalCode,
    currentAddressShipping.city,
    currentAddressShipping.country,
    currentAddressShipping.street,
    currentAddressShipping.postalCode,
  ]);

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
          country: currentAddressBilling.country,
          city: currentAddressBilling.city,
          streetName: currentAddressBilling.street,
          postalCode: currentAddressBilling.postalCode,
        },
        {
          country: currentAddressShipping.country,
          city: currentAddressShipping.city,
          streetName: currentAddressShipping.street,
          postalCode: currentAddressShipping.postalCode,
        },
      ],
      billingAddresses: [0],
      shippingAddresses: [1],
      ...(currentAddressBilling.default && { defaultBillingAddress: 0 }),
      ...(currentAddressShipping.default && { defaultShippingAddress: 1 }),
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
      AuthorizationService.removeCustomerInfo();
      const login = await AuthorizationService.login({ email, password });
      AuthorizationService.updateCustomerInfo('id', login.customer!.id);
      AuthorizationService.updateCustomerInfo('version', String(login.customer!.version));
      const token = await AuthorizationService.getAccessToken({ email, password });
      if (!token.error) {
        AuthorizationService.updateCustomerInfo('token', token.accessToken);
      }
      setTimeout(() => {
        navigate(PagePaths.Main);
      }, 3000);
    }
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !(
        passwordError ||
        emailError ||
        firstNameError ||
        lastNameError ||
        dateOfBirthError ||
        currentAddressBilling.cityError ||
        currentAddressBilling.countryError ||
        currentAddressBilling.postalCodeError ||
        currentAddressBilling.streetError ||
        currentAddressShipping.cityError ||
        currentAddressShipping.countryError ||
        currentAddressShipping.postalCodeError ||
        currentAddressShipping.streetError
      )
    ) {
      registration();
    }
  };

  const handleChangeDefaultBilling = () => {
    currentAddressBilling.default = !currentAddressBilling.default;
    setAddresses({
      ...addressesState,
    });
  };

  const handleChangeDefaultShipping = () => {
    currentAddressShipping.default = !currentAddressShipping.default;
    setAddresses({
      ...addressesState,
    });
  };

  const handleChangeSetAsShippingAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setUseAsShippingAddress(checked);
    if (checked) {
      addressesState.currentAddressShipping = { ...currentAddressBilling };
      addressesState.currentAddressShipping.shipping = true;
      addressesState.currentAddressShipping.billing = false;
      setAddresses({ ...addressesState });
    }
  };

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
        <AddressContainer typeAddress="billing" />
        <div>
          <FormControlLabel control={<Checkbox onChange={handleChangeDefaultBilling} />} label="Default address" />
          <FormControlLabel
            control={<Checkbox checked={useAsShippingAddress} onChange={handleChangeSetAsShippingAddress} />}
            label="Set as shipping address"
          />
        </div>
        <DividerWithText text="Shipping address" />
        <AddressContainer typeAddress="shipping" />

        <FormControlLabel
          control={<Checkbox checked={currentAddressShipping.default} onChange={handleChangeDefaultShipping} />}
          label="Default address"
        />

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
