import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { PagePaths, isUserLoggedIn } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { AuthorizationService } from '../../services/AuthorizationService.ts';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1920,
    },
  },
});

function Header() {
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO search
  };
  const HandleAuthButtonClick = () => {
    if (isUserLoggedIn()) {
      AuthorizationService.removeCustomerLogin();
      console.log('logout');
      if (location.pathname === PagePaths.Main) {
        navigate(0);
      } else {
        navigate(PagePaths.Main);
      }
    } else {
      navigate(PagePaths.Login);
    }
  };

  const HandleRegisterButtonClick = () => {
    if (isUserLoggedIn()) {
      // getOrders();
      console.log('get orders');
      navigate(PagePaths.Main);
    } else {
      navigate(PagePaths.Register);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">
            <img className={styles.logo_image} src="./logo.png" alt="Logo" />
          </Link>
        </div>
        <div>
          {/*  <form className={styles.search_input} onSubmit={handleSearch}>
            <input type="text" name="searchQuery" />
            <Button
              type="submit"
              className={styles.button}
              variant="contained"
              sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}>
              Search
            </Button>
          </form> */}
          <div className={styles.auth_area}>
            <Button
              type="submit"
              className={styles.button}
              variant="contained"
              sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}
              onClick={HandleAuthButtonClick}>
              {isUserLoggedIn() ? 'Logout' : 'Log in'}
            </Button>
            <Button
              type="submit"
              className={styles.button}
              variant="contained"
              sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}
              onClick={HandleRegisterButtonClick}>
              {isUserLoggedIn() ? 'My orders' : 'Register'}
            </Button>
          </div>
        </div>
      </header>
    </ThemeProvider>
  );
}

export default Header;
