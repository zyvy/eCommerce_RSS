import { useEffect } from 'react';
import Footer from '../../components/UI/footer/Footer.tsx';
import Header from '../../components/UI/header/Header.tsx';
import styles from './CartPage.module.css';
import { loadCart, useCart } from '../../context/CartContext.tsx';
import ProductList from '../../components/UI/product-list-for-cart/ProductListForCart.tsx';

// const mockProductId = '6af8c880-75f1-43bf-adc2-9cf478f53b0c';

function CartPage() {
  const cart = useCart();
  const { total, totalPrice, setCart } = { ...cart };

  useEffect(() => {
    loadCart(cart, setCart);
  }, []);

  // const handleCreate = () => {
  /* const cart3 = CartService.getCart().then((data) => {
      console.dir(data);
      CartService.updateCartInfo('id', data.id);
    }); */
  /* const cart = CartService.createCart();
    cart.then((data) => {
      console.dir(data);
    }); */
  /* const cart2 = CartService.deteleCart('3bbc3aca-38e4-435a-b73f-4993605597ef', 1);
    cart2.then((data) => {
      console.dir(data);
    }); */
  /* const cart4 = CartService.addItemToCart(mockProductId, 4);
    cart4.then((data) => {
      console.dir(data);
    }); */

  /* const cart5 = CartService.addItemToCart('dc7f7664-3027-419a-be09-8e164a50fa71', 4);
    cart5.then((data) => {
      console.dir(data);
    }); */
  /* const cart4 = CartService.removeItemFromCart(mockProductId, 1, 1);
    cart4.then((data) => {
      console.dir(data);
    });

    const cart3 = CartService.getAllCarts();
    cart3.then((data) => {
      console.dir(data);
    }); */
  // CartService.updateCartInfo('id', '666eee26-6042-4b00-8713-c92333cb43b1');
  // };
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContainer}>
        <h1 className={styles.title}>Cart</h1>

        <div className={styles.totalContainer}>
          <span>{`Total price: ${totalPrice / 100}`}</span>
          <span>{`Total quantity: ${total}`}</span>
        </div>

        <ProductList />
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;
