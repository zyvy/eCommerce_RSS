import { useEffect, useState } from 'react';
import { loadCart, useCart } from '../../../context/CartContext.tsx';
import styles from './ProductListForCart.module.css';
import { ProductsService } from '../../../services/ProductsService.ts';
import { CartService, ProductCart } from '../../../services/CartService.ts';

interface ProductNameCart extends ProductCart {
  name: string;
  img: string;
}

const getTotalProductPrice = (product: ProductNameCart) => (product.centAmount / 100) * product.quantity;

function ProductList() {
  const cart = useCart();
  const { products, setCart } = { ...cart };

  const [productsFull, setProductsFull] = useState<ProductNameCart[]>([]);

  useEffect(() => {
    if (!products.length) return;
    Promise.all(products.map(({ id }) => ProductsService.getProductById(id))).then((data) => {
      const productsForCart: ProductNameCart[] = data.map((item, i) => {
        const imges = item.masterVariant.images;
        let img = '';
        if (imges?.length) {
          img = imges[0].url;
        }
        return { ...products[i], name: item.name['en-US'], img };
      });
      setProductsFull(productsForCart);
    });
  }, [products]);

  const handleDelete = (productId: string, variang: number, quantity: number) => {
    CartService.removeItemFromCart(productId, variang, quantity).then(() => loadCart(cart, setCart));
  };

  const handleAdd = (productId: string, variantId?: number) => {
    CartService.addItemToCart(productId, 1, variantId).then(() => loadCart(cart, setCart));
  };

  const handleRemove = (productId: string, variantId: number) => {
    CartService.removeItemFromCart(productId, variantId, 1).then(() => loadCart(cart, setCart));
  };

  return (
    <div className={styles.productList}>
      {productsFull.map((product) => (
        <div className={styles.product} key={product.lineItemId}>
          <h3 className={styles.title}>{product.name}</h3>
          <div className={styles.productContent}>
            <img className={styles.img} src={product.img} alt={product.name} />

            <div className={styles.priceContainer}>
              <div className={styles.priceItem}>
                <span>Price: </span>
                <span>{`${product.centAmount / 100}$`}</span>
              </div>
              <div className={styles.priceItem}>
                <span>Quantity: </span>
                <span>{product.quantity}</span>
              </div>
              <div className={styles.priceItem}>
                <span>Total price: </span>
                <span>{`${getTotalProductPrice(product)}$`}</span>
              </div>
            </div>
            <div className={styles.btnControls}>
              <button
                type="button"
                className={styles.btnDelete}
                onClick={() => handleDelete(product.id, product.variantId, product.quantity)}>
                Delete
              </button>
              <div className={styles.controlQuantityContainer}>
                <button
                  className={`${styles.quantityControlButton} ${styles.btnRemove}`}
                  type="button"
                  onClick={() => handleRemove(product.id, product.variantId)}>
                  -
                </button>
                <span className={styles.quantity}>{product.quantity}</span>
                <button
                  className={`${styles.quantityControlButton} ${styles.btnAdd}`}
                  type="button"
                  onClick={() => handleAdd(product.id, product.variantId)}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
