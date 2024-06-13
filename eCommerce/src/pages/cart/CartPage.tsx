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
import PromotionalCodeUseFrom from '../../components/UI/promotional-code-use-form/PromotionalCodeUseFrom.tsx';

function CartPage() {
  const cart = useCart();
  const { total, setCart } = { ...cart };
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
          <div className={styles.priceContainer}>
            <span>Total price: </span>
            <span>{`${(cart.totalPrice / 100).toFixed(2)}$`}</span>
            <span className={`${styles.oldPrice} ${cart.totalDiscount ? styles.visible : ''}`}>
              {' '}
              {`${((cart.totalDiscount + cart.totalPrice) / 100).toFixed(2)}$`}
            </span>
          </div>
          <span>{`Total quantity: ${total}`}</span>
        </div>

        <PromotionalCodeUseFrom />

        <div style={{ display: total ? 'none' : 'flex' }} className={styles.emptyCart}>
          <h3 className={styles.emptyCartTitle}>Your basket is empty. Don`t want to pick up the products?</h3>
          <Button variant="outlined" onClick={() => navigate(PagePaths.Catalog)}>
            go to shopping
          </Button>
        </div>

        <ProductListForCart />
        <ModalClearCart />
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;
