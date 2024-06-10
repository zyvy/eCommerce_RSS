import { Button } from '@mui/material';
import { useEffect } from 'react';
import Footer from '../../components/UI/footer/Footer.tsx';
import Header from '../../components/UI/header/Header.tsx';
import styles from './CartPage.module.css';
import { CartService } from '../../services/CartService.ts';
import { loadCart, useCart } from '../../context/CartContext.tsx';

const mockProductId = '6af8c880-75f1-43bf-adc2-9cf478f53b0c';

function CartPage() {
  const cartContext = useCart();
  const { products, total, totalPrice, setCart } = { ...cartContext };

  useEffect(() => {
    loadCart(cartContext, setCart);
  }, []);

  const handleAdd = (productId: string, variantId?: number) => {
    CartService.addItemToCart(productId, 1, variantId).then(() => loadCart(cartContext, setCart));
  };

  const handleRemove = (productId: string, variantId: number) => {
    CartService.removeItemFromCart(productId, variantId, 1).then(() => loadCart(cartContext, setCart));
  };

  const handleCreate = () => {
    const cart3 = CartService.getCart();
    cart3.then((data) => {
      console.dir(data);
    });
    /* const cart = CartService.createCart();
    cart.then((data) => {
      console.dir(data);
    }); */
    /* const cart2 = CartService.deteleCart('3bbc3aca-38e4-435a-b73f-4993605597ef', 1);
    cart2.then((data) => {
      console.dir(data);
    }); */
    const cart4 = CartService.addItemToCart(mockProductId, 4);
    cart4.then((data) => {
      console.dir(data);
    });
    /* const cart4 = CartService.removeItemFromCart(mockProductId, 1, 1);
    cart4.then((data) => {
      console.dir(data);
    });

    const cart3 = CartService.getAllCarts();
    cart3.then((data) => {
      console.dir(data);
    }); */
    // CartService.updateCartInfo('id', '666eee26-6042-4b00-8713-c92333cb43b1');
  };
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContainer}>
        <Button disabled variant="outlined" onClick={handleCreate}>
          Create cart
        </Button>
        <Button variant="outlined" onClick={() => handleAdd(mockProductId, 1)}>
          Add
        </Button>
        <Button variant="outlined" onClick={() => handleRemove(mockProductId, 1)}>
          Remove
        </Button>
        {products.map((product) => (
          <div key={`${product.id}${product.variantId}`}>{`Product id=${product.id}`}</div>
        ))}
        <div>{`Total: ${total}`}</div>
        <div>{`Total prise: ${totalPrice / 100}$`}</div>
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;
