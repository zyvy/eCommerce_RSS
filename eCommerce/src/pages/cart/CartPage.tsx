import { Button } from '@mui/material';
import Footer from '../../components/UI/footer/Footer.tsx';
import Header from '../../components/UI/header/Header.tsx';
import styles from './CartPage.module.css';
import { CartService } from '../../services/CartService.ts';
// import { AuthorizationService } from '../../services/AuthorizationService.ts';

function CartPage() {
  const handleCreate = () => {
    // const cart = CartService.createCart(AuthorizationService.getCustomerInfo().id);

    /* const cart = CartService.getCart();
    cart.then((data) => {
      console.dir(data);
    }); */

    const cart = CartService.addItemToCart('6af8c880-75f1-43bf-adc2-9cf478f53b0c', 1);
    cart.then((data) => {
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
