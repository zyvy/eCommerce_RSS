import { useEffect, useState } from 'react';
import { useCart } from '../../../context/CartContext.tsx';
import styles from './ProductListForCart.module.css';
import { ProductsService } from '../../../services/ProductsService.ts';
import { ProductCart } from '../../../services/CartService.ts';

interface ProductNameCart extends ProductCart {
  name: string;
  img: string;
}

const getTotalProductPrice = (product: ProductNameCart) => (product.centAmount / 100) * product.quantity;

function ProductList() {
  const cart = useCart();
  const { products } = { ...cart };

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
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
