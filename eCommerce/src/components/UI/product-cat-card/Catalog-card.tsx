import { useState } from 'react';
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
  isInCart?: boolean; 
}

function ProductCard({ id, name, image, description, price, discountPrice, slug, isInCart }: ProductCardProps) {
  const navigate = useNavigate();
  const [inCart, setInCart] = useState(isInCart); 

  const handleCardClick = (slug: string) => {
    navigate(`/product/${slug}`);
  };

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation(); 
    if (!inCart) {
      setInCart(true); 
    }
  };

  return (
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
      <button 
        className={`${styles.add_to_cart_button} ${inCart ? styles.disabled : ''}`} 
        onClick={handleAddToCart} 
        disabled={inCart}
      >
        {inCart ? 'In Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default ProductCard;
