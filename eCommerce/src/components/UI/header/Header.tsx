import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MediaQuery from 'react-responsive';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { AuthorizationService } from '../../../services/AuthorizationService.ts';
import { PagePaths } from '../../../utils/utils.ts';
import { isUserLoggedIn } from '../../../utils/validation.ts';
import styles from './Header.module.css';
import { initialCartState, loadCart, useCart } from '../../../context/CartContext.tsx';
import { CartService } from '../../../services/CartService.ts';

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
  const [open, setOpen] = useState(false);

  const cartContext = useCart();
  const { total, setCart } = { ...cartContext };

  useEffect(() => {
    loadCart(cartContext, setCart);
  }, []);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const cart = useCart();

  const navigate = useNavigate();
  const HandleAuthButtonClick = () => {
    if (isUserLoggedIn()) {
      AuthorizationService.removeCustomerInfo();
      CartService.removeCartInfo();
      cart.setCart({ ...initialCartState });
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
            <div>
              <Button variant="contained" onClick={toggleDrawer(true)}>
                MENU
              </Button>
              <Drawer open={open} onClose={toggleDrawer(false)}>
                <IconButton sx={{ mb: 2, justifyContent: 'flex-end' }} onClick={toggleDrawer(false)}>
                  <CloseIcon />
                </IconButton>
                <Box
                  sx={{
                    width: 250,
                    paddingTop: '50px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <MenuItem onClick={() => navigate(PagePaths.Catalog)}>CATALOG</MenuItem>
                  {AuthorizationService.getCustomerInfo().id && (
                    <MenuItem onClick={() => navigate(PagePaths.Profile)}>PROFILE</MenuItem>
                  )}
                  <MenuItem onClick={HandleAuthButtonClick}>{isUserLoggedIn() ? 'LOGOUT' : 'LOG IN'}</MenuItem>
                  <MenuItem onClick={HandleRegisterButtonClick}>{isUserLoggedIn() ? 'MY ORDERS' : 'REGISTER'}</MenuItem>
                </Box>
              </Drawer>
            </div>
          </MediaQuery>
          <IconButton edge="start" color="default" aria-label="cart" component={Link} to={PagePaths.Cart}>
            <Badge badgeContent={total} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </header>
    </ThemeProvider>
  );
}

export default Header;
