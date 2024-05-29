import React from 'react';
import styles from './Catalog-card.module.css';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  discount_price?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, image, description, price, discount_price }) => {
  return (
    <div className={styles.product_card}>
      <p>{id}</p>
      <img src={image} alt={name} className={styles.product_image} />
      <h2 className={styles.product_name}>{name}</h2>
      <p className={styles.product_description}>{description}</p>
      {discount_price ? (<>
        <p className={styles.product_price}>
          <span>€</span>
          {discount_price} <s className={styles.product_discount}>€{price}</s>
        </p>
        <p className={styles.product_sale}>
          Sale!
        </p>
        </>
      ) : (
        <p className={styles.product_price}>
          <span>€</span>
          {price}
        </p>
      )}
    </div>
  );
};

export default ProductCard;
