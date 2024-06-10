import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { isUserLoggedIn } from '../../../utils/validation.ts';
import { PagePaths } from '../../../utils/utils.ts';
import { AuthorizationService } from '../../../services/AuthorizationService.ts';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MediaQuery from 'react-responsive';
import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

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
  /* const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO search
  }; */
  const HandleAuthButtonClick = () => {
    if (isUserLoggedIn()) {
      AuthorizationService.removeCustomerInfo();
      if (window.location.pathname === PagePaths.Main) {
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
      navigate(PagePaths.Main);
    } else {
      navigate(PagePaths.Register);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to={PagePaths.Main}>
            <img className={styles.logo_image} src="/logo.png" alt="Logo" />
          </Link>
        </div>
        <div className={styles.buttons_wrapper}>
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
              sx={{
                fontSize: { xs: '0.8rem', md: '1rem' },
              }}
              onClick={() => navigate(PagePaths.Catalog)}>
              Catalog
            </Button>
            <Button
              type="submit"
              className={styles.button}
              variant="contained"
              sx={{
                fontSize: { xs: '0.8rem', md: '1rem' },
                visibility: AuthorizationService.getCustomerInfo().id ? 'visible' : 'hidden',
              }}
              onClick={() => navigate(PagePaths.Profile)}>
              Profile
            </Button>
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
          <MediaQuery query="(max-device-width: 700px)">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button variant="contained" {...bindTrigger(popupState)}>
                    Menu
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={HandleAuthButtonClick}>Login</MenuItem>
                    <MenuItem onClick={popupState.close}>My account</MenuItem>
                    <MenuItem onClick={popupState.close}>Logout</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </MediaQuery>
          <IconButton
            edge="start"
            color="default"
            aria-label="cart"

            // component={Link}
            // to="cart"
          >
            <Badge badgeContent="2" color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </header>
    </ThemeProvider>
  );
}

export default Header;
