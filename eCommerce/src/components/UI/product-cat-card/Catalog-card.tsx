import React from 'react';
import styles from './Catalog-card.module.css';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, image, description }) => {
  return (
    <div className={styles.product_card}>
      <p>{id}</p>
      <img src={image} alt={name} className={styles.product_image} />
      <h2 className={styles.product_name}>{name}</h2>
      <p className={styles.product_description}>{description}</p>
    </div>
  );
};

export default ProductCard;
