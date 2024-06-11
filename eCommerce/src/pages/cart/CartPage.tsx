import { useEffect } from 'react';
import Footer from '../../components/UI/footer/Footer.tsx';
import Header from '../../components/UI/header/Header.tsx';
import styles from './CartPage.module.css';
import { loadCart, useCart } from '../../context/CartContext.tsx';
import ProductList from '../../components/UI/product-list-for-cart/ProductListForCart.tsx';

function CartPage() {
  const cart = useCart();
  const { total, totalPrice, setCart } = { ...cart };

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

        <ProductList />
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;
