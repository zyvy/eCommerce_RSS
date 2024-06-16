import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { loadCart, useCart } from '../../../context/CartContext.tsx';
import { CartService } from '../../../services/CartService.ts';

function ModalClearCart() {
  const cart = useCart();
  const { total, setCart } = { ...cart };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleClearCart = async () => {
    await CartService.removeDiscountCartCode('4a958570-db54-4cb7-bce5-abfb4619d92e');
    await CartService.removeDiscountCartCode('b640da39-b5d6-470d-b15a-ec25d440fab0');
    await CartService.clearCart().then(() =>
      loadCart(cart, setCart).then(() => {
        scrollToTop();
        setOpen(false);
      }),
    );
  };

  return (
    <>
      <Button style={{ display: total ? 'block' : 'none' }} variant="outlined" color="error" onClick={handleClickOpen}>
        Clear cart
      </Button>
      <Dialog open={open} onClick={handleClose}>
        <DialogTitle>Clear cart</DialogTitle>
        <DialogContent>Are you sure you want to empty the cart?</DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button sx={{ width: '90px' }} color="success" variant="outlined" onClick={handleClearCart}>
            Clear
          </Button>

          <Button color="error" onClick={handleClose} variant="outlined" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModalClearCart;
