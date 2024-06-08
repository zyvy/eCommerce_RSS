import { Button } from '@mui/material';
import Footer from '../../components/UI/footer/Footer.tsx';
import Header from '../../components/UI/header/Header.tsx';
import styles from './CartPage.module.css';
import { CartService } from '../../services/CartService.ts';

function CartPage() {
  const handleCreate = () => {
    /* const cart = CartService.createCart();
    cart.then((data) => {
      console.dir(data);
    }); */

    /* const cart2 = CartService.deteleCart('3bbc3aca-38e4-435a-b73f-4993605597ef', 1);
    cart2.then((data) => {
      console.dir(data);
    }); */
    /* const cart4 = CartService.addItemToCart('6af8c880-75f1-43bf-adc2-9cf478f53b0c', 4);
    cart4.then((data) => {
      console.dir(data);
    }); */

    const cart4 = CartService.removeItemFromCart('6af8c880-75f1-43bf-adc2-9cf478f53b0c', 1, 1);
    cart4.then((data) => {
      console.dir(data);
    });

    const cart3 = CartService.getAllCarts();
    cart3.then((data) => {
      console.dir(data);
    });

    // CartService.updateCartInfo('id', '666eee26-6042-4b00-8713-c92333cb43b1');
  };
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContainer}>
        <Button variant="outlined" onClick={handleCreate}>
          Create cart
        </Button>
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;
