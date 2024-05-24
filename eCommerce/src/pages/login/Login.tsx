import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from './Login.module.css';
import { AuthorizationService } from '../../services/AuthorizationService.ts';
import { PagePaths } from '../../utils/utils.ts';
import Footer from '../../components/UI/footer/Footer.tsx';
import Header from '../../components/UI/header/Header.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import InputPassword from '../../components/UI/input-password/InputEmail.tsx';
import InputEmail from '../../components/UI/input-email/InputPassword.tsx';

function Login() {
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const clearAuthError = () => setAuthError('');

  const auth = useAuth();
  const { email, password, passwordError, emailError } = { ...auth };

  useEffect(() => {
    clearAuthError();
  }, [email, password]);

  async function authorization() {
    clearAuthError();
    const login = await AuthorizationService.login({ email, password });
    if (login.error) {
      setAuthError('Incorrect email or passoword.');
      AuthorizationService.removeCustomerLogin();
    } else {
      AuthorizationService.updateCustomerLogin('id', login.customer!.id);
      const token = await AuthorizationService.getAccessToken({ email, password });
      if (!token.error) {
        AuthorizationService.updateCustomerLogin('token', token.accessToken);
        navigate(PagePaths.Main);
      }
    }
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordError && !emailError) {
      authorization();
    }
  };

  return (
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
  );
}

export default Login;
