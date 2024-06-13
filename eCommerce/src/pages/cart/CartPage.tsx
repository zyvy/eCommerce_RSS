import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/UI/footer/Footer.tsx';
import Header from '../../components/UI/header/Header.tsx';
import styles from './CartPage.module.css';
import { loadCart, useCart } from '../../context/CartContext.tsx';
import ProductListForCart from '../../components/UI/product-list-for-cart/ProductListForCart.tsx';
import ModalClearCart from '../../components/UI/modal-clear-cart/ModalClearCart.tsx';
import { PagePaths } from '../../utils/utils.ts';
import { CartService } from '../../services/CartService.ts';

function CartPage() {
  const cart = useCart();
  const { total, totalPrice, setCart } = { ...cart };
  const navigate = useNavigate();

  useEffect(() => {
    loadCart(cart, setCart);
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContainer}>
        <h1 className={styles.title}>Cart</h1>

        <div className={styles.totalContainer}>
          <span>{`Total price: ${(totalPrice / 100).toFixed(2)}$`}</span>
          <span>{`Total quantity: ${total}`}</span>
        </div>

        <div style={{ display: total ? 'none' : 'flex' }} className={styles.emptyCart}>
          <h3 className={styles.emptyCartTitle}>Your basket is empty. Don`t want to pick up the products?</h3>
          <Button variant="outlined" onClick={() => navigate(PagePaths.Catalog)}>
            go to shopping
          </Button>
        </div>

        <ProductListForCart />
        <ModalClearCart />
        <Button
          variant="outlined"
          onClick={() => {
            CartService.getActiveDiscountCodes().then((data) => console.log('codes', data));
            CartService.applyDiscountToCart('test5');
            loadCart(cart, setCart);
          }}>
          скидки
        </Button>
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;
