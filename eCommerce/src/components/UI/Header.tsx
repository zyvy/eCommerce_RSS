import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

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
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO search
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
            <Link to="/login">
              <Button
                type="submit"
                className={styles.button}
                variant="contained"
                sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}>
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button
                type="submit"
                className={styles.button}
                variant="contained"
                sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}>
                Register
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </ThemeProvider>
  );
}

export default Header;
