import React from 'react';
import Button from '@mui/material/Button';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO search
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img className={styles.logo_image} src="./logo.png" alt="Logo" />
        </Link>
      </div>
      <form className={styles.search_input} onSubmit={handleSearch}>
        <input type="text" name="searchQuery" />
        <Button type="submit" className={styles.button} variant="contained">
          Search
        </Button>
      </form>
      <div className={styles.auth_area}>
        <Link to="/login">
          <Button type="submit" className={styles.button} variant="contained">
            Log in
          </Button>
        </Link>
        <Link to="/register">
          <Button type="submit" className={styles.button} variant="contained">
            Register
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
