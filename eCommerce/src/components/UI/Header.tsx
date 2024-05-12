import React from 'react';
import Button from '@mui/material/Button';
import styles from './Header.module.css';

function Header() {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO search
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logo_image} src="./logo.png" alt="Logo" />
      </div>
      <form className={styles.search_input} onSubmit={handleSearch}>
        <input type="text" name="searchQuery" />
        <Button type="submit" className={styles.button} variant="contained">
          Search
        </Button>
      </form>
      <div className={styles.auth_area}>
        <Button type="submit" className={styles.button} variant="contained">
          Log in
        </Button>
        <Button type="submit" className={styles.button} variant="contained">
          Register
        </Button>
      </div>
    </header>
  );
}

export default Header;
