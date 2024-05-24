import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from './Login.module.css';
import { AuthorizationService } from '../../services/AuthorizationService.ts';
import { PagePaths } from '../../utils/utils.tsx';
import Footer from '../../components/UI/footer/Footer.tsx';
import Header from '../../components/UI/header/Header.tsx';
import CustomerContext, { CustomerContextType } from '../../context/CustomerContext.ts';
import InputPassword from '../../components/UI/input-password/InputEmail.tsx';
import InputEmail from '../../components/UI/input-email/InputPassword.tsx';

function Login() {
  const [authError, setAuthError] = useState('');
  const [customer, setCustomer] = useState<Omit<CustomerContextType, 'setData'>>({
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
  });

  const customerMemo = useMemo(
    () => ({
      ...customer,
      setData: setCustomer,
    }),
    [customer],
  );

  const navigate = useNavigate();
  const clearAuthError = () => setAuthError('');

  useEffect(() => {
    clearAuthError();
  }, [customer]);

  async function authorization() {
    clearAuthError();
    const login = await AuthorizationService.login({ email: customer.email, password: customer.password });
    if (login.error) {
      setAuthError('Incorrect email or passoword.');
      AuthorizationService.removeCustomerLogin();
    } else {
      AuthorizationService.updateCustomerLogin('id', login.customer!.id);
      const token = await AuthorizationService.getAccessToken({ email: customer.email, password: customer.password });
      if (!token.error) {
        AuthorizationService.updateCustomerLogin('token', token.accessToken);
        navigate(PagePaths.Main);
      }
    }
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!customer.passwordError && !customer.emailError) {
      authorization();
    }
  };

  return (
    <CustomerContext.Provider value={customerMemo}>
      <div className={styles.container}>
        <Header />
        <form className={styles.form} onSubmit={submit}>
          <h2 className={styles.title}>Sign in</h2>
          <InputPassword />
          <InputEmail />
          {authError.length > 0 && <div className={styles.errorMessage}>{authError}</div>}
          <Button type="submit" className={styles.button} variant="contained">
            Sign in
          </Button>
          <h4 className={styles.subtitle}>Don&#39;t have an account?</h4>
          <Button
            className={[styles.button, styles.buttonNewAccount].join(' ')}
            variant="outlined"
            onClick={() => navigate(PagePaths.Register)}>
            Create new account
          </Button>
        </form>
        <Footer />
      </div>
    </CustomerContext.Provider>
  );
}

export default Login;
