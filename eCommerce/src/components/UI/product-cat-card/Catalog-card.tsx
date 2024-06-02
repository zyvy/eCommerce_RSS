import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Catalog-card.module.css';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  discountPrice?: number;
  slug: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, image, description, price, discountPrice, slug }) => {
  const navigate = useNavigate();
  const handleCardClick = (slug: string) => {
    navigate(`/product/${slug}`);
  };
  return (
    <>
      <div className={styles.product_card} onClick={() => handleCardClick(slug)}>
        <p>{id}</p>
        <img src={image} alt={name} className={styles.product_image} />
        <h2 className={styles.product_name}>{name}</h2>
        <p className={styles.product_description}>{description}</p>
        {discountPrice ? (
          <>
            <p className={styles.product_price}>
              <span>€</span>
              {discountPrice} <s className={styles.product_discount}>€{price}</s>
            </p>
            <p className={styles.product_sale}>Sale!</p>
          </>
        ) : (
          <p className={styles.product_price}>
            <span>€</span>
            {price}
          </p>
        )}
      </div>
    </>
  );
};

export default ProductCard;
